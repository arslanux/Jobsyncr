import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import Button from "../../../theme/overrides/Button";
import "./modal.css";
import CustomTextField from "../../../theme/ui/TextField";
import PhoneInput from "../../../pages/dashboard/Onboard/component/PhoneInput";
import { EmailOutlined } from "@mui/icons-material";
import {
  generalInfo,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import {
  cityGet,
  countryGet,
  stateGet,
} from "../../../redux/commonApi/CountryAction";
import notify from "../../../utils/Toast";

const ContactInformation = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const [countryIdState, setCountryIdState] = useState("");
  const [stateIdState, setStateIdState] = useState("");

  const countyList = useSelector(
      (state) => state?.commoncontry?.countryData?.data?.country_list
    );
  
    const stateList = useSelector(
      (state) => state?.commoncontry?.stateData?.data?.states
    );
  
    const cityList = useSelector(
      (state) => state?.commoncontry?.cityData?.data?.cities
    );

  
  useEffect(() => {
    dispatch(countryGet());
    dispatch(onboardingView());
  }, [dispatch]);

  const personalDataFromStore = useSelector(
    (state) => state?.onboard?.onboardViewData?.data?.personalInformation
  );

  useEffect(() => {
    if (countryIdState) {
      dispatch(stateGet(countryIdState));
    }
  }, [countryIdState, dispatch]);

  useEffect(() => {
    if (stateIdState) {
      dispatch(cityGet(stateIdState));
    }
  }, [stateIdState, dispatch]);

  const [personalData, setPersonalData] = useState({
    tel_num: "",
    mobile: "",
    address_one: "",
    address_two: "",
    email: "",
    secondary_email: "",
    country_id: "",
    state_id: "",
    city_id: "",
    pincode: "",
    tel_country_code: "",
    mobile_country_code: "",
  });

  useEffect(() => {
    if (personalDataFromStore) {
      const prefill = {
        address_one: personalDataFromStore?.address_one || "",
        address_two: personalDataFromStore?.address_two || "",
        country_id: personalDataFromStore?.country?.id || "",
        state_id: personalDataFromStore?.state_id || "",
        city_id: personalDataFromStore?.city_id || "",
        pincode: personalDataFromStore?.pincode || "",
        tel_num: personalDataFromStore?.tel_num || "",
        mobile: personalDataFromStore?.mobile || "",
        email: personalDataFromStore?.email || "",
        secondary_email: personalDataFromStore?.secondary_email || "",
        tel_country_code: personalDataFromStore?.tel_country_code || "",
        mobile_country_code: personalDataFromStore?.mobile_country_code || "",
      };
      setPersonalData(prefill);
      setCountryIdState(prefill.country_id);
      setStateIdState(prefill.state_id);

      dispatch(stateGet(prefill.country_id));
      dispatch(cityGet(prefill.state_id));
    }
  }, [personalDataFromStore, dispatch]);

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

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      section_type: "contact_information",
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
          Contact Information
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Telephone Number */}
        <Grid item xs={12} md={6}>
          <PhoneInput
            phone={personalData.tel_num}
            label="Telephone Number"
            phoneOnChangeHandler={(e) =>
              onchangeHandlerdata({
                target: { name: "tel_num", value: e?.target?.value },
              })
            }
            code={personalData.tel_country_code}
            codeOnChangeHandler={(e) =>
              onchangeHandlerdata({
                target: { name: "tel_country_code", value: e?.target?.value },
              })
            }
            codeErrorMessage={errors.tel_country_code}
            phoneErrorMessage={errors.tel_num}
          />
        </Grid>

        {/* Mobile Number */}
        <Grid item xs={12} md={6}>
          <PhoneInput
            phone={personalData.mobile}
            label="Cell/Mobile Number"
            phoneOnChangeHandler={(e) =>
              onchangeHandlerdata({
                target: { name: "mobile", value: e?.target?.value },
              })
            }
            code={personalData.mobile_country_code}
            codeOnChangeHandler={(e) =>
              onchangeHandlerdata({
                target: { name: "mobile_country_code", value: e?.target?.value },
              })
            }
            required={false}
            codeErrorMessage={errors.mobile_country_code}
            phoneErrorMessage={errors.mobile}
          />
        </Grid>

        {/* Primary Email */}
        <Grid item xs={12} md={6}>
          <CustomTextField
            errorMessage={errors.email}
            label="Primary Email"
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
            value={personalData.email}
            onChange={onchangeHandlerdata}
            placeholder=""
          />
        </Grid>

        {/* Secondary Email */}
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
            errorMessage={errors.secondary_email}
            label="Secondary Email"
            placeholder=""
            name="secondary_email"
            value={personalData.secondary_email}
            onChange={onchangeHandlerdata}
          />
        </Grid>

        {/* Address Line 1 */}
        <Grid item xs={12}>
          <CustomTextField
            errorMessage={errors.address_one}
            label="Address Line 1"
            name="address_one"
            value={personalData.address_one}
            onChange={onchangeHandlerdata}
            required={false}
          />
        </Grid>

        {/* Address Line 2 */}
        <Grid item xs={12}>
          <CustomTextField
            errorMessage={errors.address_two}
            label="Address Line 2"
            name="address_two"
            value={personalData.address_two}
            onChange={onchangeHandlerdata}
          />
        </Grid>

        {/* Country */}
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <CustomTextField
              errorMessage={errors.country_id}
              label="Country"
              name="country_id"
              value={personalData.country_id}
              placeholder="Please select an option"
              required
              onChange={(e) => {
                onchangeHandlerdata(e);
                setCountryIdState(e.target.value);
              }}
              textFieldProps={{
                select: true,
                size: "small",
                value: personalData.country_id,
                InputLabelProps: { shrink: false },
              }}
            >
              {(countyList || []).map((data) => (
                <MenuItem value={data.id} key={data.id}>
                  {data.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </FormControl>
        </Grid>

        {/* State/Province */}
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <CustomTextField
              errorMessage={errors.state_id}
              label="State/Province"
              name="state_id"
              value={personalData.state_id}
              placeholder="Please select an option"
              onChange={(e) => {
                onchangeHandlerdata(e);
                setStateIdState(e.target.value);
              }}
              required
              textFieldProps={{
                select: true,
                size: "small",
                value: personalData.state_id,
                InputLabelProps: { shrink: false },
              }}
            >
              {(stateList||[]).map((data) => (
                <MenuItem value={data.id} key={data.id}>
                  {data.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </FormControl>
        </Grid>

        {/* City */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <CustomTextField
              errorMessage={errors.city_id}
              label="City"
              name="city_id"
              required
              value={personalData.city_id}
              placeholder="Please select an option"
              onChange={onchangeHandlerdata}
              textFieldProps={{
                select: true,
                size: "small",
                value: personalData.city_id,
                InputLabelProps: { shrink: false },
              }}
            >
              {(cityList||[]).map((data) => (
                <MenuItem value={data.id} key={data.id}>
                  {data.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </FormControl>
        </Grid>

        {/* Zip Code */}
        <Grid item xs={12} md={6}>
          <CustomTextField
            errorMessage={errors.pincode}
            label="Zip Code"
            placeholder=""
            name="pincode"
            required
            value={personalData.pincode}
            onChange={onchangeHandlerdata}
          />
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
  );
};

export default ContactInformation;
