import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import welcom from "../assets/welcomeNew.png";
import logo from "../assets/logo.svg";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, Paper, useMediaQuery } from "@mui/material";
import line from "../assets/line.png";
import line2 from "../assets/line2.png";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/Alarmmm.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rs1 from "../assets/rightside1.png";
import rs2 from "../assets/rightside2.png";
import rs3 from "../assets/rightside3.png";
import rs4 from "../assets/rightside4.svg";
import careerBanner from "../assets/280.png";
import LeftBottonImg from "../assets/leftbottomimg.png";
import RightBottonImg from "../assets/rightbottomimg.png";
import { getShuffledJobsListApi } from "../config/ApiHandler";
import moment from "moment";
import { capitalizeString } from "../utils/utilsfunction";
import AOS from "aos"; // Import AOS library
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import notify from "../utils/Toast";

const testimonials = [
  {
    quote:
      'Baylor chose to work with Zerozilla because Zerozilla "has a Rolodex” of international educators as potential candidates for the position.',
    name: "Nancy Brickhouse",
    title: "Provost, Global Engagement Baylor University",
    company: "Baylor University",
  },
  {
    quote:
      "My experience with Zerozilla was extremely positive. The people at Zerozilla connected me with a position that supercharged my career progression and set me up for future success.",
    name: "Mr. Seth Parrish",
    title: "Director of Study Abroad",
    company: "University of Florida",
  },
  {
    quote:
      "I can't recommend working with Zerozilla highly enough. They have deep connections throughout the world of International Education and Academia, in general. They are thought partners consummate professionals, and they put in the work to ensure that you find the best possible candidate for your position. I look forward to working with them again.",
    name: "Mitch Gordon",
    title: "Chief Executive Officer",
    company: "Verto Education",
  },
];

// Define your theme
const theme = createTheme();

const Welcome = () => {
  const isMediumScreen = useMediaQuery("(max-width:480px)");
  const [isShuffledJobsLoading, setShuffledJobsLoading] = useState(false);
  const [shuffledJobsList, setShuffledJobsList] = useState([

  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dotsClass: "w-custom-dots",
    // appendDots: (dots) => (
    //   <div style={{ paddingBottom: "0px" }}>
    //     <ul style={{ marginBottom: "34px", marginRight: "40px" }}> {dots} </ul>{" "}
    //     Apply margin here
    //   </div>
    // ),
  };

  const Arrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          padding: "10px",
          borderRadius: "50%",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  };

  const settingss = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    dotsClass: "custom-dots",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: true,
        },
      },
    ],
  };

  const navigate = useNavigate();

  // line width as per text function
  const textRef = useRef({});
  const [textWidth, setTextWidth] = useState({});
  const headings = ["heading1", "heading2", "heading3", "heading4", "heading5"];

  const getShuffledJobsList = async () => {
    setShuffledJobsLoading(true);
    try {
      const res = await getShuffledJobsListApi();
      if (res.data?.status) {
        setShuffledJobsList(res.data?.data?.shuffledJobs);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message || "Something went wrong");
    }
    setShuffledJobsLoading(false);
  };

  useEffect(() => {
    const updateTextWidth = () => {
      headings.map((key) => {
        if (textRef.current[key]) {
          setTextWidth((prevState) => ({
            ...prevState,
            [key]: textRef.current[key].clientWidth,
          }));
        }
      });
    };
    // Set the initial width
    updateTextWidth();
    // Add event listener to update on window resize
    window.addEventListener("resize", updateTextWidth);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateTextWidth);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      offset: 200,
    });
    getShuffledJobsList();
  }, []);

  console.log(textWidth, "textWidth");

  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "#ffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 0, sm: 0 },
            px: 5,
            mx: 3,
          }}
        >
          {/* Logo on the left */}
          <Link
            to="#"
            target="_blank"
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%", maxWidth: { xs: "100px", md: "200px" } }}
            />
          </Link>

          {/* Buttons on the right */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              gap: "10px",
              width: { xs: "100%", sm: "auto" },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "12px", md: "14px" },
                color: "#FFF",
                backgroundColor: "#4c1b88",
                "&:hover": { backgroundColor: "##4C1A88" },
                width: { xs: "100%", sm: "auto" },
              }}
              onClick={() => {
                navigate("/auth/signup");
              }}
            >
              {capitalizeString("SIGN UP")}
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "12px", md: "14px" },
                color: "#FFF",
                backgroundColor: "#c31f5d",
                "&:hover": { backgroundColor: "#e57500" },
                width: { xs: "100%", sm: "auto" },
              }}
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              {capitalizeString("LOGIN")}
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid container className="welcome_bg">
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              py: { xs: "1rem", md: 7 },
              px: { xs: "1rem", md: 8 },
            }}
          >
            <div className="mt-5 pt-3">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: "25px", md: "48px", lg: "48px" },
                  color: "#344054",
                  lineHeight: "120%",
                }}
              >
                WELCOME TO ZEROZILLA
                <br />
                EXECUTIVE SEARCH
              </Typography>

              <Typography
                component="h5"
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#4c1b88",
                  fontSize: { xs: "25px", md: "48px", lg: "48px" },
                  marginTop: "-13px",
                }}
              >
                JOB REGISTRY
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  mb: 2,
                  color: "#000",
                  fontSize: { xs: "15px", sm: "18px", md: "18px" },
                }}
              >
                Create a free profile to be matched with open international
                education positions.
              </Typography>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: { xs: "90%", md: "30%" },
                  backgroundColor: "#4c1b88",
                  color: "#ffffff",
                  mt: 2,
                  mx: { xs: "auto", md: "0" },
                  display: "block",
                  "&:hover": { backgroundColor: "#4C1A88" },
                }}
                className="welcome_button"
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                Create Free Profile
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              mt: { xs: "1rem", md: 7 },
              mb: { xs: "1rem", md: 8 },
              px: { xs: "2rem", md: 8 },
            }}
          >
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "3rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={rs1} alt="Contact" />
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ display: "flex" }}
        className="static_bg"
      >
        <Grid item xs={12} md={12}>
          <Box sx={{ px: { xs: 3, md: 9 } }}>
            <Typography
              ref={(el) => (textRef.current.heading3 = el)}
              variant="h5"
              sx={{
                fontSize: { xs: "1.3rem", md: "32px", lg: "32px" },
                display: "inline-block",
                mb: 1,
                fontWeight: 700,
                color: "#FFF",
                lineHeight: "120%",
                textTransform: "uppercase",
              }}
            >
              Why Zerozilla's Job Registry?
            </Typography>
            <br />
            <Box
              component="img"
              src={line}
              alt=""
              sx={{
                width: textWidth.heading3 ? `${textWidth.heading3}px` : "100%", // Dynamically set the image width based on the text width
                maxWidth: "100%", // Ensure it doesn't exceed container size
                height: "auto", // Maintain aspect ratio
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ px: { xs: 3, md: 9 } }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 400, mb: 2 }}
              fontSize={"16px"}
              color={"#FFF"}
              lineHeight={"22px"}
            >
              At Zerozilla Executive Search, we connect talented international
              education professionals with prestigious institutions and
              organizations worldwide. Our platform is designed to match your
              skills and preferences with the right opportunities, ensuring a
              perfect fit for your next career move.
            </Typography>
          </Box>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ display: "flex" }}
          className="section"
        >
          <Grid item xs={12} sm={6} md={6} data-aos="fade-right">
            <Box sx={{ px: { xs: 3, md: 6 } }}>
              <Card sx={{ minWidth: 275 }} className="card1">
                <CardContent>
                  <div className="logo_section_card">
                    <img src={card1} alt="" />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mt: 2, mx: 2 }}
                      fontSize={"20px"}
                      color={"#344054"}
                      lineHeight={"22px"}
                    >
                      Tailored Matches
                    </Typography>
                  </div>
                  <hr />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 400 }}
                    fontSize={"16px"}
                    color={"#667085"}
                    lineHeight={"22px"}
                  >
                    Our sophisticated matching algorithm connects you with job
                    opportunities that align with your job preferences and
                    unique professional aspiration.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} data-aos="fade-down">
            <Box sx={{ px: { xs: 3, md: 6 } }}>
              <Card sx={{ minWidth: 275 }} className="card1">
                <CardContent>
                  <div className="logo_section_card">
                    <img src={card2} alt="" />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mt: 2, mx: 2 }}
                      fontSize={"20px"}
                      color={"#344054"}
                      lineHeight={"22px"}
                    >
                      Expert Support
                    </Typography>
                  </div>
                  <hr />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 400 }}
                    fontSize={"16px"}
                    color={"#667085"}
                    lineHeight={"22px"}
                  >
                    Our team of experienced associates is dedicated to helping
                    you navigate the job market and find the right fit. We'll
                    contact you directly with specific job opportunities.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} data-aos="fade-left">
            <Box sx={{ px: { xs: 3, md: 6 } }}>
              <Card sx={{ minWidth: 275 }} className="card1">
                <CardContent>
                  <div className="logo_section_card">
                    <img src={card3} alt="" />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mt: 2, mx: 2 }}
                      fontSize={"20px"}
                      color={"#344054"}
                      lineHeight={"22px"}
                    >
                      Global Reach
                    </Typography>
                  </div>
                  <hr />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 400 }}
                    fontSize={"16px"}
                    color={"#667085"}
                    lineHeight={"22px"}
                  >
                    We partner with top-tier international institutions and
                    organizations, offering a wide range of opportunities in
                    higher education.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} data-aos="fade-up">
            <Box sx={{ px: { xs: 3, md: 6 } }}>
              <Card sx={{ minWidth: 275 }} className="card1">
                <CardContent>
                  <div className="logo_section_card">
                    <img src={card4} alt="" />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mt: 2, mx: 2 }}
                      fontSize={"20px"}
                      color={"#344054"}
                      lineHeight={"22px"}
                    >
                      Reminders
                    </Typography>
                  </div>
                  <hr />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 400 }}
                    fontSize={"16px"}
                    color={"#667085"}
                    lineHeight={"22px"}
                  >
                    Receive weekly email alerts featuring job announcements
                    tailored to your preferences, helping you stay updated on
                    opportunities that match your skills and experience.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: { xs: -5, lg: -5 } }} className="responsive_bg">
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            py: 5,
          }}
        >
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              py: { xs: "1rem", md: 7 },
              px: { xs: "1rem", md: 8 },
            }}
            data-aos="fade-left"
          >
            <div className="mt-3 pt-3">
              <Typography
                ref={(el) => (textRef.current.heading4 = el)}
                variant="h5"
                sx={{
                  fontSize: { xs: "1.3rem", md: "32px", lg: "32px" },
                  display: "inline-block",
                  mb: 0,
                  fontWeight: 700,
                  color: "#344054",
                  lineHeight: "100%",
                  textTransform: "uppercase",
                }}
              >
                Join our community
              </Typography>
              <br />
              <Box
                component="img"
                src={line}
                alt=""
                height="3px"
                sx={{
                  width: textWidth.heading4
                    ? `${textWidth.heading4}px`
                    : "100%",
                  maxWidth: "100%",
                  // height: "100%",
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 400, mb: 2 }}
                fontSize={"16px"}
                color={"#000"}
                lineHeight={"22px"}
              >
                Whether you're actively seeking new roles or simply exploring
                the job market, Zerozilla Executive Search is your go-to resource.
                Our community of international higher education professionals is
                growing, and we invite you to be a part of it.
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, mb: 2 }}
                fontSize={"18px"}
                color={"#667085"}
                lineHeight={"22px"}
              >
                Your next career move awaits!
              </Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: { xs: "90%", md: "40%" }, // Full width on mobile, 40% on larger screens
                  backgroundColor: "#4c1b88",
                  color: "#ffffff",
                  mt: 2,
                  mx: { xs: "auto", md: "0" }, // Center the button horizontally on mobile
                  display: "block", // Ensure it is treated as a block element on mobile
                }}
                className="welcome_button"
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                Create a Profile
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              mt: { xs: "1rem", md: 7 },
              mb: { xs: "1rem", md: 8 },
              px: { xs: "1rem", md: 8 },
            }}
            data-aos="fade-right"
          >
            <div
              style={{
                marginTop: "2.5rem",
                marginBottom: "0rem",
                display: "flex",
                justifyContent: "center",
                padding: "0 1rem", // Default padding for mobile devices
                margin: "0 auto", // Center the container on larger screens
              }}
            >
              <img
                src={rs3}
                alt="image"
                style={{
                  width: "100%", // Takes up full container width
                  maxWidth: "100%", // Prevents overflow
                  height: "auto", // Keeps aspect ratio intact
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="success2">
        <Grid item xs={12} md={6}>
          <Box sx={{ px: { xs: 3, md: 10 } }}>
            <Box sx={{ px: 0 }}>
              <Typography
                ref={(el) => (textRef.current.heading2 = el)}
                variant="h5"
                sx={{
                  mb: 0,
                  px: 0,
                  fontWeight: 700,
                  fontSize: { xs: "1.3rem", md: "32px", lg: "2.25rem" },
                  color: "#fff",
                  lineHeight: "120%",
                  textTransform: "uppercase",
                  display: "inline-block",
                }}
              >
                Featured Job Openings
              </Typography>

              <Box
                component="img"
                src={line}
                alt=""
                height="3px"
                sx={{
                  px: 0,
                  width: textWidth.heading2
                    ? `${textWidth.heading2}px`
                    : "100%",
                  maxWidth: "100%",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ px: { xs: 3, md: 10 } }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 400, mb: 2, px: 0 }}
              fontSize={"16px"}
              color={"#fff"}
              lineHeight={"22px"}
            >
              Explore some of the top international education positions
              currently available. These featured roles highlight some of the
              most exciting opportunities waiting for you.
            </Typography>
          </Box>
        </Grid>

        {/* <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
          className="section_card"
        >
          <Box sx={{ maxWidth: "90%", overflow: "hidden" }}>
            {!isShuffledJobsLoading && shuffledJobsList?.length > 0 && (
              <Slider {...settingss}>
                {shuffledJobsList?.length > 0 ? (
                  shuffledJobsList?.map((job, index) => (
                    <div key={index}>
                      <Box sx={{ px: { xs: 0, md: 2 }, width: "100%" }}>
                        <Card
                          sx={{
                            minWidth: "100%",
                            // cursor: "pointer",
                            // height: "326px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "1px",
                          }}
                        // className="job_card"
                        >
                          <CardContent>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "16px",
                                position: "relative",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 600 }}
                                fontSize={"18px"}
                                color={"#101828"}
                                lineHeight={"22px"}
                                width={"65%"}
                                height={"55px"}
                              >
                                {job?.Employer_Name?.name}
                              </Typography>
                              {job?.Employer_Name?.icon && (
                                <img
                                  src={job?.Employer_Name?.icon}
                                  alt={job.title}
                                  style={{
                                    height: "80px",
                                    width: "100px",
                                    objectFit: "contain",
                                    position: "absolute",
                                    right: 0,
                                  }}
                                />
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "16px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                              >
                                <path
                                  d="M12.25 6.22852C12.25 10.3118 7 13.8118 7 13.8118C7 13.8118 1.75 10.3118 1.75 6.22852C1.75 4.83613 2.30312 3.50077 3.28769 2.51621C4.27226 1.53164 5.60761 0.978516 7 0.978516C8.39239 0.978516 9.72774 1.53164 10.7123 2.51621C11.6969 3.50077 12.25 4.83613 12.25 6.22852Z"
                                  stroke="#98A2B3"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 7.97852C7.9665 7.97852 8.75 7.19501 8.75 6.22852C8.75 5.26202 7.9665 4.47852 7 4.47852C6.0335 4.47852 5.25 5.26202 5.25 6.22852C5.25 7.19501 6.0335 7.97852 7 7.97852Z"
                                  stroke="#98A2B3"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 400 }}
                                fontSize={"14px"}
                                color={"#667085"}
                              >
                                {job?.Job_Locations[0]?.country?.name}
                              </Typography>
                            </div>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500, marginBottom: "20px" }}
                              fontSize={"16px"}
                              color={"#344054"}
                              height={"63px"}
                            >
                              {job?.title}
                            </Typography>
                            <div
                              className="time"
                              style={{
                                marginBottom: "16px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  fontWeight: 500,
                                  fontSize: "13px",
                                  color: "#344054",
                                  backgroundColor: "#F2F4F7",
                                  borderRadius: "16px",
                                  padding: "4px 6px",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="9"
                                  viewBox="0 0 8 9"
                                  fill="none"
                                  style={{ marginRight: "8px" }}
                                >
                                  <circle
                                    cx="4"
                                    cy="4.39502"
                                    r="3"
                                    fill="#667085"
                                  />
                                </svg>
                                Due: {job?.expiry_date}
                              </Typography>
                            </div>
                            <hr style={{ width: "100%" }} />
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{
                                width: "auto",
                                backgroundColor: "#4c1b88",
                                color: "#fff",
                                mt: 2,
                                boxShadow:
                                  "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                padding: "0.625rem 1rem",
                                // "&:hover": {
                                //   backgroundColor: "#ffffff",
                                //   color: "#4c1b88",
                                // },
                              }}
                              onClick={() => {
                                navigate("/auth/login");
                              }}
                            >
                              Apply Now
                            </Button>
                          </CardContent>
                        </Card>
                      </Box>
                    </div>
                  ))
                ) : (
                  <Paper
                    sx={{
                      p: 5,
                      ml: 2,
                      mt: 2,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" style={{ color: "red" }}>
                      No featured jobs found
                    </Typography>
                  </Paper>
                )}
              </Slider>
            )}
            {(isShuffledJobsLoading || shuffledJobsList?.length === 0) && (
              <Paper
                sx={{
                  p: 5,
                  ml: 2,
                  mt: 2,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" style={{ color: "blue" }}>
                  FETCHING JOBS...
                </Typography>
              </Paper>
            )}
          </Box>
          <Box
            sx={{
              px: { xs: 3, md: 10 },
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
              mb: "10px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "auto",
                backgroundColor: "#ffffff",
                color: "#4c1b88",
                mt: 2,
                mb: 4,
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                padding: "0.625rem 1rem",
                "&:hover": { backgroundColor: "#4c1b88", color: "#ffffff" },
              }}
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Browse All Jobs
            </Button>
          </Box>
        </Grid> */}
      </Grid>

      <Grid item xs={12} md={12} sx={{ background: "#FFF" }}>
        <Box sx={{ px: { xs: 3, md: 12 } }}>
          <Box sx={{ textAlign: "center", background: "#FFF" }}>
            <Typography
              ref={(el) => (textRef.current.heading5 = el)}
              variant="h5"
              sx={{
                mb: 1, // Adds margin below the text
                fontWeight: 700,
                fontSize: { xs: "1.3rem", md: "32px", lg: "2.25rem" },
                color: "#344054",
                lineHeight: "120%",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              SUCCESS STORIES
            </Typography>

            <Box
              component="img"
              src={line}
              alt=""
              height="3px"
              sx={{
                display: "block", // Ensures the image appears on its own line
                margin: "0 auto", // Centers the image horizontally
                width: textWidth.heading5 ? `${textWidth.heading5}px` : "100%",
                maxWidth: "100%",
                // height: "auto",
              }}
            />
          </Box>
        </Box>
      </Grid>

      <Slider
        {...settings}
        responsive={[
          {
            breakpoint: 768, // Mobile screens (tablet and smaller)
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
        ]}
      >
        {testimonials.map((testimonial, index) => (
          <Grid
            key={index}
            container
            spacing={1}
            sx={{ display: "flex", justifyContent: "center" }}
            className="success_sub"
          >
            <Grid item xs={12} md={12}>
              <Box sx={{ px: { xs: 2, md: 10 }, py: { xs: 2, md: 5 } }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 400, mb: 2, mt: 3 }}
                  fontSize={{ xs: "16px", md: "20px" }} // Responsive font size
                  color={"#475467"}
                  lineHeight={{ xs: "20px", md: "22px" }} // Adjust line height for mobile
                  textAlign={"center"}
                >
                  {`"${testimonial.quote}"`}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, mb: 2, mt: 4 }}
                  fontSize={{ xs: "16px", md: "20px" }} // Responsive font size
                  color={"#344054"}
                  lineHeight={{ xs: "20px", md: "22px" }} // Adjust line height for mobile
                  textAlign={"center"}
                >
                  {testimonial.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                  fontSize={{ xs: "12px", md: "14px" }} // Responsive font size
                  color={"#475467"}
                  lineHeight={{ xs: "18px", md: "14px" }} // Adjust line height for mobile
                  textAlign={"center"}
                >
                  {testimonial.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "#4c1b88" }}
                  fontSize={{ xs: "12px", md: "14px" }} // Responsive font size
                  color={"#4c1b88"}
                  lineHeight={{ xs: "18px", md: "22px" }} // Adjust line height for mobile
                  textAlign={"center"}
                >
                  {testimonial.company}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Slider>

      <Grid container style={{ backgroundColor: "#F1F5F9" }}>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              py: { xs: "1rem", md: 7 },
              px: { xs: "1rem", md: 8 },
            }}

          >
            <div className="mt-5 pt-3">
              <Typography
                ref={(el) => (textRef.current.heading1 = el)} // Reference to capture the text width
                variant="h5"
                sx={{
                  mt: 3,
                  mb: 1,
                  fontWeight: 700,
                  fontSize: { xs: "1.3rem", md: "32px", lg: "2.1rem" },
                  color: "#344054",
                  lineHeight: "120%",
                  textTransform: "uppercase",
                  display: "inline-block",
                }}
              >
                Discover Your Next
                <br />
                International Education Job
              </Typography>

              <Box
                component="img"
                src={line}
                alt=""
                sx={{
                  width: textWidth.heading1
                    ? `${textWidth.heading1}px`
                    : "100%", // Dynamically set the image width based on the text width
                  maxWidth: "100%", // Ensure it doesn't exceed container size
                  height: "100%", // Maintain aspect ratio
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 400, mb: 2 }}
                fontSize={"16px"}
                color={"#000"}
                lineHeight={"22px"}
              >
                At Zerozilla Executive Search, we connect talented international
                education professionals with prestigious institutions and
                organizations worldwide. Our platform is designed to match your
                skills and preferences with the right opportunities, ensuring a
                perfect fit for your next career move.
              </Typography>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: { xs: "90%", md: "40%" }, // Full width on mobile, 40% on larger screens
                  backgroundColor: "#4c1b88",
                  color: "#ffffff",
                  mt: 2,
                  mx: { xs: "auto", md: "0" }, // Center the button horizontally on mobile
                  display: "block", // Ensure it is treated as a block element on mobile
                  "&:hover": { backgroundColor: "##4C1A88" },
                }}
                className="welcome_button"
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                Create Free Profile
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              mt: { xs: "1rem", md: 7 },
              mb: { xs: "1rem", md: 8 },
              px: { xs: "1rem", md: 8 },
            }}

          >
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "3rem",
                display: "flex",
                justifyContent: "center",
                padding: "0 1rem", // Default padding for mobile devices
                margin: "0 auto", // Center the container on larger screens
              }}
            >
              <img
                src={rs2}
                alt="image"
                style={{
                  width: "100%", // Takes up full container width
                  maxWidth: "100%", // Prevents overflow
                  height: "100%", // Keeps aspect ratio intact
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          mt: { xs: -5, lg: -5 },
          backgroundColor: "#FFF",
          py: 5,
        }}
      >

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            py: { xs: "1rem", md: 7 },
            px: { xs: "1rem", md: 4 },
          }}
        >
          <div>
            <Link
              to="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={RightBottonImg}
                alt="Get in Touch"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Link>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            py: { xs: "1rem", md: 7 },
            px: { xs: "1rem", md: 4 },
          }}
        >
          <div>
            <Link
              target="_blank"
              to="https://zerozilla.com/contact-us/"
              rel="noopener noreferrer"
            >
              <img
                src={LeftBottonImg}
                alt="Career Coaching Services"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Link>
          </div>
        </Grid>
      </Grid>

      {/* <Grid
        container
        sx={{ mt: { xs: -5, lg: -5, backgroundColor: "#F1F5F9" } }}
      >
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 5,
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              py: { xs: "1rem", md: 7 },
              px: { xs: "1rem", md: 8 },
            }}
          >
            <div className="mt-3 pt-3">
              <Link to="#" target="_blank">
                <img src={careerBanner} alt="Career" style={{ width: '100%', height: '100%' }} />
              </Link>
            </div>
          </Grid>
        </Grid>
      </Grid> */}

      {/* <Grid container sx={{ py: 5, backgroundColor: "#fff" }}>
        <Grid container className="last_bg">
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              py: { xs: "1rem", md: 16 },
              px: { xs: "1rem", md: 10 },
              mx: { xs: "2rem", md: 0 },
            }}
          >
            <div>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontSize: { xs: "1.3rem", md: "32px", lg: "2.25rem" },
                  color: "#FFF",
                  lineHeight: "120%",
                  textTransform: "uppercase",
                }}
              >
                Get in Touch
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontWeight: 400, mb: 2 }}
                fontSize={"16px"}
                color={"#FFF"}
                lineHeight={"22px"}
              >
                Have questions or need assistance? Our team is here to support
                you every step of the way.
              </Typography>
              <a
                href="https://zerozilla.com/contact-us/"
                rel="noreferrer"
                target="_blank"
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ display: "inline-flex", alignItems: "center" }}
                  className="email_button"
                >
                  Ask Me
                </Button>
              </a>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sm={6}
            sx={{
              display: { xs: "none", md: "block" }, // Hide on mobile (xs), show on larger screens (md)
            }}
          >
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "flex-end",
                padding: "1rem 0rem",
                alignItems: "center",
              }}
            >
              <img
                src={rs4}
                alt="image"
                style={{
                  height: "320px",
                  display: { xs: "none", md: "block" }, // Hide on mobile, show on larger screens
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default Welcome;
