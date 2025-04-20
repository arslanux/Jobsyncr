import React from "react";
import { Box, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ResumePreview = ({ onClick, label }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        textAlign: "center",
        width: "130px",
        height: "130px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        mt: 2,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        },
        "&:hover .overlay": {
          opacity: 1,
        },
      }}
    >
      <PictureAsPdfIcon style={{ fontSize: "4.5rem", color: "#e74c3c" }} />
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.3s ease",
          textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="body"
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          View
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "4px",
          fontSize: "0.72rem",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {label}
      </Box>
    </Box>
  );
};

export default ResumePreview;
