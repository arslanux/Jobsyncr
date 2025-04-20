import React from 'react'
import { Backdrop, Box, Card, Fade, FormControl, Grid, InputAdornment, MenuItem, Modal, Select, Stack, TextField, Typography, Button, Divider, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import './modal.css'
import CustomTextField from '../../../theme/ui/TextField';
import { Link } from 'react-router-dom';

const OtherDocumnet = ({ handleClose }) => {
    return (
        <Box className="modal_card_section">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-modal-title" variant="h6" className='modal_heading' sx={{ mb: 3 }}>
                    Other Documents
                </Typography>

            </Box>
            <Grid item xs={12} md={12} sx={{ mb: 2 }}>
                <CustomTextField
                    label={"Document Name"}
                    name="name"
                    value={""}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <CustomTextField
                    label={"Document Type"}
                    name="type"
                    value={""}
                />
            </Grid>
            <Box className="modal_upload_content" sx={{ my: 2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 15.01L9.41 16.42L11 14.84V19H13V14.84L14.59 16.43L16 15.01L12.01 11L8 15.01Z" fill="#1976D2" />
                </svg>
                <Typography variant="body1" className='modal_upload_text'>
                    <span><Link style={{ color: '#1976D2' }}>Link </Link></span>or drag and drop
                </Typography>
                <Typography variant="body1" className='modal_upload_subtext'>
                    SVG, PNG, JPG or GIF (max. 3MB)
                </Typography>
            </Box>

            <Box className="modal_footer" sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
                <button onClick={handleClose} className='cancle_button'>Cancel</button>
                <button className='save_button'>Save</button>
            </Box>
        </Box>
    )
}

export default OtherDocumnet