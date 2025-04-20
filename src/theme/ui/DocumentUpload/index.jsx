import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "../../../assets/add_icon.svg";
import FileIcon from "../../../assets/file_icon.svg";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "../../../assets/menu_icon.svg";
import { ProfileFileApi } from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";
import { Skeleton } from "@mui/material";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //   padding: '20px',
  borderWidth: 2,
  width: "280px",
  height: "74px",
  borderRadius: "8px",
  border: "1px solid",
  borderColor: "#D0D5DD",
  cursor: "pointer",
  backgroundColor: "#F9FAFB",
  //   color: '#bdbdbd',
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DocumentUpload = ({ label, uploadfileurl, url, required = false }) => {
  const [loading, setLoading] = useState(false);
  const onFileChange = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const response = await ProfileFileApi(formData);

      if (response?.data?.status === true) {
        const fileLink = response?.data?.data?.filePath;

        // Call the callback with the file URL
        if (typeof uploadfileurl === "function") {
          uploadfileurl(fileLink);
        }
      } else {
        notify("error", res?.data?.message);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
    setLoading(false);
  };
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: "image/*",
    onDrop: onFileChange,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Stack gap="6px">
      {label && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      {loading ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <>
          {url && <iframe src={url} width={"150px"} height="200px" />}
          <div className="container">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />

              <Stack
                alignItems={"center"}
                direction={"row"}
                height={"100%"}
                justifyContent={"space-between"}
                width={"100%"}
                p={4}
              >
                <img src={AddIcon} alt={"Add Icon"} />
                <Stack direction={"column"}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {`Add Document`}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {`Browse files or drop here`}
                  </Typography>
                </Stack>
                {/* {acceptedFiles.length > 0 && (
                  <IconButton variant="outlined">
                    <img src={MenuIcon} alt={"Menu Icon"} />
                  </IconButton>
                )} */}
              </Stack>
            </div>
          </div>
        </>
      )}
    </Stack>
  );
};

export default DocumentUpload;
