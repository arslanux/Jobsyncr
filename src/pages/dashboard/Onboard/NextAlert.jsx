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

const NextAlert = ({
  open,
  handleClose,
  step,
  setStep,
  sectionName,
  saveAllHandler,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
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
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"text.primary"}
            >
              You have unsaved changes in "<strong>{sectionName}</strong>"
              Please save, or changes will be lost.
            </Typography>

            <Stack direction={"row"} gap={1} mt={2} justifyContent={"end"}>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => handleClose(false)}
                  color="info"
                >
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClose(false);
                    saveAllHandler();
                    setStep(step + 1);
                  }}
                  sx={{color:'white'}}
                >
                  Save & Continue
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
};

export default NextAlert;
