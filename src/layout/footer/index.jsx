import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

const index = () => {
  return (
    <Box style={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography style={{ textAlign: "center" }}>
            © 2024 Zerozilla International Group. All Rights Reserved.
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            Powered by{" "}
            <a
              href="https://zerozilla.com/"
              target="_blank"
              style={{ color: "#4C1A88" }}
            >
              Zerozilla
            </a>
          </Typography>
        </Grid>
        {/* <Grid item xs={4}>
        <Item>zerozilla.com</Item>
      </Grid> */}
      </Grid>
    </Box>
  );
};

export default index;
