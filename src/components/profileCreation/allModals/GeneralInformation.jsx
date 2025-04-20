import React, { useState, useEffect, useRef } from "react";
import {
  Backdrop,
  Box,
  Card,
  Fade,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Button from "../../../theme/overrides/Button";
import "./modal.css";
import { BorderAll } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CustomTextField from "../../../theme/ui/TextField";
import { useDispatch, useSelector } from "react-redux";
import { referralSourceGet } from "../../../redux/commonApi/CountryAction";
import {
  ProfileView,
  generalInfo,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
const prefixOptions = ["Ms", "Miss", "Mr", "Mrs", "Dr", "Prof"];
import notify from "../../../utils/Toast";
import { PROFILEIMAGEUPLOADApi } from "../../../config/ApiHandler";
import axios from "axios";
import { AI_URL } from "../../../config/UrlConfig";

const GeneralInformation = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [profile_pic, setprofile_pic] = useState("");

  useEffect(() => {
    dispatch(referralSourceGet());
    dispatch(onboardingView());
  }, []);

  const referralSourceList = useSelector(
    (state) => state?.commoncontry?.referralData
  );
  const personalDataFromStore = useSelector(
    (state) => state?.onboard?.onboardViewData?.data?.personalInformation
  );

  const [personalData, setPersonalData] = useState({
    prefix: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    bio: "",
    referral_source_id: "",
    profile_pic: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (personalDataFromStore) {
      setPersonalData({
        prefix: personalDataFromStore?.prefix || "",
        first_name: personalDataFromStore?.first_name || "",
        last_name: personalDataFromStore?.last_name || "",
        middle_name: personalDataFromStore?.middle_name || "",
        bio: personalDataFromStore?.bio || "",
        referral_source_id: personalDataFromStore?.referral_source_id || "",
        profile_pic: personalDataFromStore?.profile_pic || "",
      });
    }
  }, [personalDataFromStore]);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      notify("error", "Only JPG, JPEG, and PNG files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await PROFILEIMAGEUPLOADApi(formData);

      if (response?.status === 200) {
        const imageUrl = response?.data?.data?.filePath;
        setPersonalData((prev) => ({
          ...prev,
          file: imageUrl,
          profile_pic: imageUrl,
        }));

        setprofile_pic(imageUrl);
        notify("success", "Profile image uploaded successfully!");
      } else {
        notify("error", "Failed to upload image. Try again.");
      }
    } catch (error) {
      notify("error", "Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const onchangeHandlerdata = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!personalData.prefix.trim()) newErrors.prefix = "Prefix is required";
    if (!personalData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!personalData.last_name.trim())
      newErrors.last_name = "Last name is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      notify("error", "Please fill required fields");
      return;
    }

    const updateData = {
      section_type: "general_information",
      ...personalData,
    };

    dispatch(generalInfo(updateData))
      .then((response) => {
        if (response.payload.status) {
          notify("success", response.payload.message);
          dispatch(onboardingView());
        } else {
          notify("error", response.payload.message);
        }
      })
      .catch((e) => {
        notify("error", e.response?.data?.message || "Something went wrong!");
      });
  };

  const handleGenerateBio = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.post(AI_URL, {
        prompt: personalData.bio || "Generate a professional biography for me",
      });

      const generatedBio =
        response.data?.qa?.[0]?.answer || "AI failed to generate content.";

      setPersonalData((prev) => ({
        ...prev,
        bio: generatedBio,
      }));
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Failed to generate bio. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="modal_card_section">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            className="modal_heading"
            sx={{ mb: 5 }}
          >
            General Information
          </Typography>
        </Box>

        <Box className="modal_card">
          <Typography className="modal_card_subtitle" sx={{ mb: 2 }}>
            {" "}
            Upload your Profile PIcture
          </Typography>
        </Box>
        <Box
          className="upload_file"
          onClick={handleFileUpload}
          style={{ cursor: "pointer" }}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {loading ? (
            <Typography variant="body2">Uploading...</Typography>
          ) : personalData.profile_pic || profile_pic ? (
            <img
              src={personalData.profile_pic || profile_pic}
              alt="Profile"
              style={{
                width: "119px",
                height: "119px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="119"
                height="119"
                viewBox="0 0 119 119"
                fill="none"
              >
                <g clipPath="url(#clip0_500_576)">
                  <path
                    d="M58.6521 57.3226C66.5272 57.3226 73.3464 54.4982 78.9182 48.9255C84.49 43.3538 87.3144 36.5364 87.3144 28.6604C87.3144 20.7871 84.49 13.9689 78.9173 8.3953C73.3446 2.82446 66.5263 0 58.6521 0C50.7761 0 43.9587 2.82446 38.3869 8.39621C32.8151 13.968 29.9897 20.7862 29.9897 28.6604C29.9897 36.5364 32.8151 43.3547 38.3878 48.9264C43.9605 54.4973 50.7788 57.3226 58.6521 57.3226Z"
                    fill="white"
                  />
                  <path
                    d="M108.803 91.5048C108.643 89.186 108.318 86.6566 107.839 83.9856C107.356 81.2946 106.734 78.7507 105.99 76.4256C105.221 74.0224 104.175 71.6491 102.882 69.3749C101.54 67.0143 99.9641 64.9589 98.1955 63.2675C96.3461 61.498 94.0818 60.0753 91.4635 59.0376C88.8542 58.0053 85.9625 57.4824 82.8693 57.4824C81.6545 57.4824 80.4797 57.9808 78.2109 59.4579C76.8145 60.3685 75.1812 61.4217 73.3582 62.5865C71.7993 63.5798 69.6875 64.5104 67.0791 65.3529C64.5343 66.1763 61.9504 66.594 59.4001 66.594C56.8498 66.594 54.2669 66.1763 51.7193 65.3529C49.1136 64.5113 47.0019 63.5807 45.4448 62.5874C43.639 61.4335 42.0048 60.3804 40.5876 59.457C38.3215 57.9799 37.1457 57.4814 35.931 57.4814C32.8369 57.4814 29.9461 58.0053 27.3377 59.0385C24.7212 60.0744 22.4559 61.4971 20.6047 63.2684C18.8371 64.9607 17.26 67.0152 15.92 69.3749C14.6281 71.6491 13.5822 74.0215 12.8123 76.4265C12.0687 78.7516 11.4468 81.2946 10.9638 83.9856C10.4853 86.653 10.1603 89.1833 9.99959 91.5075C9.84161 93.7845 9.76172 96.1478 9.76172 98.5346C9.76172 104.746 11.7364 109.775 15.6304 113.484C19.4762 117.144 24.565 119 30.7532 119H88.0525C94.2407 119 99.3277 117.145 103.174 113.484C107.069 109.778 109.044 104.748 109.044 98.5337C109.043 96.136 108.962 93.7709 108.803 91.5048Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_500_576">
                    <rect width="119" height="119" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.2832 2.29997L17.6915 1.7083C16.7998 0.816634 15.3415 0.816634 14.4498 1.7083L5.85817 10.3166C5.6165 10.5583 5.4665 10.875 5.43317 11.2166L5.20817 13.6583C5.18317 13.9666 5.2915 14.2666 5.50817 14.4916C5.70817 14.6916 5.9665 14.8 6.2415 14.8H6.33317L8.77484 14.575C9.1165 14.5416 9.43317 14.3916 9.67484 14.15L18.2748 5.54997C18.7082 5.11663 18.9498 4.54163 18.9498 3.9333C18.9498 3.32497 18.7082 2.74163 18.2748 2.31663L18.2832 2.29997Z"
                  fill="#C31F5D"
                />
              </svg>
            </>
          )}
        </Box>
        <Grid item xs={12} md={12} sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
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
                  <MenuItem value={""} disabled selected>
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
                  rows: 4,
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                }}
              >
                <button
                  onClick={handleGenerateBio}
                  style={{
                    borderRadius: "5px",
                    padding: "5px 10px",
                    backgroundColor: "#0D6EFD",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                  disabled={loading}
                >
                  {loading ? "Generating..." : "AI"}
                </button>
              </div>
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
        </Grid>
        <Box
          className="modal_footer"
          sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}
        >
          <button className="cancle_button" onClick={handleClose}>
            Cancel
          </button>
          <button className="save_button" onClick={handlePersonalSubmit}>
            Save
          </button>
        </Box>
      </Box>
      {/* </Box>
            </Modal> */}
    </>
  );
};

export default GeneralInformation;