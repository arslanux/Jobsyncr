import React from 'react'
import { Backdrop, Box, Card, Fade, FormControl, Grid, InputAdornment, MenuItem, Modal, Select, Stack, TextField, Typography, Button, Divider, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import './modal.css'
import CustomTextField from '../../../theme/ui/TextField';
import { Link } from 'react-router-dom';

const Honers = ({ handleClose }) => {
    return (

        <Box className="modal_card_section">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-modal-title" variant="h6" className='modal_heading' sx={{ mb: 3 }}>
                    Honors & Awards
                </Typography>
            </Box>
            <Grid item xs={12} md={12} sx={{ mb: 2 }}>
                <CustomTextField
                    label={"Title"}
                    name="type"
                    value={""}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomTextField
                    label="Description"
                    placeholder=""
                    name=""

                    textFieldProps={{
                        multiline: true,
                        rows: 4,
                    }}
                />
            </Grid>

            <Box className="modal_footer" sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
                <button onClick={handleClose} className='cancle_button'>Cancel</button>
                <button className='save_button'>Save</button>
            </Box>
        </Box>
    )
}

export default Honers