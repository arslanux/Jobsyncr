import React from 'react'
import { Backdrop, Box, Card, Fade, FormControl, Grid, InputAdornment, MenuItem, Modal, Select, Stack, TextField, Typography, Button, Divider, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import './modal.css'
import CustomTextField from '../../../theme/ui/TextField';
import { EmailOutlined } from '@mui/icons-material';
import { MdDelete } from 'react-icons/md';

const ReferenceList = ({ handleClose }) => {
    const referenceList = [
        {
            name: "John Doe",
            mobile: "+1234567890",
            email: "johndoe@example.com",
            relation: "Colleague",
        },
    ];

    const relationOptions = [
        { id: 1, name: "Colleague" },
        { id: 2, name: "Manager" },
        { id: 3, name: "Friend" },
    ];
    return (

        <Box className="modal_card_section">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-modal-title" variant="h6" className='modal_heading' sx={{ mb: 3 }}>
                    Reference List
                </Typography>

            </Box>

            <Grid container spacing={3} my={2} mx={1}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={""}
                            onChange={(e) => {
                                setReferenceinput((prevState) => ({
                                    ...prevState,
                                    not_provide_reference: e.target.checked,
                                }));
                            }}
                            name="gilad"
                        />
                    }
                    label="I don’t wish to provide references at this time"
                />

                {referenceList.map((item, index) => (
                    <Grid container spacing={3} key={index} my={2}>
                        <Grid item xs={12} mt={-5}>
                            <CustomTextField label="Reference Name" name="name" value={item.name} disabled />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField label="Mobile Number" name="mobile" value={item.mobile} disabled />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                label="Email"
                                name="email"
                                value={item.email}
                                disabled
                                textFieldProps={{
                                    InputProps: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <CustomTextField
                                    label="Professional Relationship"
                                    name="relation"
                                    value={item.relation}
                                    disabled
                                    textFieldProps={{
                                        select: true,
                                        size: "small",
                                    }}
                                >
                                    {relationOptions.map((data) => (
                                        <MenuItem value={data.name} key={data.id}>
                                            {data.name}
                                        </MenuItem>
                                    ))}
                                </CustomTextField>
                            </FormControl>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            <Box className="modal_footer" sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
                <button onClick={handleClose} className='cancle_button'>Cancel</button>
                <button className='save_button'>Save</button>
            </Box>
        </Box>
    )
}

export default ReferenceList