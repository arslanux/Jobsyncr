import React, { useState, useEffect } from "react";
import JobDescriptionsBanner from "../../jobDescription/JobDescriptionBanner";
import { Grid, Typography, CircularProgress } from "@mui/material";
import JobSummary from "../../jobDescription/JobSummary";
import KeyResponsibilities from "../../jobDescription/KeyResponsibilities";
import { viewJobApi } from "../../config/ApiHandler";
import { useLocation, useNavigate } from "react-router-dom";

const GatewayJobDescription = () => {
  const [jobData, setJobData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get("id");
  const jobTitle = searchParams.get("title");

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await viewJobApi(jobId);
        if (response?.data?.status) {
          setJobData(response.data.data?.job);
          setLoading(false);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching job description:", error);
        navigate("/");
      }
    };

    if (jobId ) {
      getJob();
    } else {
      navigate("/");
    }
  }, [jobId, navigate]);

  if (loading) {
    return (
      <Grid
        container
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 300,
            fontSize: "28px",
            marginLeft: "16px",
          }}
        >
          Please Wait Loading...
        </Typography>
      </Grid>
    );
  }

  return (
    <>
      <Grid container sx={{ backgroundColor: "#FFF" }}>
        <JobDescriptionsBanner jobData={jobData} />
        <JobSummary jobData={jobData} />
        {/* <KeyResponsibilities jobData={jobData} /> */}
      </Grid>
    </>
  );
};

export default GatewayJobDescription;
