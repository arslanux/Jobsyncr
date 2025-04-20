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
import { Autocomplete, Divider } from "@mui/material";
import DocumentUpload from "../../../theme/ui/DocumentUpload";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
// import { countryGet } from "../../../redux/commonApi/countryAction";
import {
  AssociationsApi,
  ProfileFileApi,
  ProfileMiscellaneousApi,
  miscellaneousApi,
} from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";
import {
  ProfileView,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import { compareArraysOfObjects } from "../../../utils/utilsfunction";
import DocumentViewer from "./component/DocumentViewer";
import { countryGet } from "../../../redux/commonApi/CountryAction";

const AuthorizationInfo = ({
  workAuthorizationsData,
  countyList,
  handleCountryChange,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Autocomplete
          multiple
          name="country_id"
          limitTags={2}
          sx={{ minWidth: "260px" }}
          id="multiple-limit-tags"
          options={countyList || []}
          getOptionLabel={(option) => option.name}
          value={workAuthorizationsData || []}
          onChange={handleCountryChange}
          renderInput={(params) => (
            <CustomTextField
              textFieldProps={{ ...params, size: "small" }}
              label="Countries"
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

const ProfessionalAssociations = ({
  miscellaneous,
  setMiscellaneous,
  associationdata,
}) => {
  const addItemHandelr = () => {
    setMiscellaneous({
      ...miscellaneous,
      professionalAssociations: [
        ...miscellaneous?.professionalAssociations,
        { professional_association_name: "" },
      ],
    });
  };
  const handleFieldChange = (event, fieldName, index, type) => {
    console.log(event, fieldName, "fieldName");
    const updatedFormData = miscellaneous?.professionalAssociations?.map(
      (item, idx) => {
        console.log(event.target.value, ".target.value");

        if (idx === index)
          return {
            [fieldName]: event.target.value,
          };
        else return item;
      }
    );
    setMiscellaneous({
      ...miscellaneous,
      professionalAssociations: updatedFormData,
    });
  };

  const deleteItemHandler = (index) => {
    const updatedFormData = miscellaneous?.professionalAssociations?.filter(
      (item, idx) => idx !== index
    );
    setMiscellaneous({
      ...miscellaneous,
      professionalAssociations: updatedFormData,
    });
  };
  return (
    <>
      {" "}
      {miscellaneous?.professionalAssociations?.map((item, index) => (
        <Grid container spacing={3} my={2} key={index}>
          <Grid item xs={12} sx={{minWidth:'260px'}}>
            <CustomTextField
              label={"Association Name"}
              name="name"
              value={item?.professional_association_name}
              onChange={(e) => {
                handleFieldChange(e, "professional_association_name", index);
              }}
            />
            {/* <CustomTextField
              label={`Association Name`}
              name="professional_association_id"
              value={item?.professional_association_id}
              onChange={(e) =>
                handleFieldChange(e, "professional_association_id", index)
              }
              textFieldProps={{
                select: true,
                size: "small",
                // value: 10,
                InputLabelProps: { shrink: false },
              }}
            >
              {associationdata?.map((data) => {
                return (
                  <MenuItem value={data?.id} key={data?.id}>
                    {data?.name}
                  </MenuItem>
                );
              })}
            </CustomTextField> */}
          </Grid>
          {miscellaneous?.professionalAssociations?.length > 1 && (
            <Grid item xs={12}>
              {" "}
              <Button
                variant="outlined"
                color="warning"
                onClick={() => deleteItemHandler(index)}
              >
                <MdDelete /> Delete
              </Button>
            </Grid>
          )}
        </Grid>
      ))}
      <Box alignItems={"end"}>
        <Button
          variant="contained"
          color="info"
          onClick={() => addItemHandelr()}
        >
          Add more
        </Button>
      </Box>
    </>
  );
};

const CertificationsInfo = ({
  setMiscellaneous,
  handleMiscellaneousChange,
  miscellaneous,
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const addItemHandelr = () => {
    setMiscellaneous({
      ...miscellaneous,
      certificateAndLicenses: [
        ...miscellaneous?.certificateAndLicenses,
        {
          title: "",
          file_url: "",
        },
      ],
    });
  };
  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = miscellaneous?.certificateAndLicenses?.map(
      (item, idx) => {
        if (idx === index)
          return {
            ...item,
            [fieldName]: type === "url" ? event : event.target.value,
          };
        else return item;
      }
    );

    setMiscellaneous({
      ...miscellaneous,
      certificateAndLicenses: updatedFormData,
    });
  };
  const deleteItemHandler = (index) => {
    const updatedFormData = miscellaneous?.certificateAndLicenses?.filter(
      (item, idx) => idx !== index
    );
    setMiscellaneous({
      ...miscellaneous,
      certificateAndLicenses: updatedFormData,
    });
  };

  return (
    <>
      <DocumentViewer
        handleClose={() => setOpen(false)}
        open={open}
        file={file}
      />
      {miscellaneous?.certificateAndLicenses?.map((item, index) => (
        <Grid container spacing={3} key={index}>
          <Grid item xs={12}>
            <CustomTextField
              label={"Title"}
              name="title"
              value={item?.title}
              onChange={(e) => {
                handleFieldChange(e, "title", index);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <DocumentUpload
              url={item?.file_url}
              label={"Attachment"}
              uploadfileurl={(url) =>
                handleFieldChange(url, "file_url", index, "url")
              }
            />
            <Typography variant="body2">
              (Accept Only .PDF file and Document should be less than 5 MB)
            </Typography>
            {item?.file_url && (
              <Button
                color="success"
                onClick={() => {
                  setFile(item?.file_url);
                  setOpen(true);
                }}
              >
                View Document
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            {miscellaneous?.certificateAndLicenses?.length > 1 && (
              <Button
                variant="outlined"
                color="warning"
                onClick={() => deleteItemHandler(index)}
              >
                <MdDelete /> Delete
              </Button>
            )}
            <Divider
              sx={{
                mt: 3,
                mb: 3,
                borderColor: "grey.300",
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Box alignItems={"end"}>
        <Button
          variant="contained"
          color="info"
          onClick={() => addItemHandelr()}
        >
          Add more
        </Button>
      </Box>
    </>
  );
};

// const ProfessionalAchievementInfo = ({
//   handleMiscellaneousChange,
//   miscellaneous,
//   setMiscellaneous,
// }) => {
//   const addItemHandelr = () => {
//     setMiscellaneous({
//       ...miscellaneous,
//       professionalAchievements: [
//         ...miscellaneous?.professionalAchievements,
//         {
//           title: "",
//           achievement_date: "",
//           description: "",
//         },
//       ],
//     });
//   };
//   const handleFieldChange = (event, fieldName, index, type) => {
//     const updatedFormData = miscellaneous?.professionalAchievements?.map(
//       (item, idx) => {
//         if (idx === index)
//           return {
//             ...item,
//             [fieldName]: type === "date" ? event?.$d : event.target.value,
//           };
//         else return item;
//       }
//     );
//     setMiscellaneous({
//       ...miscellaneous,
//       professionalAchievements: updatedFormData,
//     });
//   };

//   const deleteItemHandler = (index) => {
//     const updatedFormData = miscellaneous?.professionalAchievements?.filter(
//       (item, idx) => idx !== index
//     );
//     setMiscellaneous({
//       ...miscellaneous,
//       professionalAchievements: updatedFormData,
//     });
//   };
//   return (
//     <>
//       {miscellaneous?.professionalAchievements?.map((item, index) => (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <CustomTextField
//               label={"Title"}
//               name="title"
//               value={item?.title}
//               onChange={(e) => {
//                 handleFieldChange(e, "title", index);
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Stack gap="6px">
//               <Typography
//                 variant="body1"
//                 sx={{
//                   fontWeight: 600,
//                   color: "text.secondary",
//                 }}
//               >
//                 {`Date`}
//               </Typography>
//               <DatePicker
//                 name="achievement_date"
//                 disableFuture
//                 value={item?.achievement_date}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                   },
//                 }}
//                 onChange={(date) => {
//                   handleFieldChange(date, "achievement_date", index, "date");
//                 }}
//               />
//             </Stack>
//           </Grid>
//           <Grid item xs={12}>
//             <CustomTextField
//               label={"Description"}
//               name="description"
//               placeholder={
//                 "Enter more about professional achievement that can be shared with potential employers."
//               }
//               value={item?.description}
//               onChange={(e) => {
//                 if (e.target.value.length <= 100) {
//                   handleFieldChange(e, "description", index);
//                 } else if (e.target.value.length > 100) {
//                   handleFieldChange(
//                     {
//                       target: {
//                         value: e.target.value.substring(0, 100),
//                       },
//                     },
//                     "description",
//                     index
//                   );
//                 }
//               }}
//               subLabel={`${100 - item?.description?.length} chars left`}
//               textFieldProps={{
//                 multiline: true,
//                 rows: 4,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             {miscellaneous?.professionalAchievements?.length > 1 && (
//               <Button
//                 variant="outlined"
//                 color="warning"
//                 onClick={() => deleteItemHandler(index)}
//               >
//                 <MdDelete /> Delete
//               </Button>
//             )}
//             <Divider
//               sx={{
//                 mt: 3,
//                 mb: 3,
//                 borderColor: "grey.300",
//               }}
//             />
//           </Grid>
//         </Grid>
//       ))}
//       <Box alignItems={"end"}>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => addItemHandelr()}
//         >
//           Add more
//         </Button>
//       </Box>
//     </>
//   );
// };

const HonorsInfo = ({
  handleMiscellaneousChange,
  miscellaneous,
  setMiscellaneous,
}) => {
  const addItemHandelr = () => {
    setMiscellaneous({
      ...miscellaneous,
      honorAndAwards: [
        ...miscellaneous?.honorAndAwards,
        {
          title: "",
          description: "",
        },
      ],
    });
  };
  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = miscellaneous?.honorAndAwards?.map((item, idx) => {
      if (idx === index)
        return {
          ...item,
          [fieldName]: type === "date" ? event?.$d : event.target.value,
        };
      else return item;
    });

    setMiscellaneous({
      ...miscellaneous,
      honorAndAwards: updatedFormData,
    });
  };

  const deleteItemHandler = (index) => {
    const updatedFormData = miscellaneous?.honorAndAwards?.filter(
      (item, idx) => idx !== index
    );
    setMiscellaneous({
      ...miscellaneous,
      honorAndAwards: updatedFormData,
    });
  };
  return (
    <>
      {" "}
      {miscellaneous?.honorAndAwards?.map((item, index) => (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} key={index}>
            <CustomTextField
              label={"Title"}
              name="title"
              value={item?.title}
              onChange={(e) => {
                handleFieldChange(e, "title", index);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label={"Description"}
              name="description"
              placeholder={
                "Enter more details that can be shared with potential employers."
              }
              value={item?.description}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  handleFieldChange(e, "description", index);
                } else if (e.target.value.length > 300) {
                  handleFieldChange(
                    {
                      target: {
                        value: e.target.value.substring(0, 300),
                      },
                    },
                    "description",
                    index
                  );
                }
              }}
              subLabel={`${300 - item?.description?.length} chars left`}
              textFieldProps={{
                multiline: true,
                rows: 6,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {miscellaneous?.honorAndAwards?.length > 1 && (
              <Button
                variant="outlined"
                color="warning"
                onClick={() => deleteItemHandler(index)}
              >
                <MdDelete /> Delete
              </Button>
            )}
            <Divider
              sx={{
                mt: 3,
                mb: 3,
                borderColor: "grey.300",
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Box alignItems={"end"}>
        <Button
          variant="contained"
          color="info"
          onClick={() => addItemHandelr()}
        >
          Add more
        </Button>
      </Box>
    </>
  );
};

const PublicationsInfo = ({
  handleMiscellaneousChange,
  miscellaneous,
  setMiscellaneous,
}) => {
  const addItemHandelr = () => {
    setMiscellaneous({
      ...miscellaneous,
      majorPublications: [
        ...miscellaneous?.majorPublications,
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
    });
  };
  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = miscellaneous?.majorPublications?.map(
      (item, idx) => {
        if (idx === index)
          return {
            ...item,
            [fieldName]: type === "date" ? event?.$d : event.target.value,
          };
        else return item;
      }
    );

    setMiscellaneous({
      ...miscellaneous,
      majorPublications: updatedFormData,
    });
  };

  const deleteItemHandler = (index) => {
    const updatedFormData = miscellaneous?.majorPublications?.filter(
      (item, idx) => idx !== index
    );
    setMiscellaneous({
      ...miscellaneous,
      majorPublications: updatedFormData,
    });
  };
  return (
    <>
      {" "}
      {miscellaneous?.majorPublications?.map((item, index) => (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <CustomTextField
              label={"Title"}
              name="title"
              value={item?.title}
              onChange={(e) => {
                handleFieldChange(e, "title", index);
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={12}>
        <Autocomplete
          multiple
          limitTags={2}
          id='multiple-limit-tags'
          options={countries}
          getOptionLabel={(option) => option.label}
          defaultValue={[countries[13], countries[12], countries[11]]}
          renderInput={(params) => (
            <CustomTextField
              textFieldProps={{ ...params, size: 'small' }}
              label='Co Authors'
            />
          )}
          sx={{ width: '500px' }}
        />
      </Grid> */}
          <Grid item xs={12} md={6}>
            <Stack gap="6px">
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                {`Date of Publication`}
              </Typography>
              <DatePicker
                name="publication_date"
                disableFuture
                value={item?.publication_date || null}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
                onChange={(date) => {
                  handleFieldChange(date, "publication_date", index, "date");
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label={"Description"}
              name="short_description"
              placeholder={
                "Enter more about publication that can be shared with potential employers."
              }
              value={item?.short_description}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  handleFieldChange(e, "short_description", index);
                } else if (e.target.value.length > 300) {
                  handleFieldChange(
                    {
                      target: {
                        value: e.target.value.substring(0, 300),
                      },
                    },
                    "short_description",
                    index
                  );
                }
              }}
              subLabel={`${300 - item?.short_description?.length} chars left`}
              textFieldProps={{
                multiline: true,
                rows: 6,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {miscellaneous?.majorPublications?.length > 1 && (
              <Button
                variant="outlined"
                color="warning"
                onClick={() => deleteItemHandler(index)}
              >
                <MdDelete /> Delete
              </Button>
            )}
            <Divider
              sx={{
                mt: 3,
                mb: 3,
                borderColor: "grey.300",
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Box>
        <Button
          variant="contained"
          color="info"
          onClick={() => addItemHandelr()}
        >
          Add more
        </Button>
      </Box>
    </>
  );
};

const MiscellaneousInformation = ({
  isProfile,
  miscData,
  personalData,
  miscOldData,
  setMiscOldData,
  miscellaneous,
  setMiscellaneous,
}) => {
  const [fileLink, setFileLink] = useState("");
  const [documentfile, setDocumentfile] = useState("");
  const countyList = useSelector(
    (state) => state?.commoncontry?.countryData?.data?.country_list
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  const handleMiscellaneousChange = (e, selectedOption) => {
    if (selectedOption) {
      const value = selectedOption;

      if (e?.name === "university_id") {
        //setUniversityId(value.target.value);
        setMiscellaneous({
          ...miscellaneous,
          university_id: value,
        });
      } else if (e?.name === "degree_id") {
        // setDegreeId(value.target.value);
        setMiscellaneous({
          ...miscellaneous,
          degree_id: value,
        });
      } else if (e?.name === "publicationDate") {
        setMiscellaneous((prevState) => ({
          ...prevState,
          [e.name]: selectedOption.toISOString(),
        }));
      } else if (e?.name === "achievement_date") {
        setMiscellaneous((prevState) => ({
          ...prevState,
          [e.name]: selectedOption.toISOString(),
        }));
      }
    } else if (e) {
      const { name, value, checked, type } = e.target;
      setMiscellaneous((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCountryChange = (event, values) => {
    // const selectedCountryIds = values.map((country) => country.id);
    setMiscellaneous({ ...miscellaneous, workAuthorizations: values });
  };
  const [associationdata, setAssociationData] = useState([]);
  const getAssociations = async () => {
    try {
      const res = await AssociationsApi();
      const associationsdata = res?.data?.data?.professionalAssociations;
      setAssociationData(associationsdata);
    } catch (error) {
      // Handle the error if needed
    }
  };

  useEffect(() => {
    dispatch(countryGet());
    getAssociations();
  }, []);

  useEffect(() => {
    let updatedData = { ...miscellaneous };
    if (miscData?.workAuthorizations?.length > 0) {
      updatedData = {
        ...updatedData,
        workAuthorizations: miscData?.workAuthorizations?.map(
          (item) => item?.country
        ),
      };
    }
    if (miscData?.professionalAssociations?.length) {
      console.log(
        miscData?.professionalAssociations,
        "miscData?.professionalAssociations"
      );
      updatedData = {
        ...updatedData,
        professionalAssociations: miscData?.professionalAssociations?.map(
          (item) => {
            console.log(
              item?.Professional_Association,
              "item?.professional_association_name"
            );
            return {
              professional_association_name: item?.Professional_Association?.name,
            };
          }
        ),
      };
      console.log(updatedData, "miscData?.professionalAssociations");
    }
    if (miscData?.professionalAchievements?.length > 0) {
      updatedData = {
        ...updatedData,
        professionalAchievements: miscData?.professionalAchievements?.map(
          (item) => {
            return {
              title: item?.title,
              achievement_date: dayjs(item?.achievement_date),
              description: item?.description,
            };
          }
        ),
      };
    }
    if (miscData?.honorAndAwards?.length > 0) {
      updatedData = {
        ...updatedData,
        honorAndAwards: miscData?.honorAndAwards?.map((item) => {
          return {
            title: item?.title,
            description: item?.description,
          };
        }),
      };
    }
    if (miscData?.majorPublications?.length > 0) {
      updatedData = {
        ...updatedData,
        majorPublications: miscData?.majorPublications?.map((item) => {
          return {
            title: item?.title,
            short_description: item?.short_description,
            publication_date: item?.publication_date !== null ? dayjs(item?.publication_date) : null,
            co_authors: [
              {
                name: "Author 1",
              },
            ],
          };
        }),
      };
    }
    if (miscData?.certificateAndLicenses?.length > 0) {
      updatedData = {
        ...updatedData,
        certificateAndLicenses: miscData?.certificateAndLicenses?.map(
          (item) => {
            return {
              title: item?.title,
              file_url: item?.file_url,
            };
          }
        ),
      };
    }

    setMiscellaneous(updatedData);
    setMiscOldData(updatedData);
  }, [miscData]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const isEquals = compareArraysOfObjects(
      miscOldData?.workAuthorizations,
      miscellaneous?.workAuthorizations
    );
    const updateData = {
      section_type: "work_authorizations",
      workAuthorizations: miscellaneous?.workAuthorizations?.map((item) => {
        return {
          country_id: item?.id,
        };
      }),
    };
    if (!isEquals) {
      try {
        const res = isProfile
          ? await ProfileMiscellaneousApi(updateData)
          : await miscellaneousApi(updateData);
        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          dispatch(isProfile ? ProfileView() : onboardingView());
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        // Handle the error if needed
      }
    } else {
      notify("info", "No changes made");
    }
  };

  const handleLincensesSubmit = async (e) => {
    e.preventDefault();
    const isEquals = compareArraysOfObjects(
      miscOldData?.certificateAndLicenses,
      miscellaneous?.certificateAndLicenses
    );
    const updateData = {
      section_type: "certificates_licenses",
      certificateAndLicenses: miscellaneous?.certificateAndLicenses,
    };
    if (!isEquals) {
      {
        try {
          const res = isProfile
            ? await ProfileMiscellaneousApi(updateData)
            : await miscellaneousApi(updateData);
          if (res?.data?.status === true) {
            notify("success", res?.data?.message);
            dispatch(isProfile ? ProfileView() : onboardingView());
          } else {
            notify("error", res?.data?.message);
          }
        } catch (error) {
          // Handle the error if needed
        }
      }
    } else {
      notify("info", "No changes made");
    }
  };

  const handleProfessionalSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      section_type: "professional_associations",
      professionalAssociations: miscellaneous?.professionalAssociations,
    };

    const isEquals = compareArraysOfObjects(
      miscOldData?.professionalAssociations,
      miscellaneous?.professionalAssociations
    );
    if (!isEquals) {
      try {
        const res = isProfile
          ? await ProfileMiscellaneousApi(updateData)
          : await miscellaneousApi(updateData);
        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          dispatch(isProfile ? ProfileView() : onboardingView());
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        // Handle the error if needed
      }
    } else {
      notify("info", "No changes made");
    }
  };

  const handleAchivementSubmit = async (e) => {
    e.preventDefault();

    const isEquals = compareArraysOfObjects(
      miscOldData?.professionalAchievements,
      miscellaneous?.professionalAchievements
    );

    const updateData = {
      section_type: "professional_achivements",
      professionalAchievements: miscellaneous?.professionalAchievements,
    };
    if (!isEquals) {
      try {
        const res = isProfile
          ? await ProfileMiscellaneousApi(updateData)
          : await miscellaneousApi(updateData);
        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          dispatch(isProfile ? ProfileView() : onboardingView());
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        // Handle the error if needed
      }
    } else {
      notify("info", "No changes made");
    }
  };

  const handleHonorsSubmit = async (e) => {
    e.preventDefault();

    const isEquals = compareArraysOfObjects(
      miscOldData?.honorAndAwards,
      miscellaneous?.honorAndAwards
    );
    const updateData = {
      section_type: "honor_awards",
      honorAndAwards: miscellaneous?.honorAndAwards,
    };
    if (!isEquals) {
      try {
        const res = isProfile
          ? await ProfileMiscellaneousApi(updateData)
          : await miscellaneousApi(updateData);
        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          dispatch(isProfile ? ProfileView() : onboardingView());
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        // Handle the error if needed
      }
    } else {
      notify("info", "No changes made");
    }
  };

  const handlePublicationSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      section_type: "major_publications",
      majorPublications: miscellaneous?.majorPublications,
    };
    const isEquals = compareArraysOfObjects(
      miscOldData?.majorPublications,
      miscellaneous?.majorPublications
    );
    if (!isEquals) {
      try {
        const res = isProfile
          ? await ProfileMiscellaneousApi(updateData)
          : await miscellaneousApi(updateData);
        if (res?.data?.status === true) {
          notify("success", res?.data?.message);
          dispatch(isProfile ? ProfileView() : onboardingView());
        } else {
          notify("error", res?.data?.message);
        }
      } catch (error) {
        // Handle the error if needed
      }
    } else {
      notify("info", "No changes made");
    }
  };

  const uploadedDocumentFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await ProfileFileApi(formData);
      if (response?.data?.status === true) {
        setFileLink(response?.data?.data?.filePath);
      }
      return response;
    } catch (error) {
      // Handle the error if needed
    }
  };

  // useEffect(() => {
  //   if (documentfile) {
  //     uploadedDocumentFile(documentfile);
  //   }
  // }, [documentfile]);

  return (
    <Stack gap={2} mt={2}>
      {!isProfile && (
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
              Miscellaneous Information
            </Typography>
            <Chip
              label={`${
                personalData?.profile_completion_percentage != undefined
                  ? personalData?.profile_completion_percentage
                  : 0
              }% Completed`}
              size="small"
              sx={{
                backgroundColor: "success.light",
                color: "success.main",
                fontWeight: 600,
              }}
            />
            <Chip
              label={`It will take 4 minutes to complete this step`}
              size="small"
              sx={{
                backgroundColor: "success.main",
                color: "success.light",
                fontWeight: 600,
              }}
            />
          </Stack>
          <Typography variant="body2">* = Required</Typography>
        </Stack>
      )}
      <Stack gap={2}>
        <OnboardFormTemplate
          formTitle={"Work Authorizations"}
          form={
            <AuthorizationInfo
              workAuthorizationsData={miscellaneous?.workAuthorizations}
              countyList={countyList}
              handleCountryChange={handleCountryChange}
            />
          }
          onsubmit={handleAuthSubmit}
        />
        <OnboardFormTemplate
          formTitle={"Certifications and Licenses"}
          form={
            <CertificationsInfo
              handleMiscellaneousChange={handleMiscellaneousChange}
              miscellaneous={miscellaneous}
              setMiscellaneous={setMiscellaneous}
            />
          }
          // isMultiple={true}
          onsubmit={handleLincensesSubmit}
        />

        <OnboardFormTemplate
          formTitle={"Professional Associations"}
          form={
            <ProfessionalAssociations
              associationdata={associationdata}
              handleMiscellaneousChange={handleMiscellaneousChange}
              miscellaneous={miscellaneous}
              setMiscellaneous={setMiscellaneous}
            />
          }
          onsubmit={handleProfessionalSubmit}
        />
        {/* <OnboardFormTemplate
          formTitle={"Professional Achievement"}
          form={
            <ProfessionalAchievementInfo
              handleMiscellaneousChange={handleMiscellaneousChange}
              miscellaneous={miscellaneous}
              setMiscellaneous={setMiscellaneous}
            />
          }
          onsubmit={handleAchivementSubmit}
        /> */}
        <OnboardFormTemplate
          formTitle={"Honors & Awards"}
          form={
            <HonorsInfo
              handleMiscellaneousChange={handleMiscellaneousChange}
              miscellaneous={miscellaneous}
              setMiscellaneous={setMiscellaneous}
            />
          }
          onsubmit={handleHonorsSubmit}
        />
        <OnboardFormTemplate
          formTitle={"Major Publications"}
          form={
            <PublicationsInfo
              handleMiscellaneousChange={handleMiscellaneousChange}
              miscellaneous={miscellaneous}
              setMiscellaneous={setMiscellaneous}
            />
          }
          onsubmit={handlePublicationSubmit}
        />
      </Stack>
    </Stack>
  );
};

export default MiscellaneousInformation;
