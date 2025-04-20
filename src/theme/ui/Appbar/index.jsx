import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "../Logo";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import notificationBell from "../../../assets/notification_bell.svg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logoutUser } from "../../../utils/user";
import { useSelector } from "react-redux";

function DrawerAppBar(props) {
  const jobSeekerName = useSelector((state) =>
    state?.onboard?.onboardViewData?.data?.personalInformation != undefined
      ? state?.onboard?.onboardViewData?.data?.personalInformation
      : "My"
  );

  const drawerWidth = 240;
  const navItems = [
    {
      title: `${jobSeekerName?.first_name !== null ||
        jobSeekerName?.first_name !== undefined
        ? `${jobSeekerName?.first_name}'s Dashboard`
        : "My Dashboard"
        }`,
      path: "/dashboard/home",
    },
    {
      title: "My Profile",
      path: "/dashboard/profile",
    },
    // {
    //   title: "Zerozilla International Job Board",
    //   path: "/dashboard/job-board",
    // },
    {
      title: "Account Settings",
      path: "/dashboard/account",
    },
  ];
  // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState("");
  React.useEffect(() => {
    const storedPath = localStorage.getItem("currentPath");
    if (storedPath) {
      setCurrentPath(storedPath != "" ? storedPath : "");
    }
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const onboardUserList = useSelector(
    (state) => state?.onboard?.onboardViewData?.data
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const settings = [
    {
      title: "My Profile",
      onClick: () => {
        navigate("/dashboard/profile");
        handleCloseUserMenu();
      },
    },
    {
      title: "Account Settings",
      onClick: () => {
        navigate("/dashboard/account");
        handleCloseUserMenu();
      },
    },
    {
      title: `${jobSeekerName?.first_name !== null ||
        jobSeekerName?.first_name !== undefined
        ? `${jobSeekerName?.first_name}'s Dashboard`
        : "My Dashboard"
        }`,
      onClick: () => {
        navigate("/dashboard/home");
        handleCloseUserMenu();
      },
    },
    {
      title: "Logout",
      onClick: () => {
        logoutUser();
        handleCloseUserMenu();
      },
    },
  ];

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Logo style={{ width: "200px", margin: "10px auto" }} />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "left",
                backgroundColor:
                  location.pathname === item.path ? "#f5f5f5" : "#F9FAFB",
              }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <Link
          to="#"
          style={{ textDecoration: "none" }}
        >
          <Button sx={{ color: "text.secondary", mx: 2 }}>
            {"Zerozilla Executive Search "}
          </Button>
        </Link>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        component="nav"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            // color='inherit'
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Logo
              style={{
                width: "200px",
                margin: "10px 20px",
                display: "block",
              }}
            />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block", flexGrow: 1 } }}>
            {/* {navItems.map((item) => (
              <Button
                key={item.path}
                sx={{ color: "text.secondary" }}
                disabled={
                  item.path === "/dashboard/profile" &&
                  !onboardUserList?.personalInformation?.is_profile_completed
                }
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.title}
              </Button>
            ))} */}
            {jobSeekerName?.first_name !== undefined &&
              navItems?.map((item) => (
                <Button
                  key={item.path}
                  sx={{
                    marginLeft: "1rem",
                    fontWeight:
                      location.pathname === item.path ? "bold" : "normal",
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "text.secondary", // Assuming currentPath holds the current path
                    "&:hover": {
                      color:
                        location.pathname === item.path
                          ? "primary.dark"
                          : "text.primary",
                    },
                    "&.Mui-disabled": {
                      color: "text.disabled",
                    },
                    // Apply bold font weight if the item is active
                  }}
                  // sx={{

                  // }}
                  disabled={
                    item.path === "/dashboard/profile" &&
                    !onboardUserList?.personalInformation?.is_profile_completed
                  }
                  onClick={() => {
                    navigate(item.path);
                    setCurrentPath(item.path); // Assuming you have a state variable to hold the current path
                    localStorage.setItem("currentPath", item.path);
                  }}
                >
                  {item.title}
                </Button>
              ))}
            <Link
              to="#"
              style={{ textDecoration: "none", color: "text.secondary" }}
            >
              <Button sx={{ color: "text.secondary", mx: 2, fontWeight: 'normal' }}>
                {"Zerozilla Executive Search "}
              </Button>
            </Link>
          </Box>
          {/* <Box>
            <IconButton><img src={notificationBell} /></IconButton>
          </Box> */}
          <Box sx={{ flexGrow: 0, mx: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={onboardUserList?.personalInformation?.profile_pic}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  disabled={
                    setting?.title === "Profile" &&
                    !onboardUserList?.personalInformation?.is_profile_completed
                  }
                  onClick={setting.onClick}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
