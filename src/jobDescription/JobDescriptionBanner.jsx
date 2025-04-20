import { Box, Container, Grid, Typography } from "@mui/material";
import "./job.css";
import jobanner from "../assets/JobBanner.png";
import PropTypes from "prop-types";
import noLogo from "../assets/nocompanylogo.png";
import { useMediaQuery } from "@mui/material";

const JobDescriptionsBanner = ({ jobData }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <img src={jobanner} alt="Job Banner" className="jobanner_img" />
          {jobData?.job_image && (
            <Box
              component="img"
              src={jobData.job_image || noLogo}
              alt="Employer Logo"
              sx={{
                position: "absolute",
                top: isMobile ? "1%" : "10%",
                left: "5%",
                width: isMobile ? "60px" : "200px",
                height: isMobile ? "60px" : "200px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                padding: "4px",
                boxShadow: "0px 0px 10.4px 0px #83838340",
                border: "12px solid #FFFFFF",
                objectFit: "contain",
              }}
            />
          )}
        </Grid>
      </Grid>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1350px", margin: "1rem auto" }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" className="jobanner_heading">
            {jobData?.title || "N/A"}
          </Typography>
          <Typography variant="body1" className="jobanner_text" sx={{ mt: 2 }}>
            <Box sx={{ mt: 1 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                  stroke="#98A2B3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="#98A2B3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            {jobData?.Employer_Name?.name || "N/A"} -{" "}
            {jobData?.Job_Locations?.map((item) => item?.name).join(", ") ||
              "N/A"}
          </Typography>
        </Grid>
      </Container>
    </>
  );
};

export default JobDescriptionsBanner;

JobDescriptionsBanner.propTypes = {
  jobData: PropTypes.object,
};
