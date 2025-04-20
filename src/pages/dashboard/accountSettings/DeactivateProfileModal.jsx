import { Box, Button, Dialog, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import DeactivateIcon from "../../../assets/deactivate_icon.svg";
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

const DeactivvateProfileModal = ({ open, handleClose, data, onChange }) => {
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
              src={DeactivateIcon}
              alt="Submit Icon"
            />
            {
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color={"text.primary"}
              >
                {data?.deactivated
                  ? "Activate my Profile"
                  : " Deactivate my Profile"}
              </Typography>
            }
            <Typography id="modal-modal-description">
              {data?.deactivated
                ? "Are you sure you want to activate your profile."
                : "Are you sure you want to deactivate your profile? This action can be changed later."}
            </Typography>
            <Stack direction={"row"} gap={1} mt={2}>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  color="info"
                >
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => onChange(!data?.deactivated)}
                  color={data?.deactivated ? "success" : "error"}
                >
                  {data?.deactivated ? "Activate" : "Deactivate"}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
};

export default DeactivvateProfileModal;
