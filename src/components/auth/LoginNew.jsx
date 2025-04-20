// import LockIcon from "@mui/icons-material/Lock";
// import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import loginImg from "../../assets/loginImg.png";
import "./login.css";
// import google from "../../assets/google.svg";
// import apple from "../../assets/apple.svg";
// import microsoft from "../../assets/microsoft.svg";
// import appLogo from "../../assets/appLogo.svg";
// import svg from "../../assets/scroller/SVG.svg"
// import svg1 from "../../assets/scroller/SVG2.svg"
// import svg2 from "../../assets/scroller/SVG3.svg"
// import svg3 from "../../assets/scroller/SVG4.svg"
// import svg4 from "../../assets/scroller/SVG1.svg"
// const logos = [svg, svg1, svg2, svg3, svg4, svg, svg1, svg2, svg3];

const LoginNew = () => {
    return (
        // <Grid container sx={{ backgroundColor: "#080a0d", height: "100vh" }}>
        //     <Grid item xs={12} md={6} className="left_login" sx={{ height: "100%", background: '#080a0d' }}>
        //         <Box className="left_login_content" sx={{ textAlign: "center", p: 7.5 }}>
        //             <Typography variant="h4" className="left_login_title" sx={{ mb: 2 }}>
        //                 Welcome to Zboard
        //             </Typography>
        //             <Typography variant="body1" className="left_login_subtitle" sx={{ mb: 3 }}>
        //                 A professional kit that comes with ready-to-use MUI components developed <br />
        //                 with one common goal in mind, help you build faster & beautiful applications.
        //             </Typography>

        //             <img alt="Frame" src={loginImg} width="60%" height="50%" />
        //         </Box>
        //         <Box sx={{ background: "rgba(255, 255, 255, 0.05)", pt: 3, pb: 5, textAlign: "center" }} className="left_login_footer">
        //             <Typography variant="body1" sx={{ pb: 3 }}>
        //                 Find 6,000+ forward-thinking companies
        //             </Typography>

        //             <Box
        //                 sx={{
        //                     display: "flex",
        //                     overflow: "hidden",
        //                     whiteSpace: "nowrap",
        //                     position: "relative",
        //                 }}
        //             >
        //                 <Box
        //                     sx={{
        //                         display: "flex",
        //                         gap: 4,
        //                         animation: "scroll 15s linear infinite",
        //                         "@keyframes scroll": {
        //                             "0%": { transform: "translateX(0%)" },
        //                             "100%": { transform: "translateX(-50%)" }, // Adjust speed/distance
        //                         },
        //                     }}
        //                 >
        //                     {logos.map((logo, index) => (
        //                         <img key={index} src={logo} alt={`Company Logo ${index + 1}`} width={100} height={50} />
        //                     ))}
        //                 </Box>
        //             </Box>
        //         </Box>
        //     </Grid>

        //     <Grid item xs={12} md={6} sx={{ backgroundColor: "background.paper", p: 7.5, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        //         <Box sx={{ maxWidth: 400, mx: "auto" }}>
        //             <Typography variant="h4" className="login_title" sx={{ mb: 0 }}>
        //                 Log in to your account
        //             </Typography>
        //             <Typography variant="body1" className="login_subtitle" sx={{ mt: 1, textAlign: "left" }}>
        //                 Don't have an account? <span style={{ color: "#C31F5D", fontWeight: "medium" }}>Register</span>
        //             </Typography>

        //             <Box sx={{ mt: 3 }}>
        //                 <TextField
        //                     fullWidth
        //                     variant="filled"
        //                     placeholder="Username"
        //                     type="text"
        //                     sx={{
        //                         mb: 2,
        //                         "& .MuiInputBase-root": {
        //                             display: "flex",
        //                             padding: "16px 12px",
        //                             alignItems: "center",
        //                             alignSelf: "stretch",
        //                             borderRadius: "4px 4px 4px 4px",
        //                             background: "rgba(0, 0, 0, 0.06)",
        //                         },
        //                         "& .MuiInputBase-input": {
        //                             padding: 0,
        //                         },
        //                     }}
        //                     InputProps={{
        //                         disableUnderline: true,
        //                         startAdornment: (
        //                             <PersonIcon sx={{ color: "action.active", mr: 1 }} />
        //                         ),
        //                     }}
        //                 />
        //                 <TextField
        //                     fullWidth
        //                     variant="filled"
        //                     placeholder="Password"
        //                     type="password"
        //                     sx={{
        //                         mb: 2,
        //                         "& .MuiInputBase-root": {
        //                             display: "flex",
        //                             padding: "16px 12px",
        //                             alignItems: "center",
        //                             alignSelf: "stretch",
        //                             borderRadius: "4px 4px 4px 4px",
        //                             background: "rgba(0, 0, 0, 0.06)",
        //                         },
        //                         "& .MuiInputBase-input": {
        //                             padding: 0, // Ensures no extra padding inside
        //                         },
        //                     }}
        //                     InputProps={{
        //                         disableUnderline: true,
        //                         startAdornment: (
        //                             <LockIcon sx={{ color: "action.active", mr: 1 }} />
        //                         ),
        //                     }}
        //                 />
        //             </Box>

        //             <Button fullWidth variant="contained" sx={{ height: "52px", mt: 1 }} className="login_button">
        //                 Login
        //             </Button>
        //             <Typography sx={{ height: "52px", mt: 2, textAlign: 'center' }} className="forgot_password_button">
        //                 Forgot password?
        //             </Typography>

        //             <Typography variant="body1" sx={{ color: "#6c737f", mt: 1, textAlign: "center" }} className="sign_in_with">
        //                 Sign in with
        //             </Typography>
        //             <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        //                 <img src={google} alt="google" width="10%" height="50%" />
        //                 <img src={apple} alt="apple" width="10%" height="50%" />
        //                 <img src={microsoft} alt="microsoft" width="10%" height="50%" />
        //             </Box>
        //             <Typography variant="body1" sx={{ mt: 5, textAlign: "center", }} className="powerdBy">
        //                 Powered By
        //             </Typography>
        //             <Box sx={{ gap: 2, mt: 1, display: "flex", justifyContent: "center" }}>
        //                 <img src={appLogo} alt="" className="zerozillaLogo" />
        //             </Box>
        //         </Box>
        //     </Grid>
        // </Grid>
        <div>
            <Typography variant="h4" className="left_login_title" sx={{ mb: 2 }}>
                Welcome to JobSyncr
            </Typography>
        </div>
    );
};

export default LoginNew