import { useEffect, useState } from "react";
// @mui
import {
  Stack,
  Grid,
  TableHead,
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  tableCellClasses,
  Button,
  Typography,
  Pagination,
  styled,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { Api } from "src/webservices";

import { fDate, fDateTime } from "src/utils/formatTime";

import ApiDataLoading from "src/components/customFunctions/ApiDataLoading";
import Label from "src/components/label/Label";
import { sentenceCase } from "change-case";
import CustomPagination from "src/components/customFunctions/CustomPagination";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { TableHeadCustom } from "src/components/table";
import { RHFSelect, RHFTextField } from "src/components/hook-form";
import FormProvider from "src/components/hook-form/FormProvider";
import { useDateRangePicker } from "src/components/date-range-picker";
import DateRangePicker from "src/components/date-range-picker/DateRangePicker";
import Iconify from "src/components/iconify/Iconify";
import FileFilterButton from "../MyTransaction/FileFilterButton";
// ----------------------------------------------------------------------

export default function (props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const [sdata, setSdata] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const tableLabels = [
    { id: "Date", label: "Date & Time" },
    { id: "amount", label: "Amount" },
    { id: "Charge", label: "Charge" },
    { id: "Commission", label: "Commission" },
    { id: " deposit_type", label: " Deposit Type" },
    { id: "mobile", label: "Mobile" },
    { id: " branch", label: " Branch" },
    { id: " status", label: " Status" },
  ];

  type FormValuesProps = {
    transactionType: string;
    phoneNumber: string;
    utrNumber: string;
    amount: string;
    status: string;
    Paymentmode: string;
    request_type: string;
    fundRequestId: string;
  };

  const FilterSchema = Yup.object().shape({
    UserName: Yup.string(),
  });

  const defaultValues = {
    phoneNumber: "",

    amount: "",
    Paymentmode: "",
    status: "",
    request_type: "",
    fundRequestId: "",
    startDate: "",
    endDate: "",
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    setValue,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(new Date(), new Date());

  useEffect(() => {
    getFundReq();
  }, [currentPage]);

  const getFundReq = () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
    };
    Api(`agent/fundManagement/getRaisedRequests`, "POST", body, token).then(
      (Response: any) => {
        console.log("======FundsRequests All==response=====>", Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setPageCount(Response.data.count);
            setSdata(Response.data.data);
          } else {
            console.log("======getRaisedRequests=======>" + Response);
            enqueueSnackbar(Response.data.message);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  const filterRequest = (refId: string) => {
    setSdata([]);
    setIsLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      pageInitData: {
        pageSize: 20,
        currentPage: currentPage,
      },
      clientRefId: refId,
    };
    Api(`transaction/transactionByUser`, "POST", body, token).then(
      (Response: any) => {
        console.log("======Transaction==response=====>" + Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setSdata(Response.data.data.data);
            enqueueSnackbar(Response.data.message);
          } else {
            console.log("======Transaction=======>" + Response);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[300],
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const SearchData = (data: FormValuesProps) => {
    let token = localStorage.getItem("token");
    let body = {
      pageInitData: {
        pageSize: 20,
        currentPage: currentPage,
      },
      bankName: "",
      bankId: "",
      status: data.status,
      modeName: data.Paymentmode,
      mobileNumber: "",
      amount: data.amount,
      startDate: fDate(startDate),
      endDate: fDate(endDate),
      type: "",
    };
    Api(`agent/fundManagement/getRaisedRequests`, "POST", body, token).then(
      (Response: any) => {
        console.log("======Transaction==response=====>" + Response);
        if (Response.status == 200) {
          console.log(
            "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
            Response
          );

          // if (Response.data.code == 200) {
          //   setSdata(Response.data.data.data);
          //   enqueueSnackbar(Response.data.message);
          // } else {
          //   console.log("======Transaction=======>" + Response);
          // }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  };
  const handdleClear = () => {
    reset();
  };

  return (
    <>
      <Helmet>
        <title> Transactions |{process.env.REACT_APP_COMPANY_NAME}</title>
      </Helmet>

      <Stack flexDirection={"row"} justifyContent={"end"}></Stack>
      {isLoading ? (
        <ApiDataLoading />
      ) : (
        <Grid item xs={16} md={12} lg={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(SearchData)}>
            <Stack direction="row" gap={2} mt={2}>
              <RHFSelect
                name="Paymentmode"
                label="Mode Of Payment"
                SelectProps={{
                  native: false,
                  sx: { textTransform: "capitalize" },
                }}
              >
                <MenuItem value="NEFT">NEFT</MenuItem>
                <MenuItem value="RTGS">RTGS</MenuItem>
                <MenuItem value="hold">IMPS</MenuItem>
                <MenuItem value="Cash deposit at CDM">
                  Cash deposit at CDM
                </MenuItem>
                <MenuItem value="Fund Transfer">Fund Transfer</MenuItem>
                <MenuItem value="Cash deposit at branch">
                  Cash deposit at branch
                </MenuItem>
              </RHFSelect>

              {/* <RHFSelect
                name="request_type"
                label="Request Type"
                SelectProps={{
                  native: false,
                  sx: { textTransform: "capitalize" },
                }}
              >
                <MenuItem value="mannual">Mannual</MenuItem>
                <MenuItem value="auto collect">Auto Collect</MenuItem>
              </RHFSelect> */}

              <RHFSelect
                name="status"
                label="Status"
                SelectProps={{
                  native: false,
                  sx: { textTransform: "capitalize" },
                }}
              >
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Pendding">Pendding</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </RHFSelect>

              {
                <RHFTextField
                  name="phoneNumber"
                  label=" Mobile"
                  placeholder="Mobile"
                  size="small"
                />
              }
              <RHFTextField
                name="amount"
                label="amount"
                placeholder="amount"
                size="small"
              />

              {/* <Stack>
                <FileFilterButton
                  isSelected={!!isSelectedValuePicker}
                  startIcon={<Iconify icon="eva:calendar-fill" />}
                  onClick={onOpenPicker}
                >
                  {`${fDate(startDate)} - ${fDate(endDate)}`}
                </FileFilterButton>

                <DateRangePicker
                  variant="input"
                  title="Select Date Range"
                  startDate={startDate}
                  endDate={endDate}
                  onChangeStartDate={onChangeStartDate}
                  onChangeEndDate={onChangeEndDate}
                  open={openPicker}
                  onClose={onClosePicker}
                  isSelected={isSelectedValuePicker}
                  isError={isError}
                />
              </Stack> */}

              <Button variant="contained" type="submit">
                Search
              </Button>
              <Button variant="contained" onClick={handdleClear}>
                Clear
              </Button>
            </Stack>
          </FormProvider>

          <Scrollbar sx={{ maxHeight: window.innerHeight - 160 }}>
            <Table
              sx={{ minWidth: 720 }}
              aria-label="customized table"
              stickyHeader
            >
              <TableHeadCustom headLabel={tableLabels} />

              <TableBody>
                {sdata.map((row: any) => (
                  <StyledTableRow
                    key={row._id}
                    role="checkbox"
                    tabIndex={-1}
                    sx={{ borderBottom: "1px solid #dadada" }}
                  >
                    <StyledTableCell>
                      <Typography variant="body1">
                        {fDateTime(row?.createdAt)}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1">Rs. {row?.amount}</Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1" textAlign={"center"}>
                        {!isNaN(row?.Charge) ? "Rs. " + row?.Charge : "-"}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1" textAlign={"center"}>
                        {!isNaN(row?.Commission)
                          ? "Rs. " + parseFloat(row?.Commission).toFixed(2)
                          : "-"}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1">
                        {row?.deposit_type}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1">
                        {row?.transactional_details?.mobile}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1">
                        {row?.transactional_details?.branch}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell
                      sx={{
                        textTransform: "lowercase",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      <Label
                        variant="soft"
                        color={
                          (row.status.toLowerCase() === "failed" && "error") ||
                          ((row.status.toLowerCase() === "pending" ||
                            row.status.toLowerCase() === "in_process") &&
                            "warning") ||
                          "success"
                        }
                        sx={{ textTransform: "capitalize" }}
                      >
                        {row.status.toLowerCase()
                          ? sentenceCase(row.status.toLowerCase())
                          : ""}
                      </Label>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
          <CustomPagination
            pageSize={pageSize}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setCurrentPage(value);
            }}
            page={currentPage}
            Count={pageCount}
          />

          {/* <CustomPagination /> */}
        </Grid>
      )}
    </>
  );
}
