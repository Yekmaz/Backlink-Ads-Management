import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import KeyIcon from '@mui/icons-material/Key';

import Ads from "../../static/images/ads.svg";

import { useThemeContext } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useAuth } from "../context/AuthContext";

import { Link, Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const auth = useAuth();

  const pages = [
    { id: 1, title: "Home", address: "/" },
    { id: 2, title: "Dashboard", address: "/dashboard" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const { colorMode } = useThemeContext();
  const theme = useTheme();
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                height: 40,
                width: 40,
              }}
              alt="ads"
              src={Ads}
            />
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  color: "rgb(255,255,255)",
                  textDecoration: "none",
                }}
              >
                Backlink Ads Management
              </Typography>
            </Link>

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
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Link key={page.id} to={page.address}>
                      <Typography
                        textAlign="center"
                        sx={{
                          color:
                            theme.palette.mode === "light"
                              ? "rgb(0,0,0,0.87)"
                              : "rgb(255,255,255)",
                        }}
                      >
                        {page.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              component="img"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                height: 40,
                width: 40,
              }}
              alt="ads"
              src={Ads}
            />
            <Link to="/">
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  color: "rgb(255,255,255)",
                  textDecoration: "none",
                }}
              >
                Backlink Ads Management
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link key={page.id} to={page.address}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "rgb(255,255,255)", display: "block" }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                sx={{ mr: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              {!auth.userData.isLoggedIn ? (
                <Tooltip title="Guest">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Guest" src="" />{" "}
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Tooltip title={auth.userData.userName}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={auth.userData.userName}
                        src={`http://localhost:8000/${auth.userData.userImageUrl}`}
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
                    <Link to="/user/account">
                      <MenuItem key={1} onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                          <ManageAccountsIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography
                          textAlign="center"
                          sx={{marginLeft: -1,}}
                          fontSize={".8rem"}
                          color={
                            theme.palette.mode === "light"
                              ? "rgb(0,0,0,0.87)"
                              : "rgb(255,255,255)"
                          }
                        >
                          Edit user info
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link to="/user/password">
                      <MenuItem key={1} onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                          <KeyIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography
                          textAlign="center"
                          sx={{marginLeft: -1,}}
                          fontSize={".8rem"}
                          color={
                            theme.palette.mode === "light"
                              ? "rgb(0,0,0,0.87)"
                              : "rgb(255,255,255)"
                          }
                        >
                          Change password
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link to="#" onClick={handleLogout}>
                      <MenuItem key={2} onClick={handleCloseUserMenu} >
                        <ListItemIcon>
                          <Logout fontSize="small"  />
                        </ListItemIcon>
                        <Typography
                          textAlign="center"
                          sx={{marginLeft: -1,}}
                          fontSize={".8rem"}
                          color={
                            theme.palette.mode === "light"
                              ? "rgb(0,0,0,0.87)"
                              : "rgb(255,255,255)"
                          }
                        >
                          Logout
                        </Typography>
                      </MenuItem>
                    </Link>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Layout;
