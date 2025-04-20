import {
  Button,
  Divider,
  Grid,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { MdSync } from "react-icons/md";

import JobBoardFilter from "./JobBoardCard/JobBoardFilter";
import notify from "../../../utils/Toast";
import JobBoardCard from "./JobBoardCard/JobBoardCard";
import { generateQueryString } from "../../../utils/utilsfunction";
import { getAllJobBoardListApi } from "../../../config/ApiHandler";

//css
import styles from "./index.module.css";

const JobBoard = () => {
  const [featuredJobs, setFeaturedJobs] = React.useState([]);
  const [featuredJobsLoading, setFeaturedJobsLoading] = React.useState(false);
  const [allJobs, setAllJobs] = React.useState([]);
  const [allJobsLoading, setAllJobsLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [experties, setExperties] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [employmentType, setEmploymentType] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const [totalCount, setTotalCount] = React.useState(0);

  const getFeaturedJobs = async (query) => {
    setFeaturedJobsLoading(true);
    setAllJobsLoading(true);
    try {
      const res = await getAllJobBoardListApi(query);
      if (res.data?.status) {
        setFeaturedJobs(res.data?.data?.featured_jobs);
        setAllJobs(res.data?.data?.additionalJobs);
        setTotalCount(res.data?.data?.pagination?.totalPages);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message || "Something went wrong");
    }
    setFeaturedJobsLoading(false);
    setAllJobsLoading(false);
  };

  const onPageChangeHandler = (event, value) => {
    setPage(value);
    const query = generateQueryString({
      search: searchText,
      page: value,
      page_size: limit,
      expertise: experties,
      location: location,
      employementType: employmentType,
    });
    getFeaturedJobs(query);
  };

  useEffect(() => {
    const query = generateQueryString({
      search: searchText,
      expertise: experties,
      location: location,
      employementType: employmentType,
      page_size: limit,
    });
    setPage(1);
    getFeaturedJobs(query);
  }, [searchText, experties, location, employmentType]);

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Typography
          variant="h5"
          // fontWeight={500}
          // className={styles.typo_title}
          sx={{ fontSize: { xs: "26px" } }}
          mt={1}
        >
          Additional Jobs
        </Typography>
        <Typography variant="body1" mb={2} color="black">
          Based on your job preferences, the following jobs may also be of
          interest. Please see the Zerozilla Jobs Board for other job
          opportunities.
        </Typography>
        <Divider />
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <Stack gap={2} direction={"row"} justifyContent={"end"}>
          <Stack direction="column">
            <Typography variant="body2">Last synced on:</Typography>
            <Typography variant="body2">Dec 28, 2023</Typography>
          </Stack>
          <Button
            variant="outlined"
            color="info"
            sx={{
              color: "#344054",
            }}
          >
            <MdSync size={20} />
            Sync
          </Button>
        </Stack>
      </Grid> */}
      {/* <Grid item xs={12} mt={6} sx={{ mt: 3 }}>
        <JobBoardFilter
          searchText={searchText}
          setSearchText={setSearchText}
          experties={experties}
          setExperties={setExperties}
          location={location}
          setLocation={setLocation}
          employmentType={employmentType}
          setEmploymentType={setEmploymentType}
        />
      </Grid> */}
      {/* {featuredJobsLoading ? (
        <Grid item xs={4} mt={3}>
          {" "}
          <Skeleton height={800} sx={{ mx: 2 }} />
        </Grid>
      ) : featuredJobs?.length > 0 ? (
        <>
          <Grid item xs={12} mt={3}>
            <Grid container spacing={2}>
              {featuredJobs && featuredJobs.length > 0 ? (
                featuredJobs.map((job, index) => (
                  <Grid item md={4} xs={12} key={index}>
                    <JobBoardCard job={job} />
                  </Grid>
                ))
              ) : (
                <Paper sx={{ p: 5, ml: 2, width: "100%", textAlign: "center" }}>
                  <Typography variant="h6" style={{ color: "red" }}>
                    No featured job matches found
                  </Typography>
                </Paper>
              )}
            </Grid>
          </Grid>
        </>
      ) : null} */}
      {allJobsLoading ? (
        <Grid item xs={4} mt={1}>
          {" "}
          <Skeleton height={800} />
        </Grid>
      ) : allJobs?.length > 0 ? (
        <>
          <Grid item xs={12} mt={0} mb={2}>
            {/* <Typography variant="h6" color={"#101828"} fontWeight={500}>
              Additional Jobs
            </Typography> */}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {allJobs.map((job, index) => (
                <Grid item md={6} xs={12} key={index}>
                  <JobBoardCard job={job} />
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                mt={3}
                display={"flex"}
                justifyContent={"center"}
              >
                <Pagination
                  page={page}
                  onChange={onPageChangeHandler}
                  count={totalCount}
                  variant="outlined"
                  shape="circular"
                  // showFirstButton
                  // showLastButton
                  size="medium"
                  defaultPage={1}
                  siblingCount={0}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <Paper sx={{ p: 5,mt:2,mb:2, width: "100%", textAlign: "center" }}>
          <Typography variant="h6" style={{ color: "red" }}>
            No Additional jobs found for your profile
          </Typography>
        </Paper>
      )}
    </Grid>
  );
};

export default JobBoard;
