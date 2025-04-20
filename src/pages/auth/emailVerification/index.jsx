import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "../../../theme/overrides/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import CustomTextField from "../../../theme/ui/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import {
  ForgotPasswordApi,
  VerifyResetPasswordApi,
} from "../../../config/ApiHandler";
import { useFormik } from "formik";
import * as Yup from "yup";
import notify from "../../../utils/Toast";
const EmailVerification = () => {
  // const [verifyOtp, setVerifyOtp] = useState({ verification_code: '' });
  const navigate = useNavigate();
  const email = localStorage.getItem("reset_email");
  const [remainingTime, setRemainingTime] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  // const handleVerifyOtpChange = (e) => {
  //   const { value } = e.target;

  //   setVerifyOtp((prevState) => ({
  //     ...prevState,
  //     verification_code: value,
  //   }));
  // };

  const validationSchema = Yup.object({
    verification_code: Yup.string()
      .required("Verification code is required")
      .matches(/^\d{6}$/, "Verification code must be a 6-digit number"),
  });

  const resetToken = localStorage.getItem("reset_token");

  const formik = useFormik({
    initialValues: {
      verification_code: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await VerifyResetPasswordApi({
          verification_code: values.verification_code,
          reset_token: resetToken,
        });

        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          navigate("/auth/reset-password");
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        notify("error", error?.response?.data?.message);
      }
    },
  });

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const verifyOtpData = {
  //     reset_token: resetToken,
  //     verification_code:verifyOtp.verification_code
  //   }

  //   console.log("verifyOtpData===>",verifyOtpData);

  //   try {
  //     const res = await VerifyResetPasswordApi(verifyOtpData);

  //     //console.log("response=====>",res.data.message);
  //      if(res?.data?.status === true){
  //       notify("success", res?.data?.message);
  //       navigate('/auth/reset-password')
  //      }else{
  //       notify("error", res?.data?.message);
  //      }

  //   }catch(error){

  //     notify("error", error?.response?.data?.message);
  //   }

  // };

  const reSendOtp = async () => {
    setResendDisabled(true);
    setRemainingTime(60);
    try {
      const res = await ForgotPasswordApi({ email: email });
      if (res?.data?.status === true) {
        // localStorage.setItem("reset_email", values.email);
        localStorage.setItem("reset_token", res?.data?.data?.reset_token);
        notify("success", res?.data?.message);
      } else {
        notify("error", res?.data?.message);
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
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Email Verification
        </Typography>
        <Typography variant="h6">
          We've sent an verification mail to <strong>{email} </strong>to verify
          your email address and reset your password.
        </Typography>
      </Stack>
      <Stack
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        // onSubmit={}
        sx={{ mt: 1, width: "100%" }}
        gap={2}
      >
        <CustomTextField
          margin="normal"
          required
          fullWidth={true}
          id="Verification Code"
          label="Verification Code"
          name="verification_code"
          value={formik.values.verification_code}
          placeholder={`Enter 6 digit verification code`}
          autoFocus
          onChange={formik.handleChange}
        />
        {formik.touched.verification_code && formik.errors.verification_code ? (
          <Typography color="error">
            {formik.errors.verification_code}
          </Typography>
        ) : null}

        <Button type="submit" fullWidth variant="contained" sx={{color:'white',bgcolor:'primary.main' }}>
          Verify my account
        </Button>

        <Stack justifyContent={"center"} alignItems={"center"} mt={2}>
          <Typography variant="body1">
            {`Didn’t receive any code! `}
          </Typography>
          <Button
              type="text"
              disabled={remainingTime > 0}
              onClick={reSendOtp}
            >
              Resend{" "}
              {remainingTime > 0 && (
                <Typography variant="body1" display={"flex"}>
                  ( {remainingTime} {"sec"})
                </Typography>
              )}
            </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmailVerification;
