import { Box, Button, Dialog, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import SubmitIcon from "../../../assets/submit_icon.svg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SubmitFormModal = ({ open, handleClose, handleDisclaimerSubmit }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          m={2}
          sx={{
            width: "400px",
          }}
        >
          <Stack gap={1}>
            <img
              style={{ width: "48px", height: "48px" }}
              src={SubmitIcon}
              alt="Submit Icon"
            />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"text.primary"}
            >
              Profile Submission Confirmation
            </Typography>
            <Typography id="modal-modal-description">
              All the information you entered will be reviewed by our team after
              you submit the profile.
            </Typography>
            <Stack direction={"row"} gap={1} mt={2}>
              <Box>
                <Button variant="contained" onClick={handleClose} color="info">
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleDisclaimerSubmit}
                  sx={{ color: "white" }}
                >
                  Submit
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
};

export default SubmitFormModal;
