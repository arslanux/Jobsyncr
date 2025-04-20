import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginBanner from "../../assets/login_banner_3.png";
import Logo from "../../theme/ui/Logo";
import loginImg from "../../assets/loginImg.png";
import svg from "../../assets/scroller/SVG.svg"
import svg1 from "../../assets/scroller/SVG2.svg"
import svg2 from "../../assets/scroller/SVG3.svg"
import svg3 from "../../assets/scroller/SVG4.svg"
import svg4 from "../../assets/scroller/SVG1.svg"
const AuthLayout = () => {
  const logos = [svg, svg1, svg2, svg3, svg4, svg, svg1, svg2, svg3, svg4, svg];

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} md={6} className="left_login" sx={{ height: "auto", background: '#080a0d' }}>
        <Box className="left_login_content" sx={{ textAlign: "center", p: 7.5 }}>
          <Typography variant="h4" className="left_login_title" sx={{ mb: 2 }}>
            Welcome to JobSyncr
          </Typography>
          <Typography variant="body1" className="left_login_subtitle" sx={{ mb: 3 }}>
            A professional kit that comes with ready-to-use MUI components developed <br />
            with one common goal in mind, help you build faster & beautiful applications.
          </Typography>

          <img alt="Frame" src={loginImg} width="60%" height="50%" />
        </Box>
        <Box sx={{ background: "rgba(255, 255, 255, 0.05)", pt: 3, pb: 5, textAlign: "center" }} className="left_login_footer">
          <Typography variant="body1" sx={{ pb: 3 }}>
            Find 6,000+ forward-thinking companies
          </Typography>

          <Box
            sx={{
              display: "flex",
              overflow: "hidden",
              whiteSpace: "nowrap",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 4,
                animation: "scroll 15s linear infinite",
                "@keyframes scroll": {
                  "0%": { transform: "translateX(0%)" },
                  "100%": { transform: "translateX(-50%)" }, // Adjust speed/distance
                },
              }}
            >
              {logos.map((logo, index) => (
                <img key={index} src={logo} alt={`Company Logo ${index + 1}`} width={100} height={50} />
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={7} md={6} component={Paper} elevation={6} square>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", pt: 4, px: 0 }}
        >
          {/* <Logo /> */}
          <Box
            sx={{
              width: "100%",
              mb: "auto",
              mt: "auto",
              px: {
                xs: 7,
                sm: 7,
                md: 12,
                lg: 22,
              },
              py: 3,
            }}
          >
            <Outlet />
          </Box>
        </Stack>
      </Grid>

    </Grid>
  );
};

export default AuthLayout;
