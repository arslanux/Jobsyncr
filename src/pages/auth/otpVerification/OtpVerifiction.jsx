import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { ResendOtpApi, VerifyOtpApi } from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const OtpVerifiction = () => {
  const email = localStorage.getItem("signup_email");
  const isMediumScreen = useMediaQuery("(min-width:600px)");
  const [otp, setOtp] = React.useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  const [remainingTime, setRemainingTime] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();

  const verifyHandler = async () => {
    try {
      const data = {
        verification_code: otp,
        verify_token: localStorage.getItem("verify_token"),
      };
      const res = await VerifyOtpApi(data);
      if (res?.data?.status === true) {
        notify("success", res?.data?.message);
        localStorage.removeItem("verify_token");
        localStorage.removeItem("signup_email");
        localStorage.setItem("login", JSON.stringify(res?.data?.data));
        navigate("/employee/onboard");
      } else {
        notify("error", res?.data?.message);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  const resendHandler = async () => {
    setResendDisabled(true);
    setRemainingTime(60);
    try {
      const response = await ResendOtpApi({ email: email });
      if (response?.data.status === true) {
        notify("success", response?.data?.message);
        localStorage.setItem(
          "verify_token",
          response?.data?.data?.verify_token
        );
      } else {
        notify("error", response?.data?.message);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    // Enable the "Resend OTP" button after 60 seconds

    const timer = setTimeout(() => {
      setResendDisabled(false);
    }, 60000); // 60 seconds in milliseconds

    // Update the timer every second
    const countdown = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          return 0; // Set remaining time to 0 if it goes below 0
        }
      });
    }, 1000);

    // Clean up the timers when the component unmounts
    return () => {
      clearInterval(countdown);
      clearTimeout(timer);
    };
  }, [resendDisabled]);

  useEffect(() => {
    if (searchParams.get("email")) {
      console.log("hit");
      resendHandler();
    }
  }, [searchParams]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Stack
        direction="column"
        gap={2}
        sx={{
          mb: 1,
        }}
      >
        <Typography component="h6" variant="h4" sx={{ fontWeight: 600 }}>
          OTP Verification
        </Typography>
        <Typography variant="body1">
          otp sent to <strong>{email}</strong>
        </Typography>
        <Box>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType="number"
            containerStyle={{ justifyContent: "center" }}
            inputStyle={{
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              background: "#ffffff",
              border: "1px solid #98a2b3",
              borderRadius: "8px",
              width: isMediumScreen ? "3rem" : "2.4rem",
              height: "3rem",
              fontSize: "1.5rem",
            }}
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
              <input
                {...props}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            )}
          />
        </Box>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"end"}>
          <Button
            disabled={remainingTime > 0}
            variant="text"
            color="primary"
            onClick={resendHandler}
          >
            Resend{" "}
            {remainingTime > 0 && (
              <Typography variant="body1" display={"flex"}>
                ( {remainingTime} {"sec"})
              </Typography>
            )}
          </Button>
        </Box>
        <Button
          variant="contained"
          sx={{color:'white',bgcolor:'primary.main' }}
          onClick={verifyHandler}
          disabled={otp?.length < 6}
        >
          Verify OTP
        </Button>
      </Stack>
    </Box>
  );
};

export default OtpVerifiction;
