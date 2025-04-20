import React, { useState } from 'react'
import { Backdrop, Box, Card, Fade, FormControl, Grid, InputAdornment, MenuItem, Modal, Select, Stack, TextField, Typography, Button, Divider, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import './modal.css'
import CustomTextField from '../../../theme/ui/TextField';
import { Link } from 'react-router-dom';

const ProffesionalsAssosiations = ({ handleClose }) => {
    const [searchValue, setSearchValue] = useState("");
    return (

        <Box className="modal_card_section">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-modal-title" variant="h6" className='modal_heading' sx={{ mb: 3 }}>
                    Professional Authorizations
                </Typography>

            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1" className='modal_work_text' sx={{ my: 2 }}>Association Name</Typography>
                <Box className="modal_work_country">
                    <Typography variant="body1" className='modal_work_country_text'>Lorem</Typography>
                    <Typography variant="body1" className='modal_work_country_text'>Lorem ipsum</Typography>
                    <Typography variant="body1" className='modal_work_country_text'>LI</Typography>
                </Box>
            </Box>
            <Grid item xs={12} md={12} sx={{ mb: 2 }}>
                <CustomTextField
                    label={""}
                    name="type"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Grid>

            <Box className="modal_footer" sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
                <button onClick={handleClose} className='cancle_button'>Cancel</button>
                <button className='save_button'>Save</button>
            </Box>
        </Box>
    )
}

export default ProffesionalsAssosiations