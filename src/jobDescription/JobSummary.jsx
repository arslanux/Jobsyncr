import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import "./job.css";
import jobid from "../assets/JobId.svg";
import remote from "../assets/remote.svg";
import fulltime from "../assets/fulltime.svg";
import executive from "../assets/executive.svg";
import service from "../assets/service.svg";
import university from "../assets/university.svg";
import PropTypes from "prop-types";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ApplyJobModal from "../pages/dashboard/home/applyJob/ApplyJobModal";
import { applyForJobApi } from "../config/ApiHandler";
import notify from "../utils/Toast";
import { useState } from "react";
import { userData } from "../utils/localStorage";

const JobSummary = ({ jobData }) => {
  const token = userData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleOpen = (job) => {
    setJob(job);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleApplyJobSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await applyForJobApi(data);
      if (res?.data?.status === true) {
        notify("success", res?.data?.message);
        handleClose();
        // getFeaturedJobs();
        return true;
      } else {
        notify("error", res?.data?.message);
        return false;
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: "1370px", margin: "3rem auto" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          {jobData?.description && (
            <>
              <Typography variant="h4" className="summary_heading">
                Job Summary:
              </Typography>

              <Typography
                variant="body1"
                className="summary_text"
                sx={{ mt: 2 }}
                dangerouslySetInnerHTML={{
                  __html:
                    jobData?.description || "<p>No description available</p>",
                }}
              ></Typography>
            </>
          )}
          {jobData?.responsibilities && (
            <>
              <Typography
                variant="h4"
                className="summary_heading"
                sx={{ mt: 4 }}
              >
                Responsibilities:
              </Typography>
              <Typography
                variant="body1"
                className="summary_text"
                sx={{ mt: 2 }}
                dangerouslySetInnerHTML={{
                  __html:
                    jobData?.responsibilities ||
                    "<p>No responsibilities available</p>",
                }}
              ></Typography>
            </>
          )}
          {jobData?.qualifications && (
            <>
              <Typography
                variant="h4"
                className="summary_heading"
                sx={{ mt: 4, mb: 4 }}
              >
                Qualifications
              </Typography>

              <Typography
                variant="body1"
                className="summary_text"
                sx={{ mt: 2 }}
                dangerouslySetInnerHTML={{
                  __html:
                    jobData?.qualifications ||
                    "<p>No qualifications available</p>",
                }}
              ></Typography>
            </>
          )}
          {jobData?.application_procedure && (
            <>
              <Typography
                variant="h4"
                className="summary_heading"
                sx={{ mt: 4, mb: 4 }}
              >
                Application Procedure
              </Typography>

              <Typography
                variant="body1"
                className="summary_text"
                sx={{ mt: 2 }}
                dangerouslySetInnerHTML={{
                  __html:
                    jobData?.application_procedure ||
                    "<p>No application procedure available</p>",
                }}
              ></Typography>
            </>
          )}
          {jobData?.search_firm && (
            <>
              <Typography
                variant="h4"
                className="summary_heading"
                sx={{ mt: 4, mb: 4 }}
              >
                Search Firm
              </Typography>
              <Typography
                variant="body1"
                className="summary_text"
                sx={{ mt: 2 }}
                dangerouslySetInnerHTML={{
                  __html:
                    jobData?.search_firm || "<p>No search firm available</p>",
                }}
              ></Typography>
            </>
          )}
          {jobData?.job_description_url && (
            <Button
              className="apply_btn"
              sx={{ mt: 3 }}
              onClick={() =>
                window.open(jobData?.job_description_url, "_blank")
              }
            >
              Download Job Description
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Card className="right_card" sx={{ mx: 4 }}>
            <Box
              sx={{
                mt: 2,
                backgroundColor: "#FEF3F2",
                color: "#B42318",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "16px",
                padding: "5px 10px",
              }}
            >
              <span style={{ paddingRight: "10px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                >
                  <circle cx="4" cy="4.5" r="3" fill="#F04438" />
                </svg>
              </span>
              Due :{" "}
              {jobData?.expiry_date
                ? moment(jobData?.expiry_date)?.format("MMMM DD, YYYY")
                : "Open Until Filled"}
            </Box>

            {jobData?.min_salary && jobData?.max_salary && (
              <>
                <Typography
                  variant="h6"
                  className="range_number"
                  sx={{ mt: 2 }}
                >
                  ${jobData?.min_salary} - ${jobData?.max_salary}
                </Typography>

                <Typography
                  variant="body1"
                  className="salary_text"
                  sx={{ mt: 2 }}
                >
                  Salary Range
                </Typography>
              </>
            )}
            {jobData?.job_id && (
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                }}
              >
                <img src={jobid} alt="icon" />
                <Box>
                  <Typography
                    variant="body1"
                    className="textt_1"
                    sx={{ mx: 2 }}
                  >
                    {jobData?.job_id || "Not Available"}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="textt_2"
                    sx={{ mx: 2 }}
                  >
                    Job Id
                  </Typography>
                </Box>
              </Box>
            )}

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <img src={remote} alt="icon" />
              <Box>
                <Typography variant="body1" className="textt_1" sx={{ mx: 2 }}>
                  {jobData?.Job_Work_Modes?.filter((item) => item?.status)
                    ?.map((item) => item?.name)
                    .join(", ") || "Not Available"}
                </Typography>
                <Typography variant="body1" className="textt_2" sx={{ mx: 2 }}>
                  Work Mode
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <img src={fulltime} alt="icon" />
              <Box>
                <Typography variant="body1" className="textt_1" sx={{ mx: 2 }}>
                  {jobData?.Job_Employement_Types?.filter(
                    (item) => item?.status
                  )
                    ?.map((item) => item?.name)
                    .join(", ") || "Not Available"}
                </Typography>
                <Typography variant="body1" className="textt_2" sx={{ mx: 2 }}>
                  Employment Type
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <img src={executive} alt="icon" />
              <Box>
                <Typography variant="body1" className="textt_1" sx={{ mx: 2 }}>
                  {jobData?.Job_Experience_Levels?.filter(
                    (item) => item?.status
                  )
                    ?.map((item) => item?.name)
                    .join(", ") || "Not Available"}
                </Typography>
                <Typography variant="body1" className="textt_2" sx={{ mx: 2 }}>
                  Experience level
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <img src={service} alt="icon" />
              <Box>
                <Typography variant="body1" className="textt_1" sx={{ mx: 2 }}>
                  {jobData?.Job_Industry_Sectors?.filter((item) => item?.status)
                    ?.map((item) => item?.name)
                    .join(", ") || "Not Available"}
                </Typography>
                <Typography variant="body1" className="textt_2" sx={{ mx: 2 }}>
                  Industry Sector
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <img src={university} alt="icon" />
              <Box>
                <Typography variant="body1" className="textt_1" sx={{ mx: 2 }}>
                  {jobData?.Job_Employer_Types?.filter((item) => item?.status)
                    ?.map((item) => item?.name)
                    .join(", ") || "Not Available"}
                </Typography>
                <Typography variant="body1" className="textt_2" sx={{ mx: 2 }}>
                  Employer Type
                </Typography>
              </Box>
            </Box>
            <Button
              className="apply_btn"
              sx={{ mt: 3 }}
              // onClick={() => navigate("/auth/login")}
              onClick={() =>
                token != null || token != undefined
                  ? handleOpen({ jobId: jobData?.id, jobTitle: jobData?.title })
                  : navigate("/auth/login")
              }
            >
              Apply for this Job
            </Button>
            {jobData?.prospectus_website && (
              <Button
                className="apply_btn"
                sx={{ mt: 3 }}
                onClick={() =>
                  window.open(jobData?.prospectus_website, "_blank")
                }
              >
                Prospectus Website
              </Button>
            )}

            <Box sx={{ mt: 3, borderTop: "2px solid #EAECF0" }}>
              <Typography
                variant="body1"
                className="summary_text"
                sx={{ mt: 2, textAlign: "center" }}
              >
                Posted:{" "}
                {jobData?.createdAt
                  ? moment(jobData?.createdAt)?.format("MMMM DD, YYYY")
                  : "N/A"}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      {open && (
        <ApplyJobModal
          job={job}
          open={open}
          handleClose={handleClose}
          handleApplyJobSubmit={handleApplyJobSubmit}
          submitting={submitting}
        />
      )}
    </Container>
  );
};

export default JobSummary;

JobSummary.propTypes = {
  jobData: PropTypes.object,
};
