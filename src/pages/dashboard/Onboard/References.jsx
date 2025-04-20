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
import notify from "../../../utils/Toast";
import {
  ProfileReferencesApi,
  ReferencesApi,
  RelationApi,
} from "../../../config/ApiHandler";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import {
  ProfileView,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import { useDispatch } from "react-redux";
import { CheckBox, EmailOutlined } from "@mui/icons-material";
import { compareArraysOfObjects } from "../../../utils/utilsfunction";

const PersonalInfo = ({
  referenceinput,
  documentchangeHandler,
  relation,
  setReferenceinput,
}) => {
  const addItemHandelr = () => {
    setReferenceinput((prevState) => ({
      ...prevState,
      references: [
        ...prevState.references,
        {
          name: "",
          email: "",
          mobile: "",
          relation: "",
        },
      ],
    }));
  };

  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = referenceinput?.references?.map((item, idx) => {
      if (idx === index)
        return {
          ...item,
          [fieldName]: event.target.value,
        };
      else return item;
    });

    setReferenceinput({ ...referenceinput, references: updatedFormData });
  };

  const deleteItemHandler = (index) => {
    const updatedFormData = referenceinput?.references?.filter((item, idx) => {
      if (idx !== index) return item;
    });

    setReferenceinput({ ...referenceinput, references: updatedFormData });
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} my={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={referenceinput?.not_provide_reference}
                onChange={(e) => {
                  setReferenceinput((prevState) => ({
                    ...prevState,
                    not_provide_reference: e.target.checked,
                  }));
                }}
                name="gilad"
              />
            }
            label="I don’t wish to provide references at this time"
          />
        </Grid>
      </Grid>
      {referenceinput?.references?.map((item, index) => {
        return (
          <Grid container spacing={3} key={index} my={2}>
            <Grid item xs={12} mt={-5}>
              <CustomTextField
                label={"Reference Name"}
                name="name"
                textFieldProps={{
                  disabled: referenceinput?.not_provide_reference,
                }}
                value={referenceinput?.not_provide_reference ? "" : item?.name}
                onChange={(e) => {
                  handleFieldChange(e, "name", index);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                label={"Mobile Number"}
                name="mobile"
                // placeholder={"Eg: +xxxxxxxxxxx"}
                textFieldProps={{
                  disabled: referenceinput?.not_provide_reference,
                }}
                value={
                  referenceinput?.not_provide_reference ? "" : item?.mobile
                }
                onChange={(e) => {
                  handleFieldChange(e, "mobile", index);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                label={"Email"}
                name="email"
                value={referenceinput?.not_provide_reference ? "" : item?.email}
                textFieldProps={{
                  disabled: referenceinput?.not_provide_reference,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  handleFieldChange(e, "email", index);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
                <CustomTextField
                  label="Professional Relationship"
                  name="relation"
                  value={
                    referenceinput?.not_provide_reference ? "" : item?.relation
                  }
                  onChange={(e) => {
                    handleFieldChange(e, "relation", index);
                  }}
                  textFieldProps={{
                    select: true,
                    size: "small",
                    // value:item?.relation,
                    disabled: referenceinput?.not_provide_reference,
                    InputLabelProps: { shrink: false },
                  }}
                //   label='Age'

                //   onChange={handleChange}
                >
                  {relation?.map((data) => {
                    return (
                      <MenuItem value={data?.id} key={data?.id}>
                        {data?.name}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {referenceinput?.references?.length > 1 && (
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
        );
      })}

      <Box alignItems={"end"}>
        <Button
          disabled={referenceinput?.not_provide_reference}
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

const References = ({
  isProfile = false,
  referenceinput,
  setReferenceinput,
  educationData,
  personalData,
  setReferenceOldData,
  referenceOldData,
}) => {
  const [relation, setRelation] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (educationData?.length > 0) {
      const data = educationData?.map((item) => {
        //console.log("iMapdata====>",item.Professional_Relationship.name);
        return {
          name: item?.name,
          email: item?.email,
          // major_id: item?.university_id,
          mobile: item?.mobile,
          relation: item?.professional_relationship_id,
        };
      });
      setReferenceinput({
        ...referenceinput,
        references: data,
      });
      setReferenceOldData(data);
    }
  }, [educationData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const referencechangeHandler = (e) => {
    const { name, value } = e.target;
    setReferenceinput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sumbitReferenceHandler = async (e) => {
    e.preventDefault();
    const isEquals = compareArraysOfObjects(
      referenceinput?.references,
      referenceOldData
    );
    if (isEquals && referenceinput?.not_provide_reference === false) {
      notify("info", "No changes made");
    } else {
      try {
        const updateData = {
          section_type: "reference_list",
          not_provide_reference: referenceinput?.not_provide_reference,
          references: referenceinput?.references?.map((item) => {
            return {
              name: item?.name,
              email: item?.email,
              mobile: item?.mobile,
              professional_relationship_id: item?.relation,
            };
          }),
        };
        const response = isProfile
          ? await ProfileReferencesApi(updateData)
          : await ReferencesApi(updateData);
        if (response?.data?.status === true) {
          dispatch(isProfile ? ProfileView() : onboardingView());
          notify("success", response?.data?.message);
        } else {
          notify("error", response?.data?.message);
        }
        return response;
      } catch (error) {
        notify("error", "An error occurred while submitting the reference.");
      }
    }
  };

  const getRelationList = async () => {
    try {
      const res = await RelationApi();
      const relationdataList = res?.data?.data?.professionalRelationships;
      setRelation(relationdataList);
    } catch (error) {
      // Handle the error if needed
    }
  };

  useEffect(() => {
    getRelationList();
  }, []);
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
              References
            </Typography>
            <Chip
              label={`${personalData?.profile_completion_percentage != undefined
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
              label={`It will take 2 minutes to complete this step`}
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
          formTitle={"Reference List"}
          form={
            <PersonalInfo
              referenceinput={referenceinput}
              setReferenceinput={setReferenceinput}
              documentchangeHandler={referencechangeHandler}
              relation={relation}
            />
          }
          // isMultiple={true}
          onsubmit={sumbitReferenceHandler}
        />
      </Stack>
    </Stack>
  );
};

export default References;
