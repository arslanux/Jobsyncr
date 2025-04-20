import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Card,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  useTheme,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProfileView } from "../../../redux/onboarding/personalInformation/PersonalInfoAction";
import {
  activateDeactivateProfileApi,
  changePasswordApi,
} from "../../../config/ApiHandler";
import notify from "../../../utils/Toast";
import { MdLock, MdSecurity, MdPerson, MdInfoOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import PropTypes from 'prop-types';
import DeactivvateProfileModal from "./DeactivateProfileModal";

const ChangePassword = ({ passwordchangeHandler, changeinput, onSubmit, onClear }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Card sx={{ 
      p: 3, 
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      mb: 3,
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }
    }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{
            p: 1.5,
            borderRadius: '50%',
            bgcolor: theme.palette.primary.light,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MdLock size={24} color={theme.palette.primary.main} />
          </Box>
          <Stack>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Change Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update your account password
            </Typography>
          </Stack>
        </Stack>
        
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3
        }}>
          <TextField
            fullWidth
            label="Current Password"
            type={showPassword.current ? "text" : "password"}
            name="current_password"
            value={changeinput?.current_password}
            onChange={passwordchangeHandler}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => togglePasswordVisibility('current')}
                  edge="end"
                >
                  {showPassword.current ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              }
            }}
          />
          <TextField
            fullWidth
            label="New Password"
            type={showPassword.new ? "text" : "password"}
            name="new_password"
            value={changeinput?.new_password}
            onChange={passwordchangeHandler}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => togglePasswordVisibility('new')}
                  edge="end"
                >
                  {showPassword.new ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              }
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword.confirm ? "text" : "password"}
            name="confirm_password"
            value={changeinput?.confirm_password}
            onChange={passwordchangeHandler}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => togglePasswordVisibility('confirm')}
                  edge="end"
                >
                  {showPassword.confirm ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              }
            }}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: 2
        }}>
          <Button
            variant="outlined"
            onClick={onClear}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.light,
              }
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Update Password
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

ChangePassword.propTypes = {
  passwordchangeHandler: PropTypes.func.isRequired,
  changeinput: PropTypes.shape({
    current_password: PropTypes.string,
    new_password: PropTypes.string,
    confirm_password: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

const Deactivate = ({ handleOpen, data }) => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      p: 3, 
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      mb: 3,
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }
    }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{
            p: 1.5,
            borderRadius: '50%',
            bgcolor: theme.palette.primary.light,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MdSecurity size={24} color={theme.palette.primary.main} />
          </Box>
          <Stack>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Account Status
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your account visibility
            </Typography>
          </Stack>
        </Stack>

        {data?.deactivated && (
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: theme.palette.error.main,
              }
            }}
          >
            Your profile is currently deactivated and not visible to employers
          </Alert>
        )}

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={!data?.deactivated}
                onChange={handleOpen}
                sx={{
                  marginTop: -1,
                  '& .MuiSwitch-track': {
                    backgroundColor: data?.deactivated ? theme.palette.error.main : theme.palette.success.main,
                  },
                  '& .MuiSwitch-thumb': {
                    backgroundColor: data?.deactivated ? theme.palette.error.main : theme.palette.success.main,
                  }
                }}
              />
            }
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {data?.deactivated
                    ? "Activate your profile to receive job matches and notifications"
                    : "Deactivate your profile to temporarily stop receiving job matches and notifications"}
                </Typography>
                <Tooltip title="Your profile will be hidden from employers when deactivated">
                  <IconButton size="small">
                    <MdInfoOutline />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          />
        </FormGroup>
      </Stack>
    </Card>
  );
};

Deactivate.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  data: PropTypes.shape({
    deactivated: PropTypes.bool,
  }).isRequired,
};

const AccountSettings = ({ isProfile = false }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onboardUserList = useSelector(
    (state) => state?.onboard?.onboardViewData?.data
  );

  const [changeinput, setChangeinput] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const passwordchangeHandler = (e) => {
    const { name, value } = e.target;
    setChangeinput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClearPassword = () => {
    setChangeinput({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
  };

  const sumbitPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        current_password: changeinput?.current_password,
        new_password: changeinput?.new_password,
        confirm_password: changeinput?.confirm_password,
      };
      const response = await changePasswordApi(updateData);
      if (response?.data?.status === true) {
        notify("success", response?.data?.message);
        setChangeinput({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        notify("error", response?.data?.message);
      }
    } catch (error) {
      notify("error", "An error occurred while changing your password.");
    }
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const activateDeactivateHandler = async (value) => {
    try {
      const response = await activateDeactivateProfileApi({ status: value });
      if (response?.data?.status === true) {
        notify("success", response?.data?.message);
        dispatch(ProfileView());
        handleClose();
      } else {
        notify("error", response?.data?.message);
      }
    } catch (error) {
      notify("error", "An error occurred while updating your profile status.");
    }
  };

  useEffect(() => {
    dispatch(ProfileView());
  }, []);

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      px: { xs: 2, md: 4 },
      py: 4
    }}>
      <Stack spacing={4}>
        {!isProfile && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{
              p: 1.5,
              borderRadius: '50%',
              bgcolor: theme.palette.primary.light,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdPerson size={24} color={theme.palette.primary.main} />
            </Box>
            <Stack>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Account Settings
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your account preferences and security
              </Typography>
            </Stack>
          </Stack>
        )}

        <Stack spacing={3}>
          <ChangePassword
            passwordchangeHandler={passwordchangeHandler}
            changeinput={changeinput}
            onSubmit={sumbitPasswordHandler}
            onClear={handleClearPassword}
          />

          <Deactivate
            handleOpen={handleOpen}
            data={onboardUserList?.personalInformation}
          />
        </Stack>

        <DeactivvateProfileModal
          open={open}
          handleClose={handleClose}
          data={onboardUserList?.personalInformation}
          onChange={activateDeactivateHandler}
        />
      </Stack>
    </Box>
  );
};

AccountSettings.propTypes = {
  isProfile: PropTypes.bool,
};

export default AccountSettings;
