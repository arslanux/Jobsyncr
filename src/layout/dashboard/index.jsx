import React from "react";
import Appbar from "../../theme/ui/Appbar";
import { styled } from "@mui/material/styles";

import { Outlet, useLocation } from "react-router-dom";
import Carousel from "../../theme/ui/Carousel";
import StepsIndicator from "../../theme/ui/StepsIndicator";
import Footer from "../../layout/footer";

// const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 80;

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  // overflow: "hidden",
  minHeight: "100%",
  //   [theme.breakpoints.up('lg')]: {
  //     marginTop: APP_BAR_DESKTOP,
  // paddingLeft: theme.spacing(2),
  // paddingRight: theme.spacing(2),
  //   },
  paddingTop: APP_BAR_DESKTOP,
  paddingBottom: theme.spacing(20),
  [theme.breakpoints.up("md")]: {
    paddingTop: APP_BAR_DESKTOP,
    // paddingLeft: theme.spacing(15),
    // paddingRight: theme.spacing(15),
    paddingBottom: '8px'
  },

  [theme.breakpoints.down("md")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: '8px'

  },
}));

const DashboardLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <Appbar />
      {/* {pathname !== "/dashboard/profile" &&
        pathname !== "/dashboard/account" && (
          <Carousel
            style={{
              marginTop: "60px",
            }}
          />
        )} */}
      <MainStyle>
        <Outlet />
      </MainStyle>
      <Footer />
    </>
  );
};

export default DashboardLayout;
