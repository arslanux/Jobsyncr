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
import { DatePicker } from "@mui/x-date-pickers";
import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  createFilterOptions,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import notify from "../../../utils/Toast";
import {
  DegreeApi,
  EducationInfoApi,
  LanguagesApi,
  MajorApi,
  ProfileEducationInfoApi,
  UniversityApi,
  getHighestDegreeApi,
} from "../../../config/ApiHandler";
import {
  ProfileView,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Box } from "@mui/system";
import { MdDelete } from "react-icons/md";
import {
  areObjectsEqual,
  compareArraysOfObjects,
} from "../../../utils/utilsfunction";

const CollegeInfo = ({
  unversitydata,
  degreedata,
  majordata,
  educationInfo,
  setEducationInfo,
  errors,
}) => {
  const addItemHandelr = () => {
    setEducationInfo({
      ...educationInfo,
      universities: [
        ...educationInfo?.universities,
        {
          // university_id: null,
          university_name: null,
          //  degree_id: null,
          degree_name: null,
          // major_id: null,
          major_name: null,
          //  start_date: null,
          end_date: null,
        },
      ],
    });
  };

  const deleteItemHandler = (index) => {
    const updatedFormData = educationInfo?.universities?.filter((item, idx) => {
      return idx !== index;
    });
    setEducationInfo({ ...educationInfo, universities: updatedFormData });
  };

  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = educationInfo?.universities?.map((item, idx) => {
      if (idx === index)
        return {
          ...item,
          [fieldName]:
            type === "date"
              ? event?.$d
              : type === "custom_select"
                ? event
                : event.target.value,
        };
      else return item;
    });

    setEducationInfo({
      ...educationInfo,
      universities: updatedFormData,
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} my={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={educationInfo?.not_provide_education}
                onChange={(e) => {
                  setEducationInfo((prevState) => ({
                    ...prevState,
                    not_provide_education: e.target.checked,
                  }));
                }}
                name="gilad"
              />
            }
            label="I don’t wish to provide at this time"
          />
          <Typography sx={{ color: "red" }}>
            {" "}
            If checkbox is unchecked, then the field becomes mandatory{" "}
          </Typography>
        </Grid>
      </Grid>
      {educationInfo?.universities?.map((item, index) => (
        <Grid container spacing={3} key={index} my={1}>
          <Grid item xs={12} md={6}>
            <Stack gap="6px">
              {/* <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                University/College Name
              </Typography> */}
              <CustomTextField
                label={"University/College Name"}
                name={"university_name"}
                value={item?.university_name}
                onChange={(e) => handleFieldChange(e, "university_name", index)}
                required
                errorMessage={errors[index]?.university_name}
              />
              {/* <Autocomplete
                value={
                  educationInfo?.not_provide_education === true
                    ? null
                    : item?.university_id
                }
                disabled={educationInfo?.not_provide_education}
                onChange={(event, newValue) => {
                  handleFieldChange(
                    newValue,
                    "university_id",
                    index,
                    "custom_select"
                  );
                }}
                filterOptions={(options, params) => {
                  const { inputValue } = params;
                  const filtered = options.filter((option) =>
                    option?.name
                      ?.toLowerCase()
                      .includes(inputValue?.toLowerCase())
                  );
                  const isExisting = options.some(
                    (option) =>
                      inputValue?.toLowerCase() === option.name?.toLowerCase()
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: `Click here to Add "${inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo"
                options={unversitydata}
                getOptionLabel={(option) => {
                  // Add "xxx" option created dynamically
                  if (option?.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{
                      color: !option?.id ? "#4c1b88" : "",
                      fontWeight: !option?.id ? "500" : null,
                      backgroundColor: !option?.id ? "#f5f5f5" : null,
                      border: !option?.id ? "1px solid #ccc" : null,
                      borderRadius: !option?.id ? "8px" : null,
                    }}
                  >
                    {option?.name}
                  </li>
                )}
                size="small"
                freeSolo
                renderInput={(params) => <TextField {...params} />}
              /> */}
              {/* {errors[index]?.university_id && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                  }}
                  color={"error"}
                >
                  {errors[index]?.university_id}
                </Typography>
              )} */}
              {errors[index]?.university_name && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                  }}
                  color={"error"}
                >
                  {errors[index]?.university_name}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <Stack gap="6px">
                {/* <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                  }}
                >
                  Degree
                </Typography> */}
                <CustomTextField
                  label={"Degree"}
                  name={"degree_name"}
                  value={item?.degree_name}
                  onChange={(e) => handleFieldChange(e, "degree_name", index)}
                  required
                  errorMessage={errors[index]?.degree_name}
                />
                {/* <Autocomplete
                  value={
                    educationInfo?.not_provide_education === true
                      ? null
                      : item?.degree_id
                  }
                  disabled={educationInfo?.not_provide_education}
                  onChange={(event, newValue) => {
                    handleFieldChange(
                      newValue,
                      "degree_id",
                      index,
                      "custom_select"
                    );
                  }}
                  filterOptions={(options, params) => {
                    const { inputValue } = params;
                    const filtered = options.filter((option) =>
                      option?.name
                        ?.toLowerCase()
                        .includes(inputValue?.toLowerCase())
                    );
                    const isExisting = options.some(
                      (option) =>
                        inputValue?.toLowerCase() === option.name?.toLowerCase()
                    );

                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Click here to Add "${inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo"
                  options={degreedata}
                  getOptionLabel={(option) => {
                    // Add "xxx" option created dynamically
                    if (option?.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      style={{
                        color: !option?.id ? "#4c1b88" : "",
                        fontWeight: !option?.id ? "500" : null,
                        backgroundColor: !option?.id ? "#f5f5f5" : null,
                        border: !option?.id ? "1px solid #ccc" : null,
                        borderRadius: !option?.id ? "8px" : null,
                      }}
                    >
                      {option?.name}
                    </li>
                  )}
                  size="small"
                  freeSolo
                  renderInput={(params) => <TextField {...params} />}
                /> */}
                {errors[index]?.degree_name && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                    }}
                    color={"error"}
                  >
                    {errors[index]?.degree_name}
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap="6px">
              {/* <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                Major
              </Typography> */}
              <CustomTextField
                label={"Major"}
                name={"major_name"}
                value={item?.major_name}
                onChange={(e) => handleFieldChange(e, "major_name", index)}
                required
                errorMessage={errors[index]?.major_name}
              />
              {/* <Autocomplete
                value={
                  educationInfo?.not_provide_education === true
                    ? null
                    : item?.major_id
                }
                disabled={educationInfo?.not_provide_education}
                onChange={(event, newValue) => {
                  handleFieldChange(
                    newValue,
                    "major_id",
                    index,
                    "custom_select"
                  );
                }}
                filterOptions={(options, params) => {
                  const { inputValue } = params;
                  const filtered = options.filter((option) =>
                    option?.name
                      ?.toLowerCase()
                      .includes(inputValue?.toLowerCase())
                  );
                  const isExisting = options.some(
                    (option) =>
                      inputValue?.toLowerCase() === option.name?.toLowerCase()
                  );

                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: `Click here to Add "${inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo"
                options={majordata}
                getOptionLabel={(option) => {
                  // Add "xxx" option created dynamically
                  if (option?.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{
                      color: !option?.id ? "#4c1b88" : "",
                      fontWeight: !option?.id ? "500" : null,
                      backgroundColor: !option?.id ? "#f5f5f5" : null,
                      border: !option?.id ? "1px solid #ccc" : null,
                      borderRadius: !option?.id ? "8px" : null,
                    }}
                  >
                    {option?.name}
                  </li>
                )}
                size="small"
                freeSolo
                renderInput={(params) => <TextField {...params} />}
              /> */}
              {errors[index]?.major_name && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                  }}
                  color={"error"}
                >
                  {errors[index]?.major_name}
                </Typography>
              )}
            </Stack>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Stack gap="6px"> */}
          {/* <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                {`From`} */}
          {/* <span style={{ color: "red" }}>*</span> */}
          {/* </Typography> */}
          {/* <DatePicker
                name="start_date"
                disabled={educationInfo?.not_provide_education}
                disableFuture
                //  minDate={dayjs(item?.start_date)}
                //  maxDate={dayjs(new Date())}
                value={
                  educationInfo?.not_provide_education === true
                    ? ""
                    : item?.start_date
                }
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
                onChange={(date) => {
                  handleFieldChange(date, "start_date", index, "date");
                }}
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
              )} */}
          {/* </Stack>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Stack gap="6px">
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                {`Graduated / Expected Graduation Date`}
                {/* <span style={{ color: "red" }}>*</span> */}
              </Typography>
              <DatePicker
                name="end_date"
                disabled={educationInfo?.not_provide_education}
                // disableFuture
                // minDate={dayjs(item?.start_date)}
                //  maxDate={dayjs(new Date())}
                value={
                  educationInfo?.not_provide_education === true
                    ? ""
                    : item?.end_date
                }
                slotProps={{
                  textField: {
                    size: "small",
                  },
                  field: { clearable: true },
                }}
                onChange={(date) => {
                  handleFieldChange(date, "end_date", index, "date");
                }}
              />
              {/* {errors[index]?.end_date && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                  }}
                  color={"error"}
                >
                  {errors[index]?.end_date}
                </Typography>
              )} */}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {educationInfo?.universities?.length > 1 && (
              <Button
                variant="outlined"
                disabled={educationInfo?.not_provide_education}
                color="warning"
                onClick={() => deleteItemHandler(index)}
              >
                <MdDelete /> Delete
              </Button>
            )}
            <Divider
              sx={{
                mt: 3,
                mb: 3,
                borderColor: "grey.300",
              }}
            />
          </Grid>
        </Grid>
      ))}

      <Box alignItems={"end"}>
        <Button
          variant="contained"
          color="info"
          disabled={educationInfo?.not_provide_education}
          onClick={() => addItemHandelr()}
        >
          Add more
        </Button>
      </Box>
    </>
  );
};

const HighestEducation = ({ highestEducation, setHighestEducation, error }) => {
  const [degreeList, setDegreeList] = useState([]);
  const dispatch = useDispatch();

  const getDegreeList = async () => {
    try {
      const response = await getHighestDegreeApi();
      setDegreeList(response.data.data?.highestDegrees);
    } catch (error) {
      console.log(error);
    }
  };

  const onchangeHandler = (e) => {
    setHighestEducation(e.target.value);
  };

  useEffect(() => {
    getDegreeList();
  }, []);

  return (
    <>
      <Grid container spacing={3} p={4}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <CustomTextField
              label="Highest Degree"
              name="highest_degree_id"
              placeholder={"please select the option"}
              onChange={onchangeHandler}
              required={true}
              errorMessage={error?.highest_degree_id}
              //  value={highestEducation}

              textFieldProps={{
                select: true,
                size: "small",
                value: highestEducation,
                InputLabelProps: { shrink: false },
                sx: {
                  width: "100%", // Default width for desktop
                  "@media (max-width: 600px)": {
                    width: 180 + "px", // Set width to 250px for screens smaller than or equal to 600px
                  },
                },
              }}
            >
              {degreeList?.map((data) => {
                const { id, name } = data;

                return (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                );
              })}
            </CustomTextField>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

const LanguageInfo = ({
  languageInfo,
  languageData,
  setLanguageInfo,
  error,
}) => {
  const addItemHandelr = () => {
    setLanguageInfo({
      ...languageInfo,
      languages: [
        ...languageInfo?.languages,
        { language_id: "", speak: false, read: false, write: false },
      ],
    });
  };
  const handleFieldChange = (event, fieldName, index, type) => {
    // const updatedFormData = languageInfo?.languages?.map((item, idx) => {
    //   if (idx === index)
    //     return {
    //       ...item,
    //       [fieldName]:
    //         type === "checkbox" ? event?.target?.checked : event.target.value,
    //     };
    //   else return item;
    // });
    const updatedFormData = languageInfo?.languages?.map((item, idx) => {
      if (idx === index) {
        // Update the field value based on the type
        let updatedField;
        if (type === "checkbox") {
          updatedField = {
            speak: fieldName === "speak" ? event.target.checked : item.speak,
            read: fieldName === "read" ? event.target.checked : item.read,
            write: fieldName === "write" ? event.target.checked : item.write,
          };
        } else {
          updatedField = { [fieldName]: event.target.value };
        }
        return {
          ...item,
          ...updatedField,
        };
      } else {
        return item;
      }
    });

    setLanguageInfo({
      ...languageInfo,
      languages: updatedFormData,
    });
  };

  const deleteItemHandler = (index) => {
    const updatedFormData = languageInfo?.languages?.filter((item, idx) => {
      return idx !== index;
    });
    setLanguageInfo({ ...languageInfo, languages: updatedFormData });
  };

  return (
    <>
      <Grid container>
        {/* <Grid item xs={12} my={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={languageInfo?.not_provide_language}
                onChange={(e) => {
                  setLanguageInfo((prevState) => ({
                    ...prevState,
                    not_provide_language: e.target.checked,
                  }));
                }}
                name="gilad"
              />
            }
            label="I don’t wish to provide at this time"
          />
          <Typography sx={{ color: "red" }}>
            {" "}
            If checkbox is unchecked, then the field becomes mandatory{" "}
          </Typography>
        </Grid> */}
      </Grid>
      {languageInfo?.languages?.map((item, index) => (
        <Grid container spacing={3} key={index}>
          <Grid item xs={12} key={index} my={2}>
            <Grid item xs={12}>
              <CustomTextField
                label={`Language `}
                name="language_id"
                value={
                  // languageInfo?.not_provide_language === true
                  //  ? ""
                  //:
                  item?.language_id
                }
                onChange={(e) => handleFieldChange(e, "language_id", index)}
                textFieldProps={{
                  select: true,
                  size: "small",
                  // value: 10,
                  // disabled: languageInfo?.not_provide_language,
                  InputLabelProps: { shrink: false },
                }}
                required
                errorMessage={error[index]?.language_id}
              >
                {languageData?.map((data) => {
                  return (
                    <MenuItem value={data?.id} key={data?.id}>
                      {data?.name}
                    </MenuItem>
                  );
                })}
              </CustomTextField>

              <FormGroup
                row
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      //  disabled={languageInfo?.not_provide_language}
                      disabled={
                        //languageInfo?.not_provide_language
                        // ? languageInfo?.not_provide_language
                        //:
                        item.read || item.write
                      }
                      name="speak"
                      defaultChecked={item?.speak}
                      checked={
                        // languageInfo?.not_provide_language ? false : 
                        item?.speak
                      }
                      onChange={(e) => {
                        handleFieldChange(e, "speak", index, "checkbox");
                      }}
                    />
                  }
                  label="Beginner"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="read"
                      // disabled={languageInfo?.not_provide_language}
                      disabled={
                        //languageInfo?.not_provide_language
                        //  ? languageInfo?.not_provide_language
                        // :
                        item.speak || item.write
                      }
                      defaultChecked={item?.read}
                      checked={
                        // languageInfo?.not_provide_language ? false : 
                        item?.read
                      }
                      onChange={(e) => {
                        handleFieldChange(e, "read", index, "checkbox");
                      }}
                    />
                  }
                  label="Intermediate"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="write"
                      //  disabled={languageInfo?.not_provide_language}
                      disabled={
                        // languageInfo?.not_provide_language
                        // ? languageInfo?.not_provide_language
                        // :
                        item.speak || item.read
                      }
                      defaultChecked={item?.write}
                      checked={
                        // languageInfo?.not_provide_language ? false : 
                        item?.write
                      }
                      onChange={(e) => {
                        handleFieldChange(e, "write", index, "checkbox");
                      }}
                    />
                  }
                  label="Advanced"
                />
              </FormGroup>

              {languageInfo?.languages?.length > 1 && (
                <Button
                  variant="outlined"
                  color="warning"
                  // disabled={languageInfo?.not_provide_language}
                  onClick={() => deleteItemHandler(index)}
                >
                  <MdDelete /> Delete
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Box alignItems={"end"}>
        <Button
          variant="contained"
          color="info"
          // disabled={languageInfo?.not_provide_language}
          onClick={() => addItemHandelr()}
        >
          Add more
        </Button>
      </Box>
    </>
  );
};

const EducationalBackgroundForm = ({
  isProfile = false,
  educationData,
  universityInfo,
  setUniversityInfo,
  languageInfo,
  setLanguageInfo,
  validateUniversityInfo,
  educationValidationErrors,
  languageValidationErrors,
  validateLanguageInfo,
  setEducationValidationErrors,
  setLanguageValidationErrors,
  personalData,
  setUniversityOldData,
  setLanguageOldData,
  languageOldData,
  universityOldData,
  highestEducation,
  setHighestEducation,
  highestEducationError,
  setHighestEducationError,
  higestDegreeValidation,
}) => {
  const dispatch = useDispatch();
  const [unversitydata, setUnversitydata] = useState([]);
  const [degreedata, setDegreedata] = useState([]);
  const [majordata, setMajordata] = useState([]);
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let temp = {
      ...universityInfo,
      not_provide_education: educationData?.not_provide_education
        ? educationData?.not_provide_education
        : false,
    };
    if (educationData?.universities?.length > 0) {
      temp["universities"] = educationData?.universities?.map((item) => {
        return {
          // university_id: item?.University,
          university_name: item?.University?.name,
          // degree_id: item?.Degree,
          degree_name: item?.Degree?.name,
          //major_id: item?.Major,
          major_name: item?.Major?.name,
          // start_date: dayjs(item?.start_date),
          end_date: dayjs(item?.end_date),
        };
      });
    } else {
      temp["universities"] = [
        {
          // university_id: null,
          university_name: null,
          // degree_id: null,
          degree_name: null,
          //  major_id: null,
          major_name: null,
          //  start_date: null,
          end_date: null,
        },
      ];
    }
    setUniversityInfo(temp);
    setUniversityOldData(temp);
  }, [educationData]);

  useEffect(() => {
    let temp = {
      ...languageInfo,
      not_provide_language:
        //educationData?.not_provide_language
        //  ? educationData?.not_provide_language
        //  : 
        false,
    };
    if (educationData?.languages?.length > 0) {
      temp["languages"] = educationData?.languages?.map((item) => {
        return {
          language_id: item?.language_id,
          speak: item?.speak,
          read: item?.read,
          write: item?.write,
        };
      });
    } else {
      temp["languages"] = [
        { language_id: "", speak: false, read: false, write: false },
      ];
    }
    setLanguageInfo(temp);
    setLanguageOldData(temp);
  }, [educationData]);

  const getUniversity = async () => {
    try {
      const res = await UniversityApi();
      const listofunversitydata = res?.data?.data?.universities;
      setUnversitydata(listofunversitydata);
    } catch (error) {
      // Handle the error if needed
    }
  };

  const getDegree = async () => {
    try {
      const res = await DegreeApi();
      const listofDegreedata = res?.data?.data?.degrees;
      setDegreedata(listofDegreedata);
    } catch (error) {
      // Handle the error if needed
    }
  };

  const getMajor = async () => {
    try {
      const res = await MajorApi();
      const listofMajordata = res?.data?.data?.majors;
      setMajordata(listofMajordata);
    } catch (error) {
      // Handle the error if needed
    }
  };

  const getLanguageList = async () => {
    try {
      const res = await LanguagesApi();
      const languagesData = res?.data?.data?.languages;
      setLanguageData(languagesData);
    } catch (error) {
      // Handle the error if needed
    }
  };

  useEffect(() => {
    getUniversity();
    getMajor();
    getDegree();
    getLanguageList();
  }, [personalData]);

  const handleUniversitySubmit = async (e) => {
    e.preventDefault();

    const data = universityInfo?.universities?.map((item) => {
      let data = {
        start_date: item.start_date,
        end_date: item.end_date,
        university_name: item.university_name,
        degree_name: item.degree_name,
        major_name: item.major_name,
      };
      // if (item?.university_id?.id) {
      //   data["university_id"] = item?.university_id?.id;
      // } else {
      //   data["university_name"] = item?.university_id?.inputValue;
      // }

      // if (item?.degree_id?.id) {
      //   data["degree_id"] = item?.degree_id?.id;
      // } else {
      //   data["degree_name"] = item?.degree_id?.inputValue;
      // }

      // if (item?.major_id?.id) {
      //   data["major_id"] = item?.major_id?.id;
      // } else {
      //   data["major_name"] = item?.major_id?.inputValue;
      // }

      return data;
    });

    const isEqual = areObjectsEqual(universityOldData, universityInfo);

    if (isEqual) {
      notify("info", "No changes made");
    } else {
      const updateData = {
        section_type: "university",
        educations: data,
        not_provide_education: universityInfo?.not_provide_education,
      };

      try {
        const res = isProfile
          ? await ProfileEducationInfoApi(updateData)
          : await EducationInfoApi(updateData);
        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          dispatch(isProfile ? ProfileView() : onboardingView());
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  const handleDegreeSubmit = async (e) => {
    e.preventDefault();
    const isValid = higestDegreeValidation(
      highestEducation,
      setHighestEducationError
    );
    if (!isValid) {
      notify("error", "Please select the highest degree obtained");
    } else {
      if (personalData?.highest_degree_id === highestEducation) {
        notify("info", "No changes made");
      } else {
        const updateData = {
          section_type: "highest_degree",
          highest_degree_id: highestEducation,
        };
        try {
          const res = isProfile
            ? await ProfileEducationInfoApi(updateData)
            : await EducationInfoApi(updateData);
          if (res?.data?.status === true) {
            notify("success", res?.data?.message);
            dispatch(isProfile ? ProfileView() : onboardingView());
          } else {
            notify("error", res?.data?.message);
          }
        } catch (error) {
          // Handle the error if needed
        }
      }
    }
  };

  const handleLanguageSubmit = async (e) => {
    e.preventDefault();

    const isEqual = areObjectsEqual(languageOldData, languageInfo);
    if (isEqual) {
      notify("info", "No changes made");
    } else {
      const updateData = {
        section_type: "language",
        ...languageInfo,
      };

      try {
        const res = isProfile
          ? await ProfileEducationInfoApi(updateData)
          : await EducationInfoApi(updateData);
        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          dispatch(isProfile ? ProfileView() : onboardingView());
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  useEffect(() => {
    if (personalData?.highest_degree_id) {
      setHighestEducation(personalData?.highest_degree_id);
    }
  }, [personalData]);
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
              Educational Background
            </Typography>
            <Chip
              label={`${personalData?.profile_completion_percentage != undefined
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
        <OnboardFormTemplate
          formTitle={"University/ College"}
          form={
            <CollegeInfo
              unversitydata={unversitydata}
              degreedata={degreedata}
              majordata={majordata}
              educationInfo={universityInfo}
              setEducationInfo={setUniversityInfo}
              errors={educationValidationErrors}
            />
          }
          onsubmit={handleUniversitySubmit}
        />
        <OnboardFormTemplate
          formTitle={"Highest Degree Obtained"}
          form={
            <HighestEducation
              highestEducation={highestEducation}
              setHighestEducation={setHighestEducation}
              error={highestEducationError}
            />
          }
          onsubmit={handleDegreeSubmit}
        />
        <OnboardFormTemplate
          formTitle={"Languages"}
          form={
            <LanguageInfo
              languageData={languageData}
              languageInfo={languageInfo}
              setLanguageInfo={setLanguageInfo}
              error={languageValidationErrors}
            />
          }
          onsubmit={handleLanguageSubmit}
        />
      </Stack>
    </Stack>
  );
};

export default EducationalBackgroundForm;
