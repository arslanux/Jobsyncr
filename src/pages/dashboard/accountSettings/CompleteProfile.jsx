import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowForward, MdInfoOutline } from "react-icons/md";
import PropTypes from 'prop-types';

const CompleteProfile = ({ currentStep = 1, data }) => {
  const navigate = useNavigate();
  const completionPercentage = data?.profile_completion_percentage || 0;

  const getProgressColor = (percentage) => {
    if (percentage < 30) return 'error';
    if (percentage < 70) return 'warning';
    return 'success';
  };

  const getProgressLabel = (percentage) => {
    if (percentage < 30) return 'Just Started';
    if (percentage < 70) return 'In Progress';
    if (percentage < 100) return 'Almost There';
    return 'Complete';
  };

  return (
    <Card sx={{ 
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      mb: 3
    }}>
      <Box sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center" flex={1}>
            <Avatar
              src={data?.profile_pic}
              sx={{ 
                width: 80, 
                height: 80,
                border: '3px solid',
                borderColor: getProgressColor(completionPercentage) + '.main'
              }}
            />
            <Stack spacing={1}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {!data?.is_profile_completed ? "Complete Your Profile" : "Profile Complete"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {!data?.is_profile_completed 
                  ? "Complete your profile to increase your chances of getting hired"
                  : "Your profile is ready for job applications"}
              </Typography>
            </Stack>
          </Stack>
          
          <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {getProgressLabel(completionPercentage)}
              </Typography>
              <Tooltip title="Profile completion status">
                <IconButton size="small">
                  <MdInfoOutline />
                </IconButton>
              </Tooltip>
            </Stack>
            <Box sx={{ width: { xs: '100%', md: 200 } }}>
              <LinearProgress 
                variant="determinate" 
                value={completionPercentage}
                color={getProgressColor(completionPercentage)}
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: getProgressColor(completionPercentage) + '.light'
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {completionPercentage}% Complete
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {!data?.is_profile_completed && (
          <>
            <Divider sx={{ my: 3 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Estimated time: 15-20 minutes
              </Typography>
              <Button
                variant="contained"
                endIcon={<MdArrowForward />}
                onClick={() => navigate("/employee/onboard")}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Complete Profile
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Card>
  );
};

CompleteProfile.propTypes = {
  currentStep: PropTypes.number,
  data: PropTypes.shape({
    profile_pic: PropTypes.string,
    is_profile_completed: PropTypes.bool,
    profile_completion_percentage: PropTypes.number,
  }).isRequired,
};

export default CompleteProfile;
