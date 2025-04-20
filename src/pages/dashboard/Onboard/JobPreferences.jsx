import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import OnboardFormTemplate from "../../../theme/ui/onboardFormTemplate";
import Upload from "../../../theme/ui/upload";
import CustomTextField from "../../../theme/ui/TextField";
// import { countries } from './MiscellaneousInformation';
import {
  Autocomplete,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { countryGet } from "../../../redux/commonApi/CountryAction";
import {
  AvailibilityApi,
  JonReferenceApi,
  PreferenceApi,
  ProfileJonReferenceApi,
} from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";
import {
  ProfileView,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import { currencyCode } from "../../../utils/currencyCode";
import { areObjectsEqual } from "../../../utils/utilsfunction";
import { countryGet } from "../../../redux/commonApi/CountryAction";

const PreferenceInfo = ({
  countyList,
  handlepreferenceChange,
  jobpreferenceinput,
  handleCountryChange,
  perferenceList,
  loader,
  errors,
  getDefaultCountries,
  isCheckboxChecked,
}) => {
  console.log(currencyCode, "currencyCode");
  return (
    <>
      {!loader ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Autocomplete
              multiple
              name="country_id"
              limitTags={2}
              id="multiple-limit-tags"
              options={countyList || []}
              getOptionLabel={(option) => option.name}
              // defaultValue={getDefaultCountries()}
              value={jobpreferenceinput?.preferredLocations || []}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <CustomTextField
                  required
                  textFieldProps={{ ...params, size: "small" }}
                  label="Country Preferences"
                />
              )}
            />
            {errors?.preferredLocations && (
              <span className="mx-3" style={{ color: "red" }}>
                {errors?.preferredLocations}
              </span>
            )}
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              Preferred Industry Sector <span style={{ color: "red" }}>*</span>
            </Typography>
            <Grid container>
              {loader ? (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 300,
                    fontSize: "28px",
                  }}
                >
                  LOADING.....
                </Typography>
              ) : (
                perferenceList?.preferredIndustrySectors?.map((data) => (
                  <Grid item xs={12} md={6} key={data?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={
                            jobpreferenceinput?.preferredIndustrySector?.filter(
                              (item) =>
                                item?.preferred_industry_sector_id === data.id
                            ).length > 0
                          }
                          onChange={(e) => {
                            handlepreferenceChange(
                              e,
                              data.id,
                              "preferred_industry_sector_id",
                              "preferredIndustrySector"
                            );
                          }}
                        />
                      }
                      label={data?.name}
                    />
                  </Grid>
                ))
              )}
            </Grid>
            <span className="mx-3" style={{ color: "red" }}>
              {errors?.preferredIndustrySector}
            </span>
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              Preferred Experience Level <span style={{ color: "red" }}>*</span>
            </Typography>
            <Grid container>
              {perferenceList?.preferredExperienceLevels?.map((data) => {
                //console.log("data===>",data.name);
                return (
                  <Grid item xs={12} md={6} key={data?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={
                            jobpreferenceinput?.preferredExperienceLevel?.filter(
                              (item) =>
                                item?.preferred_experience_level_id === data.id
                            ).length > 0
                          }
                          onChange={(e) => {
                            handlepreferenceChange(
                              e,
                              data.id,
                              "preferred_experience_level_id",
                              "preferredExperienceLevel"
                            );
                          }}
                        />
                      }
                      label={data?.name}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              Preferred Employment Type? <span style={{ color: "red" }}>*</span>
            </Typography>
            <Grid container>
              {perferenceList?.preferredEmploymentTypes?.map((data) => {
                //console.log("data===>",data.name);
                return (
                  <Grid item xs={12} md={6} key={data?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={
                            jobpreferenceinput?.preferredEmploymentType?.filter(
                              (item) =>
                                item?.preferred_employment_type_id === data.id
                            ).length > 0
                          }
                          onChange={(e) => {
                            handlepreferenceChange(
                              e,
                              data.id,
                              "preferred_employment_type_id",
                              "preferredEmploymentType"
                            );
                          }}
                        />
                      }
                      label={data?.name}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <span className="mx-3" style={{ color: "red" }}>
              {errors?.preferredEmploymentType}
            </span>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              Preferred Work Mode?<span style={{ color: "red" }}>*</span>
            </Typography>
            <Grid container>
              {perferenceList?.preferredWorkModes?.map((data) => {
                //console.log("data===>",data.name);
                return (
                  <Grid item xs={12} md={6} key={data?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={
                            jobpreferenceinput?.preferredWorkMode?.filter(
                              (item) => item?.preferred_work_mode_id === data.id
                            ).length > 0
                          }
                          onChange={(e) => {
                            handlepreferenceChange(
                              e,
                              data.id,
                              "preferred_work_mode_id",
                              "preferredWorkMode"
                            );
                          }}
                        />
                      }
                      label={data?.name}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <span className="mx-3" style={{ color: "red" }}>
              {errors?.preferredWorkMode}
            </span>
          </Grid>
          <Grid item xs={12} md={2}>
            <CustomTextField
              label="Currency"
              name={"currency"}
              required={false}
              value={jobpreferenceinput?.currency}
              onChange={(e) => {
                handlepreferenceChange(e);
              }}
              textFieldProps={{
                select: true,
                size: "small",
                //value: 10,

                InputLabelProps: { shrink: false },
              }}
              // errorMessage={bioValidationErrors?.race_ethnicity_id}
            >
              {currencyCode?.map((data) => {
                const { cc, symbol } = data;

                return (
                  <MenuItem value={cc} key={cc}>
                    {cc} ({symbol})
                  </MenuItem>
                );
              })}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} md={10}>
            <CustomTextField
              label={"Minimum Salary Expectation?"}
              placeholder={"Enter minimum salary"}
              name="min_salary_expectation"
              value={jobpreferenceinput?.min_salary_expectation}
              onChange={(e) => {
                handlepreferenceChange(e);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              Desired Job Title?
            </Typography>
            <Grid container>
              {perferenceList?.desiredJobTitles?.map((data) => {
                //console.log("data===>",data.name);
                return (
                  <Grid item xs={12} md={6} key={data?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={
                            jobpreferenceinput?.desiredJobTitle?.filter(
                              (item) => item?.desired_job_title_id === data.id
                            ).length > 0
                          }
                          onChange={(e) => {
                            handlepreferenceChange(
                              e,
                              data.id,
                              "desired_job_title_id",
                              "desiredJobTitle"
                            );
                          }}
                        />
                      }
                      label={data?.name}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              Type of Employer Seeking?
              {/* <span style={{ color: "red" }}>*</span> */}
            </Typography>
            <Grid container>
              {perferenceList?.typeOfEmployerSeekings?.map((data) => {
                //console.log("data===>",data.name);
                return (
                  <Grid item xs={12} md={6} key={data?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={
                            jobpreferenceinput?.typeOfEmployerSeeking?.filter(
                              (item) =>
                                item?.type_of_employer_seeking_id === data.id
                            ).length > 0
                          }
                          onChange={(e) => {
                            handlepreferenceChange(
                              e,
                              data.id,
                              "type_of_employer_seeking_id",
                              "typeOfEmployerSeeking"
                            );
                          }}
                        />
                      }
                      label={data?.name}
                    />
                  </Grid>
                );
              })}
            </Grid>
            {/* <span className="mx-3" style={{ color: "red" }}>
              {errors?.typeOfEmployerSeeking}
            </span> */}
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
              <CustomTextField
                label="Availability to Join"
                name="availability"
                value={jobpreferenceinput?.availability}
                errorMessage={errors?.availability}
                onChange={(e) => {
                  handlepreferenceChange(
                    e,
                    jobpreferenceinput?.availability,
                    "availability_id",
                    "availability"
                  );
                }}
                required
                textFieldProps={{
                  select: true,
                  size: "small",
                  // value: 10,

                  InputLabelProps: { shrink: false },
                }}
                //   label='Age'

                //   onChange={handleChange}
              >
                {perferenceList?.availabilities?.map((data) => {
                  return (
                    <MenuItem value={data?.id} key={data?.id}>
                      {data?.name}
                    </MenuItem>
                  );
                })}
              </CustomTextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
              <CustomTextField
                label="Contact Availability"
                name="contact_availability"
                value={jobpreferenceinput?.contact_availability}
                onChange={(e) => {
                  handlepreferenceChange(e);
                }}
                textFieldProps={{
                  select: true,
                  size: "small",
                  //value: 10,

                  InputLabelProps: { shrink: false },
                }}
                //   label='Age'

                //   onChange={handleChange}
              >
                {perferenceList?.contactAvailabilities?.map((data) => {
                  return (
                    <MenuItem value={data?.id} key={data?.id}>
                      {data?.name}
                    </MenuItem>
                  );
                })}
              </CustomTextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              name="comments"
              value={jobpreferenceinput?.comments}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  handlepreferenceChange(e);
                } else if (e.target.value.length > 300) {
                  handlepreferenceChange({
                    name: "comments",
                    value: e.target.value.substring(0, 300),
                  });
                }
              }}
              subLabel={`${
                300 - jobpreferenceinput?.comments?.length
              } chars left`}
              label={"Additional Comments"}
              textFieldProps={{
                multiline: true,
                rows: 6,
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Skeleton variant="rectangular" height={"50vh"} />
      )}
    </>
  );
};

const JobPreferences = ({
  isProfile = false,
  jobpreferenceinput,
  setJobpreferenceinput,
  jobpreferenceValidateForm,
  setPrefernceValidationErrors,
  prefernceValidationErrors,
  referencesData,
  personalData,
  setJobPreferencesOldData,
  jobPreferencesOldData,
}) => {
  // console.log("referencesData", referencesData.preferredIndustrySector);

  const [jobavailibility, setJobavailibility] = useState([]);

  const [perferenceList, setPerferenceList] = useState([]);
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  const countyList = useSelector(
    (state) => state?.commoncontry?.countryData?.data?.country_list
  );

  useEffect(() => {
    if (referencesData) {
      const data = {
        preferredEmploymentType: referencesData?.preferredEmployementType
          ?.filter((item) => item?.status === true)
          ?.map((item) => ({
            preferred_employment_type_id: item?.id,
          })),
        preferredIndustrySector: referencesData?.preferredIndustrySector
          ?.filter((item) => item?.status === true)
          ?.map((item) => ({ preferred_industry_sector_id: item?.id })),
        preferredExperienceLevel: referencesData?.preferredExperienceLevel
          ?.filter((item) => item?.status === true)
          ?.map((item) => ({ preferred_experience_level_id: item?.id })),
        preferredWorkMode: referencesData?.preferredWorkMode
          ?.filter((item) => item?.status === true)
          ?.map((item) => ({ preferred_work_mode_id: item?.id })),
        desiredJobTitle:
          referencesData?.desiredJobTitle
            ?.filter((item) => item?.status === true)
            ?.map((item) => ({ desired_job_title_id: item?.id })) || [],
        typeOfEmployerSeeking:
          referencesData?.typeOfEmployerSeeking
            ?.filter((item) => item?.status === true)
            ?.map((item) => ({ type_of_employer_seeking_id: item?.id })) || [],
        preferredLocations:
          referencesData?.preferredLocations?.map((item) => ({
            id: item?.country_id,
            name: item?.country?.name,
          })) || [],
        min_salary_expectation: referencesData?.min_salary_expectation || "",
        currency: referencesData?.currency || "USD",
        comments: referencesData?.comments || "",
        availability: referencesData?.availability || "",
        contact_availability: referencesData?.contactAvailability || "",
      };
      setJobpreferenceinput((prevState) => ({
        ...prevState,
        ...data,
      }));
      setJobPreferencesOldData(data);
    }
  }, [referencesData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getDefaultCountries = () => {
    return (
      referencesData?.preferredLocations.map((location) => {
        return (
          countyList.find((country) => country.id === location.country_id) ||
          null
        );
      }) || []
    );
  };

  // const isIndustrySectorSelected = (id) => {
  //   return jobpreferenceinput.preferredIndustrySector.some(sector => sector.preferred_industry_sector_id === id);
  // };

  const handlepreferenceChange = (e, id, key, state) => {
    const { name, value, checked, type } = e.target;

    setJobpreferenceinput((prevState) => {
      if (type === "checkbox") {
        const currentArray = [...prevState[state]];
        const isExist = currentArray.some((item) => item[`${key}`] === id);
        if (checked && !isExist) {
          currentArray.push({ [`${key}`]: id });
        } else if (!checked && isExist) {
          const existingIndex = currentArray.findIndex(
            (item) => item[`${key}`] === id
          );
          currentArray.splice(existingIndex, 1);
        }

        return {
          ...prevState,
          [state]: currentArray,
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  // useEffect to log the updated state after rendering
  // useEffect(() => {
  //   console.log("Updated state:", jobpreferenceinput);
  // }, [jobpreferenceinput]);

  const handleCountryChange = (event, values) => {
    const selectedCountryIds = console.log(values, "values");

    setJobpreferenceinput((prevState) => ({
      ...prevState,
      preferredLocations: values || [],
    }));
  };

  useEffect(() => {
    dispatch(countryGet());
  }, []);

  const sumbitJobReferenceHandler = async (e) => {
    e.preventDefault();
    const isValid = jobpreferenceValidateForm(
      jobpreferenceinput,
      setPrefernceValidationErrors
    );
    const isEquals = areObjectsEqual(jobpreferenceinput, jobPreferencesOldData);
    if (isEquals) {
      notify("info", "No changes made");
    } else {
      if (isValid) {
        const submitPayload = {
          section_type: "preference_list",
          preferredLocations:
            jobpreferenceinput?.preferredLocations?.map((item) => ({
              country_id: item?.id,
            })) || [],
          preferredIndustrySector: jobpreferenceinput?.preferredIndustrySector,
          preferredExperienceLevel:
            jobpreferenceinput?.preferredExperienceLevel || [],
          preferredEmploymentType:
            jobpreferenceinput?.preferredEmploymentType || [],
          preferredWorkMode: jobpreferenceinput?.preferredWorkMode || [],
          desiredJobTitle: jobpreferenceinput?.desiredJobTitle || [],
          typeOfEmployerSeeking:
            jobpreferenceinput?.typeOfEmployerSeeking || [],
          availability_id: jobpreferenceinput?.availability || [],
          contact_availability_id: jobpreferenceinput?.contact_availability,
          min_salary_expectation:
            jobpreferenceinput?.min_salary_expectation || "",
          currency: jobpreferenceinput?.currency || "USD",
          comments: jobpreferenceinput?.comments || "",
          // ... other properties
        };

        try {
          const res = isProfile
            ? await ProfileJonReferenceApi(submitPayload)
            : await JonReferenceApi(submitPayload);
          if (res?.data?.status === true) {
            dispatch(isProfile ? ProfileView() : onboardingView());
            notify("success", res?.data?.message);
          } else {
            notify("error", res?.data?.message);
          }
        } catch (error) {
          console.log("error", error);
        }
      } else {
        notify("error", "Please enter required data");
      }
    }
  };

  const isCheckboxChecked = (id, state) => {
    return jobpreferenceinput[state].some((item) => item[`${state}_id`] === id);
  };

  const getPreference = async () => {
    try {
      const res = await PreferenceApi();
      if (res?.data?.status === true) {
        const preferenceList = res?.data?.data;
        setPerferenceList(preferenceList);
        setLoader(false);
      }
    } catch (error) {
      // Handle the error if needed
      setLoader(false);
    }
  };

  useEffect(() => {
    getPreference();
  }, []);

  return (
    <Stack gap={2} mt={2}>
      {!isProfile && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                fontSize: "28px",
              }}
            >
              Job Preferences
            </Typography>
            <Chip
              label={`${
                personalData?.profile_completion_percentage != undefined
                  ? personalData?.profile_completion_percentage
                  : 0
              }% Completed`}
              size="small"
              sx={{
                backgroundColor: "success.light",
                color: "success.main",
                fontWeight: 600,
              }}
            />
            <Chip
              label={`It will take 2 minutes to complete this step`}
              size="small"
              sx={{
                backgroundColor: "success.main",
                color: "success.light",
                fontWeight: 600,
              }}
            />
          </Stack>
          <Typography variant="body2">* = Required</Typography>
        </Stack>
      )}
      <Stack gap={2}>
        <Card sx={{ p: 1, bgcolor: "#4C1A88", padding: 2, borderRadius: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: "18px", md: "20px", lg: "28px" },
              color: "white",
            }}
          >
            Get your personalized career dashboard in 10 minutes!
          </Typography>
          <Typography variant="subtitle2" color="white">
            Thank you for taking the time to complete your profile with us. We
            will now begin working on creating your personalized career
            dashboard with curated employment opportunities that align with your
            preferences. Whenever you change your job preferences, your
            dashboard will include opportunities that reflect those preferences.
            It generally takes about 10 minutes to update your personalized
            dashboard when changes are made.
          </Typography>
        </Card>
        <OnboardFormTemplate
          formTitle={"Preference List"}
          form={
            <PreferenceInfo
              countyList={countyList}
              handlepreferenceChange={handlepreferenceChange}
              jobpreferenceinput={jobpreferenceinput}
              handleCountryChange={handleCountryChange}
              perferenceList={perferenceList}
              errors={prefernceValidationErrors}
              getDefaultCountries={getDefaultCountries}
              isCheckboxChecked={isCheckboxChecked}
              loader={loader}
            />
          }
          onsubmit={sumbitJobReferenceHandler}
        />
      </Stack>
    </Stack>
  );
};

export default JobPreferences;
