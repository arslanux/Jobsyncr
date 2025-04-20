import React from "react";
import { Box, Button, Grid, TextField, Typography, Divider, Stack } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useMsal } from "@azure/msal-react";
import { googleLoginApi, microsoftLoginApi } from "../../../config/ApiHandler";
import "../../../components/auth/login.css";

const Login = () => {
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await googleLoginApi({ google_token: tokenResponse.access_token });
      // Handle login success
    },
    onReject: () => {
      // Handle login failure
    },
  });

  const microsoftLoginHandler = async () => {
    const { instance } = useMsal();
    try {
      const res = await instance.loginPopup({ scopes: ["user.read"] });
      const result = await microsoftLoginApi({ microsoft_token: res.accessToken });
      // Handle login success
    } catch (e) {
      // Handle login failure
    }
  };

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: 400, p: 4, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: "center", color: "#6c757d" }}>
            Please log in to your account
          </Typography>
          <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" variant="outlined" sx={{ mb: 2 }} />
          <Button fullWidth variant="contained" color="primary" sx={{ mb: 2 }}>
            Log In
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
            Forgot your password? <a href="/auth/forgot-password">Reset it here</a>
          </Typography>
          <Divider sx={{ my: 2 }}>Or log in with</Divider>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" onClick={googleLoginHandler}>
              Google
            </Button>
            <Button variant="outlined" onClick={microsoftLoginHandler}>
              Microsoft
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ backgroundImage: "url('/assets/login_banner_3.png')", backgroundSize: "cover" }} />
    </Grid>
  );
};

export default Login;
