import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const CustomTextField = ({
  textFieldProps,
  labelProps,
  subLabelProps,
  props,
  label,
  subLabel,
  onChange,
  placeholder,
  fullWidth,
  required,
  name,
  type,
  size,
  children,
  errorMessage,
  value,
}) => {
  console.log(errorMessage);
  return (
    <Stack {...props} gap="6px">
      {label && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
          }}
          {...labelProps}
        >
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <TextField
        required={required}
        fullWidth={fullWidth}
        type={type}
        size={size || "small"}
        variant="filled"
        margin="normal"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...textFieldProps}
        sx={{
          mb: 0,
          "& .MuiInputBase-root": {
            display: "flex",
            padding: "16px 12px",
            alignItems: "center",
            alignSelf: "stretch",
            borderRadius: "4px 4px 4px 4px",
            background: "rgba(255, 255, 255, 0.60)",
          },
          "& .MuiInputBase-input": {
            padding: 0,
          },
        }}
        InputProps={{
          disableUnderline: true,
        }}
      >
        {children}
      </TextField>
      {subLabel && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
          }}
          {...subLabelProps}
        >
          {subLabel}
        </Typography>
      )}
      {errorMessage && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
          }}
          {...subLabelProps}
          color={"error"}
        >
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};

export default CustomTextField;
