import React from "react";
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
import { signup } from "../../../redux/auth/AuthAction";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import notify from "../../../utils/Toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi, microsoftLoginApi } from "../../../config/ApiHandler";
import { useMsal } from "@azure/msal-react";
import Footer from "../../../layout/footer";
import "../../../components/auth/login.css";

const Signup = () => {
  const navigate = useNavigate();
  const { instance, inProgress } = useMsal();
  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    first_name: yup
      .string("Enter your first name")
      .required("First name is required"),
    middle_name: yup.string("Enter your middle name"),
    last_name: yup
      .string("Enter your last name")
      .required("Last name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirmPassword: yup
      .string("Enter your password")
      .min(5, "Password should be of minimum 5 characters length")
      .required("Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const submitHandler = (event) => {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      password,
      confirmPassword,
    } = event;
    dispatch(
      signup({
        first_name,
        middle_name,
        last_name,
        email,
        password,
        confirmPassword,
      })
    )
      .then((response) => {
        // localStorage.setItem("login", JSON.stringify(response?.payload?.data));
        if (response.payload.status === true) {
          notify("success", response.payload.message);
          localStorage.setItem(
            "verify_token",
            response?.payload?.data?.verify_token
          );
          localStorage.setItem("signup_email", email);
          navigate("/auth/otp-verification");
        } else {
          notify("error", response?.payload?.message);
        }
      })
      .catch((e) => {
        notify(
          "error",
          e.response?.data?.message
            ? e.response?.data?.message
            : "Something went wrong !"
        );
      });
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await googleLoginApi({
        google_token: tokenResponse.access_token,
      }).then((res) => res.data);
      if (response.status) {
        notify("success", response.message);
        localStorage.setItem("login", JSON.stringify(response?.data));
        // localStorage.setItem("access_token", response.data.access_token);
        if (response?.data?.user_data?.is_profile_completed)
          navigate("/dashboard/home");
        else navigate("/employee/onboard");
        // localStorage.setItem("user_id", response?.data?.user_data?.id);
        // if (response.data.user_data.is_profile_completed) {
        //   navigate(redirectUrl ? `${redirectUrl}` : "/");
        // } else navigate("/myaccount");
      }
    },
    onReject: () => {
      notify("error", "Failed,Please try again !");
    },
    // flow: "auth-code",
  });

  const microsoftLoginHandler = async () => {
    try {
      const res = await instance.loginPopup({
        scopes: ["user.read"],
      });

      if (res?.accessToken) {
        const result = await microsoftLoginApi({
          microsoft_token: res?.accessToken,
        });
        if (result?.data?.status) {
          notify("success", result?.data?.message);
          localStorage.setItem("login", JSON.stringify(result?.data?.data));
          if (result?.data?.data?.user_data?.is_profile_completed)
            navigate("/dashboard/home");
          else navigate("/employee/onboard");
        }
      }
    } catch (e) {
      notify("error", "Failed,Please try again !");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center ",
          gap: 2,
        }}
      >

        <Typography variant="h4" className="login_title">
          Sign Up
        </Typography>
        {/* <Typography variant="h6">
            Careers in International Higher Education.
          </Typography> */}

        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>

              <Box sx={{ mt: 0, display: "flex", flexDirection: "column", gap: 0 }}>
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  <Grid item xs={12} md={12}>
                    <Box sx={{ mb: 2 }}>
                      <CustomTextField
                        margin="normal"
                        required
                        fullWidth={true}
                        textFieldProps={{
                          id: "first_name",
                          name: "first_name",
                          placeholder: "Enter first name",
                          type: "text",
                          onChange: handleChange,
                          onBlur: handleBlur,
                          value: values.first_name,
                        }}
                        label="First Name"
                        errorMessage={
                          errors.first_name &&
                          touched.first_name &&
                          errors.first_name
                        }
                        autoFocus
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <CustomTextField
                        margin="normal"
                        fullWidth={true}
                        textFieldProps={{
                          id: "middle_name",
                          name: "middle_name",
                          placeholder: "Middle name",
                          type: "text",
                          onChange: handleChange,
                          onBlur: handleBlur,
                          value: values.middle_name,
                        }}
                        label="Middle Name"
                        errorMessage={
                          errors.middle_name &&
                          touched.middle_name &&
                          errors.middle_name
                        }
                        autoFocus
                      />
                    </Box>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth={true}
                      textFieldProps={{
                        id: "last_name",
                        name: "last_name",
                        placeholder: "Enter last name",
                        type: "text",
                        onChange: handleChange,
                        onBlur: handleBlur,
                        value: values.last_name,
                      }}
                      autoFocus
                      label="Last Name"
                      errorMessage={
                        errors.last_name && touched.last_name && errors.last_name
                      }
                    />
                  </Grid>
                </Grid>
                <Grid spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={12}>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth={true}
                      textFieldProps={{
                        id: "email",
                        name: "email",
                        placeholder: "Enter your email",
                        type: "email",
                        onChange: handleChange,
                        onBlur: handleBlur,
                        value: values.email,
                      }}
                      autoFocus
                      label="Email"
                      errorMessage={errors.email && touched.email && errors.email}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 1, mt: 0 }}>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth={true}
                      textFieldProps={{
                        id: "password",
                        name: "password",
                        placeholder: "Enter password",
                        type: "password",
                        onChange: handleChange,
                        onBlur: handleBlur,
                        value: values.password,
                      }}
                      autoFocus
                      label="Password"
                      errorMessage={
                        errors.password && touched.password && errors.password
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth={true}
                      textFieldProps={{
                        id: "confirmPassword",
                        name: "confirmPassword",
                        placeholder: "Confirm password",
                        type: "password",
                        onChange: handleChange,
                        onBlur: handleBlur,
                        value: values.confirmPassword,
                      }}
                      label="Confirm Password"
                      errorMessage={
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword
                      }
                      autoFocus
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" fullWidth variant="contained" sx={{ height: "52px", my: 3 }} className="login_button">
                Sign up
              </Button>
              <Divider>
                <Typography variant="body1">or log in with</Typography>
              </Divider>
              <Stack
                direction="row"
                gap={2}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <IconButton variant="outlined" onClick={googleLoginHandler}>
                  <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="google"
                    style={{ width: "24px", height: "24px" }}
                  />
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="error"
                  onClick={microsoftLoginHandler}
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/microsoft.png"
                    alt="facebook"
                    style={{ width: "24px", height: "24px" }}
                  />
                </IconButton>
              </Stack>
              <Stack justifyContent={"center"} alignItems={"center"} mt={2}>
                <Typography variant="body1">
                  {`Already have an account? `}
                  <Link href="/auth/login" variant="body2">
                    Log in
                  </Link>
                </Typography>
              </Stack>

            </form>
          )}
        </Formik>
      </Box >
    </>
  );
};

export default Signup;
