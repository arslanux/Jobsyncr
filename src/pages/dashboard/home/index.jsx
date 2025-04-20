import React, { useEffect } from "react";
import BannerSection from "./BannerSection";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import ListingSection from "./ListingSection";
import { useDispatch, useSelector } from "react-redux";
import CompleteProfile from "../accountSettings/CompleteProfile";
import { ProfileView } from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import { useNavigate } from "react-router-dom";
import SubscribeForm from "./SubscribeForm";
import JobBoard from "../GateWayJobBoard";
import CallToActionForm from "./CallToActionForm";
import ApplyJobModal from "./applyJob/ApplyJobModal";

const Home = () => {
  const isMediumScreen = useMediaQuery("(max-width:480px)");
  const onboardUserList = useSelector(
    (state) => state?.onboard?.onboardViewData?.data
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(ProfileView());
  }, []);

  return (
    <>
      {!onboardUserList?.personalInformation ? (
        <></>
      ) : onboardUserList?.personalInformation?.profile_completion_percentage >
        85 ? (
        <Grid container spacing={3} wrap="nowrap">
          <Grid
            item
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <BannerSection />
            {/* <br />
            <SubscribeForm /> */}
            <br />
            <CallToActionForm
              actionFlag={onboardUserList?.personalInformation}
            />
          </Grid>
          <Grid item md={12} style={{ paddingLeft: isMediumScreen ? 0 : 24 }}>
            {!onboardUserList?.personalInformation?.deactivated && (
              <>
                <ListingSection />
                <Box
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <br />

                  <BannerSection />
                  {/* <br />
                  <SubscribeForm /> */}
                 <br />
                  <CallToActionForm
                    actionFlag={onboardUserList?.personalInformation}
                  />
                </Box>
              </>
            )}
            {onboardUserList?.personalInformation?.deactivated && (
              <Typography variant="h5">
                Your account is in deactivated mode. Go to{" "}
                <Typography
                  variant="h5"
                  color={"primary"}
                  component={"span"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/dashboard/account");
                  }}
                >
                  {" "}
                  account settings
                </Typography>{" "}
                to enable it
              </Typography>
            )}
          </Grid>
        </Grid>
      ) : (
        <CompleteProfile data={onboardUserList?.personalInformation} />
      )}
      <br />
    </>
  );
};

export default Home;
