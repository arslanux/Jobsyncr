import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, CircularProgress } from "@mui/material";
import { ProfileFileApi } from "../../../../config/ApiHandler";
import notify from "../../../../utils/Toast";

const ResumeUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadNewResume = async (uploadedFile) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", uploadedFile);
      const response = await ProfileFileApi(formData);

      if (response?.data?.status === true) {
        const filePath = response?.data?.data?.filePath;
        setFile(filePath);
        notify("success", response?.data?.message);
        if (onFileUpload) {
          onFileUpload(filePath);
        }
      } else {
        notify("error", response?.data?.message);
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      uploadNewResume(uploadedFile);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxFiles: 1,
  });

  return (
    <Box textAlign="center">
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <CircularProgress />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Uploading...
          </Typography>
        </Box>
      ) : (
        !file && (
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #888",
              padding: 3,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography variant="body1" color="primary">
                Drop the PDF file here...
              </Typography>
            ) : (
              <Typography variant="body1">
                Drag 'n' drop a PDF file here, or click to select a file
              </Typography>
            )}
          </Box>
        )
      )}
    </Box>
  );
};

export default ResumeUploader;
