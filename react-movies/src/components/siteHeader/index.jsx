import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {AuthContext} from "../../contexts/authContext.jsx"

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const context = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const baseMenuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Popular Movies", path: "/movies/popular" },
  ];
  
  
  const protectedMenuOptions = [
      { label: "Favorites", path: "/movies/favorites" },
      { label: "Playlists", path: "/movies/playlists"},
  ]

  //if logged in show everything
  const menuOptions = context.isAuthenticated ? [...baseMenuOptions, ...protectedMenuOptions]: baseMenuOptions;

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" sx={{backgroundColor: context.isAuthenticated ? "primary":"red"}}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            <b>Lyra MovieBase</b>
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            The encyclopedia of movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
            
            {/* Auth status and buttons */}
            {context.isAuthenticated ? (
              <>
                <Typography variant="body1" sx={{ marginLeft: 2, marginRight: 1 }}>
                  Welcome {context.userName}!
                </Typography>
                <Button color="inherit" onClick={() => context.signout()}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ marginLeft: 2, marginRight: 1 }}>
                  Not logged in
                </Typography>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Sign up
                </Button>
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
