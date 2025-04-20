import { Box, Modal } from "@mui/material";
import React from "react";
import "../profileCreation/allModals/modal.css";

const CommonModal = ({ open, handleClose, children }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                    boxShadow: 24,
                    outline: "none",
                    borderRadius: 2,
                    backdropFilter: "blur(2px)",
                    width: "90vw",
                    maxWidth: "800px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    p: 3,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                <Box onClick={handleClose} sx={{ position: "absolute", top: 20, right: 20, cursor: "pointer" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M13.2001 12.0001L20.3144 4.88585C20.6573 4.543 20.6573 4.02871 20.3144 3.68585C19.9716 3.343 19.4573 3.343 19.1144 3.68585L12.0001 10.8001L4.88585 3.68585C4.543 3.343 4.02871 3.343 3.68585 3.68585C3.343 4.02871 3.343 4.543 3.68585 4.88585L10.8001 12.0001L3.68585 19.1144C3.343 19.4573 3.343 19.9716 3.68585 20.3144C4.02871 20.6573 4.543 20.6573 4.88585 20.3144L12.0001 13.2001L19.1144 20.3144C19.4573 20.6573 19.9716 20.6573 20.3144 20.3144C20.6573 19.9716 20.6573 19.4573 20.3144 19.1144L13.2001 12.0001Z" fill="#858589" />
                    </svg>
                </Box>
                <Box className="modal_card_section">{children}</Box>
            </Box>
        </Modal>
    );
};

export default CommonModal;
