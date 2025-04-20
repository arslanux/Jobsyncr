import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "../assets/logo.svg";
import treads from "../assets/treads.svg";
import linkedin from "../assets/linkedin.svg";
import insta from "../assets/insta.svg";
import youtube from "../assets/youtube.svg";
import { Link, useNavigate } from "react-router-dom";
import { capitalizeString } from "../utils/utilsfunction";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: { xs: "10px 0", md: "20px 0" },
        borderTop: "1px solid #FFF",
      }}
    >
      <Container
        sx={{
          maxWidth: {
            lg: "1300px", // For screens wider than 1200px
          },
          "@media (min-width: 1200px)": {
            maxWidth: "100%",
          },
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Logo and Copyright */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Link
              to="#"
              target="_blank"
            >
              <img src={logo} alt="Logo" />
            </Link>
            <Typography
              variant="body2"
              color="#101010"
              sx={{
                fontSize: { xs: "12px", md: "14px" },
                marginTop: "8px",
                fontWeight: 500,
              }}
            >
              © Zerozilla International Group. All rights reserved.
            </Typography>
          </Grid>

          {/* Sign Up and Login Buttons */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "12px", md: "16px" },
                  color: "#FFF",
                  backgroundColor: "#4c1b88",
                  "&:hover": { backgroundColor: "##4C1A88" },
                }}
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                {capitalizeString("SIGN UP")}
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "12px", md: "16px" },
                  color: "#FFF",
                  backgroundColor: "#c31f5d",
                  "&:hover": { backgroundColor: "#e57500" },
                }}
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                {capitalizeString("LOGIN")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          maxWidth: {
            lg: "1300px", // For screens wider than 1200px
          },
          "@media (min-width: 1200px)": {
            maxWidth: "100%",
          },
        }}
      >
        {/* Divider (Horizontal Line) */}
        <Divider
          sx={{
            margin: { xs: "10px 20px", md: "20px 0" },
            backgroundColor: "#071C57",
            height: "1.5px",
            opacity: 0.5,
          }}
        />
      </Container>
      <Container
        sx={{
          maxWidth: {
            lg: "100%", // For screens wider than 1200px
          },
          "@media (min-width: 1200px)": {
            maxWidth: "100%",
          },
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Social Media Icons */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: "10px",
              }}
            >
              <a
                href="https://twitter.com/gatewayintgroup?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton aria-label="Twitter" color="inherit">
                  <img src={treads} alt="Logo" />
                </IconButton>
              </a>
              <a
                href="https://www.youtube.com/channel/UCH670kGjZMfcjSbXrAdk9_w"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton aria-label="youtube" color="inherit">
                  <img src={youtube} alt="Logo" />
                </IconButton>
              </a>
              <a
                href="https://www.linkedin.com/company/gatewayinternationalgroup/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton aria-label="LinkedIn" color="inherit">
                  <img src={linkedin} alt="Logo" />
                </IconButton>
              </a>
            </Box>
          </Grid>

          {/* Terms of Service and Privacy Policy */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                gap: "20px",
              }}
            >
              <Typography
                variant="body2"
                color="#101010"
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  marginTop: "8px",
                  fontWeight: 500,
                }}
              >
                <a
                  href="/terms"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Terms of Service
                </a>
              </Typography>
              <Typography
                variant="body2"
                color="#101010"
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  marginTop: "8px",
                  fontWeight: 500,
                }}
              >
                <a
                  href="/privacy"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Privacy Policy
                </a>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
