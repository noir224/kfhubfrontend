import React from "react";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.css'; // import the styles
import developer from '../pics/developer.png';
import tester from '../pics/tester.png';
import client from '../pics/client.png';
import admin from '../pics/admin.png';
import './SignupUser.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import{Background, KFHMenu, Menu} from '../ghadaTemplate/MainComps';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { TitleSignupStyle, UserSignupStyle, HeaderSignupStyle, ButtonSignupStyle, FieldSignupStyle } from './SignupUserStyle.js'; 

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '20px',
    color: '#007C4C',
    marginTop: '60px'
}));

function SignupUsersDev ({ children }){
  return (
    <>
    <Grid xs={12} sm={12} md={12} lg={12} xlg={12} justifyContent='center'>
      <Typography sx={HeaderSignupStyle} align="center" variant="h5" component="h2">
      CHOOSE A ROLE
      </Typography>

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 2, lg: 2, xlg: 2}} justifyContent="center">
      <DialogDev type={Role.ADMIN} />
      <DialogDev type={Role.DEVELOPER} />
      <DialogDev type={Role.TESTER} />
      <DialogDev type={Role.CLIENT} />
      </Grid>
      </Box>
    </Grid>
    </>
  );
}

const text = ["Admin", "Developer", "Tester", "Client"];

const Role = Object.freeze({
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  DEVELOPER: 'DEVELOPER',
  TESTER: 'TESTER'
});

function getRoleName(role) {
  switch (role) {
    case Role.ADMIN:
      return "admin";
    case Role.CLIENT:
      return "client";
    case Role.DEVELOPER:
      return "developer";
    case Role.TESTER:
      return "tester";
    default:
      throw new Error("Invalid role");
  }
}


function DialogDev({ type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage]= useState("");
  const [loading, setLoading]= useState(false);
  
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);


  
  const handleAddUser = async () => {
    if (!firstname || !lastname || !email || !phone) {
      setMessage("Please fill in all fields");
      return;
    }
    const specialCharRegex = /[^a-zA-Z0-9@# $!,.\-_]/g; // matches any character other than letters, numbers, @, #, $, ., -, or _

      if (specialCharRegex.test(firstname) || specialCharRegex.test(lastname) || specialCharRegex.test(email)) {
        setMessage('Input contains special characters!the only allowed special characters are @, #, $, ., -, or _');
        return;
      }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/account/register", {
        firstname,
        lastname,
        email,
        phone,
        role: type
      });
      setLoading(true);
      if(response.data.data===null){
          setMessage("Email exists");
          setLoading(false);
      }
      else{
        setLoading(false);
        closeDialog();
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const dialogTitle = getRoleName(type);
  
  return (
    <Grid item xs={12} sm={6} md={3} lg={3} xlg={3}>
      <Item elevation={0}> 
        <img
          src={type === Role.ADMIN ? admin 
            : type === Role.DEVELOPER ? developer
            : type === Role.TESTER ? tester
            : client}
          alt=""
          onClick={openDialog}
          className="img-signupusers"
        />
        <Typography sx={UserSignupStyle} onClick={openDialog}>
          {dialogTitle}
        </Typography>
      </Item>

      <Grid justifyContent='center' xs={12} sm={12} md={12} lg={12} xlg={12}>
      <Dialog sx={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px', marginTop: '75px', marginRight: '15px'}} open={isOpen} onClose={closeDialog}>
    <div className="cir-signupusers" onClick={closeDialog}>
      <FontAwesomeIcon className="userIcon-signupusers" icon={faTimes} onClick={closeDialog} />
    </div>
    <DialogTitle align='center' marginTop='20px' sx={UserSignupStyle}>{dialogTitle.toUpperCase()}</DialogTitle>
    <DialogContent height='auto'>
    <Grid container justifyContent='center' xs={12} sm={12} md={12} lg={12} xlg={12}>
      {message && <Typography className="error-message-login">{message}</Typography>}
    </Grid>
    <Grid container justifyContent='center' xs={12} sm={12} md={12} lg={12} xlg={12}>
      {loading ? ( <Typography >Loading...</Typography>):(<></>)}
    </Grid>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3, lg: 3, xlg: 3 }} justifyContent="center">

      <Grid item marginTop='-40px'>
      <Item elevation={0}> 
      <Typography sx={TitleSignupStyle}>FIRST NAME</Typography>
          <TextField sx={FieldSignupStyle} type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />
      </Item>
      </Grid>

      <Grid item marginTop='-40px'>
      <Item elevation={0}> 
      <Typography sx={TitleSignupStyle}>LAST NAME</Typography>
          <TextField sx={FieldSignupStyle} type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
      </Item>
      </Grid>

      <Grid item marginTop='-40px'>
      <Item elevation={0}> 
      <Typography sx={TitleSignupStyle}>EMAIL</Typography>
          <TextField sx={FieldSignupStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Item>
      </Grid>

      <Grid item marginTop='-40px'>
      <Item elevation={0}> 
      <Typography sx={TitleSignupStyle}>PHONE</Typography>
          <TextField sx={FieldSignupStyle} type="number" value={phone} onChange={e => setPhone(e.target.value)} />
      </Item>
      </Grid>

      </Grid>
      </Box>
    </DialogContent>

      <Grid container justifyContent='center' xs={12} sm={12} md={12} lg={12} xlg={12}>
      <Button sx={ButtonSignupStyle} onClick={handleAddUser}> Add </Button>
      </Grid>
      
</Dialog>
      </Grid>
    </Grid>

  );
}


function SignupUsers() {
  const isXs = useMediaQuery('(max-width:344px)');
    
  return (
    <div backgroundColor="#FAFAFA"> 
    <Box sx={{ flexGrow: 1 }}>
      <KFHMenu>
        <Background>
          <SignupUsersDev/>
        </Background>
      </KFHMenu> 
    </Box>
    </div>
  );
}

export default SignupUsers;