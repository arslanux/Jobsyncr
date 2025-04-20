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
import { useDispatch, useSelector } from "react-redux";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoLinkedin } from "react-icons/bi";
import {
  ProfileView,
  generalInfo,
  onboardingView,
  profileGeneralInfo,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import notify from "../../../utils/Toast";
import {
  cityGet,
  countryGet,
  referralSourceGet,
  stateGet,
} from "../../../redux/commonApi/CountryAction";
import { Alert, Card, InputAdornment, InputLabel } from "@mui/material";
import PhoneInput from "./component/PhoneInput";
import { CountryCodeList } from "../../../utils/countrycode";
import {
  getDisablityApi,
  getGenderApi,
  getRaceEthnicityApi,
  getVeteranApi,
} from "../../../config/ApiHandler";
import { areObjectsEqual } from "../../../utils/utilsfunction";
import { EmailOutlined } from "@mui/icons-material";
import { maxWidth, minWidth } from "@mui/system";

const PersonalInfo = ({
  personalData,
  onchangeHandlerdata,
  setUploadedUrl,
  profileimgData,
  errors,
  referralSourceList,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Upload
          label={"Photo"}
          setUploadedUrl={setUploadedUrl}
          imageLink={profileimgData}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
          <CustomTextField
            label="Prefix"
            name="prefix"
            required={true}
            value={personalData?.prefix}
            onChange={(e) => {
              onchangeHandlerdata(e);
            }}
            textFieldProps={{
              select: true,
              size: "small",
              //value: 10,

              InputLabelProps: { shrink: false },
            }}
            errorMessage={errors?.prefix}
          >
            <MenuItem value={""} key={""} disabled selected>
              Choose Prefix
            </MenuItem>
            <MenuItem value={"Mr."}>Mr.</MenuItem>
            <MenuItem value={"Mrs."}>Mrs.</MenuItem>
            <MenuItem value={"Ms."}>Ms.</MenuItem>
            <MenuItem value={"Miss."}>Miss.</MenuItem>
            <MenuItem value={"Sir."}>Sir.</MenuItem>
            <MenuItem value={"Dr."}>Dr.</MenuItem>
            <MenuItem value={"Ph.D."}>Ph.D.</MenuItem>
          </CustomTextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <CustomTextField
          errorMessage={errors?.first_name}
          label={"First Name"}
          placeholder={"Enter first name"}
          name="first_name"
          required
          value={personalData?.first_name}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <CustomTextField
          errorMessage={errors?.middle_name}
          label={"Middle Name"}
          placeholder={"Enter middle name"}
          name="middle_name"
          value={personalData?.middle_name}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <CustomTextField
          errorMessage={errors?.last_name}
          label={"Last Name"}
          placeholder={"Enter last name"}
          name="last_name"
          required
          value={personalData?.last_name}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          errorMessage={errors?.bio}
          label={"Professional Biography"}
          placeholder={
            "Enter a professional biography that can be shared with potential employers."
          }
          name="bio"
          value={personalData?.bio}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              onchangeHandlerdata(e);
            } else if (e.target.value.length > 500) {
              onchangeHandlerdata({
                name: "bio",
                value: e.target.value.substring(0, 500),
              });
            }
          }}
          type="text"
          subLabel={`${500 - personalData?.bio?.length} chars left`}
          textFieldProps={{
            multiline: true,
            rows: 8,
            // maxLength: 300,
          }}
          // required
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <CustomTextField
            errorMessage={errors?.referral_source_id}
            label="Referral Source"
            name="referral_source_id"
            value={personalData?.referral_source_id}
            placeholder={"please select the option"}
            onChange={(e) => {
              onchangeHandlerdata(e);
            }}
            textFieldProps={{
              select: true,
              size: "small",
              InputLabelProps: { shrink: false },
            }}
          >
            {referralSourceList?.map((data) => {
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
  );
};

const ContactInfo = ({
  personalData,
  onchangeHandlerdata,
  countyList,
  stateList,
  cityList,
  errors,
  contactValidateForm,
}) => {
  const countryCodeSetter = (value) => {
    const countryname =
      countyList?.find((data) => data?.id === value)?.name || "";
    const countrycode =
      CountryCodeList?.find((data) => data?.name === countryname)?.dial_code ||
      "";
    if (countrycode) {
      onchangeHandlerdata({
        name: "mobile_country_code",
        value: countrycode,
      });
      onchangeHandlerdata({
        name: "tel_country_code",
        value: countrycode,
      });
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextField
          errorMessage={errors?.address_one}
          label={"Address Line 1"}
          name="address_one"
          value={personalData?.address_one}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
          required={false}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          errorMessage={errors?.address_two}
          label={"Address Line 2"}
          name="address_two"
          value={personalData?.address_two}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
          <CustomTextField
            errorMessage={errors?.country_id}
            label="Country"
            name="country_id"
            value={personalData?.country_id}
            placeholder={"please select the option"}
            // onChange={(e) => {
            //   onchangeHandlerdata(e);
            // }}
            required
            onChange={(selectedOption) => {
              onchangeHandlerdata({ name: "country_id" }, selectedOption);
              countryCodeSetter(selectedOption?.target?.value);
            }}
            textFieldProps={{
              select: true,
              size: "small",
              value: personalData?.country_id,
              InputLabelProps: { shrink: false },
            }}
            //   label='Age'

            //   onChange={handleChange}
          >
            {countyList?.map((data) => {
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

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
          <CustomTextField
            errorMessage={errors?.state_id}
            label="State/Province"
            name="state_id"
            value={personalData?.state_id}
            placeholder={"please select the option"}
            onChange={(selectedOption) =>
              onchangeHandlerdata({ name: "state_id" }, selectedOption)
            }
            required
            textFieldProps={{
              select: true,
              size: "small",
              //value: 10,
              value: personalData?.state_id,
              InputLabelProps: { shrink: false },
            }}
            //   label='Age'

            //   onChange={handleChange}
          >
            {stateList?.map((data) => {
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

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
          <CustomTextField
            errorMessage={errors?.city_id}
            label="City"
            name="city_id"
            required
            value={personalData?.city_id}
            placeholder={"please select the option"}
            onChange={(selectedOption) =>
              onchangeHandlerdata({ name: "city_id" }, selectedOption)
            }
            textFieldProps={{
              select: true,
              size: "small",
              value: personalData?.city_id,

              InputLabelProps: { shrink: false },
            }}
            //   label='Age'

            //   onChange={handleChange}
          >
            {cityList?.map((data) => {
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

      <Grid item xs={12} md={6}>
        <CustomTextField
          errorMessage={errors?.pincode}
          label={"Zip Code"}
          placeholder={""}
          name="pincode"
          required
          value={personalData?.pincode}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PhoneInput
          phone={personalData?.tel_num}
          label={"Telephone Number"}
          phoneOnChangeHandler={(e) =>
            onchangeHandlerdata({ name: "tel_num", value: e?.target?.value })
          }
          code={personalData?.tel_country_code}
          codeOnChangeHandler={(e) =>
            onchangeHandlerdata({
              name: "tel_country_code",
              value: e?.target?.value,
            })
          }
          codeErrorMessage={errors?.tel_country_code}
          phoneErrorMessage={errors?.tel_num}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PhoneInput
          phone={personalData?.mobile}
          label={"Cell/Mobile Number"}
          phoneOnChangeHandler={(e) =>
            onchangeHandlerdata({ name: "mobile", value: e?.target?.value })
          }
          code={personalData?.mobile_country_code}
          codeOnChangeHandler={(e) =>
            onchangeHandlerdata({
              name: "mobile_country_code",
              value: e?.target?.value,
            })
          }
          required={false}
          codeErrorMessage={errors?.mobile_country_code}
          phoneErrorMessage={errors?.mobile}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          errorMessage={errors?.email}
          label={"Primary Email"}
          name="email"
          required
          textFieldProps={{
            disabled: true,
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            },
          }}
          value={personalData?.email}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
          placeholder={""}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          textFieldProps={{
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            },
          }}
          errorMessage={errors?.secondary_email}
          label={"Secondary Email"}
          placeholder={""}
          name="secondary_email"
          value={personalData?.secondary_email}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <CustomTextField
          errorMessage={errors?.current_place}
          label={"Current place of residence"}
          name="current_place"
          value={personalData?.current_place}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
          subLabel={
            "If it is different from above entered address information."
          }
        />
      </Grid> */}
    </Grid>
  );
};

const SocialLinks = ({ personalData, onchangeHandlerdata }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextField
          label={"LinkedIn"}
          name="linkedin_url"
          value={personalData?.linkedin_url}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
          textFieldProps={{
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <BiLogoLinkedin />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label={"X"}
          name="twitter_url"
          value={personalData?.twitter_url}
          onChange={(e) => {
            onchangeHandlerdata(e);
          }}
          textFieldProps={{
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <FaXTwitter />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
const BiologicalInfo = ({
  personalData,
  onchangeHandlerdata,
  bioValidationErrors,
  genderList,
  disabilityList,
  raceEthnicityList,
  vetranList,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
          <CustomTextField
            label="Race/ Ethnicity"
            name="race_ethnicity_id"
            required={false}
            value={personalData?.race_ethnicity_id}
            onChange={(e) => {
              onchangeHandlerdata(e);
            }}
            textFieldProps={{
              select: true,
              size: "small",
              sx: {
                width: "100%", // Default width for desktop
                "@media (max-width: 600px)": {
                  width: 250 + "px", // Set width to 250px for screens smaller than or equal to 600px
                },
              },
              //value: 10,
              InputLabelProps: { shrink: false },
            }}
            errorMessage={bioValidationErrors?.race_ethnicity_id}
          >
            {raceEthnicityList?.map((data) => {
              const { id, name } = data;

              return (
                // <MenuItem value={id} key={id} sx={{ width:100}} >
                //  {name}
                // </MenuItem>
                <MenuItem value={id} key={id} style={{ whiteSpace: "normal" }}>
                  {name}
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
            label="Gender"
            name="gender_id"
            required={false}
            value={personalData?.gender_id}
            onChange={(e) => {
              onchangeHandlerdata(e);
            }}
            textFieldProps={{
              select: true,
              size: "small",
              //value: 10,

              InputLabelProps: { shrink: false },
            }}
            errorMessage={bioValidationErrors?.gender_id}
            //   label='Age'

            //   onChange={handleChange}
          >
            {genderList?.map((data) => {
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
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
          <CustomTextField
            label="Disability"
            name="disability_id"
            value={personalData?.disability_id}
            onChange={(e) => {
              onchangeHandlerdata(e);
            }}
            required={false}
            textFieldProps={{
              select: true,
              size: "small",
              // value: 10,

              InputLabelProps: { shrink: false },
            }}
            //   label='Age'
            errorMessage={bioValidationErrors?.disability_id}
            //   onChange={handleChange}
          >
            {disabilityList?.map((data) => {
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
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
          <CustomTextField
            label="Veteran"
            name="veteran_id"
            value={personalData?.veteran_id}
            onChange={(e) => {
              onchangeHandlerdata(e);
            }}
            required={false}
            textFieldProps={{
              select: true,
              size: "small",
              // value: 10,

              InputLabelProps: { shrink: false },
            }}
            errorMessage={bioValidationErrors?.veteran_id}
            //   label='Age'

            //   onChange={handleChange}
          >
            {vetranList?.map((data) => {
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
  );
};

const PersonalInformationForm = ({
  isProfile = false,
  personalData,
  setOldPersonalInfo,
  currentFormData,
  setCurrentFormData,
  personalValidationErrors,
  contactValidationErrors,
  personalValidateForm,
  contactValidateForm,
  bioValidationErrors,
  bioValidateForm,
  profileImg,
  setProfileImg,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const profileimgData = useSelector(
  //   (state) => state?.onboard?.profileImgeData?.data?.filePath
  // );

  // Validation functions
  const [genderList, setGenderList] = useState([]);
  const [disabilityList, setDisabilityList] = useState([]);
  const [raceEthnicityList, setRaceEthnicityList] = useState([]);
  const [vetranList, setVetranList] = useState([]);

  const countyList = useSelector(
    (state) => state?.commoncontry?.countryData?.data?.country_list
  );

  const stateList = useSelector(
    (state) => state?.commoncontry?.stateData?.data?.states
  );

  const cityList = useSelector(
    (state) => state?.commoncontry?.cityData?.data?.cities
  );

  const referralSourceList = useSelector(
    (state) => state?.commoncontry?.referralData
  );

  const [personalInfo, setPersonalInfo] = useState({
    first_name: "",
    prefix: "",
    last_name: "",
    email: "",
    middle_name: "",
    bio: "",
    referral_source_id: 11,
    address_one: "",
    address_two: "",
    country_id: "",
    state_id: "",
    city_id: "",
    pincode: "",
    tel_num: "",
    mobile: "",
    secondary_email: "",
    current_place: "",
    linkedin_url: "",
    twitter_url: "",
    race_ethnicity_id: 8,
    gender_id: 3,
    disability_id: 3,
    veteran_id: 3,
    tel_country_code: "",
    mobile_country_code: "",
  });

  const [countryIdState, setCountryIdState] = useState("");
  const [stateIdState, setStateIdState] = useState("");
  const [cityIdState, setCityIdState] = useState("");

  // useEffect(() => {
  //   dispatch(uploadProfileImg(profileImg));
  // }, [profileImg]);
  const getGenderList = async () => {
    const res = await getGenderApi();
    setGenderList(res?.data?.data?.genders);
  };
  const getDisabilityList = async () => {
    const res = await getDisablityApi();
    setDisabilityList(res?.data?.data?.disabilities);
  };
  const getRaceEthnicityList = async () => {
    const res = await getRaceEthnicityApi();
    setRaceEthnicityList(res?.data?.data?.raceEthnicities);
  };
  const getVetranList = async () => {
    const res = await getVeteranApi();
    setVetranList(res?.data?.data?.veterans);
  };

  useEffect(() => {
    dispatch(countryGet());
    dispatch(referralSourceGet());
    getGenderList();
    getDisabilityList();
    getRaceEthnicityList();
    getVetranList();
  }, []);

  useEffect(() => {
    setCurrentFormData({
      ...currentFormData,
      ...personalInfo,
    });
  }, [personalInfo]);

  useEffect(() => {
    dispatch(stateGet(countryIdState));
    if (stateIdState) dispatch(cityGet(stateIdState));
  }, [countryIdState, stateIdState]);

  useEffect(() => {
    if (personalData) {
      dispatch(stateGet(personalData?.country?.id));
      dispatch(cityGet(personalData?.state_id));
      setCityIdState(personalData?.city_id);
      setStateIdState(personalData?.state_id);
      setCountryIdState(personalData?.country_id);
      setProfileImg(personalData?.profile_pic);
      let data = {
        first_name: personalData?.first_name || "",
        prefix: personalData?.prefix || "",
        last_name: personalData?.last_name || "",
        email: personalData?.email || "",
        middle_name: personalData?.middle_name || "",
        bio: personalData?.bio || "",
        referral_source_id: personalData?.referral_source_id,
        address_one: personalData?.address_one || "",
        address_two: personalData?.address_two || "",
        country_id: personalData?.country?.id,
        state_id: personalData?.state_id,
        city_id: personalData?.city_id,
        pincode: personalData?.pincode || "",
        tel_num: personalData?.tel_num || "",
        mobile: personalData?.mobile || "",
        secondary_email: personalData?.secondary_email || "",
        current_place: personalData?.current_place || "",
        linkedin_url: personalData?.linkedin_url || "",
        twitter_url: personalData?.twitter_url || "",
        race_ethnicity_id: personalData?.race_ethnicity_id,
        gender_id: personalData?.gender_id,
        disability_id: personalData?.disability_id,
        veteran_id: personalData?.veteran_id,
        tel_country_code: personalData?.tel_country_code || "",
        mobile_country_code: personalData?.mobile_country_code || "",
      };
      setPersonalInfo(data);
      setOldPersonalInfo(data);
    }
  }, [personalData]);

  // const handlePersonalChange = (selectedOption,e) => {

  //   const { name, value } = e.target;
  //   setPersonalInfo((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handlePersonalChange = (e, selectedOption) => {
    if (selectedOption) {
      const value = selectedOption;
      if (e?.name === "country_id") {
        setCountryIdState(value.target.value);
        setPersonalInfo({
          ...personalInfo,
          country_id: value.target.value, 
        });
      } else if (e?.name === "state_id") {
        setStateIdState(value.target.value);
        setPersonalInfo({
          ...personalInfo,
          state_id: value.target.value,
        });
      } else if (e?.name === "city_id") {
        setCityIdState(value.target.value);
        setPersonalInfo({
          ...personalInfo,
          city_id: value.target.value,
        });
      }
    } else if (e) {
      if (e?.name) {
        const { name, value } = e;
        setPersonalInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else {
        const { name, value } = e.target;
        setPersonalInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };
  // PERSONAL SUBMIT
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    const isValid = personalValidateForm();
    const personalOldData = {
      first_name: personalData?.first_name || "",
      prefix: personalData?.prefix || "",
      last_name: personalData?.last_name || "",
      middle_name: personalData?.middle_name || "",
      bio: personalData?.bio || "",
      referral_source_id: personalData?.referral_source_id,
      profile_pic: personalData?.profile_pic,
    };
    const personalCurrentData = {
      profile_pic: profileImg,
      first_name: personalInfo.first_name || "",
      prefix: personalInfo.prefix || "",
      last_name: personalInfo.last_name || "",
      middle_name: personalInfo.middle_name || "",
      bio: personalInfo.bio || "",
      referral_source_id: personalInfo.referral_source_id,
    };

    const idObjectsEqual = areObjectsEqual(
      personalOldData,
      personalCurrentData
    );
    if (!idObjectsEqual) {
      if (isValid) {
        const updateData = {
          section_type: "general_information",
          ...personalCurrentData,
        };
        dispatch(
          isProfile ? profileGeneralInfo(updateData) : generalInfo(updateData)
        )
          .then((response) => {
            if (response.payload.status === true) {
              notify("success", response.payload.message);
              dispatch(isProfile ? ProfileView() : onboardingView());
            } else {
              notify("error", response.payload.message);
            }
          })
          .catch((e) => {
            notify(
              "error",
              e.response?.data?.message
                ? e.response?.data?.message
                : "Something went wrong !"
            );
          });
      } else {
        notify("error", "Please fill required field");
      }
    } else {
      notify("info", "No changes made");
    }
  };

  // CONTACT SUBMIT
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const contactOldData = {
      address_one: personalData?.address_one || "",
      address_two: personalData?.address_two || "",
      country_id: personalData?.country?.id,
      state_id: personalData?.state_id,
      city_id: personalData?.city_id,
      pincode: personalData?.pincode || "",
      tel_num: personalData?.tel_num || "",
      mobile: personalData?.mobile || "",
      secondary_email: personalData?.secondary_email || "",
      current_place: personalData?.current_place || "",
      mobile_country_code: personalData?.mobile_country_code || "",
      tel_country_code: personalData?.tel_country_code || "",
    };
    const contactCurrentData = {
      address_one: personalInfo.address_one,
      address_two: personalInfo.address_two,
      country_id: countryIdState,
      state_id: stateIdState,
      city_id: cityIdState,
      pincode: personalInfo.pincode,
      tel_num: personalInfo.tel_num,
      mobile: personalInfo.mobile,
      tel_country_code: personalInfo.tel_country_code,
      mobile_country_code: personalInfo.mobile_country_code,
      secondary_email: personalInfo.secondary_email || "",
      current_place: personalInfo.current_place || "",
    };
    const isValid = contactValidateForm();
    const idObjectsEqual = areObjectsEqual(contactOldData, contactCurrentData);
    if (!idObjectsEqual) {
      if (isValid) {
        const updateData = {
          section_type: "contact_information",
          ...contactCurrentData,
        };
        dispatch(
          isProfile ? profileGeneralInfo(updateData) : generalInfo(updateData)
        )
          .then((response) => {
            if (response.payload.status === true) {
              notify("success", response.payload.message);
              dispatch(isProfile ? ProfileView() : onboardingView());
            } else {
              notify("error", response.payload.message);
            }
          })
          .catch((e) => {
            notify(
              "error",
              e.response?.data?.message
                ? e.response?.data?.message
                : "Something went wrong !"
            );
          });
      } else {
        notify("error", "Please fill required field");
      }
    } else {
      notify("info", "No changes made");
    }
  };

  // CONTACT SUBMIT
  const handleSocialLinkSubmit = (e) => {
    e.preventDefault();
    const socialOldData = {
      linkedin_url: personalData?.linkedin_url || "",
      twitter_url: personalData?.twitter_url || "",
    };
    const socialCurrentData = {
      linkedin_url: personalInfo.linkedin_url || "",
      twitter_url: personalInfo.twitter_url || "",
    };
    const idObjectsEqual = areObjectsEqual(socialOldData, socialCurrentData);
    if (!idObjectsEqual) {
      const updateData = {
        section_type: "social_media",
        ...socialCurrentData,
      };
      dispatch(
        isProfile ? profileGeneralInfo(updateData) : generalInfo(updateData)
      )
        .then((response) => {
          if (response.payload.status === true) {
            notify("success", response.payload.message);
            dispatch(isProfile ? ProfileView() : onboardingView());
          } else {
            notify("error", response.payload.message);
          }
        })
        .catch((e) => {
          notify(
            "error",
            e.response?.data?.message
              ? e.response?.data?.message
              : "Something went wrong !"
          );
        });
    } else {
      notify("info", "No changes made");
    }
  };

  const handleBioSubmit = (e) => {
    e.preventDefault();
    const bioOldData = {
      race_ethnicity_id: personalData.race_ethnicity_id,
      gender_id: personalData.gender_id,
      disability_id: personalData.disability_id,
      veteran_id: personalData.veteran_id,
    };
    const bioCurrentData = {
      race_ethnicity_id: personalInfo.race_ethnicity_id,
      gender_id: personalInfo.gender_id,
      disability_id: personalInfo.disability_id,
      veteran_id: personalInfo.veteran_id,
    };
    const isValid = bioValidateForm();
    const idObjectsEqual = areObjectsEqual(bioOldData, bioCurrentData);
    if (!idObjectsEqual) {
      // if (isValid) {
      const updateData = {
        section_type: "bio_information",
        ...bioCurrentData,
      };
      dispatch(
        isProfile ? profileGeneralInfo(updateData) : generalInfo(updateData)
      )
        .then((response) => {
          if (response.payload.status === true) {
            notify("success", response.payload.message);
            dispatch(isProfile ? ProfileView() : onboardingView());
          } else {
            notify("error", response.payload.message);
          }
        })
        .catch((e) => {
          notify(
            "error",
            e.response?.data?.message
              ? e.response?.data?.message
              : "Something went wrong !"
          );
        });
      // } else {
      //   notify("error", "Please fill required field");
      // }
    } else {
      notify("info", "No changes made");
    }
  };

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
              Personal Information
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
              label={`It will take 3 minutes to complete this step`}
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
            Welcome to the Zerozilla Job Registry
          </Typography>
          <Typography variant="subtitle2" color="white">
            Thank you for taking the time to create a profile with us. Upon
            completion, your profile will seamlessly generate a personalized
            dashboard featuring job opportunities tailored to your specific job
            preferences. Moreover, our Zerozilla Executive Search associates may
            you regarding roles that closely align with your qualifications. The
            process of completing your profile is streamlined, requiring only
            <strong> 15-20 minutes </strong>
            of your time. We look forward to assisting you in advancing your
            career aspirations.
          </Typography>
        </Card>
        <OnboardFormTemplate
          formTitle={"General Information"}
          form={
            <PersonalInfo
              errors={personalValidationErrors}
              personalData={personalInfo}
              onchangeHandlerdata={handlePersonalChange}
              setUploadedUrl={setProfileImg}
              profileimgData={profileImg}
              personalValidateForm={personalValidateForm}
              referralSourceList={referralSourceList}
            />
          }
          onsubmit={handlePersonalSubmit}
        />
        <OnboardFormTemplate
          formTitle={"Contact Information"}
          form={
            <ContactInfo
              errors={contactValidationErrors}
              personalData={personalInfo}
              onchangeHandlerdata={handlePersonalChange}
              countyList={countyList}
              stateList={stateList}
              cityList={cityList}
              contactValidateForm={contactValidateForm}
            />
          }
          onsubmit={handleContactSubmit}
        />
        <OnboardFormTemplate
          formTitle={"Social Media"}
          form={
            <SocialLinks
              personalData={personalInfo}
              onchangeHandlerdata={handlePersonalChange}
            />
          }
          onsubmit={handleSocialLinkSubmit}
        />
        <OnboardFormTemplate
          formTitle={"Equal Opportunity Employment Info"}
          form={
            <BiologicalInfo
              personalData={personalInfo}
              onchangeHandlerdata={handlePersonalChange}
              bioValidationErrors={bioValidationErrors}
              genderList={genderList}
              disabilityList={disabilityList}
              raceEthnicityList={raceEthnicityList}
              vetranList={vetranList}
            />
          }
          onsubmit={handleBioSubmit}
        />
      </Stack>
    </Stack>
  );
};

export default PersonalInformationForm;
