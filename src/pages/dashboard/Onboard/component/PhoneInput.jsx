import React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Stack, Typography } from "@mui/material";
import { CountryCodeList } from "../../../../utils/countrycode";

const PhoneInput = ({
  phoneOnChangeHandler,
  phone,
  code,
  codeOnChangeHandler,
  label,
  required = false,
  codeErrorMessage,
  phoneErrorMessage,
}) => {
  // State to manage the selected pincode
  const [pincode, setPincode] = React.useState("");

  // Array of sample pincode options
  const pincodeOptions = ["+1", "+44", "+91", "+86", "+818"];

  // Event handler for pincode select
  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  return (
    <Stack gap={"6px"}>
      {label && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <Stack
        display={"flex"}
        direction={"row"}
        borderRadius={"8px"}
        border={"1px rgba(0, 0, 0, 0.23) solid"}
      >
        <Select
          size="small"
          value={code}
          sx={{
            "& fieldset": { border: "none" }, width: '110px'
          }}
          autoWidth
          onChange={codeOnChangeHandler}
          renderValue={(selected) => {
            return selected;
          }}
        >
          {CountryCodeList.map((option) => (
            <MenuItem key={option?.code} value={option?.dial_code}>
              {option?.name} ({option?.dial_code})
            </MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          size="small"
          value={phone}
          InputProps={{
            inputProps: {
              inputMode: "numeric", // This helps in hiding the increment/decrement arrows
            },
          }}
          // placeholder="Enter phone number"
          sx={{
            "& fieldset": { border: "none" },
          }}
          onChange={phoneOnChangeHandler}
        // You can add additional props for validation, etc.
        />
      </Stack>
      {(codeErrorMessage || phoneErrorMessage) && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
          }}
          color={"error"}
        >
          {codeErrorMessage || phoneErrorMessage}
        </Typography>
      )}
    </Stack>
  );
};

export default PhoneInput;
