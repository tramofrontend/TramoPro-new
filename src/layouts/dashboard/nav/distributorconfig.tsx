// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

const distributorNavConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "My Stats",
    items: [
      {
        title: "My Stats",
        path: PATH_DASHBOARD.mystats,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    subheader: "Dashboard",
    items: [
      {
        title: "Network",
        path: PATH_DASHBOARD.network,
        icon: ICONS.ecommerce,
      },
      {
        title: "Transactions",
        path: PATH_DASHBOARD.transaction.root,
        icon: ICONS.user,
        children: [
          {
            title: "My Transactions",
            path: PATH_DASHBOARD.transaction.mytransaction,
          },
          {
            title: "Fund Flow",
            path: PATH_DASHBOARD.transaction.fundflow,
          },
          {
            title: "Wallet Ladger",
            path: PATH_DASHBOARD.transaction.walletladger,
          },
        ],
      },
      {
        title: "Schemes",
        path: PATH_DASHBOARD.scheme.root,
        icon: ICONS.user,
        children: [
          {
            title: "All Scheme",
            path: PATH_DASHBOARD.scheme.allscheme,
          },
          {
            title: "BBPS Scheme",
            path: PATH_DASHBOARD.scheme.bbpsscheme,
          },
        ],
      },
      {
        title: "Fund Management",
        path: PATH_DASHBOARD.fundmanagement.root,
        icon: ICONS.user,
        children: [
          {
            title: "My Fund Deposits",
            path: PATH_DASHBOARD.fundmanagement.myfunddeposits,
          },
          {
            title: "Bank Accounts",
            path: PATH_DASHBOARD.fundmanagement.mybankaccount,
          },
          {
            title: "Fund Requests",
            path: PATH_DASHBOARD.fundmanagement.myfundrequest,
          },
          {
            title: "Manage Fund Flow",
            path: PATH_DASHBOARD.fundmanagement.managefundflow,
          },
          {
            title: "My Network Fund Request",
            path: PATH_DASHBOARD.fundmanagement.mynetworkfunds,
          },
        ],
      },
      {
        title: "Setting",
        path: PATH_DASHBOARD.setting,
        icon: ICONS.ecommerce,
      },
      {
        title: "Help & Support",
        path: PATH_DASHBOARD.helpsupport,
        icon: ICONS.ecommerce,
      },
    ],
  },
];

export default distributorNavConfig;
