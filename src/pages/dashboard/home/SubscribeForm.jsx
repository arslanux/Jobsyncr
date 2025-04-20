import {
  Button,
  Card,
  InputAdornment,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../../theme/ui/TextField";
import { AccountCircle } from "@mui/icons-material";
import notify from "../../../utils/Toast";
import { newsLetterApi } from "../../../config/ApiHandler";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await newsLetterApi({ email: email });
      if (res?.data?.status) {
        notify("success", "Subscribed Successfully");
        setEmail("");
      } else {
        notify("error", res?.data?.message);
      }
    } catch (err) {
      notify("error", "Something went wrong");
    }
  };

  return (
    <Card
      sx={{
        height: "196px",
        width: "312px",
        padding: "1px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubscribe}>
        <Stack gap={2} alignItems={"center"} p={2.5}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Subscribe to the Zerozilla Edge Newsletter
          </Typography>
          <TextField
            placeholder={"Enter your Email"}
            value={email}
            type={"email"}
            size="small"
            sx={{ width: "100%" }}
            required
            onChange={(e) => setEmail(e.target.value)}
            textFieldProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" fullWidth type="submit" sx={{color:'white',bgcolor:'primary.main'}}>
            Subscribe
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default SubscribeForm;
