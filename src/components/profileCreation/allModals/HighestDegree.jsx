import React, { useState, useEffect } from 'react';
import { Box, Grid, Modal, Typography, Button, MenuItem, FormControl } from '@mui/material';
import CustomTextField from '../../../theme/ui/TextField';
import { useDispatch, useSelector } from "react-redux";
import { EducationInfoApi, getHighestDegreeApi } from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";
import { onboardingView } from "../../../redux/onboarding/personalInformation/PersonalInfoAction";

const HighestDegree = ({ open6, handleClose6 }) => {
    const dispatch = useDispatch();

    const [degreeList, setDegreeList] = useState([]);
    const [highestEducation, setHighestEducation] = useState(null);
    const [highestEducationError, setHighestEducationError] = useState("");

    const higestDegreeValidation = (higestDegree) => {
        if (!higestDegree) {
            setHighestEducationError("Highest Degree is required");
            return false;
        }
        setHighestEducationError("");
        return true;
    };

    const personalData = useSelector((state) => state?.onboard?.onboardViewData?.data?.personalInformation);

    const getDegreeList = async () => {
        try {
            const response = await getHighestDegreeApi();
            const degrees = response?.data?.data?.highestDegrees || [];
            setDegreeList(degrees);
        } catch (error) {
            console.error("Error fetching degree list:", error);
            notify("error", "Failed to load degree list");
        }
    };

    useEffect(() => {
        getDegreeList();
        if (personalData?.highest_degree_id) {
            setHighestEducation(personalData.highest_degree_id);
        }
    }, [personalData]);

    const handleDegreeChange = (e) => {
        setHighestEducation(e.target.value);
        setHighestEducationError("");
    };

    const handleDegreeSubmit = async (e) => {
        e.preventDefault();

        if (!higestDegreeValidation(highestEducation)) {
            notify("error", "Please select the highest degree obtained");
            return;
        }

        if (personalData?.highest_degree_id === highestEducation) {
            notify("info", "No changes made");
            return;
        }

        const updateData = {
            section_type: "highest_degree",
            highest_degree_id: highestEducation,
        };

        try {
            const res = await EducationInfoApi(updateData);



            const message = String(res?.data?.message || "Updated successfully");

            if (res?.data?.status === true) {
                notify("success", message);
                dispatch(onboardingView());
                handleClose6();
            } else {
                notify("error", message);
            }
        } catch (error) {
            console.error("Error updating highest degree:", error);
            notify("error", "An error occurred while updating.");
        }
    };

    return (
        <Modal open={open6} onClose={handleClose6}>
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
                    backdropFilter: "blur(17px)",
                    width: "90vw",
                    maxWidth: "800px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    p: 3,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                <Box className="modal_card_section">
                    {/* Modal Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" className='modal_heading' sx={{ mb: 2 }}>
                            Highest Degree Obtained
                        </Typography>
                        <Box onClick={handleClose6} sx={{ cursor: "pointer" }}>
                            <Typography variant="body2">✖</Typography>
                        </Box>
                    </Box>

                    {/* Dropdown for Highest Degree */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <CustomTextField
                                label="Highest Degree"
                                name="highest_degree_id"
                                placeholder="Please select an option"
                                onChange={handleDegreeChange}
                                errorMessage={highestEducationError}
                                textFieldProps={{
                                    select: true,
                                    size: "small",
                                    value: highestEducation || "",
                                    InputLabelProps: { shrink: false },
                                    sx: {
                                        width: "100%",
                                        "@media (max-width: 600px)": {
                                            width: 180 + "px",
                                        },
                                    },
                                }}
                            >
                                {degreeList.length > 0 ? (
                                    degreeList.map((data) => (
                                        <MenuItem value={data.id} key={data.id}>
                                            {data.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No degrees available</MenuItem>
                                )}
                            </CustomTextField>
                        </FormControl>
                    </Grid>

                    {/* Modal Footer */}
                    <Box className="modal_footer" sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
                        <Button onClick={handleClose6} variant="outlined">Cancel</Button>
                        <Button onClick={handleDegreeSubmit} variant="contained">Save</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default HighestDegree;
