import React, { useState, useEffect } from "react";
import { FaFilter } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";
import InputBase from '@mui/material/InputBase';
import { ButtonStyle, CardStyle, searchStyle } from '../ghadaTemplate/adminMainCompStyles.js';
import { CardBackground, KFHMenu } from '../ghadaTemplate/MainComps';
import { tabsTheme } from "../ghadaTemplate/MainCompsStyle.js";
import { ButtonStyle1, circleStyle, filterIconStyle, infoStyle, nameStyle, searchStyle1, ButtonGrid } from './viewusersStyles.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Icon from '@mui/material/Icon';
import Modal from './Modal';
import "./Modal.css";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { IconButton } from '@mui/material';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaLockOpen } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './viewusers.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { dialogButtonsStyle, dialogStyle, iconStyle, saveIconStyle } from "../versions/versiondetailsStyle.js";
import SaveIcon from '@mui/icons-material/Save';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';


import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';





const Role = Object.freeze({
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  DEVELOPER: 'DEVELOPER',
  TESTER: 'TESTER'
});

function ViewUsersNB(props) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [editPhone, setEditPhone] = useState(false);
  const [editedPhone, setEditedPhone] = useState('');
  const [failed, setfailed] = useState(0);
  const [message, setMessage] = useState('');
  const [indexe, setIndexe] = useState(0);
  const [acti, setActi] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);


  const handleClickFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorEl(null);
  };


  const handleEditPhone = () => {
    setEditPhone(true);
  };

  const handleSavePhone = async () => {

    let data = {
      email: selectedCard.email,
      phone: editedPhone
    }
    try {
      const response = await axios.put("http://localhost:8080/api/v1/account/changephone", data, {
        headers: {
          //'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      }).then((response) => {
        if (response.data.data === null)
          setMessage(response.data.message)
        else {
          setMessage("Phone number changed successfully");
          users[indexe].phone = response.data.data.phone;
          selectedCard.phone = response.data.data.phone;
          setEditPhone(false);

        }
      });
    } catch (error) {
      console.error(error);
    }

  };

  const handleAccountLock = async () => {
    let data = {
      email: selectedCard.email
    }
    try {
      const response = await axios.put("http://localhost:8080/api/v1/account/unlock", data, {
        headers: {
          //'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      }).then((response) => {
        if (response.data.data === null)
          setMessage(response.data.message)
        else {
          setMessage("Account was unlocked successfully");
          users[indexe].failedAttempts = 0;
          setfailed(0);

        }
      });
    } catch (error) {
      console.error(error);
    }


  };
  const handleActivation = async () => {

    let data = {
      email: selectedCard.email
    }
    let link = '';
    let m = '';
    if (acti) {
      link = "http://localhost:8080/api/v1/account/deactivate";
      m = 'deactivated';
    }
    else {
      link = "http://localhost:8080/api/v1/account/activate";
      m = 'activated';
    }
    try {
      const response = await axios.put(link, data, {
        headers: {
          //'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      }).then((response) => {
        if (response.data.data === null)
          setMessage(response.data.message)
        else {
          setMessage("Account was" + m + " successfully");
          users[indexe].active = response.data.data.active;
          setActi(response.data.data.active);

        }
      });
    } catch (error) {
      console.error(error);
    }

  };



  const handleClickOpen = (user, index) => {
    setOpen(true);
    setSelectedCard(user);
    setIndexe(index)
    setfailed(user.failedAttempts);
    setActi(user.active)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null)
    setMessage(null)
  };

  function handleFilter(num) {
    
  }

  // fetch user data from the backend API using Axios
  const fetchUserData = async () => {
    try {
      let data = {
        email: localStorage.getItem("email"),
        filterRole: '',
        search: ''
      }
      const response = await axios.get('http://localhost:8080/api/v1/user/list', {
        params: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      });
      //setUsers(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Call the fetchUserData() function and set the component's state with the returned data
      const data = await fetchUserData();
      setUsers(data);
    };

    fetchData();
  }, []);


  return (

    <div backgroundColor="#FAFAFA">
      <Box sx={{ flexGrow: 1 }}>
        <KFHMenu >
          <CardBackground>
          <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent='center' alignItems='center'> 
            <Grid xs={11} sm={11} md={6} lg={6} xl={6}>
              <ThemeProvider theme={tabsTheme()}>
                <TextField

                  id="outlined-search"
                  placeholder="Search User"
                  type="search"
                  variant="outlined"
                  sx={searchStyle1}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </ThemeProvider>
            </Grid>
            {/* <Grid xs={1} sm={1} md={1} lg={1} xl={1} >
              <Tooltip >
                <FilterAltIcon onClick={handleClickFilter}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  fontSize="large" sx={filterIconStyle} />
              </Tooltip>
            </Grid> */}
            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={ButtonGrid}>
            </Grid>
            {users &&
              users.length > 0 &&
              users.filter((user) => {
                return search.toLowerCase() === ''
                  ? user
                  : user.email.toLowerCase().includes(search) ||
                  user.firstname.toLowerCase().includes(search) ||
                  user.lastname.toLowerCase().includes(search);
              })
                .map((user, index) => (
                  <Grid xs={12} sm={6} md={4} lg={3} xl={3} key={user.email} align="center">
                    <Card sx={CardStyle} style={{ margin: { xs: '2px', sm: '2px', md: '2px', lg: '2px', xl: '2px' } }} onClick={(e) => handleClickOpen(user, index)} >
                      <CardContent>
                        <Typography sx={circleStyle} style={{ backgroundColor: "#87DFB6" }} variant="body2" component="p">
                          {(user.firstname + " " + user.lastname).substr(0, 2).toUpperCase()}
                        </Typography>
                        <Typography sx={nameStyle}>
                          {user.firstname + " " + user.lastname}
                        </Typography>
                        <Typography sx={infoStyle}>
                          {user.role}
                        </Typography>
                        <Typography sx={infoStyle}>
                          {user.email}
                        </Typography>
                        <Typography sx={infoStyle}>
                          {user.phone}
                        </Typography>

                      </CardContent>

                    </Card>
                    {selectedCard && (<Dialog
                      fullScreen={fullScreen}
                      sx={dialogStyle}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                      BackdropComponent={'none'}
                    >
                      <DialogTitle id="responsive-dialog-title">
                        {selectedCard.firstname + " " + selectedCard.lastname} <HighlightOffIcon sx={iconStyle} onClick={handleClose} />
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText sx={{ color: 'black' }}>
                          {message && (
                            <Typography>
                              {message}
                            </Typography>
                          )}

                          <Typography>
                            {selectedCard.role}
                          </Typography>

                          <Typography>
                            Email: {selectedCard.email}
                          </Typography>
                          <Typography>
                            Phone:
                            {!editPhone && (
                              <>
                                {selectedCard.phone}
                                <FontAwesomeIcon icon={faPen} className="pen-icon" onClick={handleEditPhone} />
                              </>
                            )}
                          </Typography>

                          {editPhone && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                              <input
                                type="text"
                                style={{ height: '20px' }}
                                value={editedPhone}
                                onChange={(e) => setEditedPhone(e.target.value)}
                              />
                              <SaveIcon onClick={handleSavePhone} sx={saveIconStyle} />

                            </div>
                          )}
                          <Typography>
                            Failed Attempts: {failed}

                            <Typography>
                              Status: {acti ? "active" : "inactive"}
                            </Typography>
                          </Typography>
                        </DialogContentText>


                      </DialogContent>
                      <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button variant="contained" sx={dialogButtonsStyle} autoFocus endIcon={<LockOpenIcon />}
                          disabled={selectedCard.failedAttempts < 3}
                          onClick={handleAccountLock}
                        >
                          Unlock
                        </Button>
                        <Button variant="contained" sx={dialogButtonsStyle} onClick={handleActivation} autoFocus>
                          {acti ? "Deactivate" : "Activate"}
                        </Button>
                      </DialogActions>

                    </Dialog>
                    )}

                  </Grid>
                ))}
            <Menu

              anchorEl={anchorEl}
              id="account-menu"
              open={open1}
              onClose={handleCloseFilter}
              onClick={handleCloseFilter}
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
                  '&	.MuiMenu-list': {
                    flexDirection: 'column'
                  }

                },

              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              sx={{ width: 232 }}
            >
              <MenuItem onClick={handleFilter(0)}>
                Admin
              </MenuItem>
              <Divider sx={{ width: 200 }} />
              <MenuItem onClick={handleFilter(1)}>
                Developer
              </MenuItem>
              <Divider sx={{ width: 200 }} />
              <MenuItem onClick={handleFilter(2)} >
                Tester
              </MenuItem>
              <Divider sx={{ width: 200 }} />
              <MenuItem onClick={handleFilter(3)}>
                Client
              </MenuItem>
            </Menu>
            </Grid>
          </CardBackground>
        </KFHMenu>
      </Box>
    </div>

  );
}

export default ViewUsersNB;