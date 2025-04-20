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
import { ResetPasswordApi } from "../../../config/ApiHandler";
import { useFormik } from "formik";
import * as Yup from "yup";
import notify from "../../../utils/Toast";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  // const [reset, setReset] = useState({ password: '', confirm_password: '' });
  // console.log("resetState",setReset);

  // const handleresetChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(`Setting ${name} to ${value}`);
  //   setReset((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
        "Password must contain at least one number, one special character, and one uppercase letter"
      ),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const resetToken = localStorage.getItem("reset_token");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await ResetPasswordApi({
          password: values.password,
          confirm_password: values.confirm_password,
          reset_token: resetToken,
        });
        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          navigate("/auth/login");
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
  //   const resetPasswordData = {
  //     reset_token: resetToken,
  //     password: reset.password,
  //     confirm_password: reset.confirm_password,
  //   }

  //   try {
  //     const res = await ResetPasswordApi(resetPasswordData);
  //      if(res?.data?.status === true){
  //       notify("success", res?.data?.message);
  //      }else{
  //       notify("error", res?.data?.message);
  //      }

  //   }catch(error){

  //     notify("error", error?.response?.data?.message);
  //   }

  // };
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
          Reset Password
        </Typography>
        <Typography variant="h6">Now you can reset your password.</Typography>
      </Stack>
      <Stack
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 1, width: "100%" }}
        gap={2}
      >
        <CustomTextField
          margin="normal"
          required
          fullWidth={true}
          id="new_password"
          label="New Password"
          subLabel={`Must be at least 8 characters.`}
          type={"password"}
          name="password"
          value={formik?.values?.password}
          placeholder={`Create a new password`}
          autoFocus
          onChange={formik?.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <Typography color="error">{formik.errors.password}</Typography>
        ) : null}

        <CustomTextField
          margin="normal"
          required
          fullWidth={true}
          type={"password"}
          id="confirm_password"
          label="Confirm Password"
          name="confirm_password"
          value={formik?.values?.confirm_password}
          placeholder={`Confirm new password`}
          onChange={formik.handleChange}
          autoFocus
        />
        {formik.touched.confirm_password && formik.errors.confirm_password ? (
          <Typography color="error">
            {formik.errors.confirm_password}
          </Typography>
        ) : null}

        <Button type="submit" fullWidth variant="contained" sx={{color:'white',bgcolor:'primary.main' }}>
          Reset Password
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPassword;
