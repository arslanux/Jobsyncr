import React, { useState } from 'react'
import { Backdrop, Box, Card, Fade, FormControl, Grid, InputAdornment, MenuItem, Modal, Select, Stack, TextField, Typography, Button, Divider, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import './modal.css'
import CustomTextField from '../../../theme/ui/TextField';
import { MdDelete } from 'react-icons/md';

const BackgroundSkills = ({ handleClose }) => {

    const skillList = [
        { id: 1, name: "JavaScript" },
        { id: 2, name: "Python" },
        { id: 3, name: "React" },
    ];

    const skillProficiencyList = [
        { id: 1, name: "Beginner" },
        { id: 2, name: "Intermediate" },
        { id: 3, name: "Expert" },
    ];

    const yearList = [
        { id: 1, name: "1 Year" },
        { id: 2, name: "2 Years" },
        { id: 3, name: "3+ Years" },
    ];

    const [formData, setFormData] = useState({
        skill_id: null,
        skill_proficiency_id: "",
        experience_id: "",
    });

    const handleFieldChange = (e, field) => {
        const value = e.target ? e.target.value : e;
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (

        <Box className="modal_card_section">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-modal-title" variant="h6" className='modal_heading' sx={{ mb: 3 }}>
                    Background and Skills
                </Typography>

            </Box>
            <Grid container spacing={3} my={1}>

                <Grid item xs={12} md={12}>
                    <Stack gap="6px">
                        <Typography variant="body1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                            Skill
                        </Typography>
                        <Autocomplete
                            value={formData.skill_id}
                            onChange={(event, newValue) => handleFieldChange(newValue, "skill_id")}
                            options={skillList}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} size="small" label="Select Skill" />}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <CustomTextField
                            label="Skill Proficiency"
                            value={formData.skill_proficiency_id}
                            name="skill_proficiency_id"
                            onChange={(e) => handleFieldChange(e, "skill_proficiency_id")}
                            textFieldProps={{
                                select: true,
                                size: "small",
                            }}
                        >
                            {skillProficiencyList.map((data) => (
                                <MenuItem value={data.id} key={data.id}>
                                    {data.name}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                    </FormControl>
                </Grid>


                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <CustomTextField
                            label="Years of Experience"
                            name="experience_id"
                            value={formData.experience_id}
                            onChange={(e) => handleFieldChange(e, "experience_id")}
                            textFieldProps={{
                                select: true,
                                size: "small",
                            }}
                        >
                            {yearList.map((data) => (
                                <MenuItem value={data.id} key={data.id}>
                                    {data.name}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                    </FormControl>
                </Grid>

            </Grid>

            <Box className="modal_footer" sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
                <button onClick={handleClose} className='cancle_button'>Cancel</button>
                <button className='save_button'>Save</button>
            </Box>
        </Box>

    )
}

export default BackgroundSkills