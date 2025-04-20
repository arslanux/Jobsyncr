import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Chip, Tabs } from "@mui/material";
// import { selectOnboardComponent } from '../Onboard';
import PersonalInformationForm from "../Onboard/PersonalInformationForm";
import EducationalBackgroundForm from "../Onboard/EducationalBackgroundForm";
import ProfessionalInformationForm from "../Onboard/ProfessionalInformation";
import MiscellaneousInformation from "../Onboard/MiscellaneousInformation";
import Documents from "../Onboard/Documents";
import References from "../Onboard/References";
import JobPreferences from "../Onboard/JobPreferences";
import Onboard from "../Onboard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [value, setValue] = React.useState(0);
  const [tabCount, setTabCount] = React.useState(1);
  const [compeltePercentage, setCompletePercentage] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabCount(newValue + 1);
  };
  return (
    <Stack gap={2}>
      <Typography
        ml={2}
        variant="h5"
        style={{
          marginTop: "60px",
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        My Profile{" "}
        <Chip
          label={`${
            compeltePercentage != undefined ? compeltePercentage : 0
          } % Completed`}
          variant="outlined"
          sx={{
            backgroundColor: "success.light",
            color: "success.main",
            fontWeight: 600,
          }}
        />
        {compeltePercentage !== 100 ? (
          <Chip
            label={`It will take ${
              tabCount === 1
                ? 3
                : tabCount === 2
                ? 2
                : tabCount === 3
                ? 3
                : tabCount === 4
                ? 4
                : tabCount === 5
                ? 2
                : tabCount === 6
                ? 2
                : tabCount === 7
                ? 2
                : tabCount === 8
                ? 1
                : ""
            } minutes to complete this step`}
            sx={{
              backgroundColor: "success.main",
              color: "success.light",
              fontWeight: 600,
              mx: 2,
            }}
          />
        ) : null}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          <Tab label="Personal Information" />
          <Tab label="Educational Background" />
          <Tab label="Professional Information" />
          <Tab label="Miscellaneous Information" />
          <Tab label="Documents" />
          <Tab label="References" />
          <Tab label="Job Preferences" />
          <Tab label="Disclaimer" />
        </Tabs>
      </Box>
      <Onboard
        isProfile={true}
        tabCount={tabCount}
        setTabCount={setValue}
        setCompletePercentage={setCompletePercentage}
      />
      {/* <CustomTabPanel value={value} index={0}>
        <Stack>
          <PersonalInformationForm isProfile />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Stack>
          <EducationalBackgroundForm isProfile />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Stack>
          <ProfessionalInformationForm isProfile />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Stack>
          <MiscellaneousInformation isProfile />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Stack>
          <Documents isProfile />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Stack>
          <References isProfile />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <Stack>
          <JobPreferences isProfile />
        </Stack>
      </CustomTabPanel> */}
    </Stack>
  );
};

export default Profile;
