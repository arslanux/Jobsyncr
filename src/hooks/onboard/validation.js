import React from "react";

const useValidation = () => {
  const validateUniversityInfo = (
    universityInfo,
    setEducationValidationErrors
  ) => {
    const errors = [];

    universityInfo.forEach((item, index) => {
      const educationErrors = {};

      // Validate University/College Name
      // if (!item?.university_id) {
      //   educationErrors.university_id = `University/College Name is required`;
      // }

      if (!item?.university_name) {
        educationErrors.university_name = `University/College Name is required`;
      }

      // Validate Degree
      // if (!item?.degree_id) {
      //   educationErrors.degree_id = `Degree is required`;
      // }

      if (!item?.degree_name) {
        educationErrors.degree_name = `Degree is required`;
      }

      // Validate Major
      // if (!item?.major_id) {
      //   educationErrors.major_id = `Major is required`;
      // }
      if (!item?.major_name) {
        educationErrors.major_name = `Major is required`;
      }

      // Validate Start Date
      // if (!item?.start_date) {
      //   educationErrors.start_date = `Start Date is required`;
      // }

      // Validate End Date
      // if (!item?.end_date) {
      //   educationErrors.end_date = `Graduation Date is required`;
      // }

      errors.push(educationErrors);
    });

    const hasErrors = errors.some((error) => Object.keys(error).length > 0);

    // Set validation errors in state
    setEducationValidationErrors(errors);

    // Return true if there are no errors, false otherwise
    return !hasErrors;
  };

  const validateLanguageInfo = (languageInfo, setLanguageValidationErrors) => {
    const errors = [];

    languageInfo.forEach((item, index) => {
      const languageErrors = {};

      // Validate Name
      if (!item?.name || item.name.trim() === "") {
        languageErrors.name = `Language ${index + 1}: Name is required`;
      }

      // Validate at least one skill selected
      if (!item?.speak && !item?.read && !item?.write) {
        languageErrors.skills = `Language ${
          index + 1
        }: Please select at least one skill (speak, read, or write)`;
      }

      errors.push(languageErrors);
    });

    const hasErrors = errors.some((error) => Object.keys(error).length > 0);

    // Set validation errors in state
    setLanguageValidationErrors(errors);

    // Return true if there are no errors, false otherwise
    return !hasErrors;
  };

  const validateEmploymentBackground = (
    employementBackgrounds,
    setEmploymentValidationErrors
  ) => {
    const errors = [];

    employementBackgrounds.forEach((item, index) => {
      const employmentErrors = {};

      // Validate Job Title
      if (!item?.job_title_id) {
        employmentErrors.job_title_id = `Job Title is required`;
      }

      // Validate Employer Name
      if (!item?.employer_name) {
        employmentErrors.employer_name = `Employer Name is required`;
      }

      if (!item?.designation) {
        employmentErrors.designation = `Designation is required`;
      }
      // Validate Start Date
      // if (!item?.start_date) {
      //   employmentErrors.start_date = `Start Date is required`;
      // }

      // Validate End Date if not currently working
      // if (!item?.currently_working && !item?.end_date) {
      //   employmentErrors.end_date = `End Date is required`;
      // }

      // Validate Major Accomplishments
      // if (!item?.major_accomplishment) {
      //   employmentErrors.major_accomplishment = `Major Accomplishments is required`;
      // }

      // // Validate Roles and Responsibilities
      // if (!item?.roles_responsibility) {
      //   employmentErrors.roles_responsibility = `Roles and Responsibilities is required`;
      // }

      errors.push(employmentErrors);
    });

    const hasErrors = errors.some((error) => Object.keys(error).length > 0);

    // Set validation errors in state
    setEmploymentValidationErrors(errors);

    // Return true if there are no errors, false otherwise
    return !hasErrors;
  };

  const validateSkillForm = (skills, setSkillValidationErrors) => {
    const errors = [];

    skills.forEach((item, index) => {
      const skillErrors = {};

      // Validate Skill
      if (!item?.skill_id) {
        skillErrors.skill_id = `Skill is required`;
      }

      // Validate Skill Proficiency
      if (!item?.skill_proficiency_id) {
        skillErrors.skill_proficiency_id = `Skill Proficiency is required`;
      }

      // Validate Years of Experience
      if (!item?.experience_id) {
        skillErrors.experience_id = `Years of Experience is required`;
      }

      errors.push(skillErrors);
    });

    const hasErrors = errors.some((error) => Object.keys(error).length > 0);

    // Set validation errors in state
    // setSkillValidationErrors(errors);

    // Return true if there are no errors, false otherwise
    return !hasErrors;
  };

  const resumeValidation = (resume, setResumeValidationErrors) => {
    const errors = {};

    // Validate Resume
    if (!resume) {
      errors.resume = `Resume is required`;
    }

    // Set validation errors in state
    setResumeValidationErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const jobpreferenceValidateForm = (
    jobpreferenceinput,
    setPrefernceValidationErrors
  ) => {
    const errors = {};

    if (jobpreferenceinput.preferredIndustrySector.length === 0) {
      errors.preferredIndustrySector = "Please select at least one option.";
    }
    // else {
    //   errors.preferredIndustrySector = "";
    // }

    // Validate preferredEmploymentType
    if (jobpreferenceinput.preferredEmploymentType.length === 0) {
      errors.preferredEmploymentType = "Please select at least one option.";
    }

    // Validate preferredWorkMode
    if (jobpreferenceinput.preferredWorkMode.length === 0) {
      errors.preferredWorkMode = "Please select at least one option.";
    }

    // Validate preperred Exprience level

    if(jobpreferenceinput.preferredExperienceLevel.length === 0) {
      errors.preferredExperienceLevel = "Please select at least one option.";
    }

    // Validate typeOfEmployerSeeking
    // if (jobpreferenceinput.typeOfEmployerSeeking.length === 0) {
    //   errors.typeOfEmployerSeeking = "Please select at least one option.";
    // }

    if (jobpreferenceinput?.preferredLocations?.length === 0) {
      errors.preferredLocations = "Please select at least one option.";
    }

    if (!jobpreferenceinput?.availability) {
      errors.availability = "Availability is required";
    }
    setPrefernceValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const higestDegreeValidation = (
    higestDegree,
    setHigestDegreeValidationErrors
  ) => {
    const errors = {};

    if (!higestDegree) {
      errors.highest_degree_id = `Highest Degree is required`;
    }

    // Set validation errors in state
    setHigestDegreeValidationErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  return {
    validateUniversityInfo,
    validateLanguageInfo,
    validateEmploymentBackground,
    validateSkillForm,
    resumeValidation,
    jobpreferenceValidateForm,
    higestDegreeValidation,
  };
};

export default useValidation;
