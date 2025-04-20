import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { MdSave } from "react-icons/md";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const OnboardFormTemplate = ({
  formTitle,
  formSubtitle,
  form,
  onsubmit,
  isMultiple = false,
  isSubmit = true,
}) => {
  const [formCount, setFormCount] = React.useState(1);
  const onboardUserListDelay = useSelector(
    (state) => state?.onboard?.onboardViewDelay
  );

  return (
    <Card 
      sx={{ 
        p: 3,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        mb: 3,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Stack spacing={1}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "text.primary",
                fontWeight: 600,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              {formTitle}
            </Typography>
            {formSubtitle && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                {formSubtitle}
              </Typography>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 3 }}>
            {form}
          </Box>
          
          {isSubmit && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: 2,
              mt: 2
            }}>
              {isMultiple && (
                <Button
                  variant="outlined"
                  onClick={() => setFormCount(formCount + 1)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3
                  }}
                >
                  Add Another
                </Button>
              )}
              <Button
                variant="contained"
                onClick={onsubmit}
                startIcon={<MdSave />}
                disabled={onboardUserListDelay}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Save {isMultiple && `(${formCount})`}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

OnboardFormTemplate.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formSubtitle: PropTypes.string,
  form: PropTypes.node.isRequired,
  onsubmit: PropTypes.func,
  isMultiple: PropTypes.bool,
  isSubmit: PropTypes.bool,
};

export default OnboardFormTemplate;
