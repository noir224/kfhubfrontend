import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from '../pics/logo.jpg';
import profile from '../pics/profile.jpg';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import {logoStyle, boxStyle, tabStyle ,MainCont, tabsTheme, profileStyle } from './MainCompsStyle.js'; 
import { createTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';





function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


 function Top() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isXs = useMediaQuery('(max-width:344px)');
  const navigate = useNavigate();
  //const classes = tabStyle();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const b = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  //<ThemeProvider theme={tabsTheme(b)}></ThemeProvider>
  return (
    <Box sx={boxStyle(isXs)}>
      <ThemeProvider theme={tabsTheme()}>
      <Tabs value={value}   onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Projects" sx={tabStyle} {...a11yProps(0)} onClick={() => navigate('/projects')} />
        <Tab label="Users" sx={tabStyle} {...a11yProps(1)}   onClick={() => navigate('/viewusers')} />
      </Tabs>
      </ThemeProvider>
    </Box>
  );
}
export function KFHMenu ({ children }){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/logout');
      setAnchorEl(null);
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      // Clear any local storage or session storage here, if applicable
      window.location.href = '/login'; // Redirect the user to the login page after logout

    } catch (error) {
      console.error(error);
      // Handle any error here
    }
  
  };

  const handleViewProfile = () => {
    setAnchorEl(null);
    navigate("/viewprofile");
  };

  const isXs = useMediaQuery('(max-width:344px)');
    
  return (
    
    
     
    <Grid container spacing={2} sx={MainCont}>
    <Grid xs={2} md={1}>
      <img src={logo} style={logoStyle(isXs)} />
    </Grid>
    <Grid xs={8} md={10}>
      <Top />
    </Grid>
    <Grid align= "right" xs={2} md={1} >
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
    <Tooltip title="Account settings">
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}
        src={profile} style={profileStyle(isXs)}>M</Avatar>
      </IconButton>
    </Tooltip>
    </Box>
    <Menu
    
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
        '&	.MuiMenu-list':{
          flexDirection: 'column'
        }
       
      },
      
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{  horizontal: 'right', vertical: 'bottom' }}
    sx={{width:200}}
  >
    <MenuItem onClick={handleViewProfile}>
      <Avatar /> Profile
    </MenuItem>
    
    <Divider sx={{width:200}}/>
    
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
    </Grid>
   {children}
  </Grid>
);
}
export function Background ({ children }){

  const isXs = useMediaQuery('(max-width:344px)');
 
  return (
      
    <Grid item xs={12} container spacing={0} sx={{ minHeight: 500, marginTop: '15px', backgroundColor: 'rgba(0, 124, 76, 0.15)',
     marginLeft: '10px', marginRight: '10px', borderRadius: '10px' }}>
      {children}
     
    </Grid>
  );
}
export function CardBackground ({ children }){

  const isXs = useMediaQuery('(max-width:344px)');
 
  return (
      
    <Grid item xs={12} container spacing={2} sx={{ minHeight: 500, marginTop: '15px', backgroundColor: 'rgba(0, 124, 76, 0.15)',
     marginLeft: '10px', marginRight: '10px', borderRadius: '10px' }}>
      {children}
     
    </Grid>
  );
}

