import React, { useState } from 'react'
import { Backdrop, Box, Card, Fade, FormControl, Grid, InputAdornment, MenuItem, Modal, Select, Stack, TextField, Typography, Button, Divider, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import './modal.css'
import CustomTextField from '../../../theme/ui/TextField';

const staticCountryList = [
    { id: 1, name: "United States" },
    { id: 2, name: "Canada" },
    { id: 3, name: "United Kingdom" },
];

const staticIndustrySectors = [
    { id: 1, name: "Executive" },
    { id: 2, name: "Administrative" },
    { id: 3, name: "Faculty" },
    { id: 4, name: "Other" },
];

const staticExperienceLevels = [
    { id: 1, name: "Executive" },
    { id: 2, name: "Administrative" },
    { id: 3, name: "Faculty" },
    { id: 4, name: "Other" },
];

const staticEmploymentTypes = [
    { id: 1, name: "Full-Time" },
    { id: 2, name: "Part-Time" },
    { id: 3, name: "Contractual" },
];

const staticWorkModes = [
    { id: 1, name: "Remote" },
    { id: 2, name: "In-Person" },
    { id: 3, name: "Hybrid" },
];

// const staticCurrencies = [
//     { cc: "USD", symbol: "$" },
//     { cc: "EUR", symbol: "€" },
//     { cc: "GBP", symbol: "£" },
// ];

const staticJobTitles = [
    { id: 1, name: "Senior International Officer" },
    { id: 2, name: "Associate/ Assistant Director" },
    { id: 3, name: "Other" },
    { id: 4, name: "Executive Director/ Director" },
    { id: 5, name: "Advisor" },
];

const staticEmployerTypes = [
    { id: 1, name: "Organization" },
    { id: 2, name: "Association" },
    { id: 3, name: "Other" },
    { id: 4, name: "Institution" },
    { id: 5, name: "Government" },
];

const staticAvailabilities = [
    { id: 1, name: "Immediate" },
    { id: 2, name: "1 Month" },
    { id: 3, name: "3 Months" },
];

const staticContactAvailabilities = [
    { id: 1, name: "Morning" },
    { id: 2, name: "Afternoon" },
    { id: 3, name: "Evening" },
];

const Preference = ({ handleClose }) => {

    const [preferredLocations, setPreferredLocations] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);

    return (
        <Box className="modal_card_section">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-modal-title" variant="h6" className='modal_heading' sx={{ mb: 3 }}>
                    Background and Skills
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        options={staticCountryList}
                        getOptionLabel={(option) => option.name}
                        value={preferredLocations}
                        onChange={(_, newValue) => setPreferredLocations(newValue)}
                        renderInput={(params) => (
                            <CustomTextField textFieldProps={{ ...params, size: "small" }} label="Country Preferences" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={12} sx={{ mx: 1, my: 2 }}>
                    <Typography variant="body1" fontWeight={600} color="text.secondary">
                        Preferred Industry Sector
                    </Typography>
                    <Grid container>
                        {staticIndustrySectors.map((data) => (
                            <Grid item xs={12} md={6} key={data.id} sx={{ my: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={selectedIndustries.includes(data.id)} onChange={() => {
                                        setSelectedIndustries((prev) =>
                                            prev.includes(data.id) ? prev.filter((id) => id !== data.id) : [...prev, data.id]
                                        );
                                    }} />}
                                    label={data.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mx: 1 }}>
                    <Typography variant="body1" fontWeight={600} color="text.secondary">
                        Preferred Experience Level *
                    </Typography>
                    <Grid container>
                        {staticExperienceLevels.map((data) => (
                            <Grid item xs={12} md={6} key={data.id} sx={{ my: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={selectedIndustries.includes(data.id)} onChange={() => {
                                        setSelectedIndustries((prev) =>
                                            prev.includes(data.id) ? prev.filter((id) => id !== data.id) : [...prev, data.id]
                                        );
                                    }} />}
                                    label={data.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mx: 1 }}>
                    <Typography variant="body1" fontWeight={600} color="text.secondary">
                        Preferred Work Mode *
                    </Typography>
                    <Grid container>
                        {staticWorkModes.map((data) => (
                            <Grid item xs={12} md={6} key={data.id} sx={{ my: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={selectedIndustries.includes(data.id)} onChange={() => {
                                        setSelectedIndustries((prev) =>
                                            prev.includes(data.id) ? prev.filter((id) => id !== data.id) : [...prev, data.id]
                                        );
                                    }} />}
                                    label={data.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mx: 1 }}>
                    <Typography variant="body1" fontWeight={600} color="text.secondary">
                        Preferred Employment Type *
                    </Typography>
                    <Grid container>
                        {staticEmploymentTypes.map((data) => (
                            <Grid item xs={12} md={6} key={data.id} sx={{ my: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={selectedIndustries.includes(data.id)} onChange={() => {
                                        setSelectedIndustries((prev) =>
                                            prev.includes(data.id) ? prev.filter((id) => id !== data.id) : [...prev, data.id]
                                        );
                                    }} />}
                                    label={data.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={2} >
                    <CustomTextField
                        label="Currency"
                        name="currency"
                        placeholder="USD"
                        required={false}
                        value={""}
                        onChange={() => { }}
                        textFieldProps={{ select: true, size: "small" }}
                    >
                        {[].map((data) => (
                            <MenuItem value={data.cc} key={data.cc}>
                                {data.cc} ({data.symbol})
                            </MenuItem>
                        ))}
                    </CustomTextField>
                </Grid>

                <Grid item xs={12} md={10}>
                    <CustomTextField
                        label="Minimum Salary Expectation?"
                        placeholder="Enter minimum salary"
                        name="min_salary_expectation"
                        value={""}
                        onChange={() => { }}
                    />
                </Grid>
                <Grid item xs={12} md={12} sx={{ mx: 1 }}>
                    <Typography variant="body1" fontWeight={600} color="text.secondary">
                        Desired Job Title? *
                    </Typography>
                    <Grid container>
                        {staticJobTitles.map((data) => (
                            <Grid item xs={12} md={6} key={data.id} sx={{ my: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={selectedIndustries.includes(data.id)} onChange={() => {
                                        setSelectedIndustries((prev) =>
                                            prev.includes(data.id) ? prev.filter((id) => id !== data.id) : [...prev, data.id]
                                        );
                                    }} />}
                                    label={data.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mx: 1 }}>
                    <Typography variant="body1" fontWeight={600} color="text.secondary">
                        Type of Employer Seeking? *
                    </Typography>
                    <Grid container>
                        {staticJobTitles.map((data) => (
                            <Grid item xs={12} md={6} key={data.id} sx={{ my: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={selectedIndustries.includes(data.id)} onChange={() => {
                                        setSelectedIndustries((prev) =>
                                            prev.includes(data.id) ? prev.filter((id) => id !== data.id) : [...prev, data.id]
                                        );
                                    }} />}
                                    label={data.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <CustomTextField
                            label="Availability to Join"
                            name="availability"
                            value={""}
                            onChange={() => { }}
                            required
                            textFieldProps={{ select: true, size: "small" }}
                        >
                            {[].map((data) => (
                                <MenuItem value={data?.id} key={data?.id}>
                                    {data?.name}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <CustomTextField
                            label="Contact Availability"
                            name="contact_availability"
                            value={""}
                            onChange={() => { }}
                            textFieldProps={{ select: true, size: "small" }}
                        >
                            {[].map((data) => (
                                <MenuItem value={data?.id} key={data?.id}>
                                    {data?.name}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                        label="Additional Comments"
                        placeholder=""
                        name=""

                        textFieldProps={{
                            multiline: true,
                            rows: 4,
                        }}
                    />
                </Grid>
            </Grid>


            <Box className="modal_footer" sx={{ display: "flex", justifyContent: "flex-end", mt: 5, gap: 2 }}>
                <button onClick={handleClose} className='cancle_button'>Cancel</button>
                <button className='save_button'>Save</button>
            </Box>
        </Box>
    )
}

export default Preference