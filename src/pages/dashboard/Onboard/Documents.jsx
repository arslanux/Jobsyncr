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
import { Autocomplete, Box, Button, Divider } from "@mui/material";
import DocumentUpload from "../../../theme/ui/DocumentUpload";
import { DatePicker } from "@mui/x-date-pickers";
import {
  DocumentApi,
  ProfileDocumentApi,
  ProfileFileApi,
} from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";
import {
  ProfileView,
  onboardingView,
} from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  areObjectsEqual,
  compareArraysOfObjects,
} from "../../../utils/utilsfunction";
import DocumentViewer from "./component/DocumentViewer";

const CVInfo = ({ resumeData, setResumeData, errors }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  return (
    <>
      <DocumentViewer
        handleClose={() => setOpen(false)}
        open={open}
        file={file}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DocumentUpload
            label={"Attachment"}
            url={resumeData?.resume_file_url}
            uploadfileurl={(url) => setResumeData({ resume_file_url: url })}
            required
          />
          <Typography variant="body2">
            (Accept Only .PDF file and Document should be less than 5 MB)
          </Typography>
          {resumeData?.resume_file_url && (
            <Button
              color="success"
              onClick={() => {
                setFile(resumeData?.resume_file_url);
                setOpen(true);
              }}
            >
              View Document
            </Button>
          )}
          {errors?.resume && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
              }}
              color={"error"}
            >
              {errors?.resume}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const OtherDocsInfo = ({
  uploadfileurl,
  documentchangeHandler,
  documentinput,
  setOtherDocuments,
  otherDocuments,
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const addItemHandelr = () => {
    setOtherDocuments([
      ...otherDocuments,
      {
        name: "",
        type: "",
        file_url: "",
      },
    ]);
  };
  // create function for delete item

  const deleteItemHandler = (index) => {
    const updatedFormData = otherDocuments?.filter((item, idx) => {
      if (idx !== index) return item;
    });
    setOtherDocuments(updatedFormData);
  };

  const handleFieldChange = (event, fieldName, index, type) => {
    const updatedFormData = otherDocuments?.map((item, idx) => {
      if (idx === index)
        return {
          ...item,
          [fieldName]: type === "url" ? event : event.target.value,
        };
      else return item;
    });
    setOtherDocuments(updatedFormData);
  };
  return (
    <>
      <DocumentViewer
        handleClose={() => setOpen(false)}
        open={open}
        file={file}
      />
      {otherDocuments?.map((item, index) => (
        <Grid container spacing={3} key={index}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              label={"Document Name"}
              name="name"
              value={item?.name}
              onChange={(e) => {
                handleFieldChange(e, "name", index);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              label={"Document Type"}
              name="type"
              value={item?.type}
              onChange={(e) => {
                handleFieldChange(e, "type", index);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <DocumentUpload
              label={"Attachment"}
              url={item?.file_url}
              uploadfileurl={(url) =>
                handleFieldChange(url, "file_url", index, "url")
              }
            />

            <Typography variant="body2">
              (Accept Only .PDF file and Document should be less than 5 MB){" "}
            </Typography>
            {item?.file_url && (
              <Button
                color="warning"
                onClick={() => handleFieldChange("", "file_url", index, "url")}
              >
                Remove Document
              </Button>
            )}
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
            {otherDocuments?.length > 1 && (
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
      ))}{" "}
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

const Documents = ({
  personalData,
  isProfile = false,
  resumeData,
  setResumeData,
  docData,
  resumeValidation,
  resumeValidationErrors,
  setResumeValidationErrors,
  otherDocuments,
  setOtherDocuments,
  resumeOldData,
  setResumeOldData,
  otherDocumentsOldData,
  setOtherDocumentsOldData,
}) => {
  const [documentfile, setDocumentfile] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [documentinput, setDocumentinput] = useState({
    name: "",
    type: "",
  });
  const dispatch = useDispatch();

  const sumbitResumeHandler = async () => {
    const isValidate = resumeValidation(
      resumeData?.resume_file_url,
      setResumeValidationErrors
    );

    const areEqual = areObjectsEqual(resumeData, resumeOldData);

    if (areEqual) {
      notify("info", "No changes made");
      return;
    } else {
      if (isValidate) {
        try {
          const updateData = {
            section_type: "resume",
            resume_file_url: resumeData?.resume_file_url || "",
          };
          const response = isProfile
            ? await ProfileDocumentApi(updateData)
            : await DocumentApi(updateData);
          if (response?.data?.status === true) {
            notify("success", response?.data?.message);
            dispatch(isProfile ? ProfileView() : onboardingView());
          }
        } catch (error) {
          // Handle the error if needed
        }
      } else {
        notify("error", "Please upload your resume");
      }
    }
  };

  const documentchangeHandler = (e) => {
    const { name, value } = e.target;
    setDocumentinput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sumbitDocuemntHandler = async () => {
    const areEqual = compareArraysOfObjects(
      otherDocuments,
      otherDocumentsOldData
    );
    if (areEqual) {
      notify("info", "No changes made");
    } else {
      try {
        const updateData = {
          section_type: "others",
          otherDocuments: otherDocuments,
        };
        const response = isProfile
          ? await ProfileDocumentApi(updateData)
          : await DocumentApi(updateData);
        if (response?.data?.status === true) {
          notify("success", response?.data?.message);
          dispatch(isProfile ? ProfileView() : onboardingView());
        }
        return response;
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  useEffect(() => {
    if (docData?.resumeUrl?.resume_file_url) {
      setResumeData({ resume_file_url: docData?.resumeUrl?.resume_file_url });
      setResumeOldData({
        resume_file_url: docData?.resumeUrl?.resume_file_url,
      });
    }
    if (docData?.userOtherDocuments?.length > 0) {
      const data = docData?.userOtherDocuments?.map((item) => {
        return {
          file_url: item?.file_url,
          name: item?.name,
          type: item?.type,
        };
      });
      setOtherDocuments(data);
      setOtherDocumentsOldData(data);
    }
  }, [docData]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
              Documents
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
          formTitle={"CV/Resume"}
          form={
            <CVInfo
              setResumeData={setResumeData}
              resumeData={resumeData}
              errors={resumeValidationErrors}
            />
          }
          onsubmit={sumbitResumeHandler}
        />

        <OnboardFormTemplate
          formTitle={"Other Documents"}
          form={
            <OtherDocsInfo
              uploadfileurl={setDocumentfile}
              documentinput={documentinput}
              documentchangeHandler={documentchangeHandler}
              setOtherDocuments={setOtherDocuments}
              otherDocuments={otherDocuments}
            />
          }
          onsubmit={sumbitDocuemntHandler}
        />
      </Stack>
    </Stack>
  );
};

export default Documents;
