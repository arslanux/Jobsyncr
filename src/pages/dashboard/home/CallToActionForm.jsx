import {
  Button,
  Card,
  InputAdornment,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../../theme/ui/TextField";
import { AccountCircle } from "@mui/icons-material";
import notify from "../../../utils/Toast";
import { CallToActionApi } from "../../../config/ApiHandler";
import PropType from "prop-types";
import { useDispatch } from "react-redux";
import { ProfileView } from "../../../redux/onboarding/personalInformation/PersonalInfoAction";

const CallToActionForm = ({ actionFlag }) => {
  const dispatch = useDispatch();
  const handleSubscribe = async (e) => {
    e.preventDefault();
    const payload = actionFlag?.cta_subscribed;
    try {
      const res = await CallToActionApi({
        isJoining: !payload,
      });
      if (res?.data?.status) {
        notify("success", res?.data?.message);
      } else {
        notify("error", res?.data?.message);
      }
    } catch (err) {
      notify("error", "Something went wrong");
    } finally {
      dispatch(ProfileView());
    }
  };

  return (
    <Card
      sx={{
        height: "auto",
        width: "312px",
        padding: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubscribe}>
        <Stack gap={1} alignItems={"center"} p={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              p: 0,
            }}
          >
            Benefits from Gateway
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "left",
              width: "100%",
            }}
          >
            <ul>
              <li> Get the latest updates and job alerts</li>
              <li> Receive new jobs by email</li>
              <li>Post your resume/CV</li>
            </ul>
          </Typography>

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ color: "white", bgcolor: "primary.main" }}
          >
            {actionFlag?.cta_subscribed ? "Subscribed" : "Join Now"}
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default CallToActionForm;

CallToActionForm.propTypes = {
  actionFlag: PropType.object,
};
