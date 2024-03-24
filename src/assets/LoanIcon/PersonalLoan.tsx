import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

function ICICIBank({ active, ...other }: BoxProps | any) {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const WARNING_LIGHT = theme.palette.warning.light;

  return (
    <Box {...other}>
      <svg
        width="68"
        height="46"
        viewBox="0 0 68 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2223_23062)">
          <path
            d="M41.5166 14.5988C39.7839 14.5988 38.2211 15.3387 37.1266 16.5187C36.0965 15.4583 34.5205 14.6852 32.5398 14.2737C32.5202 14.2696 32.5007 14.2676 32.4813 14.2672C32.4655 14.2614 32.4492 14.2563 32.4322 14.2529C32.2455 14.2157 32.0545 14.1818 31.8616 14.1515V12.877C32.9725 12.0366 33.8796 10.5435 34.162 8.31432C34.8691 6.44337 35.4492 3.70467 34.2412 1.21219C34.1916 1.10993 34.0918 1.04144 33.9786 1.032C33.8655 1.0223 33.7556 1.07349 33.6898 1.1661C33.1214 1.96539 32.545 1.77985 31.491 1.35298C30.8846 1.1073 30.1971 0.828777 29.4562 0.867043C27.8786 0.948398 26.9553 1.31058 26.6518 1.97086C26.2228 1.89481 25.7731 1.95371 25.3779 2.1437C23.3637 3.11273 24.2853 6.98193 24.7836 8.31448C25.0661 10.5437 25.973 12.0367 27.0839 12.877V14.1514C26.8907 14.1817 26.6997 14.2157 26.5132 14.2529C26.4881 14.258 26.4644 14.2661 26.442 14.2764C26.4158 14.2753 26.3892 14.2771 26.3625 14.2827C24.6828 14.6374 23.2611 15.2721 22.2511 16.1182C21.1017 17.0809 20.4941 18.3191 20.4941 19.6988V26.2548C20.4941 26.4324 20.6381 26.5764 20.8157 26.5764H24.8717H24.8722H24.8727H34.0729H34.0735H34.074H38.1299C38.3075 26.5764 38.4515 26.4324 38.4515 26.2548V25.7306C39.3487 26.2674 40.3972 26.5764 41.5166 26.5764C44.8188 26.5764 47.5054 23.8898 47.5054 20.5876C47.5054 17.2854 44.8188 14.5988 41.5166 14.5988ZM25.6567 2.72337C26.0006 2.55798 26.4043 2.53606 26.7642 2.66334C26.8556 2.69561 26.9564 2.68505 27.039 2.63462C27.1217 2.58419 27.1771 2.49924 27.1901 2.40331C27.2774 1.75793 28.4887 1.56097 29.4893 1.50936C30.0881 1.47817 30.6785 1.71779 31.2496 1.9491C32.096 2.29189 33.0404 2.67465 33.8576 1.94385C34.3996 3.35953 34.4278 5.07019 33.945 6.89232C33.757 6.26977 33.4542 5.67521 33.0388 5.11467C32.9765 5.03058 32.8796 4.98454 32.7803 4.98454C32.7334 4.98454 32.6859 4.99483 32.6413 5.01622C31.6723 5.48114 30.6102 5.71685 29.4828 5.71685H29.4618C28.3354 5.71685 27.2731 5.48114 26.3042 5.01622C26.1652 4.94949 25.9985 4.99081 25.9067 5.11467C25.5042 5.65779 25.2075 6.23274 25.0184 6.83428C24.665 5.27856 24.5477 3.2569 25.6567 2.72337ZM25.4199 8.22225C25.4633 7.33098 25.75 6.48699 26.2736 5.70951C27.2622 6.14136 28.3331 6.36003 29.461 6.35997H29.4837C30.6123 6.35997 31.6833 6.14131 32.6719 5.70951C33.1956 6.48699 33.4823 7.33098 33.5257 8.22225C33.1053 11.5703 31.1895 13.0698 29.4728 13.0698C27.756 13.0698 25.8402 11.5703 25.4199 8.22225ZM27.4492 14.7478C27.6084 14.7259 27.727 14.5899 27.727 14.4292V13.2812C28.2957 13.5715 28.8935 13.713 29.4728 13.713C30.052 13.713 30.6498 13.5715 31.2185 13.2811V14.4293C31.2185 14.59 31.3371 14.726 31.4963 14.7479C31.6571 14.77 31.8173 14.7948 31.9754 14.8222C31.6769 15.6148 30.6489 16.1998 29.4727 16.1998C28.2965 16.1998 27.2685 15.6148 26.9701 14.8221C27.128 14.7948 27.2882 14.7699 27.4492 14.7478ZM37.8083 25.9333H34.395V21.3481C34.395 21.1705 34.251 21.0265 34.0734 21.0265C33.8958 21.0265 33.7518 21.1705 33.7518 21.3481V25.9333H25.1937V21.3481C25.1937 21.1705 25.0497 21.0265 24.8722 21.0265C24.6946 21.0265 24.5506 21.1705 24.5506 21.3481V25.9333H21.1372V19.6988C21.1372 17.4473 23.0764 15.6798 26.3333 14.9483C26.6817 16.0491 27.9616 16.8429 29.4726 16.8429C30.9837 16.8429 32.2642 16.0488 32.6123 14.9475C34.377 15.3445 35.8161 16.0713 36.7124 17.0159C35.9685 18.0138 35.5277 19.2502 35.5277 20.5877C35.5277 22.4907 36.4201 24.1892 37.8082 25.2869L37.8083 25.9333ZM41.5166 25.9333C38.569 25.9333 36.1709 23.5352 36.1709 20.5876C36.1709 17.64 38.569 15.242 41.5166 15.242C44.4642 15.242 46.8622 17.64 46.8622 20.5876C46.8622 23.5352 44.4642 25.9333 41.5166 25.9333Z"
            fill="#333333"
          />
          <path
            d="M42.3451 24.5798L39.5622 21.6832V20.8556H41.0105C41.3761 20.8556 41.6916 20.7366 41.9571 20.4987C42.2226 20.2608 42.383 19.9659 42.4382 19.6142H39.1484V18.7866H42.314C42.1968 18.5452 42.0226 18.3469 41.7916 18.1917C41.5606 18.0366 41.3002 17.959 41.0105 17.959H39.1484V17.1314H44.1141V17.959H42.7692C42.8658 18.0762 42.952 18.2038 43.0278 18.3417C43.1037 18.4797 43.1623 18.628 43.2037 18.7866H44.1141V19.6142H43.2761C43.2209 20.2004 42.9795 20.6918 42.552 21.0884C42.1244 21.4849 41.6106 21.6832 41.0105 21.6832H40.7105L43.4934 24.5798H42.3451Z"
            fill="#333333"
          />
        </g>
        <path
          d="M0.81 43.44V36.21H3.47C3.99667 36.21 4.46833 36.3017 4.885 36.485C5.30167 36.665 5.63 36.9317 5.87 37.285C6.11333 37.6383 6.235 38.07 6.235 38.58C6.235 39.06 6.12833 39.47 5.915 39.81C5.70167 40.15 5.40167 40.41 5.015 40.59C4.63167 40.77 4.18 40.86 3.66 40.86H2.28V43.44H0.81ZM2.265 39.73H3.62C3.98667 39.73 4.28667 39.6133 4.52 39.38C4.75333 39.1433 4.87 38.8517 4.87 38.505C4.87 38.145 4.74667 37.86 4.5 37.65C4.25333 37.4367 3.95333 37.33 3.6 37.33H2.265V39.73ZM9.35742 43.54C8.84409 43.54 8.39242 43.4333 8.00242 43.22C7.61576 43.0033 7.31409 42.6983 7.09742 42.305C6.88076 41.9117 6.77242 41.4483 6.77242 40.915C6.77242 40.3983 6.87076 39.9333 7.06742 39.52C7.26742 39.1033 7.55409 38.775 7.92742 38.535C8.30076 38.2917 8.75242 38.17 9.28242 38.17C9.80909 38.17 10.2508 38.2817 10.6074 38.505C10.9641 38.725 11.2341 39.0333 11.4174 39.43C11.6008 39.8233 11.6924 40.2783 11.6924 40.795V41.19H8.21742C8.21742 41.4533 8.26076 41.6833 8.34742 41.88C8.43409 42.0733 8.55909 42.2233 8.72242 42.33C8.88909 42.4333 9.08909 42.485 9.32242 42.485C9.57242 42.485 9.79076 42.4317 9.97742 42.325C10.1641 42.2183 10.2958 42.0433 10.3724 41.8H11.6874C11.6274 42.1667 11.4808 42.48 11.2474 42.74C11.0141 43 10.7308 43.1983 10.3974 43.335C10.0641 43.4717 9.71742 43.54 9.35742 43.54ZM8.21742 40.32H10.3274C10.3274 40.1133 10.2874 39.9233 10.2074 39.75C10.1308 39.5767 10.0141 39.44 9.85742 39.34C9.70409 39.24 9.51076 39.19 9.27742 39.19C9.05409 39.19 8.86242 39.245 8.70242 39.355C8.54576 39.4617 8.42409 39.6017 8.33742 39.775C8.25409 39.9483 8.21409 40.13 8.21742 40.32ZM12.7441 43.44V38.27H14.1491V39.495C14.2325 39.2317 14.3491 39.0017 14.4991 38.805C14.6525 38.605 14.8375 38.45 15.0541 38.34C15.2708 38.2267 15.5158 38.17 15.7891 38.17C15.8358 38.17 15.8791 38.1733 15.9191 38.18C15.9625 38.1833 15.9941 38.19 16.0141 38.2V39.59C15.9841 39.5767 15.9475 39.5683 15.9041 39.565C15.8641 39.5617 15.8275 39.5583 15.7941 39.555C15.5075 39.5317 15.2625 39.54 15.0591 39.58C14.8558 39.62 14.6908 39.6883 14.5641 39.785C14.4375 39.8817 14.3458 40 14.2891 40.14C14.2325 40.28 14.2041 40.4367 14.2041 40.61V43.44H12.7441ZM18.9257 43.54C18.5657 43.54 18.219 43.4817 17.8857 43.365C17.5557 43.245 17.274 43.0583 17.0407 42.805C16.8107 42.5483 16.6657 42.2167 16.6057 41.81H17.8657C17.9124 41.9933 17.9924 42.1383 18.1057 42.245C18.2224 42.3517 18.354 42.4283 18.5007 42.475C18.6474 42.5183 18.7874 42.54 18.9207 42.54C19.2007 42.54 19.4257 42.4967 19.5957 42.41C19.769 42.32 19.8557 42.1833 19.8557 42C19.8557 41.86 19.804 41.7483 19.7007 41.665C19.6007 41.5817 19.434 41.5183 19.2007 41.475L18.2907 41.285C17.834 41.1883 17.4657 41.025 17.1857 40.795C16.909 40.5617 16.769 40.2317 16.7657 39.805C16.7624 39.495 16.8424 39.2167 17.0057 38.97C17.1724 38.7233 17.4174 38.5283 17.7407 38.385C18.0674 38.2417 18.4657 38.17 18.9357 38.17C19.5724 38.17 20.0807 38.31 20.4607 38.59C20.844 38.87 21.039 39.265 21.0457 39.775H19.8257C19.789 39.575 19.689 39.4217 19.5257 39.315C19.3657 39.205 19.1624 39.15 18.9157 39.15C18.6657 39.15 18.459 39.195 18.2957 39.285C18.1324 39.375 18.0507 39.5117 18.0507 39.695C18.0507 39.8317 18.1174 39.94 18.2507 40.02C18.384 40.0967 18.5907 40.1633 18.8707 40.22L19.7107 40.41C20.0007 40.48 20.2357 40.5767 20.4157 40.7C20.599 40.82 20.7407 40.9517 20.8407 41.095C20.9407 41.2383 21.009 41.3833 21.0457 41.53C21.0857 41.6733 21.1057 41.8033 21.1057 41.92C21.1057 42.2633 21.014 42.5567 20.8307 42.8C20.6474 43.04 20.3924 43.2233 20.0657 43.35C19.739 43.4767 19.359 43.54 18.9257 43.54ZM24.3741 43.54C23.8675 43.54 23.4258 43.4317 23.0491 43.215C22.6758 42.9983 22.3858 42.6917 22.1791 42.295C21.9758 41.8983 21.8741 41.4283 21.8741 40.885C21.8741 40.3417 21.9758 39.8667 22.1791 39.46C22.3858 39.0533 22.6758 38.7367 23.0491 38.51C23.4258 38.2833 23.8691 38.17 24.3791 38.17C24.8891 38.17 25.3308 38.2817 25.7041 38.505C26.0775 38.725 26.3658 39.0383 26.5691 39.445C26.7725 39.8517 26.8741 40.3317 26.8741 40.885C26.8741 41.405 26.7741 41.865 26.5741 42.265C26.3775 42.6617 26.0925 42.9733 25.7191 43.2C25.3491 43.4267 24.9008 43.54 24.3741 43.54ZM24.3791 42.455C24.6358 42.455 24.8425 42.38 24.9991 42.23C25.1558 42.08 25.2691 41.8833 25.3391 41.64C25.4091 41.3933 25.4441 41.125 25.4441 40.835C25.4441 40.5617 25.4125 40.3033 25.3491 40.06C25.2858 39.8167 25.1758 39.62 25.0191 39.47C24.8625 39.32 24.6491 39.245 24.3791 39.245C24.1225 39.245 23.9141 39.3167 23.7541 39.46C23.5975 39.6 23.4825 39.7917 23.4091 40.035C23.3358 40.275 23.2991 40.5417 23.2991 40.835C23.2991 41.105 23.3325 41.365 23.3991 41.615C23.4658 41.8617 23.5775 42.0633 23.7341 42.22C23.8908 42.3767 24.1058 42.455 24.3791 42.455ZM27.8711 43.44V38.27H29.3061V39C29.3861 38.8733 29.4894 38.7517 29.6161 38.635C29.7461 38.515 29.9094 38.4167 30.1061 38.34C30.3028 38.2633 30.5361 38.225 30.8061 38.225C31.1228 38.225 31.4178 38.2867 31.6911 38.41C31.9678 38.5333 32.1911 38.7283 32.3611 38.995C32.5311 39.2583 32.6161 39.6033 32.6161 40.03V43.44H31.1561V40.21C31.1561 39.93 31.0728 39.72 30.9061 39.58C30.7394 39.44 30.5361 39.37 30.2961 39.37C30.1361 39.37 29.9811 39.3983 29.8311 39.455C29.6844 39.5117 29.5644 39.5967 29.4711 39.71C29.3778 39.8233 29.3311 39.9633 29.3311 40.13V43.44H27.8711ZM35.2948 43.54C34.9681 43.54 34.6714 43.4783 34.4048 43.355C34.1414 43.2317 33.9331 43.0533 33.7798 42.82C33.6264 42.5833 33.5498 42.2967 33.5498 41.96C33.5498 41.3933 33.7614 40.9633 34.1848 40.67C34.6081 40.3733 35.2764 40.22 36.1898 40.21L36.8398 40.2V39.89C36.8398 39.6533 36.7698 39.4717 36.6298 39.345C36.4931 39.215 36.2781 39.1517 35.9848 39.155C35.7748 39.1583 35.5731 39.2083 35.3798 39.305C35.1898 39.4017 35.0581 39.57 34.9848 39.81H33.7698C33.7898 39.4367 33.8981 39.13 34.0948 38.89C34.2948 38.6467 34.5631 38.4667 34.8998 38.35C35.2364 38.23 35.6214 38.17 36.0548 38.17C36.5814 38.17 37.0048 38.2367 37.3248 38.37C37.6448 38.5 37.8764 38.6883 38.0198 38.935C38.1664 39.1783 38.2398 39.4683 38.2398 39.805V43.44H37.0198L36.8998 42.55C36.7231 42.9233 36.5014 43.1817 36.2348 43.325C35.9714 43.4683 35.6581 43.54 35.2948 43.54ZM35.7898 42.58C35.9198 42.58 36.0464 42.5567 36.1698 42.51C36.2964 42.46 36.4098 42.395 36.5098 42.315C36.6098 42.2317 36.6881 42.1383 36.7448 42.035C36.8048 41.9317 36.8364 41.825 36.8398 41.715V40.95L36.3148 40.96C36.0714 40.9633 35.8448 40.9933 35.6348 41.05C35.4248 41.1033 35.2548 41.1917 35.1248 41.315C34.9981 41.4383 34.9348 41.605 34.9348 41.815C34.9348 42.055 35.0164 42.2433 35.1798 42.38C35.3464 42.5133 35.5498 42.58 35.7898 42.58ZM41.0738 43.53C40.6938 43.53 40.3922 43.485 40.1688 43.395C39.9455 43.305 39.7805 43.1867 39.6738 43.04C39.5672 42.89 39.4988 42.725 39.4688 42.545C39.4388 42.3617 39.4238 42.1767 39.4238 41.99V36.01H40.8538V41.81C40.8538 42 40.8938 42.155 40.9738 42.275C41.0572 42.3917 41.2122 42.4633 41.4388 42.49L41.6838 42.505V43.405C41.5838 43.4383 41.4822 43.4667 41.3788 43.49C41.2755 43.5167 41.1738 43.53 41.0738 43.53ZM45.1557 43.44V36.21H46.6257V42.205H49.7657V43.44H45.1557ZM52.8995 43.54C52.3929 43.54 51.9512 43.4317 51.5745 43.215C51.2012 42.9983 50.9112 42.6917 50.7045 42.295C50.5012 41.8983 50.3995 41.4283 50.3995 40.885C50.3995 40.3417 50.5012 39.8667 50.7045 39.46C50.9112 39.0533 51.2012 38.7367 51.5745 38.51C51.9512 38.2833 52.3945 38.17 52.9045 38.17C53.4145 38.17 53.8562 38.2817 54.2295 38.505C54.6029 38.725 54.8912 39.0383 55.0945 39.445C55.2979 39.8517 55.3995 40.3317 55.3995 40.885C55.3995 41.405 55.2995 41.865 55.0995 42.265C54.9029 42.6617 54.6179 42.9733 54.2445 43.2C53.8745 43.4267 53.4262 43.54 52.8995 43.54ZM52.9045 42.455C53.1612 42.455 53.3679 42.38 53.5245 42.23C53.6812 42.08 53.7945 41.8833 53.8645 41.64C53.9345 41.3933 53.9695 41.125 53.9695 40.835C53.9695 40.5617 53.9379 40.3033 53.8745 40.06C53.8112 39.8167 53.7012 39.62 53.5445 39.47C53.3879 39.32 53.1745 39.245 52.9045 39.245C52.6479 39.245 52.4395 39.3167 52.2795 39.46C52.1229 39.6 52.0079 39.7917 51.9345 40.035C51.8612 40.275 51.8245 40.5417 51.8245 40.835C51.8245 41.105 51.8579 41.365 51.9245 41.615C51.9912 41.8617 52.1029 42.0633 52.2595 42.22C52.4162 42.3767 52.6312 42.455 52.9045 42.455ZM57.9022 43.54C57.5755 43.54 57.2789 43.4783 57.0122 43.355C56.7489 43.2317 56.5405 43.0533 56.3872 42.82C56.2339 42.5833 56.1572 42.2967 56.1572 41.96C56.1572 41.3933 56.3689 40.9633 56.7922 40.67C57.2155 40.3733 57.8839 40.22 58.7972 40.21L59.4472 40.2V39.89C59.4472 39.6533 59.3772 39.4717 59.2372 39.345C59.1005 39.215 58.8855 39.1517 58.5922 39.155C58.3822 39.1583 58.1805 39.2083 57.9872 39.305C57.7972 39.4017 57.6655 39.57 57.5922 39.81H56.3772C56.3972 39.4367 56.5055 39.13 56.7022 38.89C56.9022 38.6467 57.1705 38.4667 57.5072 38.35C57.8439 38.23 58.2289 38.17 58.6622 38.17C59.1889 38.17 59.6122 38.2367 59.9322 38.37C60.2522 38.5 60.4839 38.6883 60.6272 38.935C60.7739 39.1783 60.8472 39.4683 60.8472 39.805V43.44H59.6272L59.5072 42.55C59.3305 42.9233 59.1089 43.1817 58.8422 43.325C58.5789 43.4683 58.2655 43.54 57.9022 43.54ZM58.3972 42.58C58.5272 42.58 58.6539 42.5567 58.7772 42.51C58.9039 42.46 59.0172 42.395 59.1172 42.315C59.2172 42.2317 59.2955 42.1383 59.3522 42.035C59.4122 41.9317 59.4439 41.825 59.4472 41.715V40.95L58.9222 40.96C58.6789 40.9633 58.4522 40.9933 58.2422 41.05C58.0322 41.1033 57.8622 41.1917 57.7322 41.315C57.6055 41.4383 57.5422 41.605 57.5422 41.815C57.5422 42.055 57.6239 42.2433 57.7872 42.38C57.9539 42.5133 58.1572 42.58 58.3972 42.58ZM62.0312 43.44V38.27H63.4663V39C63.5463 38.8733 63.6496 38.7517 63.7763 38.635C63.9063 38.515 64.0696 38.4167 64.2663 38.34C64.4629 38.2633 64.6963 38.225 64.9663 38.225C65.2829 38.225 65.5779 38.2867 65.8513 38.41C66.1279 38.5333 66.3513 38.7283 66.5213 38.995C66.6913 39.2583 66.7763 39.6033 66.7763 40.03V43.44H65.3163V40.21C65.3163 39.93 65.2329 39.72 65.0663 39.58C64.8996 39.44 64.6963 39.37 64.4563 39.37C64.2963 39.37 64.1413 39.3983 63.9913 39.455C63.8446 39.5117 63.7246 39.5967 63.6313 39.71C63.5379 39.8233 63.4913 39.9633 63.4913 40.13V43.44H62.0312Z"
          fill="#333333"
        />
        <defs>
          <clipPath id="clip0_2223_23062">
            <rect
              width="27.44"
              height="27.44"
              fill="white"
              transform="translate(20.2793)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

export default memo(ICICIBank);