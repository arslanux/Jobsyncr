import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Card,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonalInformationForm from "./PersonalInformationForm";
import EducationalBackgroundForm from "./EducationalBackgroundForm";
import ProfessionalInformation from "./ProfessionalInformation";
import MiscellaneousInformation from "./MiscellaneousInformation";
import Documents from "./Documents";
import References from "./References";
import JobPreferences from "./JobPreferences";
import AgreeToDisclaimer from "./AgreeToDisclaimer";
import SubmitFormModal from "./SubmitFormModal";
import { useDispatch, useSelector } from "react-redux";
import {
  ProfileView,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import {
  areObjectsEqual,
  arePersonalObjectsEqual,
  compareArraysOfObjects,
} from "../../../utils/utilsfunction";
import NextAlert from "./NextAlert";
import useValidation from "../../../hooks/onboard/validation";
import notify from "../../../utils/Toast";
import { DisclamerApi } from "../../../config/ApiHandler";
import { useNavigate } from "react-router-dom";
import useSaveAllSubmit from "../../../hooks/onboard/useSaveAllSubmit";
import { MdArrowBack, MdArrowForward, MdSave } from "react-icons/md";
import PropTypes from 'prop-types';

const steps = [
  "Personal Information",
  "Educational Background",
  "Professional Information",
  "Miscellaneous Information",
  "Documents",
  "References",
  "Job Preferences",
  "Disclaimer"
];

const Onboard = ({
  isProfile = false,
  tabCount,
  setTabCount,
  setCompletePercentage,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const {
    validateUniversityInfo,
    validateLanguageInfo,
    validateEmploymentBackground,
    validateSkillForm,
    resumeValidation,
    jobpreferenceValidateForm,
    higestDegreeValidation,
  } = useValidation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [open, setOpen] = useState(false);
  const [openNextAlert, setOpenNextAlert] = useState(false);
  const [unSavedSection, setUnSavedSection] = useState("");

  const {
    generalSubmit,
    contactInfoSubmit,
    socialSubmit,
    bioSubmit,
    universitySubmit,
    highestDegreeSubmit,
    languageSubmit,
    employmentSubmit,
    skillSubmit,
    miscAuthCountriesSubmit,
    miscLincensesSubmit,
    miscProfessionalSubmit,
    miscHonorsSubmit,
    miscPublicationSubmit,
    resumeSubmit,
    otherDocumentSubmit,
    referenceSumbit,
    jobReferencesumbit,
  } = useSaveAllSubmit();
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleAgreeDisclaimer = (value) => {
    setAgreedTerms(value);
    setDisableSubmit(!value);
  };
  const isNonEmpty = (value) => value.trim() !== "";

  const isNumber = (value) => /^\d+$/.test(value);

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const userData = JSON.parse(localStorage.getItem("login"));

  const onboardUserList = useSelector(
    (state) => state?.onboard?.onboardViewData?.data
  );
  const onboardUserListDelay = useSelector(
    (state) => state?.onboard?.onboardViewDelay
  );
  console.log(onboardUserListDelay, "onboardUserListDelay");

  const [personalValidationErrors, setPersonalValidationErrors] = useState({});
  const [contactValidationErrors, setContactValidationErrors] = useState({});
  const [bioValidationErrors, setBioValidationErrors] = useState({});
  const [languageValidationErrors, setLanguageValidationErrors] = useState([]);
  const [educationValidationErrors, setEducationValidationErrors] = useState(
    []
  );
  const [employmentValidationErrors, setEmploymentValidationErrors] = useState(
    []
  );

  const [skillValidationErrors, setSkillValidationErrors] = useState([]);

  const [resumeValidationErrors, setResumeValidationErrors] = useState([]);

  const [prefernceValidationErrors, setPrefernceValidationErrors] = useState(
    {}
  );

  const [oldPersonalInfo, setOldPersonalInfo] = useState({
    prefix: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    bio: "",
    profile_pic: "",
    referral_source_id: 11,
  });
  const [currentFormData, setCurrentFormData] = useState({});
  const [universityInfo, setUniversityInfo] = useState({
    not_provide_education: true,

    universities: [
      {
        university_name: null,
        degree_name: null,
        major_name: null,
        end_date: null,
      },
    ],
  });
  const [miscellaneous, setMiscellaneous] = useState({
    file_url: "",
    Professionalname: "",
    honorAndAwards: [
      {
        title: "",
        description: "",
      },
    ],
    majorPublications: [
      {
        title: "",
        co_authors: [
          {
            name: "Author 1",
          },
        ],
        publication_date: null,
        short_description: "",
      },
    ],
    professionalAchievements: [
      {
        title: "",
        achievement_date: null,
        description: "",
      },
    ],
    professionalAssociations: [{ professional_association_name: "" }],
    certificateAndLicenses: [
      {
        title: "",
        file_url: "",
      },
    ],
    workAuthorizations: [],
  });
  const [universityOldData, setUniversityOldData] = useState({
    not_provide_education: false,

    universities: [
      {
        university_name: null,
        degree_name: null,
        major_name: null,
        end_date: null,
      },
    ],
  });
  const [languageOldData, setLanguageOldData] = useState({
    not_provide_language: false,
    languages: [{ name: "", speak: false, read: false, write: false }],
  });
  const [professtionalOldData, setProfesstionalOldData] = useState([{}]);
  const [skillOldData, setSkillOldData] = useState([{}]);
  const [miscOldData, setMiscOldData] = useState({});
  const [resumeOldData, setResumeOldData] = useState({});
  const [otherDocumentsOldData, setOtherDocumentsOldData] = useState([
    {
      name: "",
      type: "",
      file_url: "",
    },
  ]);
  const [referenceOldData, setReferenceOldData] = useState([{}]);
  const [jobPreferencesOldData, setJobPreferencesOldData] = useState([{}]);
  const [languageInfo, setLanguageInfo] = useState({
    not_provide_language: false,
    languages: [{ language_id: "", speak: false, read: false, write: false }],
  });

  const [profestionalFormData, setProfestionalFormData] = useState({
    section_type: "employement_background",
    employementBackgrounds: [
      {
        job_title_id: "",
        employer_name_id: null,
        start_date: null,
        end_date: null,
        designation_id: null,
        major_accomplishment: "",
        roles_responsibility: "",
        international_experience: false,
        currently_working: false,
      },
    ],
  });

  const [skillFormData, setSkillFormData] = useState({
    section_type: "skills",
    skills: [
      {
        skill_id: null,
        skill_proficiency_id: "",
        experience_id: "",
      },
    ],
  });

  const [resumeData, setResumeData] = useState({ resume_file_url: "" });

  const [profileImg, setProfileImg] = useState("");
  const [otherDocuments, setOtherDocuments] = useState([
    {
      name: "",
      type: "",
      file_url: "",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [referenceinput, setReferenceinput] = useState({
    not_provide_reference: true,
    references: [
      {
        name: "",
        email: "",
        mobile: "",
        relation: "",
      },
    ],
  });

  const [jobpreferenceinput, setJobpreferenceinput] = useState({
    preferredIndustrySector: [],
    preferredExperienceLevel: [],
    preferredEmploymentType: [],
    preferredWorkMode: [],
    desiredJobTitle: [],
    typeOfEmployerSeeking: [],

    min_salary_expectation: "",
    currency: "USD",
    comments: "",
    availability: "",
    contact_availability: "",
  });
  const [highestEducation, setHighestEducation] = useState(null);
  const [highestEducationError, setHighestEducationError] = useState("");

  const selectOnboardComponent = (currentStep) => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformationForm
            isProfile={isProfile}
            personalData={onboardUserList?.personalInformation}
            setOldPersonalInfo={setOldPersonalInfo}
            setCurrentFormData={setCurrentFormData}
            currentFormData={currentFormData}
            personalValidationErrors={personalValidationErrors}
            contactValidationErrors={contactValidationErrors}
            personalValidateForm={personalValidateForm}
            contactValidateForm={contactValidateForm}
            bioValidationErrors={bioValidationErrors}
            bioValidateForm={bioValidateForm}
            profileImg={profileImg}
            setProfileImg={setProfileImg}
          />
        );
      case 2:
        return (
          <EducationalBackgroundForm
            isProfile={isProfile}
            personalData={onboardUserList?.personalInformation}
            universityInfo={universityInfo}
            setUniversityInfo={setUniversityInfo}
            languageInfo={languageInfo}
            setLanguageInfo={setLanguageInfo}
            validateUniversityInfo={validateUniversityInfo}
            educationValidationErrors={educationValidationErrors}
            setEducationValidationErrors={setEducationValidationErrors}
            educationData={onboardUserList?.educationalBackground}
            languageValidationErrors={languageValidationErrors}
            validateLanguageInfo={validateLanguageInfo}
            setLanguageValidationErrors={setLanguageValidationErrors}
            setUniversityOldData={setUniversityOldData}
            setLanguageOldData={setLanguageOldData}
            languageOldData={languageOldData}
            universityOldData={universityOldData}
            highestEducation={highestEducation}
            setHighestEducation={setHighestEducation}
            highestEducationError={highestEducationError}
            setHighestEducationError={setHighestEducationError}
            higestDegreeValidation={higestDegreeValidation}
          />
        );
      case 3:
        return (
          <ProfessionalInformation
            isProfile={isProfile}
            personalData={onboardUserList?.personalInformation}
            professionalData={onboardUserList?.professionalInformation}
            employmentValidationErrors={employmentValidationErrors}
            setEmploymentValidationErrors={setEmploymentValidationErrors}
            profestionalFormData={profestionalFormData}
            setProfestionalFormData={setProfestionalFormData}
            validateEmploymentBackground={validateEmploymentBackground}
            skillFormData={skillFormData}
            setSkillFormData={setSkillFormData}
            validateSkillForm={validateSkillForm}
            skillValidationErrors={skillValidationErrors}
            setSkillValidationErrors={setSkillValidationErrors}
            setProfesstionalOldData={setProfesstionalOldData}
            setSkillOldData={setSkillOldData}
          />
        );
      case 4:
        return (
          <MiscellaneousInformation
            isProfile={isProfile}
            personalData={onboardUserList?.personalInformation}
            miscData={onboardUserList?.miscellaneousInformation}
            setMiscOldData={setMiscOldData}
            miscOldData={miscOldData}
            miscellaneous={miscellaneous}
            setMiscellaneous={setMiscellaneous}
          />
        );
      case 5:
        return (
          <Documents
            isProfile={isProfile}
            personalData={onboardUserList?.personalInformation}
            docData={onboardUserList?.documents}
            resumeData={resumeData}
            setResumeData={setResumeData}
            resumeValidation={resumeValidation}
            resumeValidationErrors={resumeValidationErrors}
            setResumeValidationErrors={setResumeValidationErrors}
            otherDocuments={otherDocuments}
            setOtherDocuments={setOtherDocuments}
            resumeOldData={resumeOldData}
            setResumeOldData={setResumeOldData}
            otherDocumentsOldData={otherDocumentsOldData}
            setOtherDocumentsOldData={setOtherDocumentsOldData}
          />
        );
      case 6:
        return (
          <References
            isProfile={isProfile}
            personalData={onboardUserList?.personalInformation}
            referenceinput={referenceinput}
            setReferenceinput={setReferenceinput}
            educationData={onboardUserList?.references}
            setReferenceOldData={setReferenceOldData}
            referenceOldData={referenceOldData}
          />
        );
      case 7:
        return (
          <JobPreferences
            isProfile={isProfile}
            personalData={onboardUserList?.personalInformation}
            referencesData={onboardUserList?.jobPreferences}
            setEmploymentValidationErrors={setEmploymentValidationErrors}
            jobpreferenceinput={jobpreferenceinput}
            setJobpreferenceinput={setJobpreferenceinput}
            jobpreferenceValidateForm={jobpreferenceValidateForm}
            prefernceValidationErrors={prefernceValidationErrors}
            setPrefernceValidationErrors={setPrefernceValidationErrors}
            setJobPreferencesOldData={setJobPreferencesOldData}
            jobPreferencesOldData={jobPreferencesOldData}
          />
        );
      case 8:
        return (
          <AgreeToDisclaimer
            isProfile={isProfile}
            handleAgreeDisclaimer={handleAgreeDisclaimer}
            personalData={onboardUserList?.personalInformation}
          />
        );
    }
  };

  useEffect(() => {
    if (isProfile) {
      dispatch(ProfileView());
    } else {
      dispatch(onboardingView());
    }
  }, []);

  const personalValidateForm = () => {
    const errors = {};

    if (!currentFormData.prefix) {
      errors.prefix = "Prefix is required";
    }

    if (!currentFormData.first_name) {
      errors.first_name = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(currentFormData.first_name)) {
      errors.first_name = "First name should contain only alphabet characters";
    }

    if (!currentFormData.last_name) {
      errors.last_name = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(currentFormData.last_name)) {
      errors.last_name = "Last name should contain only alphabet characters";
    }

    setPersonalValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const contactValidateForm = () => {
    const errors = {};

    if (!currentFormData.country_id) {
      errors.country_id = "Country is required";
    }

    if (!currentFormData.state_id) {
      errors.state_id = "State/Province is required";
    }

    if (!currentFormData.city_id) {
      errors.city_id = "City is required";
    }

    if (!isNonEmpty(currentFormData.pincode)) {
      errors.pincode = "Pincode is required";
    } else if (!isNumber(currentFormData.pincode)) {
      errors.pincode = "Pincode should contain only numbers";
    }

    if (currentFormData?.tel_num && !isNumber(currentFormData.tel_num)) {
      errors.tel_num = "Phone Number should contain only numbers";
    }

    if (!isNonEmpty(currentFormData.mobile_country_code)) {
      errors.mobile_country_code = "Country Code is required";
    }

    if (!isNonEmpty(currentFormData.email)) {
      errors.email = "Primary Email is required";
    } else if (!isEmail(currentFormData.email)) {
      errors.email = "Invalid Primary Email format";
    }

    setContactValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const bioValidateForm = () => {
    const errors = {};

    if (!currentFormData?.gender_id) {
      errors.gender_id = "Gender is required";
    }
    if (!currentFormData?.veteran_id) {
      errors.veteran_id = "Veteran is required";
    }
    if (!currentFormData?.disability_id) {
      errors.disability_id = "Disability is required";
    }
    if (!currentFormData?.race_ethnicity_id) {
      errors.race_ethnicity_id = "Race/ Ethnicity is required";
    }

    return Object.keys(errors).length === 0;
  };

  const nextHandler = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleDisclaimerSubmit = async (e) => {
    e.preventDefault();
    const data = {
      agree_to_disclaimer: true,
    };
    try {
      const res = await DisclamerApi(data);
      if (res?.data?.status === true) {
        handleClose();
        navigate("/dashboard/Home");
        notify(
          "success",
          "You Have Successfully Created a Profile, Welcome to Zerozilla Executive!"
        );
      } else {
        notify("error", res?.data?.message);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  const saveAllHandler = async () => {
    switch (activeStep) {
      case 1:
        if (
          personalValidateForm() &&
          contactValidateForm()
        ) {
          await generalSubmit(isProfile, currentFormData, profileImg);
          await contactInfoSubmit(isProfile, currentFormData),
            await socialSubmit(isProfile, currentFormData);
          await bioSubmit(isProfile, currentFormData);
          dispatch(isProfile ? ProfileView() : onboardingView());
          return;
        } else {
          return notify("error", "Please fill required field");
        }
      case 2:
        if (
          higestDegreeValidation(highestEducation, setHighestEducationError)
        ) {
          await universitySubmit(isProfile, universityInfo);
          await highestDegreeSubmit(isProfile, highestEducation);
          await languageSubmit(isProfile, languageInfo);
          dispatch(isProfile ? ProfileView() : onboardingView());
          return;
        } else {
          return notify("error", "Please fill required field");
        }
      case 3:
        if (
          validateEmploymentBackground(
            profestionalFormData?.employementBackgrounds,
            setEmploymentValidationErrors
          )
        ) {
          await employmentSubmit(isProfile, profestionalFormData);
          await skillSubmit(isProfile, skillFormData);
          dispatch(isProfile ? ProfileView() : onboardingView());
          return;
        } else {
          return notify("error", "Please fill required field");
        }
      case 4:
        await miscAuthCountriesSubmit(isProfile, miscellaneous);
        await miscLincensesSubmit(isProfile, miscellaneous);
        await miscProfessionalSubmit(isProfile, miscellaneous);
        await miscHonorsSubmit(isProfile, miscellaneous);
        await miscPublicationSubmit(isProfile, miscellaneous);
        dispatch(isProfile ? ProfileView() : onboardingView());
        return;

      case 5:
        if (
          resumeValidation(
            resumeData?.resume_file_url,
            setResumeValidationErrors
          )
        ) {
          await resumeSubmit(isProfile, resumeData);
          await otherDocumentSubmit(isProfile, otherDocuments);
          dispatch(isProfile ? ProfileView() : onboardingView());
          return;
        } else {
          return notify("error", "Please fill required field");
        }
      case 6:
        await referenceSumbit(isProfile, referenceinput);
        dispatch(isProfile ? ProfileView() : onboardingView());
        return;
      case 7:
        if (
          jobpreferenceValidateForm(
            jobpreferenceinput,
            setPrefernceValidationErrors
          )
        ) {
          await jobReferencesumbit(isProfile, jobpreferenceinput);
          dispatch(isProfile ? ProfileView() : onboardingView());
          return;
        } else {
          return notify("error", "Please fill required field");
        }
      default:
        break;
    }
  };

  useEffect(() => {
    if (onboardUserList?.personalInformation?.current_step && !isProfile) {
      setActiveStep(onboardUserList?.personalInformation?.current_step);
    }
    if (isProfile) {
      setCompletePercentage(
        onboardUserList?.personalInformation?.profile_completion_percentage
      );
    }
  }, [onboardUserList]);

  useEffect(() => {
    if (isProfile && activeStep !== tabCount) {
      setActiveStep(tabCount);
    }
  }, [tabCount]);

  useEffect(() => {
    if (isProfile) {
      setTabCount(activeStep - 1);
    }
  }, [activeStep]);

  const isStepOptional = (step) => {
    return step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack spacing={4} sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
      {!isProfile && (
        <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Stepper 
            activeStep={activeStep} 
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'success.main',
              },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'primary.main',
              },
            }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption" color="text.secondary">
                    Optional
                  </Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Card>
      )}

      <Box sx={{ minHeight: 400 }}>
        {selectOnboardComponent(activeStep + 1)}
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        pt: 2,
        gap: 2,
        flexDirection: { xs: 'column-reverse', md: 'row' }
      }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<MdArrowBack />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            width: { xs: '100%', md: 'auto' }
          }}
        >
          Back
        </Button>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: '100%', md: 'auto' }
        }}>
          {isStepOptional(activeStep) && (
            <Button
              color="inherit"
              onClick={handleSkip}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                width: { xs: '100%', md: 'auto' }
              }}
            >
              Skip
            </Button>
          )}
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              disabled={disableSubmit}
              endIcon={<MdSave />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                width: { xs: '100%', md: 'auto' },
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }
              }}
            >
              Submit
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={saveAllHandler}
                startIcon={<MdSave />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  width: { xs: '100%', md: 'auto' },
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Save All
              </Button>
              <Button
                variant="contained"
                onClick={nextHandler}
                endIcon={<MdArrowForward />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  width: { xs: '100%', md: 'auto' },
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Next
              </Button>
            </>
          )}
        </Box>
      </Box>

      <SubmitFormModal
        open={open}
        handleClose={handleClose}
        handleDisclaimerSubmit={handleDisclaimerSubmit}
      />
      <NextAlert
        open={openNextAlert}
        handleClose={setOpenNextAlert}
        step={activeStep + 1}
        saveAllHandler={saveAllHandler}
        setStep={setActiveStep}
        sectionName={unSavedSection}
      />
    </Stack>
  );
};

Onboard.propTypes = {
  isProfile: PropTypes.bool,
  tabCount: PropTypes.number,
  setTabCount: PropTypes.func,
  setCompletePercentage: PropTypes.func,
};

export default Onboard;
