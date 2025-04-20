import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Card,
  Fade,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import "./modal.css";
import CustomTextField from "../../../theme/ui/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import notify from "../../../utils/Toast";
import { useDispatch, useSelector } from "react-redux";
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
  RelationApi,
  SkillApi,
  SkillProficiencyApi,
} from "../../../config/ApiHandler";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";

const EmploymentBackground = ({ open8, handleClose8 }) => {
  const dispatch = useDispatch();

  const employementBackgrounds = useSelector(
    (state) => state?.onboard?.onboardViewData?.data?.professionalInformation?.employementBackgrounds || []
  );

  const [employmentData, setEmploymentData] = useState([]);


  const [jobtitleList, setJobtitleList] = useState([]);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (Array.isArray(employementBackgrounds) && employementBackgrounds.length > 0) {
      const prefilledData = employementBackgrounds.map((item) => ({
        id: item.id || null,
        job_title_id: item.job_title_id || "",
        designation: item.designation || "",
        employer_name: item.Employer_Name?.name || "",
        employer_name_id: item.employer_name_id || "",
        start_date: item.start_date ? dayjs(item.start_date) : null,
        end_date: item.end_date ? dayjs(item.end_date) : null,
        major_accomplishment: item.major_accomplishment || "",
        roles_responsibility: item.roles_responsibility || "",
        currently_working: item.currently_working || false,
      }));
      setEmploymentData(prefilledData);
    } else {
      setEmploymentData([
        {
          job_title_id: "",
          employer_name: "",
          start_date: null,
          end_date: null,
          designation: "",
          major_accomplishment: "",
          roles_responsibility: "",
          currently_working: false,
        },
      ]);
    }
  }, [employementBackgrounds]);
  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const res = await JobTitleApi();
        setJobtitleList(res?.data?.data?.jobTitles || []);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };
    fetchJobTitles();
  }, []);

  const handleFieldChange = (event, fieldName, index, type) => {
    setEmploymentData((prevData) =>
      prevData.map((item, idx) =>
        idx === index
          ? {
            ...item,
            [fieldName]:
              type === "date"
                ? event
                : type === "checkbox"
                  ? event.target.checked
                  : event.target.value,
          }
          : item
      )
    );
  };

  const addEmploymentEntry = () => {
    setEmploymentData([
      ...employmentData,
      {
        job_title_id: "",
        employer_name: "",
        start_date: null,
        end_date: null,
        designation: "",
        major_accomplishment: "",
        roles_responsibility: "",
        currently_working: false,
      },
    ]);
  };

  const removeEmploymentEntry = (index) => {
    if (employmentData.length > 1) {
      setEmploymentData(employmentData.filter((_, idx) => idx !== index));
    }
  };

  const validateForm = () => {
    let newErrors = employmentData.map((item) => ({
      job_title_id: item.job_title_id ? "" : "Job title is required",
      employer_name: item.employer_name ? "" : "Employer name is required",
      start_date: item.start_date ? "" : "Start date is required",
      designation: item.designation ? "" : "Job title is required",
      major_accomplishment: item.major_accomplishment
        ? ""
        : "Major accomplishment is required",
      roles_responsibility: item.roles_responsibility
        ? ""
        : "Roles & responsibilities are required",
    }));

    setErrors(newErrors);
    return newErrors.every((error) =>
      Object.values(error).every((val) => val === "")
    );
  };
  const handleProfessionalSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      notify("error", "Please fill in all required fields.");
      return;
    }
    const updateData = {
      section_type: "employement_background",
      employementBackgrounds: employmentData,
    };
    try {
      const res = await ProfessionalInfoApi(updateData);
      if (res?.data?.status === true) {
        notify("success", res?.data?.message);
        dispatch(onboardingView());
      } else {
        notify("error", res?.data?.message);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    }
  };
  return (
    <Modal open={open8} onClose={handleClose8}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          boxShadow: 24,
          outline: "none",
          borderRadius: 2,
          backdropFilter: "blur(17px)",
          width: "90vw",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflowY: "auto",
          p: 3,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box className="modal_card_section">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              className="modal_heading"
              sx={{ mb: 3 }}
            >
              Employment Background
            </Typography>
            <Box onClick={handleClose8}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.2001 12.0001L20.3144 4.88585C20.6573 4.543 20.6573 4.02871 20.3144 3.68585C19.9716 3.343 19.4573 3.343 19.1144 3.68585L12.0001 10.8001L4.88585 3.68585C4.543 3.343 4.02871 3.343 3.68585 3.68585C3.343 4.02871 3.343 4.543 3.68585 4.88585L10.8001 12.0001L3.68585 19.1144C3.343 19.4573 3.343 19.9716 3.68585 20.3144C4.02871 20.6573 4.543 20.6573 4.88585 20.3144L12.0001 13.2001L19.1144 20.3144C19.4573 20.6573 19.9716 20.6573 20.3144 20.3144C20.6573 19.9716 20.6573 19.4573 20.3144 19.1144L13.2001 12.0001Z"
                  fill="#858589"
                />
              </svg>
            </Box>
          </Box>

          {employmentData.map((item, index) => (
            <Grid container spacing={3} key={index}>
              <Grid item xs={12}>
                <CustomTextField
                  label={"Job Title"}
                  name={"designation"}
                  value={item?.designation}
                  onChange={(e) => handleFieldChange(e, "designation", index)}
                  required
                  errorMessage={errors[index]?.designation}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <CustomTextField
                    label="Job Level"
                    name="job_title_id"
                    value={item?.job_title_id}
                    onChange={(e) =>
                      handleFieldChange(e, "job_title_id", index)
                    }
                    textFieldProps={{
                      select: true,
                      size: "small",
                      // value: 10,
                      InputLabelProps: { shrink: false },
                    }}
                    required
                    errorMessage={errors[index]?.job_title_id}
                  >
                    {jobtitleList.map((data) => (
                      <MenuItem value={data.id} key={data.id}>
                        {data.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12}>
                <Stack gap="6px">
                  <CustomTextField
                    label={"Employer Name"}
                    name={"employer_name"}
                    value={item?.employer_name}
                    onChange={(e) =>
                      handleFieldChange(e, "employer_name", index)
                    }
                    required
                    errorMessage={errors[index]?.employer_name}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="currently_working"
                      disabled={item?.end_date}
                      checked={item?.currently_working}
                      onChange={(e) =>
                        handleFieldChange(
                          e,
                          "currently_working",
                          index,
                          "checkbox"
                        )
                      }
                    />
                  }
                  label="Currently Working"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack gap="6px">
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "text.secondary" }}
                  >
                    Start Date
                  </Typography>
                  <DatePicker
                    name="start_date"
                    disableFuture
                    slotProps={{
                      textField: {
                        size: "small",
                      },
                      field: {
                        clearable: true,
                        onClear: () =>
                          handleFieldChange("", "start_date", index, "date"),
                      },
                    }}
                    value={item?.start_date}
                    onChange={(e) =>
                      handleFieldChange(e?.$d, "start_date", index, "date")
                    }
                  />
                  {errors[index]?.start_date && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                      }}
                      color={"error"}
                    >
                      {errors[index]?.start_date}
                    </Typography>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack gap="6px">
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "text.secondary" }}
                  >
                    End Date
                  </Typography>
                  <DatePicker
                    name="end_date"
                    minDate={dayjs(item?.start_date)}
                    disableFuture
                    slotProps={{
                      textField: {
                        size: "small",
                      },
                      field: {
                        clearable: true,
                        onClear: () =>
                          handleFieldChange("", "end_date", index, "date"),
                      },
                    }}
                    value={item?.end_date}
                    disabled={item?.currently_working}
                    onChange={(e) =>
                      handleFieldChange(e?.$d, "end_date", index, "date")
                    }
                  />
                  {errors[index]?.end_date && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                      }}
                      color={"error"}
                    >
                      {errors[index]?.end_date}
                    </Typography>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  label={"Major Accomplishments"}
                  placeholder={
                    "Enter major accomplishments that can be shared with potential employers."
                  }
                  name={"major_accomplishment"}
                  value={item?.major_accomplishment}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      handleFieldChange(e, "major_accomplishment", index);
                    } else if (e.target.value.length > 1000) {
                      handleFieldChange(
                        {
                          target: {
                            value: e.target.value.substring(0, 1000),
                          },
                        },
                        "major_accomplishment",
                        index
                      );
                    }
                  }}
                  subLabel={`${1000 - item?.major_accomplishment?.length
                    } chars left`}
                  textFieldProps={{
                    multiline: true,
                    rows: 12,
                  }}
                  errorMessage={errors[index]?.major_accomplishment}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  name={"roles_responsibility"}
                  placeholder={
                    "Enter roles and responsibilities that can be shared with potential employers."
                  }
                  label={"Roles and Responsibilities"}
                  value={item?.roles_responsibility}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      handleFieldChange(e, "roles_responsibility", index);
                    } else if (e.target.value.length > 300) {
                      handleFieldChange(
                        {
                          target: {
                            value: e.target.value.substring(0, 300),
                          },
                        },
                        "roles_responsibility",
                        index
                      );
                    }
                  }}
                  subLabel={`${300 - item?.roles_responsibility?.length
                    } chars left`}
                  textFieldProps={{
                    multiline: true,
                    rows: 6,
                  }}
                  errorMessage={errors[index]?.roles_responsibility}
                />
              </Grid>

              {index > 0 && (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeEmploymentEntry(index)}
                  >
                    <MdDelete /> Delete
                  </Button>
                </Grid>
              )}

              <Divider sx={{ width: "100%", my: 2 }} />
            </Grid>
          ))}

          <Button variant="contained" color="info" onClick={addEmploymentEntry}>
            Add More
          </Button>

          <Box
            className="modal_footer"
            sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}
          >
            <button onClick={handleClose8} className="cancle_button">
              Cancel
            </button>
            <button className="save_button" onClick={handleProfessionalSubmit}>
              Save
            </button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EmploymentBackground;
