import {
  LOGIN_URL,
  FORGET_PASSWORD_URL,
  RESET_PASSWORD_URL,
  VERIFY_PASSOWRD_URL,
  GET_USER_URL,
  SIGNUP_USER_URL,
  PERSONAL_INFO,
  ONBOARDING_VIEW,
  UPLOADPROFILEIMAGE,
  COUNTRY_URL,
  STATE_URL,
  CITY_URL,
  UNIVERSITY_URL,
  DEGREE_URL,
  MAJOR_URL,
  EDUCATION_INFO,
  UPLOADFILE_URL,
  DOCUMENT_URL,
  REFERENCES_URL,
  JONREFERENCES_URL,
  DISCLAIMER_URL,
  PROFESSIONAL_INFO,
  MISCELLANEOUS_URL,
  REFERRAL_SOURCE_URL,
  JOBTITLE_URL,
  EMPLOYENAME_URL,
  SKILL_URL,
  SKILL_PROFICIENCY_URL,
  EXPERIENCE_URL,
  RELATIONAL_URL,
  AVAILBILITY_CONTACT_URL,
  AVAILBILITY_URL,
  PREFERENCE_URL,
  CHANGE_PASSWORD_URL,
  ACTIVATE_DEACTIVATE_URL,
  GOOGLE_LOGIN_URL,
  RESEND_OTP_URL,
  VERIFY_OTP_URL,
  PROFILE_URL,
  PROFILE_GENERAL_INFO,
  PROFILE_EDUCATION_INFO,
  PROFILE_PROFESSIONAL_INFO,
  PROFILE_MISCELLANEOUS_INFO,
  PROFILE_DOCUMENT_URL,
  PROFILE_REFERENCES_URL,
  PROFILE_JONREFERENCES_URL,
  MICROSOFT_LOGIN_URL,
  DISABLITY_URL,
  GENDER_URL,
  RACE_ETHNICITY_URL,
  VETERAN_URL,
  NEWSLETTER_URL,
  GET_ALL_JOBLISTS_JOB_BOARD,
  GET_ALL_EXECUTIVE_JOBLISTS,
  GET_ADEVERTISE,
  ADVERTISEMENTS_STATS,
  PROMOTION_STATS,
  GET_HIGHEST_DEGREE,
  LANGUAGES_URL,
  ASSOCIATIONS_URL,
  GET_SHUFFLED_JOBS_LIST,
  CALL_TO_ACTION_URL,
  GET_USER_RESUME_URL,
  APPLY_FOR_JOB,
  GET_USER_BIO_URL,
  VIEW_JOB_URL,
} from "./UrlConfig";

import { ApiService, FileUploadService, UnAuthApiService } from "./ApiService";
import axios from "axios";

// Login
export const LoginApi = (loginData) => {
  return ApiService.post(LOGIN_URL, loginData);
};

export const googleLoginApi = (loginData) => {
  return ApiService.post(GOOGLE_LOGIN_URL, loginData);
};

export const microsoftLoginApi = (loginData) => {
  return ApiService.post(MICROSOFT_LOGIN_URL, loginData);
};
// Forgot Password
export const ForgotPasswordApi = (forgotPwdData) => {
  return ApiService.post(FORGET_PASSWORD_URL, forgotPwdData);
};

// Reset Password
export const ResetPasswordApi = (resetPwdData) => {
  return ApiService.post(RESET_PASSWORD_URL, resetPwdData);
};

//resend otp
export const ResendOtpApi = (email) => {
  return ApiService.post(RESEND_OTP_URL, email);
};

//verify otp
export const VerifyOtpApi = (data) => {
  return ApiService.post(VERIFY_OTP_URL, data);
};

// Verify Reset Password
export const VerifyResetPasswordApi = (verifyResetPwdData) => {
  return ApiService.post(VERIFY_PASSOWRD_URL, verifyResetPwdData);
};

export const getUser = () => {
  return ApiService.get(GET_USER_URL);
};

export const getUserResume = () => {
  return ApiService.get(GET_USER_RESUME_URL);
};

export const getUserBio = () => {
  return ApiService.get(GET_USER_BIO_URL);
};

export const signupApi = (data) => {
  return UnAuthApiService.post(SIGNUP_USER_URL, data);
};

// -------------------------------------------------------------------------
// ------------ Onboarding ------------
// -------------------------------------------------------------------------

export const OnboardingViewApi = () => {
  return ApiService.get(ONBOARDING_VIEW);
};
export const PersonalInfoApi = (data) => {
  return ApiService.post(PERSONAL_INFO, data);
};
export const EducationInfoApi = (data) => {
  return ApiService.post(EDUCATION_INFO, data);
};
export const ProfessionalInfoApi = (data) => {
  return ApiService.post(PROFESSIONAL_INFO, data);
};

export const miscellaneousApi = (data) => {
  return ApiService.post(MISCELLANEOUS_URL, data);
};

export const DocumentApi = (data) => {
  return ApiService.post(DOCUMENT_URL, data);
};

export const ReferencesApi = (data) => {
  return ApiService.post(REFERENCES_URL, data);
};

export const changePasswordApi = (data) => {
  return ApiService.post(CHANGE_PASSWORD_URL, data);
};

export const activateDeactivateProfileApi = (data) => {
  return ApiService.post(ACTIVATE_DEACTIVATE_URL, data);
};

export const JonReferenceApi = (data) => {
  return ApiService.post(JONREFERENCES_URL, data);
};
export const DisclamerApi = (data) => {
  return ApiService.post(DISCLAIMER_URL, data);
};

////profile api
export const ProfileViewApi = () => {
  return ApiService.get(PROFILE_URL);
};

export const ProfilePersonalInfoApi = (data) => {
  return ApiService.post(PROFILE_GENERAL_INFO, data);
};

export const ProfileEducationInfoApi = (data) => {
  return ApiService.post(PROFILE_EDUCATION_INFO, data);
};

export const ProfileProfessionalInfoApi = (data) => {
  return ApiService.post(PROFILE_PROFESSIONAL_INFO, data);
};
export const ProfileMiscellaneousApi = (data) => {
  return ApiService.post(PROFILE_MISCELLANEOUS_INFO, data);
};

export const ProfileDocumentApi = (data) => {
  return ApiService.post(PROFILE_DOCUMENT_URL, data);
};

export const ProfileReferencesApi = (data) => {
  return ApiService.post(PROFILE_REFERENCES_URL, data);
};

export const ProfileJonReferenceApi = (data) => {
  return ApiService.post(PROFILE_JONREFERENCES_URL, data);
};

////////////////

export const newsLetterApi = (data) => {
  return ApiService.post(NEWSLETTER_URL, data);
};

export const applyForJobApi = (data) => {
  return ApiService.post(APPLY_FOR_JOB, data);
};

export const PROFILEIMAGEUPLOADApi = (data) => {
  return FileUploadService.post(UPLOADPROFILEIMAGE, data);
};
export const ProfileFileApi = (data) => {
  return FileUploadService.post(UPLOADFILE_URL, data);
};

export const CountryApi = (data) => {
  return FileUploadService.get(COUNTRY_URL, data);
};
export const referralSourceApi = (data) => {
  return FileUploadService.get(REFERRAL_SOURCE_URL, data);
};

export const StateApi = (countryId) => {
  return FileUploadService.get(`${STATE_URL}?country_id=${countryId}`);
};

export const CityApi = (stateId) => {
  return FileUploadService.get(`${CITY_URL}?state_id=${stateId}`);
};

export const UniversityApi = (data) => {
  return ApiService.get(UNIVERSITY_URL, data);
};
export const DegreeApi = (data) => {
  return ApiService.get(DEGREE_URL, data);
};
export const getDisablityApi = (data) => {
  return ApiService.get(DISABLITY_URL, data);
};
export const getGenderApi = (data) => {
  return ApiService.get(GENDER_URL, data);
};
export const getRaceEthnicityApi = (data) => {
  return ApiService.get(RACE_ETHNICITY_URL, data);
};
export const getVeteranApi = (data) => {
  return ApiService.get(VETERAN_URL, data);
};
export const MajorApi = (data) => {
  return ApiService.get(MAJOR_URL, data);
};

export const LanguagesApi = (data) => {
  return ApiService.get(LANGUAGES_URL, data);
};

export const AssociationsApi = (data) => {
  return ApiService.get(ASSOCIATIONS_URL, data);
};

export const JobTitleApi = (data) => {
  return ApiService.get(JOBTITLE_URL, data);
};

export const EmployeNameApi = (data) => {
  return ApiService.get(EMPLOYENAME_URL, data);
};

export const SkillApi = (data) => {
  return ApiService.get(SKILL_URL, data);
};

export const SkillProficiencyApi = (data) => {
  return ApiService.get(SKILL_PROFICIENCY_URL, data);
};

export const ExperienceApi = (data) => {
  return ApiService.get(EXPERIENCE_URL, data);
};

export const RelationApi = (data) => {
  return ApiService.get(RELATIONAL_URL, data);
};

export const AvailibilityApi = (data) => {
  return ApiService.get(AVAILBILITY_URL, data);
};

export const AvailibilityContactApi = (data) => {
  return ApiService.get(AVAILBILITY_CONTACT_URL, data);
};

export const PreferenceApi = (data) => {
  return ApiService.get(PREFERENCE_URL, data);
};

export const getAllJobBoardListApi = (query) => {
  return ApiService.get(GET_ALL_JOBLISTS_JOB_BOARD + query);
};

export const getAllExecutiveJobListApi = (query) => {
  return ApiService.get(GET_ALL_EXECUTIVE_JOBLISTS + query);
};

export const getAdvertiseBanner = () => {
  return ApiService.get(GET_ADEVERTISE);
};

/////promotion and advertisement

export const ProMotionCountApi = (data) => {
  return ApiService.post(PROMOTION_STATS, data);
};

export const AdvertisementCountApi = (data) => {
  return ApiService.post(ADVERTISEMENTS_STATS, data);
};

export const getHighestDegreeApi = (data) => {
  return ApiService.get(GET_HIGHEST_DEGREE, data);
};

// Call to action

export const CallToActionApi = (data) => {
  return ApiService.post(CALL_TO_ACTION_URL, data);
};

// Public api
export const getShuffledJobsListApi = (data) => {
  return ApiService.get(GET_SHUFFLED_JOBS_LIST, data);
};

// Common api to view Job 

export const viewJobApi = (data) => {
  return ApiService.get(`${VIEW_JOB_URL}?id=${data}`);
};
