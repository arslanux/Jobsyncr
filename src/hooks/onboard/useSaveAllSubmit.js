import React from "react";
import { useDispatch } from "react-redux";
import {
  generalInfo,
  profileGeneralInfo,
} from "../../redux/onboarding/personalInformation/PersonalInfoAction";
import {
  DocumentApi,
  EducationInfoApi,
  JonReferenceApi,
  ProfessionalInfoApi,
  ProfileDocumentApi,
  ProfileEducationInfoApi,
  ProfileJonReferenceApi,
  ProfileMiscellaneousApi,
  ProfileProfessionalInfoApi,
  ProfileReferencesApi,
  ReferencesApi,
  miscellaneousApi,
} from "../../config/ApiHandler";

const useSaveAllSubmit = () => {
  const dispatch = useDispatch();

  const generalSubmit = async (isProfile, value, image) => {
    const payload = {
      section_type: "general_information",
      profile_pic: image,
      first_name: value.first_name || "",
      prefix:value.prefix || "",
      last_name: value.last_name || "",
      middle_name: value.middle_name || "",
      bio: value.bio || "",
      referral_source_id: value.referral_source_id,
    };

    dispatch(isProfile ? profileGeneralInfo(payload) : generalInfo(payload));
  };
  const contactInfoSubmit = async (isProfile, value) => {
    console.log(value, "values");
    const payload = {
      section_type: "contact_information",
      address_one: value.address_one,
      address_two: value.address_two,
      country_id: value?.country_id,
      state_id: value.state_id,
      city_id: value.city_id,
      pincode: value.pincode,
      tel_num: value.tel_num,
      mobile: value.mobile,
      tel_country_code: value.tel_country_code,
      mobile_country_code: value.mobile_country_code,
      secondary_email: value.secondary_email || "",
    };
    dispatch(isProfile ? profileGeneralInfo(payload) : generalInfo(payload));
  };
  const socialSubmit = async (isProfile, value) => {
    const payload = {
      section_type: "social_media",
      linkedin_url: value.linkedin_url || "",
      twitter_url: value.twitter_url || "",
    };
    dispatch(isProfile ? profileGeneralInfo(payload) : generalInfo(payload));
  };
  const bioSubmit = async (isProfile, value) => {
    const payload = {
      section_type: "bio_information",
      race_ethnicity_id: value.race_ethnicity_id,
      gender_id: value.gender_id,
      disability_id: value.disability_id,
      veteran_id: value.veteran_id,
    };
    dispatch(isProfile ? profileGeneralInfo(payload) : generalInfo(payload));
  };

  const universitySubmit = async (isProfile, value) => {
    const data = value?.universities?.map((item) => {
      let data = {
       // start_date: item.start_date,
        end_date: item.end_date,
        university_name: item.university_name,
        degree_name: item.degree_name,
        major_name: item.major_name,
      };
      // if (item?.university_id?.id) {
      //   data["university_id"] = item?.university_id?.id;
      // } else {
      //   data["university_name"] = item?.university_id?.inputValue;
      // }

      // if (item?.degree_id?.id) {
      //   data["degree_id"] = item?.degree_id?.id;
      // } else {
      //   data["degree_name"] = item?.degree_id?.inputValue;
      // }

      // if (item?.major_id?.id) {
      //   data["major_id"] = item?.major_id?.id;
      // } else {
      //   data["major_name"] = item?.major_id?.inputValue;
      // }

      return data;
    });
    const payload = {
      section_type: "university",
      educations: data,
      not_provide_education: value?.not_provide_education,
    };
    isProfile
      ? await ProfileEducationInfoApi(payload)
      : await EducationInfoApi(payload);
  };

  const highestDegreeSubmit = async (isProfile, value) => {
    const updateData = {
      section_type: "highest_degree",
      highest_degree_id: value,
    };

    isProfile
      ? await ProfileEducationInfoApi(updateData)
      : await EducationInfoApi(updateData);
  };

  const languageSubmit = async (isProfile, value) => {
    const updateData = {
      section_type: "language",
      ...value,
    };

    const res = isProfile
      ? await ProfileEducationInfoApi(updateData)
      : await EducationInfoApi(updateData);
  };

  const employmentSubmit = async (isProfile, values) => {
    const professtionalData = values?.employementBackgrounds?.map((item) => {
      let data = {
        job_title_id: item?.job_title_id,
        employer_name: item?.employer_name,
        start_date: item?.start_date,
        end_date: item?.end_date,
        major_accomplishment: item?.major_accomplishment,
        roles_responsibility: item?.roles_responsibility,
        designation: item?.designation,
        currently_working: item?.currently_working,
      };
      return data;
    });
    const updateData = {
      section_type: "employement_background",
      employementBackgrounds: professtionalData,
    };
    isProfile
      ? await ProfileProfessionalInfoApi(updateData)
      : await ProfessionalInfoApi(updateData);
  };

  const skillSubmit = async (isProfile, values) => {
    const updateData = {
      section_type: "skills",
      skills: values?.skills?.map((item) => {
        let data = {
          skill_proficiency_id: item?.skill_proficiency_id,
          experience_id: item?.experience_id,
        };
        if (item?.skill_id?.id) {
          data.skill_id = item?.skill_id?.id;
        } else {
          data.skill_name = item?.skill_id?.inputValue;
        }
        return data;
      }),
    };

    isProfile
      ? await ProfileProfessionalInfoApi(updateData)
      : await ProfessionalInfoApi(updateData);
  };

  const miscAuthCountriesSubmit = async (isProfile, values) => {
    const updateData = {
      section_type: "work_authorizations",
      workAuthorizations: values?.workAuthorizations?.map((item) => {
        return {
          country_id: item?.id,
        };
      }),
    };
    isProfile
      ? await ProfileMiscellaneousApi(updateData)
      : await miscellaneousApi(updateData);
  };

  const miscLincensesSubmit = async (isProfile, values) => {
    const updateData = {
      section_type: "certificates_licenses",
      certificateAndLicenses: values?.certificateAndLicenses,
    };
    isProfile
      ? await ProfileMiscellaneousApi(updateData)
      : await miscellaneousApi(updateData);
  };

  const miscProfessionalSubmit = async (isProfile, values) => {
    const updateData = {
      section_type: "professional_associations",
      professionalAssociations: values?.professionalAssociations,
    };
    isProfile
      ? await ProfileMiscellaneousApi(updateData)
      : await miscellaneousApi(updateData);
  };

  const miscHonorsSubmit = async (isProfile, values) => {
    const updateData = {
      section_type: "honor_awards",
      honorAndAwards: values?.honorAndAwards,
    };
    isProfile
      ? await ProfileMiscellaneousApi(updateData)
      : await miscellaneousApi(updateData);
  };

  const miscPublicationSubmit = async (isProfile, values) => {
    const updateData = {
      section_type: "major_publications",
      majorPublications: values?.majorPublications,
    };
    isProfile
      ? await ProfileMiscellaneousApi(updateData)
      : await miscellaneousApi(updateData);
  };

  const resumeSubmit = async (isProfile, values) => {
    const updateData = {
      section_type: "resume",
      resume_file_url: values?.resume_file_url || "",
    };
    isProfile
      ? await ProfileDocumentApi(updateData)
      : await DocumentApi(updateData);
  };

  const otherDocumentSubmit = async (isProfile, values) => {
    const updateData = {
      section_type: "others",
      otherDocuments: values,
    };
    isProfile
      ? await ProfileDocumentApi(updateData)
      : await DocumentApi(updateData);
  };

  const referenceSumbit = async (isProfile, values) => {
    const updateData = {
      section_type: "reference_list",
      not_provide_reference: values?.not_provide_reference,
      references: values?.references?.map((item) => {
        return {
          name: item?.name,
          email: item?.email,
          mobile: item?.mobile,
          professional_relationship_id: item?.relation,
        };
      }),
    };
    isProfile
      ? await ProfileReferencesApi(updateData)
      : await ReferencesApi(updateData);
  };

  const jobReferencesumbit = async (isProfile, values) => {
    const submitPayload = {
      section_type: "preference_list",
      preferredLocations:
        values?.preferredLocations?.map((item) => ({
          country_id: item?.id,
        })) || [],
      preferredIndustrySector: values?.preferredIndustrySector,
      preferredExperienceLevel: values?.preferredExperienceLevel || [],
      preferredEmploymentType: values?.preferredEmploymentType || [],
      preferredWorkMode: values?.preferredWorkMode || [],
      desiredJobTitle: values?.desiredJobTitle || [],
      typeOfEmployerSeeking: values?.typeOfEmployerSeeking || [],
      availability_id: values?.availability || [],
      contact_availability_id: values?.contact_availability,
      min_salary_expectation: values?.min_salary_expectation || "",
      currency: values?.currency || "",
      comments: values?.comments || "",
      // ... other properties
    };

    isProfile
      ? await ProfileJonReferenceApi(submitPayload)
      : await JonReferenceApi(submitPayload);
  };

  return {
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
  };
};

export default useSaveAllSubmit;
