import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { PROFILEIMAGEUPLOADApi } from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";
import { Skeleton } from "@mui/material";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  width: "242px",
  height: "242px",
  borderRadius: "8px",
  border: "1px solid",
  borderColor: "#D0D5DD",
  cursor: "pointer",
  color: "#bdbdbd",
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

const Upload = ({ label, setUploadedUrl, imageLink }) => {
  const [loading, setLoading] = React.useState(false);
  // const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
  //   useDropzone({ accept: { 'image/*': [] } });
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: "image/*",
      onDrop: async (acceptedFiles) => {
        const file = acceptedFiles[0];

        const formData = new FormData();
        formData.append("file", file);
        try {
          setLoading(true);
          const response = await PROFILEIMAGEUPLOADApi(formData);
          if (response?.status === 200) {
            setUploadedUrl(response?.data?.data?.filePath);
            setLoading(false);
          }
        } catch (err) {
          notify("error", err?.response?.data?.message);
          setLoading(false);
        }
        setLoading(false);
      },
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
        </Typography>
      )}
      <div className="container">
        {loading ? (
          <Skeleton variant="rectangular" width={100} height={"200px"} />
        ) : (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {imageLink ? (
              <img
                src={imageLink}
                alt="Uploaded"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            ) : (
              <p>Drag and drop some files here,PNG, JPEG format (max. 5MB)</p>
            )}
            {/* <img src={imageLink} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />: <p>Drag and drop some files here, or click to select files</p>} */}
          </div>
        )}
      </div>
    </Stack>
  );
};

export default Upload;
