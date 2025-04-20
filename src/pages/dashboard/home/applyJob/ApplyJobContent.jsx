import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  CircularProgress,
  Typography,
  Autocomplete,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import CustomTextField from "../../../../theme/ui/TextField";
import ResumeUploader from "./ResumeUploader";
import ResumePreview from "./ResumePreview";
import { getUserBio, getUserResume } from "../../../../config/ApiHandler";
import notify from "../../../../utils/Toast";

const ApplyJobContent = ({
  job,
  handleClose,
  handleApplyJobSubmit,
  submitting,
}) => {
  const [selectedResume, setSelectedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingBio, setLoadingBio] = useState(false);
  const [bioError, setBioError] = useState("");
  const [reusedResumeUrl, setReusedResumeUrl] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [uploadedCoverLetter, setUploadedCoverLetter] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const [resumeFetched, setResumeFetched] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isApplyDisabled, setIsApplyDisabled] = useState(true);
  const [selectedSources, setSelectedSources] = useState([]);
  const [meetsRequirements, setMeetsRequirements] = useState("yes");

  const fetchUserResume = async () => {
    try {
      setLoading(true);
      const response = await getUserResume();

      if (response?.data?.status === true) {
        const resume = response?.data?.data?.resume;
        setReusedResumeUrl(resume);
        setResumeFetched(true);
        notify("success", response?.data?.message);
      } else {
        notify("error", response?.data?.message);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBio = async () => {
    try {
      setLoadingBio(true);
      const response = await getUserBio();

      if (response?.data?.status === true) {
        const bio = response?.data?.data?.bio;
        setAboutMe(bio);
        if (!bio) {
          setBioError(
            "You haven't added any bio yet, Add your bio to apply for the job."
          );
        } else {
          setBioError("");
        }
      } else {
        notify("error", response?.data?.message);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    } finally {
      setLoadingBio(false);
    }
  };

  useEffect(() => {
    if (
      ((selectedResume === "oldResume" && reusedResumeUrl) ||
        (selectedResume === "newResume" && resumeUploaded)) &&
      aboutMe.trim() &&
      uploadedCoverLetter
    ) {
      setIsApplyDisabled(false);
    } else {
      setIsApplyDisabled(true);
    }
  }, [selectedResume, reusedResumeUrl, resumeUploaded, aboutMe, uploadedCoverLetter]);

  useEffect(() => {
    fetchUserBio();
  }, []);

  const handleCheckboxChange = async (event) => {
    const { name } = event.target;
    setSelectedResume(name);

    if (name === "oldResume" && !resumeFetched) {
      await fetchUserResume();
    }

    if (name === "newResume" && !resumeUploaded) {
      setUploadedResume(null);
    }
  };

  const handleResumeUpload = (file) => {
    setUploadedResume(file);
    setResumeUploaded(true);
  };

  const handleCoverLetterUpload = (file) => {
    setUploadedCoverLetter(file);
  };

  const handleReset = () => {
    setSelectedResume("");
    setAboutMe("");
    setReusedResumeUrl(null);
    setUploadedResume(null);
    setUploadedCoverLetter(null);
    setResumeFetched(false);
    setResumeUploaded(false);
    setIsApplyDisabled(true);
    setSelectedSources([]);
    setMeetsRequirements("");
  };

  const handleApply = async (e) => {
    e.preventDefault();

    const resumeUrl =
      selectedResume === "newResume" ? uploadedResume : reusedResumeUrl;

    const resumeData = {
      job_id: job?.jobId,
      resume_url: resumeUrl,
      cover_letter_url: uploadedCoverLetter,
      about_me: aboutMe,
      sources: selectedSources,
      meet_requirements: meetsRequirements === "yes",
    };

    const res = await handleApplyJobSubmit(resumeData);
    if (res) {
      handleReset();
    }
  };

  const jobSources = [
    "Zerozilla International Group Website/Newsletter",
    "NAFSA Job Board",
    "The Forum for Education Abroad",
    "Secuss-L",
    "Twitter",
    "AIEA Website",
    "LinkedIn",
    "ISSSers FB",
    "HigherEd Jobs",
    "Diversity Abroad jobs",
    "Diverse Jobs",
    "Inside Higher Ed",
    "The Chronicle of Higher Ed",
    "NAFSA Regional Newsletter",
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
          }}
          color="black"
        >
          Apply for {job?.jobTitle} job
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          Fetch/Upload your resume
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedResume === "oldResume"}
              onChange={handleCheckboxChange}
              name="oldResume"
            />
          }
          label="Fetch my Resume"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedResume === "newResume"}
              onChange={handleCheckboxChange}
              name="newResume"
            />
          }
          label="Upload New Resume"
        />
      </Grid>

      {loading && (
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ ml: 2 }}>
              Loading...
            </Typography>
          </Box>
        </Grid>
      )}

      {!loading && selectedResume === "oldResume" && reusedResumeUrl && (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <ResumePreview
            onClick={() => window.open(reusedResumeUrl, "_blank")}
            label="Fetched Resume"
          />
        </Grid>
      )}

      {!loading &&
        selectedResume === "newResume" &&
        resumeUploaded &&
        uploadedResume && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <ResumePreview
              onClick={() => window.open(uploadedResume, "_blank")}
              label="Uploaded Resume"
            />
            <Box textAlign="left" sx={{ marginLeft: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setResumeUploaded(false)}
                sx={{ mt: 1 }}
              >
                Upload Again
              </Button>
            </Box>
          </Grid>
        )}

      {!loading && selectedResume === "newResume" && !resumeUploaded && (
        <Grid item xs={12}>
          <ResumeUploader onFileUpload={handleResumeUpload} />
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          Upload Cover Letter (Mandatory)
        </Typography>
        {uploadedCoverLetter ? (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <ResumePreview
              onClick={() => window.open(uploadedCoverLetter, "_blank")}
              label="Uploaded Cover Letter"
            />
            <Box textAlign="left" sx={{ marginLeft: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setUploadedCoverLetter(null)}
                sx={{ mt: 1 }}
              >
                Upload Again
              </Button>
            </Box>
          </Grid>
        ) : (
          <ResumeUploader onFileUpload={handleCoverLetterUpload} />
        )}
      </Grid>

      <Grid item xs={12}>
        {!loadingBio ? (
          <CustomTextField
            label={"Professional Biography"}
            placeholder={
              "Enter about yourself that can be shared with the employer."
            }
            name="about_me"
            type="text"
            fullWidth
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            textFieldProps={{
              multiline: true,
              rows: 8,
            }}
            errorMessage={bioError}
          />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ ml: 2 }}>
                Fetching Your Bio...
              </Typography>
            </Box>
          </>
        )}
      </Grid>

      <Grid item xs={12}>
      <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          How did you hear about this job? (Mandatory)
        </Typography>
        <Autocomplete
          multiple
          options={jobSources}
          value={selectedSources}
          onChange={(event, newValue) => setSelectedSources(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Select or type sources"
            />
          )}
        />
      </Grid>

      

      <Grid item xs={12}>
        <FormControl>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          Do you meet all the minimum requirements for this job? (Mandatory)
        </Typography>
          <RadioGroup
            row
            value={meetsRequirements}
            onChange={(e) => setMeetsRequirements(e.target.value)}
          >
            <FormControlLabel  value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel  value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Stack gap={1}>
        <Stack direction={"row"} gap={1} mt={2} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ color: "white" }}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleApply}
            sx={{ color: "white" }}
            disabled={isApplyDisabled || submitting}
          >
            Apply
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ApplyJobContent;


