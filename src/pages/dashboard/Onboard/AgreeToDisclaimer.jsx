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
} from "@mui/material";
import { DisclamerApi } from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";

const Disclaimer = ({ agreedTerms, handleAgreeDisclaimer, isProfile }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="agreedTerms"
              disabled={isProfile}
              defaultChecked={isProfile ? true : false}
              onChange={(e) => {
                handleAgreeDisclaimer(e.target.checked);
              }}
              sx={{
                marginTop: -1,
              }}
            />
          }
          sx={{ alignItems: "flex-start" }}
          label="By creating this profile, you acknowledge and agree that you have voluntarily entered your information into the Zerozilla Job Registry. By doing so, you provide consent for Zerozilla Executive Search associates to review and share your information with potential employers when suitable job opportunities arise. You maintain the right to update or delete your profile at any time. Employers or other users are not granted search privileges of the Job Registry."
        />
      </Grid>
    </Grid>
  );
};

const AgreeToDisclaimer = ({
  handleAgreeDisclaimer,
  personalData,
  isProfile = false,
}) => {
  const [agreedTerms, setAgreeTerms] = useState(false);

  // const handleAgreeDisclaimer = (e) => {
  //   const { name, value, checked, type } = e.target;
  //   setAgreeTerms((prevState) => ({
  //     ...prevState,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Stack gap={2} mt={2}>
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
            Agree To Disclaimer
          </Typography>
          <Chip
            label={`${
              personalData?.profile_completion_percentage != undefined
                ? personalData?.profile_completion_percentage
                : 0
            }% completed`}
            size="small"
            sx={{
              backgroundColor: "success.light",
              color: "success.main",
              fontWeight: 600,
            }}
          />
          {personalData?.profile_completion_percentage !== 100 ? (
            <Chip
              label={`It will take 1 minute to complete this step`}
              size="small"
              sx={{
                backgroundColor: "success.main",
                color: "success.light",
                fontWeight: 600,
              }}
            />
          ) : null}
        </Stack>
        <Typography variant="body2">* = Required</Typography>
      </Stack>
      <Stack gap={2}>
        
        <OnboardFormTemplate
          formTitle={"Authorization*"}
          form={
            <Disclaimer
              isProfile={isProfile}
              handleAgreeDisclaimer={handleAgreeDisclaimer}
              agreedTerms={agreedTerms}
            />
          }
          isSubmit={false}
        />
      </Stack>
    </Stack>
  );
};

export default AgreeToDisclaimer;
