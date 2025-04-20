import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../redux/auth/AuthAction";
import { ForgotPasswordApi } from "../../../config/ApiHandler";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import notify from "../../../utils/Toast";
import "../../../components/auth/login.css";

const ForgotPassword = () => {
  // const [forgotState, setForgotState] = useState({ email: '' });
  const navigate = useNavigate();

  // const handleEmailChange = (e) => {
  //   const { value } = e.target;
  //   console.log('Email value:', value);
  //   setForgotState((prevState) => ({
  //     ...prevState,
  //     email: value,
  //   }));
  // };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      // You can use values.email to access the email field value
      try {
        const res = await ForgotPasswordApi({ email: values.email });
        if (res?.data?.status === true) {
          localStorage.setItem("reset_email", values.email);
          localStorage.setItem("reset_token", res?.data?.data?.reset_token);
          notify("success", res?.data?.message);
          navigate("/auth/email-verification");
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        notify("error", error?.response?.data?.message);
      }
    },
  });

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
        <Typography component="h1" variant="h4" sx={{ fontWeight: 500, color: '#111927' }}>
          Forgot Password?
        </Typography>
        <Typography variant="h6">
          Don't worry, it happens! Enter your email to reset your password
          and get back in.
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
          id="email"
          label="Email ID"
          value={formik.values.email}
          name="email"
          autoComplete="email"
          placeholder={`Enter your email`}
          autoFocus
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <Typography color="error">{formik.errors.email}</Typography>
        ) : null}

        <Button type="submit" fullWidth variant="contained" sx={{ height: "52px", my: 3 }} className="login_button">
          Continue
        </Button>

        <Stack justifyContent={"center"} alignItems={"center"} mt={2}>
          <Typography variant="body1">
            {`Go back to `}
            <Link href="/auth/login" variant="body2">
              Log in
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ForgotPassword;
