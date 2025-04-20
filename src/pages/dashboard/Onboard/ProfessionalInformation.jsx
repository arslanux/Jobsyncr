import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Chip,
  MenuItem,
  TextField,
  FormControl,
  Grid,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete } from "@mui/material";
import { MdDelete, MdAdd, MdSave } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  ProfileView,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import {
  EmployeNameApi,
  ExperienceApi,
  JobTitleApi,
  ProfessionalInfoApi,
  ProfileProfessionalInfoApi,
  SkillApi,
  SkillProficiencyApi,
} from "../../../config/ApiHandler";
import dayjs from "dayjs";
import notify from "../../../utils/Toast";
import CustomTextField from "../../../theme/ui/TextField";
import PropTypes from 'prop-types';

const steps = ['Employment Background', 'Skills & Expertise'];

const EmploymentInfo = ({
  profestionalFormData,
  setProfestionalFormData,
  jobtitleList,
  employerList,
  errors,
}) => {
  const addItemHandler = () => {
    setProfestionalFormData({
      ...profestionalFormData,
      employementBackgrounds: [
        ...(profestionalFormData?.employementBackgrounds || []),
        {
          job_title_id: "",
          employer_name: "",
          start_date: null,
          end_date: null,
          designation: "",
          major_accomplishment: "",
          roles_responsibility: "",
          international_experience: 0,
          currently_working: false,
        },
      ],
    });
  };

  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = {
      ...profestionalFormData,
      employementBackgrounds: profestionalFormData?.employementBackgrounds.map(
        (item, idx) => {
          if (idx === index)
            return {
              ...item,
              [fieldName]:
                type === "date"
                  ? event
                  : type === "custom_select"
                    ? event
                    : type === "checkbox"
                      ? event.target.checked
                      : event.target.value,
            };
          else return item;
        }
      ),
    };
    setProfestionalFormData(updatedFormData);
  };

  const deleteItemHandler = (index) => {
    const updatedFormData = profestionalFormData?.employementBackgrounds?.filter(
      (_, idx) => idx !== index
    );
    setProfestionalFormData({
      ...profestionalFormData,
      employementBackgrounds: updatedFormData,
    });
  };

  return (
    <Stack spacing={3}>
      {profestionalFormData?.employementBackgrounds?.map((item, index) => (
        <Card key={index} elevation={2} sx={{ p: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <CustomTextField
                    label="Job Level"
                    name="job_title_id"
                    value={item?.job_title_id}
                    onChange={(e) => handleFieldChange(e, "job_title_id", index)}
                    textFieldProps={{
                      select: true,
                      size: "small",
                      InputLabelProps: { shrink: false },
                    }}
                    required
                    errorMessage={errors[index]?.job_title_id}
                  >
                    {jobtitleList?.map((data) => (
                      <MenuItem value={data?.id} key={data?.id}>
                        {data?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Employer Name"
                  name="employer_name"
                  value={item?.employer_name}
                  onChange={(e) => handleFieldChange(e, "employer_name", index)}
                  required
                  errorMessage={errors[index]?.employer_name}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label="Job Title"
                  name="designation"
                  value={item?.designation}
                  onChange={(e) => handleFieldChange(e, "designation", index)}
                  required
                  errorMessage={errors[index]?.designation}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="currently_working"
                      disabled={item?.end_date}
                      checked={item?.currently_working}
                      onChange={(e) =>
                        handleFieldChange(e, "currently_working", index, "checkbox")
                      }
                    />
                  }
                  label="Currently Working"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap="6px">
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Start Date
                  </Typography>
                  <DatePicker
                    name="start_date"
                    disableFuture
                    slotProps={{
                      textField: { size: "small" },
                      field: {
                        clearable: true,
                        onClear: () => handleFieldChange("", "start_date", index, "date"),
                      },
                    }}
                    value={item?.start_date}
                    onChange={(e) => handleFieldChange(e?.$d, "start_date", index, "date")}
                  />
                  {errors[index]?.start_date && (
                    <Typography variant="body2" color="error">
                      {errors[index]?.start_date}
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap="6px">
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    End Date
                  </Typography>
                  <DatePicker
                    name="end_date"
                    minDate={dayjs(item?.start_date)}
                    disableFuture
                    slotProps={{
                      textField: { size: "small" },
                      field: {
                        clearable: true,
                        onClear: () => handleFieldChange("", "end_date", index, "date"),
                      },
                    }}
                    value={item?.end_date}
                    disabled={item?.currently_working}
                    onChange={(e) => handleFieldChange(e?.$d, "end_date", index, "date")}
                  />
                  {errors[index]?.end_date && (
                    <Typography variant="body2" color="error">
                      {errors[index]?.end_date}
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label="Major Accomplishments"
                  placeholder="Enter major accomplishments that can be shared with potential employers."
                  name="major_accomplishment"
                  value={item?.major_accomplishment}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      handleFieldChange(e, "major_accomplishment", index);
                    }
                  }}
                  subLabel={`${1000 - (item?.major_accomplishment?.length || 0)} chars left`}
                  textFieldProps={{
                    multiline: true,
                    rows: 4,
                  }}
                  errorMessage={errors[index]?.major_accomplishment}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label="Roles and Responsibilities"
                  placeholder="Enter roles and responsibilities that can be shared with potential employers."
                  name="roles_responsibility"
                  value={item?.roles_responsibility}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      handleFieldChange(e, "roles_responsibility", index);
                    }
                  }}
                  subLabel={`${300 - (item?.roles_responsibility?.length || 0)} chars left`}
                  textFieldProps={{
                    multiline: true,
                    rows: 4,
                  }}
                  errorMessage={errors[index]?.roles_responsibility}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            {profestionalFormData?.employementBackgrounds?.length > 1 && (
              <Tooltip title="Delete Experience">
                <IconButton
                  color="error"
                  onClick={() => deleteItemHandler(index)}
                  sx={{ '&:hover': { backgroundColor: 'error.light' } }}
                >
                  <MdDelete />
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
        </Card>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MdAdd />}
          onClick={addItemHandler}
          sx={{ borderRadius: 2 }}
        >
          Add Experience
        </Button>
      </Box>
    </Stack>
  );
};

EmploymentInfo.propTypes = {
  profestionalFormData: PropTypes.object.isRequired,
  setProfestionalFormData: PropTypes.func.isRequired,
  jobtitleList: PropTypes.array.isRequired,
  employerList: PropTypes.array.isRequired,
  errors: PropTypes.array,
};

const TechInfo = ({
  skillFormData,
  setSkillFormData,
  skillList,
  skillproficiencyList,
  yearList,
  errors,
}) => {
  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = {
      ...skillFormData,
      skills: skillFormData?.skills.map((item, idx) => {
        if (idx === index)
          return {
            ...item,
            [fieldName]: type === "custom_select" ? event : event.target.value,
          };
        else return item;
      }),
    };
    setSkillFormData(updatedFormData);
  };

  const addItemHandler = () => {
    setSkillFormData({
      ...skillFormData,
      skills: [
        ...(skillFormData?.skills || []),
        {
          skill_id: null,
          skill_proficiency_id: "",
          experience_id: "",
        },
      ],
    });
  };

  const deleteItemHandler = (index) => {
    const updatedFormData = skillFormData?.skills?.filter((_, idx) => idx !== index);
    setSkillFormData({
      ...skillFormData,
      skills: updatedFormData,
    });
  };

  return (
    <Stack spacing={3}>
      {skillFormData?.skills?.map((item, index) => (
        <Card key={index} elevation={2} sx={{ p: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack gap="6px">
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Skill
                  </Typography>
                  <Autocomplete
                    value={item?.skill_id}
                    onChange={(event, newValue) => {
                      handleFieldChange(newValue, "skill_id", index, "custom_select");
                    }}
                    options={skillList}
                    getOptionLabel={(option) => option?.name || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={!!errors[index]?.skill_id}
                        helperText={errors[index]?.skill_id}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <CustomTextField
                    label="Skill Proficiency"
                    value={item?.skill_proficiency_id}
                    name="skill_proficiency_id"
                    onChange={(e) => handleFieldChange(e, "skill_proficiency_id", index)}
                    textFieldProps={{
                      select: true,
                      size: "small",
                      InputLabelProps: { shrink: false },
                    }}
                    errorMessage={errors[index]?.skill_proficiency_id}
                  >
                    {skillproficiencyList?.map((data) => (
                      <MenuItem value={data?.id} key={data?.id}>
                        {data?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <CustomTextField
                    label="Years of Experience"
                    name="experience_id"
                    value={item?.experience_id}
                    onChange={(e) => handleFieldChange(e, "experience_id", index)}
                    textFieldProps={{
                      select: true,
                      size: "small",
                      InputLabelProps: { shrink: false },
                    }}
                    errorMessage={errors[index]?.experience_id}
                  >
                    {yearList?.map((data) => (
                      <MenuItem value={data?.id} key={data?.id}>
                        {data?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            {skillFormData?.skills?.length > 1 && (
              <Tooltip title="Delete Skill">
                <IconButton
                  color="error"
                  onClick={() => deleteItemHandler(index)}
                  sx={{ '&:hover': { backgroundColor: 'error.light' } }}
                >
                  <MdDelete />
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
        </Card>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MdAdd />}
          onClick={addItemHandler}
          sx={{ borderRadius: 2 }}
        >
          Add Skill
        </Button>
      </Box>
    </Stack>
  );
};

TechInfo.propTypes = {
  skillFormData: PropTypes.object.isRequired,
  setSkillFormData: PropTypes.func.isRequired,
  skillList: PropTypes.array.isRequired,
  skillproficiencyList: PropTypes.array.isRequired,
  yearList: PropTypes.array.isRequired,
  errors: PropTypes.array,
};

const ProfessionalInformationForm = ({
  professionalData,
  personalData,
  employmentValidationErrors,
  setEmploymentValidationErrors,
  profestionalFormData,
  setProfestionalFormData,
  validateEmploymentBackground,
  skillFormData,
  setSkillFormData,
  validateSkillForm,
  skillValidationErrors,
  setSkillValidationErrors,
  isProfile,
  setProfesstionalOldData,
  setSkillOldData,
}) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [jobtitleList, setJobtitleList] = useState([]);
  const [employerList, setemployerList] = useState([]);
  const [skillList, setskillList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [skillproficiencyList, setskillproficiencyList] = useState([]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleprofessionalSubmit = async (e) => {
    e.preventDefault();
    const professtionalNewData = profestionalFormData?.employementBackgrounds?.map((item) => ({
      job_title_id: item?.job_title_id,
      employer_name: item?.employer_name,
      start_date: item?.start_date,
      end_date: item?.end_date,
      major_accomplishment: item?.major_accomplishment,
      roles_responsibility: item?.roles_responsibility,
      designation: item?.designation,
      currently_working: item?.currently_working,
    }));

    const updateData = {
      section_type: "employement_background",
      employementBackgrounds: professtionalNewData,
    };

    try {
      const res = isProfile
        ? await ProfileProfessionalInfoApi(updateData)
        : await ProfessionalInfoApi(updateData);
      if (res?.data?.status === true) {
        notify("success", res?.data?.message);
        dispatch(isProfile ? ProfileView() : onboardingView());
        handleNext();
      } else {
        notify("error", res?.data?.message);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    }
  };

  const handleSkillsSubmit = async (e) => {
    e.preventDefault();
    const skillNewData = skillFormData?.skills?.map((item) => ({
      skill_proficiency_id: item?.skill_proficiency_id,
      experience_id: item?.experience_id,
      ...(item?.skill_id?.id
        ? { skill_id: item?.skill_id?.id }
        : { skill_name: item?.skill_id?.inputValue }),
    }));

    const updateData = {
      section_type: "skills",
      skills: skillNewData,
    };

    try {
      const res = isProfile
        ? await ProfileProfessionalInfoApi(updateData)
        : await ProfessionalInfoApi(updateData);
      if (res?.data?.status === true) {
        notify("success", res?.data?.message);
        dispatch(isProfile ? ProfileView() : onboardingView());
      } else {
        notify("error", res?.data?.message);
      }
    } catch (error) {
      notify("error", "Something went wrong");
    }
  };

  useEffect(() => {
    if (professionalData?.employementBackgrounds?.length > 0) {
      const data = professionalData?.employementBackgrounds?.map((item) => ({
        job_title_id: item?.job_title_id,
        employer_name: item?.Employer_Name?.name,
        start_date: dayjs(item?.start_date),
        end_date: item?.end_date ? dayjs(item?.end_date) : null,
        major_accomplishment: item?.major_accomplishment,
        roles_responsibility: item?.roles_responsibility,
        designation: item?.designation,
        international_experience: item?.international_experience,
        currently_working: item?.currently_working,
      }));
      setProfestionalFormData({
        section_type: "employement_background",
        employementBackgrounds: data,
      });
      setProfesstionalOldData(data);
    }
  }, [professionalData]);

  useEffect(() => {
    if (professionalData?.skills?.length > 0) {
      const data = professionalData?.skills?.map((item) => ({
        skill_id: item?.Skill,
        skill_proficiency_id: item?.skill_proficiency_id,
        experience_id: item?.experience_id,
      }));
      setSkillFormData({
        section_type: "skills",
        skills: data,
      });
      setSkillOldData(data);
    }
  }, [professionalData]);

  const getJobList = async () => {
    try {
      const res = await JobTitleApi();
      const jobtitleList = res?.data?.data?.jobTitles;
      setJobtitleList(jobtitleList);
    } catch (error) {
      notify("error", "Failed to load job titles");
    }
  };

  const getEmplyeNameList = async () => {
    try {
      const res = await EmployeNameApi();
      const EmplyeNameList = res?.data?.data?.employerNames;
      setemployerList(EmplyeNameList);
    } catch (error) {
      notify("error", "Failed to load employer names");
    }
  };

  const getSkillList = async () => {
    try {
      const res = await SkillApi();
      const skilldataList = res?.data?.data?.skills;
      setskillList(skilldataList);
    } catch (error) {
      notify("error", "Failed to load skills");
    }
  };

  const getSkillProficiencyList = async () => {
    try {
      const res = await SkillProficiencyApi();
      const skillproficiencydataList = res?.data?.data?.skillProficiencies;
      setskillproficiencyList(skillproficiencydataList);
    } catch (error) {
      notify("error", "Failed to load skill proficiencies");
    }
  };

  const getExpericencList = async () => {
    try {
      const res = await ExperienceApi();
      const yeardataList = res?.data?.data?.yearOfExperiences;
      setYearList(yeardataList);
    } catch (error) {
      notify("error", "Failed to load experience data");
    }
  };

  useEffect(() => {
    getExpericencList();
    getJobList();
    getSkillProficiencyList();
  }, []);

  useEffect(() => {
    getEmplyeNameList();
    getSkillList();
  }, [professionalData]);

  return (
    <Stack spacing={4}>
      {!isProfile && (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" gap={2} alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Professional Information
            </Typography>
            <Chip
              label={`${personalData?.profile_completion_percentage || 0}% Completed`}
              color="success"
              size="small"
            />
            <Chip
              label="It will take 3 minutes to complete this step"
              color="info"
              size="small"
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            * Required fields
          </Typography>
        </Stack>
      )}

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
        {activeStep === 0 ? (
          <Stack spacing={3}>
            <Typography variant="h6" color="text.secondary">
              Present or current job will be first and subsequently next jobs, up to the last 15 years
            </Typography>
            <EmploymentInfo
              profestionalFormData={profestionalFormData}
              setProfestionalFormData={setProfestionalFormData}
              jobtitleList={jobtitleList}
              employerList={employerList}
              errors={employmentValidationErrors}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MdSave />}
                onClick={handleprofessionalSubmit}
                sx={{ borderRadius: 2 }}
              >
                Save & Continue
              </Button>
            </Box>
          </Stack>
        ) : (
          <Stack spacing={3}>
            <Typography variant="h6" color="text.secondary">
              Add your skills and expertise to showcase your capabilities
            </Typography>
            <TechInfo
              skillFormData={skillFormData}
              setSkillFormData={setSkillFormData}
              skillList={skillList}
              skillproficiencyList={skillproficiencyList}
              yearList={yearList}
              errors={skillValidationErrors}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ borderRadius: 2 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MdSave />}
                onClick={handleSkillsSubmit}
                sx={{ borderRadius: 2 }}
              >
                Save & Complete
              </Button>
            </Box>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
};

ProfessionalInformationForm.propTypes = {
  professionalData: PropTypes.object.isRequired,
  personalData: PropTypes.object.isRequired,
  employmentValidationErrors: PropTypes.array.isRequired,
  setEmploymentValidationErrors: PropTypes.func.isRequired,
  profestionalFormData: PropTypes.object.isRequired,
  setProfestionalFormData: PropTypes.func.isRequired,
  validateEmploymentBackground: PropTypes.func.isRequired,
  skillFormData: PropTypes.object.isRequired,
  setSkillFormData: PropTypes.func.isRequired,
  validateSkillForm: PropTypes.func.isRequired,
  skillValidationErrors: PropTypes.array.isRequired,
  setSkillValidationErrors: PropTypes.func.isRequired,
  isProfile: PropTypes.bool,
  setProfesstionalOldData: PropTypes.func.isRequired,
  setSkillOldData: PropTypes.func.isRequired,
};

export default ProfessionalInformationForm;
