import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Modal,
  Typography,
  Button,
  MenuItem,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CustomTextField from "../../../theme/ui/TextField";
import { LanguagesApi, EducationInfoApi } from "../../../config/ApiHandler";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import notify from "../../../utils/Toast";
import { onboardingView } from "../../../redux/onboarding/personalInformation/PersonalInfoAction";

const Languages = ({ open7, handleClose7 }) => {
  const dispatch = useDispatch();

  const [languageData, setLanguageData] = useState([]);
  const [languageInfo, setLanguageInfo] = useState([]);
  const [notProvideLanguage, setNotProvideLanguage] = useState(false);

  const educationData = useSelector(
    (state) => state?.onboard?.onboardViewData?.data?.educationalBackground
  );

  const getLanguageList = async () => {
    try {
      const res = await LanguagesApi();
      setLanguageData(res?.data?.data?.languages || []);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  useEffect(() => {
    getLanguageList();

    if (educationData?.languages?.length > 0) {
      setLanguageInfo(
        educationData.languages.map((lang) => ({
          language_id: lang.language_id || "",
          speak: lang.speak || false,
          read: lang.read || false,
          write: lang.write || false,
        }))
      );
      setNotProvideLanguage(educationData.not_provide_language || false);
    } else {
      setLanguageInfo([{ language_id: "", speak: false, read: false, write: false }]);
    }
  }, [educationData]);

  const addItemHandler = () => {
    setLanguageInfo([
      ...languageInfo,
      { language_id: "", speak: false, read: false, write: false },
    ]);
  };

  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = languageInfo.map((item, idx) => {
      if (idx === index) {
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
      }
      return item;
    });

    setLanguageInfo(updatedFormData);
  };

  const deleteItemHandler = (index) => {
    if (index === 0) return;

    const updatedFormData = languageInfo.filter((_, idx) => idx !== index);
    setLanguageInfo(updatedFormData);
  };

  const handleLanguageSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      section_type: "language",
      languages: languageInfo,
      not_provide_language: notProvideLanguage,
    };

    try {
      const res = await EducationInfoApi(updateData);
      if (res?.data?.status === true) {
        notify("success", res?.data?.message);
        dispatch(onboardingView());
      } else {
        notify("error", res?.data?.message);
      }
    } catch (error) {
      console.error("Error updating language:", error);
      notify("error", "An error occurred while updating.");
    }
  };

  return (
    <Modal open={open7} onClose={handleClose7}>
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
            <Typography variant="h6" className="modal_heading" sx={{ mb: 2 }}>
              Languages
            </Typography>
            <Box onClick={handleClose7} sx={{ cursor: "pointer" }}>
              <Typography variant="body2">✖</Typography>
            </Box>
          </Box>

          {/* Checkbox to Opt-Out */}
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={notProvideLanguage}
                onChange={(e) => setNotProvideLanguage(e.target.checked)}
              />
            }
            label="I don’t wish to provide language information at this time"
          /> */}

          {/* Dynamic Language Fields */}
          {languageInfo.map((item, index) => (
            <Grid container spacing={3} key={index}>
              <Grid item xs={12} my={2}>
                <CustomTextField
                  label="Language"
                  name="language_id"
                  value={item.language_id}
                  onChange={(e) => handleFieldChange(e, "language_id", index)}
                  textFieldProps={{
                    select: true,
                    size: "small",
                    InputLabelProps: { shrink: false },
                  }}
                  required
                >
                  {languageData.map((data) => (
                    <MenuItem value={data.id} key={data.id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </CustomTextField>

                {/* Checkbox Selection */}
                <FormGroup
                  row
                  sx={{
                    flexDirection: "column",
                    marginLeft: "8px",
                    paddingTop: "8px",
                    gap: "8px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="speak"
                        checked={item.speak}
                        onChange={(e) => handleFieldChange(e, "speak", index, "checkbox")}
                        disabled={item.read || item.write}
                      />
                    }
                    label="Beginner"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="read"
                        checked={item.read}
                        onChange={(e) => handleFieldChange(e, "read", index, "checkbox")}
                        disabled={item.speak || item.write}
                      />
                    }
                    label="Intermediate"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="write"
                        checked={item.write}
                        onChange={(e) => handleFieldChange(e, "write", index, "checkbox")}
                        disabled={item.speak || item.read}
                      />
                    }
                    label="Advanced"
                  />
                </FormGroup>

                {/* Delete Button (Only when index > 0) */}
                {index > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteItemHandler(index)}
                    startIcon={<MdDelete />}
                  >
                    Remove
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}

          <Button variant="contained" color="info" onClick={addItemHandler}>
            Add more
          </Button>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
            <Button onClick={handleClose7} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleLanguageSubmit} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Languages;
