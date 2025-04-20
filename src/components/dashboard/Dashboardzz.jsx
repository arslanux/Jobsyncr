import { Box, Card, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./dash.css";
import icon1 from "../../assets/dashboard/icon1.svg";
import icon2 from "../../assets/dashboard/icon2.svg";
import icon3 from "../../assets/dashboard/icon3.svg";
import icon4 from "../../assets/dashboard/icon4.svg";
import icon5 from "../../assets/dashboard/icon5.svg";
import icon6 from "../../assets/dashboard/icon6.svg";
import search from "../../assets/dashboard/search.svg";
import mail from "../../assets/dashboard/mail.svg";
import calendar from "../../assets/dashboard/calendar.svg";
import avathar from "../../assets/dashboard/avathar.svg";
import right from "../../assets/dashboard/right.svg";
import second from "../../assets/dashboard/2.svg";
import three from "../../assets/dashboard/3.svg";
import four from "../../assets/dashboard/4.svg";
import Quick1 from "../../assets/dashboard/Quick1.svg";
import Quick2 from "../../assets/dashboard/Quick2.svg";
import Quick3 from "../../assets/dashboard/Quick3.svg";
import Quick4 from "../../assets/dashboard/Quick4.svg";
import Quick5 from "../../assets/dashboard/Quick5.svg";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '../../theme/overrides/Button';
import { Link } from 'react-router-dom';


const steps = [
    { label: "Personal Information", description: "Optional" },
    { label: "Educational background", description: "Optional" },
    { label: "Professional Information", description: "Optional" },
    { label: "Documents", description: "Optional" },
    { label: "Referral", description: "Optional" },
    { label: "Job Preference", description: "Optional" },
    { label: "Miscellaneous Information", description: "Optional" },
];

// const steps = [
//     {
//         label: 'Personal Information',
//         description: `Optional`,
//     },
//     {
//         label: 'Upload Resume',
//         description:
//             'Optional',
//     },
//     {
//         label: 'Educational Information',
//         description: `Optional`,
//     },
//     {
//         label: 'Work Experience',
//         description: `Optional`,
//     },
// ];
const companyList = [
    {
        id: 1,
        image: icon1,
        title: 'Zerozilla',
    },
    {
        id: 2,
        image: icon2,
        title: 'UST Global',
    },
    {
        id: 3,
        image: icon3,
        title: 'Microsoft',
    },
    {
        id: 4,
        image: icon4,
        title: 'IBM',
    },
    {
        id: 5,
        image: icon5,
        title: 'Accenture',
    },
    {
        id: 6,
        image: icon6,
        title: "More",
    },
]



const Dashboardzz = () => {

    const userData = JSON.parse(localStorage.getItem("login"));
    console.log(userData, "user");
    console.log(userData?.user_data?.current_step, "current");

    const [activeStep, setActiveStep] = useState(0);
    const [CurrentuserData, setCurrentuserData] = useState({});
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("login"));
      if (userData?.user_data !== undefined) {
        setCurrentuserData(userData?.user_data);
      }
      if (userData?.user_data?.current_step !== undefined) {
        setActiveStep(userData.user_data.current_step);
      }
    }, []);

    return (
      <Box sx={{ px: 4 }} className="dashboard_container">
        <Grid
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h4" sx={{ mb: 0 }} className="dashboard_title">
            Dashboard
          </Typography>
          <Box className="dashboard_maincard">
            <Grid
              container
              sx={{ mt: 0, px: 0 }}
              spacing={2}
              className="whole_card"
            >
              <Grid
                item
                xs={12}
                md={3}
                className="first_card"
                sx={{ height: "auto", mt: 5 }}
              >
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, px: 2 }}
                    className="profile_title"
                  >
                    Profile Summary
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 0, px: 2 }}
                    className="profile_subtitle"
                  >
                    In last 90days
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ mt: { xs: 2, sm: 3, md: 2, lg: 4 } }}
                className="second_card"
              >
                <Box
                  className=""
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: { xs: 2, sm: 2, md: 3 },
                    maxWidth: "100%",
                  }}
                >
                  {companyList.map((icon, index) => (
                    <Box key={index} sx={{ textAlign: "center" }}>
                      <img
                        src={icon.image}
                        alt={`icon-${index}`}
                        style={{
                          maxWidth: "100%",
                          width: "45px",
                          height: "auto",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          mt: { xs: 0.5, sm: 0 },
                          fontSize: { xs: "12px", sm: "14px", md: "14px" },
                        }}
                        className="profile_subtitle"
                      >
                        {icon.title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={3}
                className="third_card"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  px: 3,
                  mt: 5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    mt: 3,
                  }}
                >
                  <Box>
                    <img src={search} alt="" width="80%" />
                  </Box>
                  <Box>
                    <img src={mail} alt="" width="80%" />
                  </Box>
                  <Box>
                    <img src={calendar} alt="" width="80%" />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              sx={{ mt: 0, display: "flex", alignItems: "stretch", mb: 4 }}
              spacing={2}
              className="down_card"
            >
              <Grid
                item
                xs={12}
                md={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Card
                  sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, flex: 1 }}
                  className="profile_card"
                >
                  <img src={avathar} alt="" />
                  <Typography
                    variant="body1"
                    sx={{ mt: 0 }}
                    className="personal_title"
                  >
                    {CurrentuserData?.first_name} {CurrentuserData?.last_name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2 }}
                    className="personal_subtitle"
                  >
                    {CurrentuserData?.email}
                  </Typography>
                  <Link to="/dashboard/profilenew" className="profile_div">
                    <Box
                      className="profile_div"
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      Complete Profile
                      <Box>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M7.5 15L12.5 10L7.5 5"
                            stroke="#C31F5D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Box>
                    </Box>
                  </Link>
                  <hr />
                  <Box
                    sx={{
                      height: "250px",
                      overflowY: "scroll",
                      overflowX: "hidden",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": { display: "none" },
                      "-ms-overflow-style": "none",
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "#C31F5D !important",
                      },
                      "& .MuiStep-root:active": {
                        backgroundColor: "rgba(0, 150, 136, 0.3)",
                      },
                    }}
                  >
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={index}>
                          <StepLabel>{step.label}</StepLabel>
                          <StepContent>
                            <Typography>{step.description}</Typography>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Card
                  sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, flex: 1 }}
                  className="profile_card"
                >
                  <Typography
                    variant="body1"
                    sx={{ mt: 0 }}
                    className="personal_title"
                  >
                    Quick Actions
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2 }}
                    className="personal_subtitle"
                  >
                    Recent activity history
                  </Typography>
                  <hr />
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 0,
                    }}
                  >
                    <Box sx={{ mt: 0 }}>
                      <img src={Quick1} alt="" height="70%" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                        className="personal_info"
                      >
                        Personal Information
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 0,
                    }}
                  >
                    <Box sx={{ mt: 0 }}>
                      <img src={Quick2} alt="" height="70%" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                        className="personal_info"
                      >
                        Upload Resume
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 0,
                    }}
                  >
                    <Box sx={{ mt: 0 }}>
                      <img src={Quick3} alt="" height="70%" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                        className="personal_info"
                      >
                        Educational Information
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 0,
                    }}
                  >
                    <Box sx={{ mt: 0 }}>
                      <img src={Quick4} alt="" height="70%" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                        className="personal_info"
                      >
                        Work Experience
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 0,
                    }}
                  >
                    <Box sx={{ mt: 0 }}>
                      <img src={Quick5} alt="" height="70%" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                        className="personal_info"
                      >
                        Work Experience
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Card
                  sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, flex: 1 }}
                  className="profile_card"
                >
                  <Typography
                    variant="body1"
                    sx={{ mt: 0 }}
                    className="personal_title"
                  >
                    Activity
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2 }}
                    className="personal_subtitle"
                  >
                    Recent activity history
                  </Typography>
                  <hr />
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <img src={right} alt="" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_info"
                      >
                        Applied to “Job Name”{" "}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <img src={second} alt="" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_info"
                      >
                        Upload Resume
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <img src={three} alt="" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_info"
                      >
                        Educational Information
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <img src={four} alt="" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_info"
                      >
                        Work Experience
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="personal_option"
                      >
                        {" "}
                        Optional
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Card
                  sx={{ p: 2.5, borderRadius: 2, boxShadow: 0, flex: 1 }}
                  className="profile_card"
                >
                  <Typography
                    variant="body1"
                    sx={{ mt: 0 }}
                    className="personal_title"
                  >
                    Profile Performance
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2 }}
                    className="personal_subtitle"
                  >
                    In last 90days
                  </Typography>
                  <hr />
                  <Box className="" sx={{ mt: 2 }}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="performance"
                      >
                        Search Appearances
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="perfonamance_sub"
                      >
                        197
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="performance"
                      >
                        Recruiter Actions
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="perfonamance_sub"
                      >
                        90
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className=""
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="performance"
                      >
                        Recruiter Actions
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0 }}
                        className="perfonamance_sub"
                      >
                        20
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    );
}

export default Dashboardzz