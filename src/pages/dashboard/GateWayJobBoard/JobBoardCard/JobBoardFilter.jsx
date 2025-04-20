import {
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import CustomTextField from "../../../../theme/ui/TextField";

const JOB_EXPERTISE = [
  {
    name: "Education Abroad",
    value: "Education Abroad",
    // value: 1478,
  },
  {
    name: "International Education Leadership",
    value: "International Education Leadership",
    // value: 1479,
  },
  {
    name: "International Enrollment Management",
    value: "International Enrollment Management",
    // value: 1480,
  },
  {
    name: "International Student and Scholar Services",
    value: "International Student and Scholar Services",
    // value: 1481,
  },
  {
    name: "Teaching, Learning, and Scholarship",
    value: "Teaching, Learning, and Scholarship",
    // value: 1499,
  },
];

const JOB_LOCATION = [
  {
    name: "United States",
    value: "unitedstates",
  },
  {
    name: "Canada",
    value: "canada",
  },
  {
    name: "Europe",
    value: "Europe",
  },
  {
    name: "Asia",
    value: "asia",
  },
  {
    name: "Africa",
    value: "africa",
  },
  {
    name: "Latin America & the Caribbean",
    value: "latinamerica",
  },
  {
    name: "Oceania",
    value: "oceania",
  },
  {
    name: "Remote ",
    value: "remote",
  },
  {
    name: "Hybrid",
    value: "hybrid",
  },
];

const EMPLOYMENT_TYPE = [
  {
    name: "Full Time",
    value: "full-time",
  },
  {
    name: "Part Time",
    value: "part-time",
  },
];

const JobBoardFilter = ({
  searchText,
  setSearchText,
  experties,
  setExperties,
  location,
  setLocation,
  employmentType,
  setEmploymentType,
}) => {
  return (
    <Paper>
      <Card>
        <Grid container direction="row" p={2} justifyContent={"space-between"}>
          <Grid item md={3} xs={12} sx={{ mb: 1 }}>
            <CustomTextField
              label={"Search keywords"}
              placeholder={"Search keywords"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              textFieldProps={{
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsSearch />
                    </InputAdornment>
                  ),
                  endAdornment:
                    searchText?.length > 0 ? (
                      <InputAdornment>
                        <IconButton onClick={() => setSearchText("")}>
                          <MdClose size={16} />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                },
              }}
            />
          </Grid>

          <Grid item md={6} xs={12} >
            <Grid container direction="row" justifyContent={"space-between"}>
              <Grid item md={4} xs={12} sx={{ mb: 1, px: 0.5 }}>
                <FormControl fullWidth>
                  <CustomTextField
                    label={"Select Experties"}
                    value={experties}
                    onChange={(e) => setExperties(e.target.value)}
                    textFieldProps={{
                      select: true,
                      InputProps: {
                        endAdornment: experties ? (
                          <InputAdornment>
                            <IconButton onClick={() => setExperties("")}>
                              <MdClose size={16} />
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                      },
                    }}
                  >
                    {JOB_EXPERTISE.map((item) => (
                      <MenuItem value={item?.value} key={item?.value}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12} sx={{ mb: 1, px: 0.5 }}>
                <FormControl fullWidth>
                  <CustomTextField
                    label={"Select Location"}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    textFieldProps={{
                      select: true,
                      InputProps: {
                        endAdornment:
                          location?.length > 0 ? (
                            <InputAdornment>
                              <IconButton onClick={() => setLocation("")}>
                                <MdClose size={16} />
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                      },
                    }}
                  >
                    {JOB_LOCATION.map((item) => (
                      <MenuItem value={item?.value} key={item?.value}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12} sx={{ mb: 1, px: 0.5 }}>
                <FormControl fullWidth>
                  <CustomTextField
                    label={"Select Employment Type"}
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    textFieldProps={{
                      select: true,
                      InputProps: {
                        endAdornment:
                          employmentType?.length > 0 ? (
                            <InputAdornment>
                              <IconButton onClick={() => setEmploymentType("")}>
                                <MdClose size={16} />
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                      },
                    }}
                  >
                    {EMPLOYMENT_TYPE.map((item) => (
                      <MenuItem value={item?.value} key={item?.value}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </FormControl>
              </Grid>
            </Grid>

            {/* </Stack> */}
          </Grid>
        </Grid>
      </Card>
    </Paper>
  );
};

export default JobBoardFilter;
