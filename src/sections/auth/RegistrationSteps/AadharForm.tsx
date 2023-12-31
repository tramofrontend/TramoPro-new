import { useEffect, useState, useCallback } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Stack,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  styled,
  StepIconProps,
  Typography,
  TextField,
} from "@mui/material";
// icon
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import { Icon } from "@iconify/react";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
import FormProvider, {
  RHFTextField,
  RHFCodes,
} from "../../../components/hook-form";
import { useSnackbar } from "notistack";
import { Api } from "src/webservices";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import ApiDataLoading from "src/components/customFunctions/ApiDataLoading";
import Image from "src/components/image/Image";
import AddharImage from "src/assets/Onboarding/AddharImage.png";
import PanImage from "src/assets/Onboarding/PanImage.png";
import { LoadingButton } from "@mui/lab";
import AWS from "aws-sdk";

// ----------------------------------------------------------------------

type FormValuesProps = {
  aadhar: string;
  pan: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
};

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

const s3 = new AWS.S3();

export default function AadharForm(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, UpdateUserDetail } = useAuthContext();
  const [activeStep, setActiveStep] = useState<any>(0);
  const [otpSendSuccess, setOtpSendSuccess] = useState(false);
  const [imageAadhar, setImageAadhar] = useState("");
  const [timer, setTimer] = useState(0);
  const [aadharTemp, setAadharTemp] = useState("");
  const [initTxn, setInitTxn] = useState("");
  const AadharSchema = Yup.object().shape({
    aadhar: Yup.string()
      .matches(/^\d{12}$/, "Aadhar card number must be exactly 12 digits")
      .required("Aadhar card number is required"),
  });

  const OtpSchema = Yup.object().shape({
    otp1: Yup.string().required(),
    otp2: Yup.string().required(),
    otp3: Yup.string().required(),
    otp4: Yup.string().required(),
    otp5: Yup.string().required(),
    otp6: Yup.string().required(),
  });

  const defaultValues = {
    aadhar: user?.aadharNumber || "",
  };

  const defaultValues2 = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const method2 = useForm<FormValuesProps>({
    resolver: yupResolver(OtpSchema),
    defaultValues: defaultValues2,
  });

  const methods = useForm<FormValuesProps>({
    mode: "onChange",
    resolver: yupResolver(AadharSchema),
    defaultValues,
  });

  const {
    reset: otpReset,
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: error2, isSubmitting: isSubmitting2 },
  } = method2;

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const params = {
    Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
    Key: user?.image_on_aadhaar?.split("/").splice(4, 4).join("/"),
    Expires: 600, // Expiration time in seconds
  };

  s3.getSignedUrl("getObject", params, (err: any, url: any) => {
    setImageAadhar(url);
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      setAadharTemp(data.aadhar);
      let token = localStorage.getItem("token");
      let txn_id = localStorage.getItem("init_txn");
      let body = {
        aadhaar_number: data.aadhar,
      };
      await Api(`user/KYC/v2/adhaar_gen_OTP`, "POST", body, token).then(
        (Response: any) => {
          console.log("send otp", Response);
          if (Response.status == 200) {
            if (Response.data.code == 200) {
              setTimer(90);
              setOtpSendSuccess(true);
              enqueueSnackbar(Response.data.message);
              setInitTxn(Response.data.init_txn_id);
            } else {
              enqueueSnackbar(Response.data.err.message);
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit1 = async (data: FormValuesProps) => {
    try {
      let token = localStorage.getItem("token");
      let txn_id = localStorage.getItem("init_txn");
      let body = {
        init_txn_id: initTxn,
        OTP:
          data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6,
        aadhaar_number: aadharTemp,
      };
      await Api(`user/KYC/v2/adhaar_verify_OTP`, "POST", body, token).then(
        (Response: any) => {
          console.log("=============>" + Response);
          if (Response.status == 200) {
            if (Response.data.code == 200) {
              enqueueSnackbar(Response.data.message);
              UpdateUserDetail({
                getAadhar: true,
                nameInAadhaar: Response.data.resData.name,
                addressInAadhar: Response.data.resData.Address_Info,
                gender: Response.data.resData.gender,
                dob: Response.data.resData.dob,
                image_on_aadhaar: Response.data.resData.image,
              });
              setOtpSendSuccess(false);
            } else if (Response.data.code == 500) {
              otpReset(defaultValues2);

              enqueueSnackbar(Response.data.err.message);
            } else {
              enqueueSnackbar(Response.data.err.message);
            }
          } else {
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const HandleAadharVarified = () => {
    UpdateUserDetail({ isAadhaarVerified: true });
    setActiveStep(1);
  };

  // useEffect(() => {
  //   let time = setTimeout(() => {
  //     setTimer(timer - 1);
  //   }, 1000);
  //   if (timer == 0) {
  //     clearTimeout(time);
  //     setOtpSend(false);
  //   }
  // }, [timer]);

  useEffect(() => {
    if (user?.isAadhaarVerified) {
      setActiveStep(1);
    }
  }, [user]);

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <Icon icon="arcticons:maadhaar" color="white" fontSize={40} />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const steps = ["Adhaar Identification", "Pan Identification"];

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const originalDate = user?.dob;
  const formattedDate = formatDate(originalDate);

  return (
    <>
      <Stack justifyContent={"start"} my={2}>
        <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                sx={{ flexDirection: "column" }}
                // onClick={() => setActiveStep(index)}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      {activeStep == 0 ? (
        <Stack spacing={2.5}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid
              rowGap={2}
              display={"grid"}
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
              }}
            >
              <Stack flexDirection={"row"} gap={2}>
                <RHFTextField
                  name="aadhar"
                  type="number"
                  label="Aadhar Card Number"
                />
                <Button
                  variant="outlined"
                  onClick={() => setValue("aadhar", "")}
                >
                  Clear
                </Button>
              </Stack>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isSubmitting}
              >
                Send OTP
              </LoadingButton>
            </Grid>
          </FormProvider>
          {otpSendSuccess && (
            <FormProvider
              methods={method2}
              onSubmit={handleOtpSubmit(onSubmit1)}
            >
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography variant="subtitle1">
                  Aadhar Verification Code
                </Typography>

                <Stack>
                  {/* <Typography variant="subtitle1">
                    Resend Code {timer !== 0 && `(${timer})`}{" "}
                  </Typography> */}
                  <Button
                    variant="outlined"
                    onClick={() => otpReset(defaultValues2)}
                  >
                    Clear
                  </Button>
                </Stack>
              </Stack>

              <Stack justifyContent={"start"} flexDirection={"row"} mb={2}>
                <RHFCodes
                  keyName="otp"
                  inputs={["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"]}
                />

                {(!!error2.otp1 ||
                  !!error2.otp2 ||
                  !!error2.otp3 ||
                  !!error2.otp4 ||
                  !!error2.otp5 ||
                  !!error2.otp6) && (
                  <FormHelperText error sx={{ px: 2 }}>
                    Code is required
                  </FormHelperText>
                )}
              </Stack>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isSubmitting2}
              >
                Verify OTP
              </LoadingButton>
            </FormProvider>
          )}
          {user?.getAadhar && (
            <Stack gap={3} justifyContent={"space-between"}>
              <Typography variant="h4" color="green" justifySelf={"center"}>
                Aadhaar Verified Successfully{" "}
                <Icon icon="el:ok" color="green" fontSize={25} />
              </Typography>

              <Stack flexDirection={"row"} gap={2}>
                <Image
                  src={imageAadhar && imageAadhar}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid black",
                    width: 150,
                    height: 150,
                  }}
                />
                <Typography>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    gap={5}
                  >
                    <Typography variant="subtitle1">
                      Name :{user?.nameInAadhaar}
                    </Typography>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    gap={5}
                  >
                    <Typography variant="subtitle1">
                      Date of Birth :{formattedDate}
                    </Typography>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    gap={5}
                  >
                    <Typography variant="subtitle1">
                      Gender : {user?.gender}
                    </Typography>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    gap={5}
                  >
                    <Typography variant="subtitle1">
                      Address : {user?.addressInAadhar}
                    </Typography>
                  </Stack>
                </Typography>
              </Stack>
            </Stack>
          )}
          {!user?.getAadhar && (
            <Stack flexDirection={"row"} justifyContent={"center"}>
              <Image
                disabledEffect
                visibleByDefault
                alt="auth"
                src={AddharImage}
                sx={{
                  width: { xs: 250, sm: 450 },
                }}
              />
            </Stack>
          )}
          {user?.getAadhar && (
            <Stack my={5}>
              <Button
                variant="contained"
                sx={{ width: "fit-content", margin: "auto" }}
                onClick={HandleAadharVarified}
              >
                Confirm & Continue
              </Button>
            </Stack>
          )}
        </Stack>
      ) : (
        <PanCard callback={props.callBack} />
      )}
    </>
  );
}

function PanCard(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, UpdateUserDetail } = useAuthContext();
  const [panNumber, setPanNumber] = useState("");
  const [panAttempt, setPanAttempt] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const PanSchema = Yup.object().shape({
    pan: Yup.string()
      .required("PAN Card Number required")
      .uppercase()
      .matches(/[0-9]/, "Enter valid PAN")
      .matches(/[A-Z]/, "Enter valid PAN")
      .max(10)
      .length(10, "Enter Valid PAN Number"),
  });

  const defaultValues = {
    pan: user?.PANnumber ? user?.PANnumber : "",
  };

  const methods = useForm<FormValuesProps>({
    mode: "onChange",
    resolver: yupResolver(PanSchema),
    defaultValues,
  });

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: FormValuesProps) => {
    setLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      PAN_Number: data.pan,
    };
    Api(`user/KYC/Verify_PAN`, "POST", body, token).then((Response: any) => {
      if (Response.data.code == 200) {
        if (Response.data.KYCStatus.body.code == 200) {
          enqueueSnackbar(Response.data.message);
          setPanAttempt(Response.data.remaining_Attempts);
          UpdateUserDetail({
            getPan: true,
            PANnumber: Response.data.KYCStatus.body.data.pan,
            firstName: Response.data.KYCStatus.body.data.first_name,
            lastName: Response.data.KYCStatus.body.data.last_name,
          });

          setLoading(false);
        } else {
          setLoading(false);
          enqueueSnackbar(Response.data.err.message);
          setPanAttempt(Response.data.remaining_Attempts);
        }
      } else {
        setLoading(false);
        setErrorMsg(Response.data.message);
        enqueueSnackbar(Response?.data?.message || Response.data?.err?.message);
      }
    });
  };
  const HandleClearPAN = () => {
    setPanNumber("");
  };

  const HandlePanVarified = () => {
    // dispatch(
    //   user?InRedux({
    //     ...user?,
    //     isPANVerified: true,
    //   })
    // );
    props.callback(2);
  };

  return (
    <Grid
      display={"grid"}
      gridTemplateColumns={{ xs: "repeat(1, 1fr)", sm: "repeat(1, 1fr)" }}
      rowGap={2}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"row"} justifyContent={"space-between"} gap={2}>
          <TextField
            error={!!errors.pan}
            sx={{ width: "100%" }}
            label="Pan Number"
            disabled={user?.PANnumber}
            value={panNumber || user?.PANnumber}
            {...register("pan", {
              onChange: (e) => setPanNumber(e.target.value.toUpperCase()),
              required: true,
            })}
          />
          <Button
            variant="outlined"
            size="large"
            style={{ marginTop: "5px" }}
            onClick={HandleClearPAN}
          >
            Cancel
          </Button>
        </Stack>
        {!!errors.pan && (
          <FormHelperText error sx={{ pl: 2 }}>
            Please enter valid Pan number
          </FormHelperText>
        )}
        {/* <RHFTextField name="pan" label="Pan Card Number" /> */}
        {!user?.getPan && (
          <Stack width={"fit-content"} sx={{ mt: 2 }}>
            {loading ? (
              <ApiDataLoading />
            ) : (
              <>
                <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                  <Button variant="contained" type="submit">
                    Check
                  </Button>

                  {panAttempt && (
                    <Typography variant="caption">
                      {" "}
                      Attempt left: {panAttempt}
                    </Typography>
                  )}
                </Stack>

                <Stack justifyContent="end">
                  <Image
                    disabledEffect
                    visibleByDefault
                    alt="auth"
                    src={PanImage}
                    sx={{
                      width: "60%",
                      marginTop: "50px",
                      // height: '200px',
                      // backgroundSize: 'cover',
                      // boxShadow: 10,
                      // border: '20px  #F0F9FB',
                      marginLeft: "250px",
                    }}
                  />
                </Stack>
              </>
            )}
          </Stack>
        )}
      </FormProvider>
      {user?.getPan ? (
        <>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"row"}
            my={3}
            gap={1}
          >
            <Typography variant="h4" color="green">
              Pan Verified Successfully{" "}
            </Typography>
            <Icon icon="el:ok" color="green" fontSize={25} />
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={300}
          >
            <Typography variant="subtitle1">FullName:</Typography>
            <Typography variant="body1">
              {user?.firstName + " " + user?.lastName}
            </Typography>
          </Stack>
        </>
      ) : (
        <Typography variant="h4" sx={{ color: "#707070", textAlign: "center" }}>
          {errorMsg}
        </Typography>
      )}

      {user?.getPan && (
        <>
          <Stack my={5}>
            <Button
              variant="contained"
              sx={{ width: "fit-content", margin: "auto" }}
              // onClick={() => props.callback(2)}

              onClick={HandlePanVarified}
            >
              Confirm & Continue
            </Button>
          </Stack>
          <Stack>
            <Image
              disabledEffect
              visibleByDefault
              alt="auth"
              src={PanImage}
              sx={{
                width: "50%",
                marginTop: "50px",
                // height: '200px',
                // backgroundSize: 'cover',
                // boxShadow: 10,
                // border: '20px  #F0F9FB',
                marginLeft: "250px",
              }}
            />
          </Stack>
        </>
      )}
    </Grid>
  );
}
