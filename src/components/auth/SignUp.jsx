import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./login.css";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";
import microsoft from "../../assets/microsoft.svg";
import appLogo from "../../assets/appLogo.svg";
import Slider from "react-slick";
import img1 from "../../assets/dashboard/bg.png";

const LoginNew = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 300,
        appendDots: (dots) => (
            <div
                style={{
                    position: "absolute",
                    bottom: "10px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "10px",
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: (i) => (
            <div
                style={{
                    width: "25px",
                    marginRight: "20px",
                    height: "2px",
                    background:
                        i === settings.currentSlide ? "white" : "rgba(255, 255, 255, 0.20)",
                }}
            ></div>
        ),
    };
    const slides = [
        {
            image: img1,
            heading: "Welcome to JobSyncr",
            paragraph:
                "A professional kit that comes with ready-to-use MUI components developed with one common goal in mind, help you build faster & beautiful applications.",
        },
        {
            image: img1,
            heading: "Welcome to JobSyncr",
            paragraph:
                "A professional kit that comes with ready-to-use MUI components developed with one common goal in mind, help you build faster & beautiful applications.",
        },
        {
            image: img1,
            heading: "Welcome to JobSyncr",
            paragraph:
                "A professional kit that comes with ready-to-use MUI components developed with one common goal in mind, help you build faster & beautiful applications.",
        },
    ];

    return (
        <Grid container sx={{ backgroundColor: "#080a0d", height: "100vh" }}>
            <Grid item xs={12} md={6} className="" sx={{ background: '#080a0d' }}>
                <Slider className="slider" {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="slider-item">
                            <img src={slide.image} alt={`slide-${index}`} />
                            <div className="slider-content">
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    className="login-heading"
                                >
                                    {slide.heading}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    className="login-para"
                                >
                                    {slide.paragraph}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </Slider>

            </Grid >

            <Grid item xs={12} md={6} sx={{ backgroundColor: "background.paper", p: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Box sx={{ maxWidth: 700, mx: "auto" }}>
                    <Typography variant="h4" className="login_title" sx={{ mb: 0 }}>
                        Sign Up
                    </Typography>
                    <Typography variant="body1" className="login_subtitle" sx={{ mt: 1, textAlign: "left" }}>
                        Let's build your career together. Create your account today!
                    </Typography>

                    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 0 }}>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    placeholder="First Name"
                                    type="text"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            display: "flex",
                                            padding: "16px 12px",
                                            alignItems: "center",
                                            borderRadius: "4px",
                                            background: "rgba(0, 0, 0, 0.06)",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: 0,
                                        },
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    placeholder="Last Name"
                                    type="password"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            display: "flex",
                                            padding: "16px 12px",
                                            alignItems: "center",
                                            borderRadius: "4px",
                                            background: "rgba(0, 0, 0, 0.06)",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: 0,
                                        },
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    placeholder="Email"
                                    type="email"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            display: "flex",
                                            padding: "16px 12px",
                                            alignItems: "center",
                                            borderRadius: "4px",
                                            background: "rgba(0, 0, 0, 0.06)",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: 0,
                                        },
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mb: 1, mt: 2 }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    placeholder="Password"
                                    type="password"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            display: "flex",
                                            padding: "16px 12px",
                                            alignItems: "center",
                                            borderRadius: "4px",
                                            background: "rgba(0, 0, 0, 0.06)",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: 0,
                                        },
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    placeholder="Confirm Password"
                                    type="password"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            display: "flex",
                                            padding: "16px 12px",
                                            alignItems: "center",
                                            borderRadius: "4px",
                                            background: "rgba(0, 0, 0, 0.06)",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: 0,
                                        },
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Button fullWidth variant="contained" sx={{ height: "52px", my: 3 }} className="login_button">
                        Create Account
                    </Button>
                    <Typography variant="body1" sx={{ color: "#6c737f", mt: 1, textAlign: "center" }} className="sign_in_with">
                        Sign in with
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                        <img src={google} alt="google" width="10%" height="50%" />
                        <img src={apple} alt="apple" width="10%" height="50%" />
                        <img src={microsoft} alt="microsoft" width="10%" height="50%" />
                    </Box>

                </Box>
            </Grid>
        </Grid >
    );
};

export default LoginNew