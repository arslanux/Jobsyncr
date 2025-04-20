import React from "react";
import { Dialog, Box } from "@mui/material";
import ApplyJobContent from "./ApplyJobContent";

const ApplyJobModal = ({
  job,
  open,
  handleClose,
  handleApplyJobSubmit,
  submitting,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth="sm"
      fullWidth
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          overflowX: "hidden",
          mx: "auto",
          p: 2,
        }}
      >
        <ApplyJobContent
          job={job}
          handleClose={handleClose}
          handleApplyJobSubmit={handleApplyJobSubmit}
          submitting={submitting}
        />
      </Box>
    </Dialog>
  );
};

export default ApplyJobModal;
