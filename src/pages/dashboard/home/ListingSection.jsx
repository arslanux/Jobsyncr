import {
  Divider,
  Grid,
  Pagination,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import JobCard from "./JobCard";
import notify from "../../../utils/Toast";
import {
  applyForJobApi,
  getAllExecutiveJobListApi,
} from "../../../config/ApiHandler";
import { generateQueryString } from "../../../utils/utilsfunction";
import JobBoard from "../GateWayJobBoard";
import { useSelector } from "react-redux";
import ApplyJobModal from "./applyJob/ApplyJobModal";

const ListingSection = () => {
  const [featuredJobs, setFeaturedJobs] = React.useState([]);
  const [featuredJobsLoading, setFeaturedJobsLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const jobSeekerName = useSelector(
    (state) => state?.onboard?.onboardViewData?.data?.personalInformation
  );

  const getFeaturedJobs = async (query) => {
    setFeaturedJobsLoading(true);
    try {
      const res = await getAllExecutiveJobListApi(query);
      if (res.data?.status) {
        setFeaturedJobs(res.data?.data?.shortlistedJobs);
        setTotalCount(res.data?.data?.pagination?.totalPages);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message || "Something went wrong");
    }
    setFeaturedJobsLoading(false);
  };

  const onPageChangeHandler = (event, value) => {
    console.log(value);
    setPage(value);
    const query = generateQueryString({
      page: value,
      // page_size: limit,
    });
    getFeaturedJobs(query);
  };

  useEffect(() => {
    getFeaturedJobs();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [job, setJob] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);

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
        getFeaturedJobs();
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
    <>
      <Grid
        gap={2}
        width={"100%"}
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: "#4C1A88",
            color: "white",
            padding: 2,
            borderRadius: 1,
            mt: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "white",
              paddingBottom: 1,
              fontSize: { xs: "18px", md: "24px", lg: "30px" },
            }}
          >
            {jobSeekerName?.first_name !== null ||
            jobSeekerName?.first_name !== undefined
              ? `Hello ${jobSeekerName?.first_name},`
              : "Hello Job Seeker,"}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: "18px", md: "18px", lg: "22px" },
            }}
          >
            Welcome to the Zerozilla Job Registry
          </Typography>
          <Typography variant="body1" color="white">
            Welcome to your personalized job board, a free and comprehensive
            repository for job seekers within the field of international higher
            education. Whether you’re actively seeking new opportunities or just
            exploring the job market, your personalized dashboard caters to your
            specific job preferences. Browse through the latest vacancies across
            various professional levels, from emerging career professionals to
            seasoned senior international officers. By maintaining a
            comprehensive profile, Zerozilla Executive Search associates will be
            able to reach out with specific opportunities that align with your
            qualifications and preferences. <br /> <br /> Best of luck on your
            career journey!
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: 1.5,
            padding: 2,
            marginY: 2,
          }}
        >
          <Typography variant="h4" color={"black"}>
            Featured Jobs
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }} color="black">
            The following jobs are highly recommended based on your job
            preferences
          </Typography>

          <Divider sx={{ width: "80%" }} />

          {featuredJobsLoading ? (
            <Skeleton height={600} />
          ) : (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {featuredJobs && featuredJobs.length > 0 ? (
                  featuredJobs.map((job) => (
                    <Grid item key={job?.id} md={6}>
                      <JobCard
                        job={job}
                        handleOpen={() =>
                          handleOpen({ jobId: job?.id, jobTitle: job?.title })
                        }
                      />
                    </Grid>
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
                      No featured jobs found for your profile
                    </Typography>
                  </Paper>
                )}
                {featuredJobs && featuredJobs.length ? (
                  <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                    <Pagination
                      page={page}
                      onChange={onPageChangeHandler}
                      count={totalCount}
                      variant="outlined"
                      shape="circular"
                      size="medium"
                      defaultPage={1}
                      siblingCount={0}
                    />
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          )}
        </Grid>

        <JobBoard />
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
    </>
  );
};

export default ListingSection;
