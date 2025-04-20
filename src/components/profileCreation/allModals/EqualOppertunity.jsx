import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import "./modal.css";
import CustomTextField from "../../../theme/ui/TextField";
import notify from "../../../utils/Toast";
import {
  generalInfo,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import {
  getDisablityApi,
  getGenderApi,
  getRaceEthnicityApi,
  getVeteranApi,
} from "../../../config/ApiHandler";


const EqualOppertunity = ({ open3, handleClose3 }) => {
  const dispatch = useDispatch();

  const [personalData, setPersonalData] = useState({
    race_ethnicity_id: "",
    gender_id: "",
    disability_id: "",
    veteran_id: "",
  });

  const [genderList, setGenderList] = useState([]);
  const [disabilityList, setDisabilityList] = useState([]);
  const [raceEthnicityList, setRaceEthnicityList] = useState([]);
  const [vetranList, setVetranList] = useState([]);
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

    getGenderList();
    getDisabilityList();
    getRaceEthnicityList();
    getVetranList();
  }, []);
  const [bioValidationErrors, setBioValidationErrors] = useState({});



  const bioInformationFromStore = useSelector(
    (state) => state?.onboard?.onboardViewData?.data?.personalInformation
  );

  useEffect(() => {
    dispatch(onboardingView());
  }, [dispatch]);

  useEffect(() => {
    if (bioInformationFromStore) {
      setPersonalData({
        race_ethnicity_id: bioInformationFromStore?.race_ethnicity_id || "",
        gender_id: bioInformationFromStore?.gender_id || "",
        disability_id: bioInformationFromStore?.disability_id || "",
        veteran_id: bioInformationFromStore?.veteran_id || "",
      });
    }
  }, [bioInformationFromStore]);

  const onchangeHandlerdata = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setBioValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleBioSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      section_type: "bio_information",
      ...personalData,
    };

    dispatch(generalInfo(updateData))
      .then((response) => {
        if (response.payload.status) {
          notify("success", response.payload.message);
          dispatch(onboardingView());
          handleClose3();
        } else {
          notify("error", response.payload.message);
        }
      })
      .catch((err) => {
        notify("error", err.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <Modal open={open3} onClose={handleClose3}>
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
              sx={{ mb: 5 }}
            >
              Equal Opportunity Employment Information
            </Typography>
            <Box onClick={handleClose3}>
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
          <Grid container spacing={3}>
            {/* Race/Ethnicity */}
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <CustomTextField
                  label="Race/ Ethnicity"
                  name="race_ethnicity_id"
                  required={false}
                  value={personalData.race_ethnicity_id}
                  onChange={onchangeHandlerdata}
                  textFieldProps={{
                    select: true,
                    size: "small",
                    sx: {
                      width: "100%",
                      "@media (max-width: 600px)": {
                        width: "250px",
                      },
                    },
                    InputLabelProps: { shrink: false },
                  }}
                  errorMessage={bioValidationErrors.race_ethnicity_id}
                >
                  {raceEthnicityList.map((data) => {
                    const { id, name } = data;
                    return (
                      <MenuItem value={id} key={id} style={{ whiteSpace: "normal" }}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              </FormControl>
            </Grid>

            {/* Gender */}
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <CustomTextField
                  label="Gender"
                  name="gender_id"
                  required={false}
                  value={personalData.gender_id}
                  onChange={onchangeHandlerdata}
                  textFieldProps={{
                    select: true,
                    size: "small",
                    InputLabelProps: { shrink: false },
                  }}
                  errorMessage={bioValidationErrors.gender_id}
                >
                  {genderList.map((data) => {
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

            {/* Disability */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <CustomTextField
                  label="Disability"
                  name="disability_id"
                  value={personalData.disability_id}
                  onChange={onchangeHandlerdata}
                  required={false}
                  textFieldProps={{
                    select: true,
                    size: "small",
                    InputLabelProps: { shrink: false },
                  }}
                  errorMessage={bioValidationErrors.disability_id}
                >
                  {disabilityList.map((data) => {
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

            {/* Veteran */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <CustomTextField
                  label="Veteran"
                  name="veteran_id"
                  value={personalData.veteran_id}
                  onChange={onchangeHandlerdata}
                  required={false}
                  textFieldProps={{
                    select: true,
                    size: "small",
                    InputLabelProps: { shrink: false },
                  }}
                  errorMessage={bioValidationErrors.veteran_id}
                >
                  {vetranList.map((data) => {
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
          <Box
            className="modal_footer"
            sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}
          >
            <button onClick={handleClose3} className="cancle_button">
              Cancel
            </button>
            <button onClick={handleBioSubmit} className="save_button">
              Save
            </button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EqualOppertunity;
