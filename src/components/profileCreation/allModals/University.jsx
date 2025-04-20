import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Modal, Stack, Typography, Button, Divider } from '@mui/material';
import CustomTextField from '../../../theme/ui/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { MdDelete } from 'react-icons/md';
import dayjs from "dayjs";
import notify from "../../../utils/Toast";
import { EducationInfoApi } from "../../../config/ApiHandler";
import { onboardingView } from "../../../redux/onboarding/personalInformation/PersonalInfoAction";

const University = ({ open5, handleClose5 }) => {
    const dispatch = useDispatch();

    const educationData = useSelector(
        (state) => state?.onboard?.onboardViewData?.data?.educationalBackground
    );

    const [universityInfo, setUniversityInfo] = useState({
        not_provide_education: false,
        universities: [
            {
                start_date: null,
                end_date: null,
                university_name: "",
                degree_name: "",
                major_name: "",
            },
        ],
    });

    useEffect(() => {
        if (educationData?.universities?.length > 0) {
            setUniversityInfo({
                not_provide_education: educationData.not_provide_education || false,
                universities: educationData.universities.map((edu) => ({
                    start_date: edu.start_date ? dayjs(edu.start_date) : null,
                    end_date: edu.end_date ? dayjs(edu.end_date) : null,
                    university_name: edu.University?.name || "",
                    degree_name: edu.Degree?.name || "",
                    major_name: edu.Major?.name || "",
                })),
            });
        }
    }, [educationData]);

    const handleFieldChange = (e, field, index, type = "text") => {
        const value = type === "date" ? dayjs(e) : e.target.value;
        const updatedUniversities = [...universityInfo.universities];
        updatedUniversities[index][field] = value;
        setUniversityInfo((prevState) => ({
            ...prevState,
            universities: updatedUniversities,
        }));
    };

    const handleAddUniversity = () => {
        setUniversityInfo((prevState) => ({
            ...prevState,
            universities: [
                ...prevState.universities,
                {
                    start_date: null,
                    end_date: null,
                    university_name: "",
                    degree_name: "",
                    major_name: "",
                },
            ],
        }));
    };
    const handleRemoveUniversity = (index) => {
        const updatedUniversities = universityInfo.universities.filter((_, i) => i !== index);
        setUniversityInfo((prevState) => ({
            ...prevState,
            universities: updatedUniversities,
        }));
    };

    return (
        <Modal open={open5} onClose={handleClose5}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgba(255, 255, 255, 0.75)", boxShadow: 24, outline: "none", borderRadius: 2, backdropFilter: "blur(17px)", width: "90vw", maxWidth: "800px", maxHeight: "90vh", overflowY: "auto", p: 3 }}>
                <Box className="modal_card_section">
                    <Typography variant="h6" className='modal_heading' sx={{ mb: 2 }}>University/ College</Typography>

                    <Grid container spacing={3} my={1}>
                        {universityInfo.universities.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12}>
                                    <Stack gap="6px">
                                        <CustomTextField
                                            label="University/College Name"
                                            value={item.university_name}
                                            onChange={(e) => handleFieldChange(e, "university_name", index)}
                                            required
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack gap="6px">
                                        <CustomTextField
                                            label="Degree"
                                            value={item.degree_name}
                                            onChange={(e) => handleFieldChange(e, "degree_name", index)}
                                            required
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack gap="6px">
                                        <CustomTextField
                                            label="Major"
                                            value={item.major_name}
                                            onChange={(e) => handleFieldChange(e, "major_name", index)}
                                            required
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack gap="6px">
                                        <Typography variant="body1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                                            Graduated / Expected Graduation Date
                                        </Typography>
                                        <DatePicker
                                            disabled={universityInfo.not_provide_education}
                                            value={item.end_date}
                                            slotProps={{ textField: { size: "small" }, field: { clearable: true } }}
                                            onChange={(date) => handleFieldChange(date, "end_date", index, "date")}
                                        />
                                    </Stack>
                                </Grid>
                                {index > 0 && (
                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveUniversity(index)}
                                            startIcon={<MdDelete />}
                                        >
                                            Remove
                                        </Button>
                                    </Grid>
                                )}
                                {index !== universityInfo.universities.length - 1 && (
                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 2 }} />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>

                    <Button onClick={handleAddUniversity} variant="contained" sx={{ mt: 2 }}>
                        Add More
                    </Button>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
                        <Button onClick={handleClose5} variant="outlined">Cancel</Button>
                        <Button onClick={() => console.log(universityInfo)} variant="contained">Save</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default University;
