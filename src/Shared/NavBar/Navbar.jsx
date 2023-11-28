import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
// import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from "sweetalert";
import brandLogo from "../../assets/logo-no-background.png";
// import useAdmin from "../../Hooks/useAdmin";
// import useGuide from "../../Hooks/useGuide";

const Navbar = () => {
  const { user, loading, logOut, photo } = useContext(AuthContext);
  // const { isAdmin } = useAdmin();
  // const { isGuide } = useGuide();
  // const isAdmin = true;
  // const isGuide = false;

  const settings = [
    ...(user ? [user?.displayName] : []),
    ...(user ? [user?.email] : []),
    "Dashboard",
    "Logout",
  ];

  const pages = [
    "Home",
    "Community",
    "Blogs",
    "About Us",
    "Contact Us",
    ...(user ? [] : ["Login"]),
    // ...(user ? [] : ["Register"]),
  ];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if (user) {
      setAnchorElUser(event.currentTarget);
    } else {
      navigate("/login");
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    logOut()
      .then(() => {
        navigate("/");
        swal("Successfully!", "You Are Log Out", "success");
      })
      .catch(() => swal("Opps!", "Something went wrong", "error"));
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        color: "#e65728",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              height: "40px",
            }}
          >
            <img src={brandLogo} alt="" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  component={NavLink}
                  to={
                    page === "Home"
                      ? "/"
                      : `/${page.toLowerCase().replace(/\s+/g, "-")}`
                  }
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              height: "40px",
            }}
          >
            <img
              className="w-full"
              src="/public/logo-no-background.png"
              alt=""
            />
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              ml: "170px",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={NavLink}
                to={
                  page === "Home"
                    ? "/"
                    : `/${page.toLowerCase().replace(/\s+/g, "-")}`
                }
                sx={{
                  my: 2,
                  color: "#666666",
                  display: "block",
                  "&:hover": { color: "#e65728" },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user?.photoURL && !loading ? (
                  <Avatar alt="" src={user.photoURL} />
                ) : photo ? (
                  <Avatar alt="" src={photo} />
                ) : (
                  <Avatar />
                )}
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
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={() => handleCloseUserMenu()}>
                  <Typography textAlign="center">
                    {setting === user?.displayName && (
                      <span>{user.displayName}</span>
                    )}
                    {setting === user?.email && (
                      <span
                        style={{
                          borderBottom: "1px solid #666666",
                          paddingBottom: "10px",
                        }}
                      >
                        {user.email}
                      </span>
                    )}
                    {setting === "Dashboard" && (
                      <Button
                        sx={{ padding: "0px", textAlign: "left" }}
                        component={Link}
                        to={`/dashboard/profile`}
                      >
                        {setting}
                      </Button>
                    )}
                    {setting === "Logout" && (
                      <Button
                        sx={{ padding: "0px", textAlign: "left" }}
                        onClick={signOut}
                      >
                        {setting}
                      </Button>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
