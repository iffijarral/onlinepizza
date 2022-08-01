import React, { useState, useEffect, useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from 'Images/logo.png';
import { StyledLink } from 'Styles/Common.styles';

import { postRequest } from 'AxiosClient';
import { Stack } from "@mui/material";

import { IsOpen } from 'Util/Common.js';
import { Settings } from "./Settings";

import { CategoriesContext } from "Components/Contexts/CategoriesContext";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Nav = () => {

  const [pages, setPages] = React.useState([]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isOpen = IsOpen();

  const theme = useTheme();

  const catContext = useContext(CategoriesContext);

  useEffect(() => {

    loadCategories();


  }, []);

  const loadCategories = async () => {

    const formData = new FormData();

    formData.append(
      'action', 'get'
    );
    const response = await postRequest('category', formData);

    if (response.data.status) {

      const categories = Array.from(response.data.categories);

      setPages(categories);
    }
  }

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

  return (
    <AppBar position="static" style={{ backgroundColor: theme.palette.pale.main }} elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
          >
            <StyledLink to='/'> <img src={Logo} height={50} /> </StyledLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              PaperProps={{
                style: {
                  width: 150,
                },
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                pages.length > 0 ?
                  pages.map((page) => (
                    <MenuItem key={page.id} onClick={() => {handleCloseNavMenu(); catContext.setCatID(page.id)}}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))
                  :
                  ''
              }
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <StyledLink to='/'> <img src={Logo} height={50} /> </StyledLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            <Stack justifyContent='center'>
              <Typography variant="h6" color='primary'>
                Vitalia Pizzabar
              </Typography>

              <Stack direction='row' spacing={1} justifyContent='center' sx={{ backgroundColor: 'white', border: '.5px solid gray' }}>
                <AccessTimeIcon sx={{ color: 'gray' }} />
                <Typography color={isOpen ? 'secondary' : 'gray'}> {isOpen ? 'Åben' : 'Lukket'}</Typography>
              </Stack>
            </Stack>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Åben">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon fontSize='large' color="primary" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              PaperProps={{
                style: {
                  width: 200,
                },
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Settings handleCloseUserMenu={handleCloseUserMenu} />

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

