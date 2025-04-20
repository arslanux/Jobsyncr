import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import "./modal.css";
import CustomTextField from "../../../theme/ui/TextField";
import { BiLogoLinkedin } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import {
  generalInfo,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import notify from "../../../utils/Toast";

const SocialMediaProfile = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [socialData, setSocialData] = useState({
    linkedin_url: "",
    twitter_url: "",
  });
  const [errors, setErrors] = useState({});

  const socialMediaFromStore = useSelector(
    (state) => state?.onboard?.onboardViewData?.data?.personalInformation
  );

  useEffect(() => {
    dispatch(onboardingView());
  }, [dispatch]);

  useEffect(() => {
    if (socialMediaFromStore) {
      setSocialData({
        linkedin_url: socialMediaFromStore?.linkedin_url || "",
        twitter_url: socialMediaFromStore?.twitter_url || "",
      });
    }
  }, [socialMediaFromStore]);

  const onchangeHandlerdata = (e) => {
    const { name, value } = e.target;
    setSocialData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      section_type: "social_media",
      ...socialData,
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
      .catch((err) => {
        notify("error", e.response?.data?.message || "Something went wrong!");

      });
  };

  return (
    <Box className="modal_card_section">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          className="modal_heading"
          sx={{ mb: 5 }}
        >
          Social media
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {/* LinkedIn URL */}
        <Grid item xs={12}>
          <CustomTextField
            label="LinkedIn"
            name="linkedin_url"
            value={socialData.linkedin_url}
            onChange={onchangeHandlerdata}
            textFieldProps={{
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <BiLogoLinkedin />
                  </InputAdornment>
                ),
              },
            }}
            errorMessage={errors.linkedin_url}
          />
        </Grid>
        {/* Twitter URL */}
        <Grid item xs={12}>
          <CustomTextField
            label="X"
            name="twitter_url"
            value={socialData.twitter_url}
            onChange={onchangeHandlerdata}
            textFieldProps={{
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaXTwitter />
                  </InputAdornment>
                ),
              },
            }}
            errorMessage={errors.twitter_url}
          />
        </Grid>
      </Grid>
      <Box
        className="modal_footer"
        sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}
      >
        <button onClick={handleClose} className="cancle_button">
          Cancel
        </button>
        <button onClick={handleSocialSubmit} className="save_button">
          Save
        </button>
      </Box>
    </Box>
  );
};

export default SocialMediaProfile;
