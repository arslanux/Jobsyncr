import { Box, Button, Dialog, DialogActions, Stack } from "@mui/material";
import React from "react";

const DocumentViewer = ({ file, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      fullWidth={"fullWidth"}
      maxWidth={"lg"}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box m={2}>
        <Stack gap={1}>
          <iframe
            src={`${file}#zoom=100`}
            allowFullScreen
            height="500px"
            width="100%"
          />
        </Stack>
        <DialogActions>
          <Button variant="outlined" onClick={() => handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DocumentViewer;
