import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { UserCreateProjectStyle, searchCreateProjectStyle, HeaderCreateProjectStyle, AddButtonCreateProjectStyle, CancelButtonCreateProjectStyle, Field1CreateProjectStyle, Field2CreateProjectStyle } from './CreateProjectStyle.js'; 
import{Background, KFHMenu, Menu} from '../ghadaTemplate/MainComps'
import Autocomplete from '@mui/material/Autocomplete';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import SearchBar from "../userssearchbar/searchbar";
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { tabsTheme } from '../ghadaTemplate/MainCompsStyle.js';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(0.4),
  textAlign: 'center',
  fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '20px',
    color: '#007C4C',

}));

const titles = ["Developer", "Tester", "Client"];
const usr = ["developers", "testers", "clients"];

function CreateProjectDev ({ children }){
  const theme = useTheme();
    const Role = Object.freeze({
    CLIENT: 'CLIENT',
    DEVELOPER: 'DEVELOPER',
    TESTER: 'TESTER'
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([localStorage.getItem("email")]);
  let [message, setMessage] = useState();
  const navigate = useNavigate();


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddUser = (user) => {
    setUsers(prevUsers => [...prevUsers, user]);
  };
  const handleRemoveUser = (user) => {
    setUsers(prevUsers => prevUsers.filter(existingUser => existingUser.email !== user.email));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.length === 0)
      setMessage("Project must have a name")

    const data = {
      name: name,
      description: description,
      usersEmails: users
    };
    //, name: user.name, role: user.role 

    //var js = JSON.stringify(data);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/projects/createproject", data, {
        headers: {
          //'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      }).then((response) => {
        if (response.data.data === null)
          setMessage(response.data.message)
        else
          navigate(`/projects/${name}`)
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid xs={12} sm={12} md={12} lg={12} xlg={12}>
      {message && <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '10px'}}>{message}</Typography>}
      </Grid>

      <Grid xs={12} sm={12} md={12} lg={12} xlg={12} sx={{ marginTop: '25px' }} textAlign={{ xlg: 'left', lg: 'left', md: 'left', xs: 'center'}}>
      <Typography variant="h5" component="h2" sx={HeaderCreateProjectStyle}>
          Project Name
        </Typography>
        </Grid>
        <ThemeProvider theme={tabsTheme()}>
        <Grid xs={12} sm={12} md={12} lg={12} xlg={12} sx={{ marginTop: '14px' }} textAlign={{ xlg: 'left', lg: 'left', md: 'left', xs: 'center'}}>
        <TextField
          id="filled-field"
          type="text"
          variant="filled"
          sx={Field1CreateProjectStyle}
          value={name}
          onChange={handleNameChange}
        />
        </Grid>

        <Grid xs={12} sm={12} md={12} lg={12} xlg={12} sx={{ marginTop: '30px' }} textAlign={{ xlg: 'left', lg: 'left', md: 'left', xs: 'center'}}>
        <Typography variant="h5" component="h2" sx={HeaderCreateProjectStyle}>
          Project Description
        </Typography>
        </Grid>

        <Grid xs={12} sm={12} md={12} lg={12} xlg={12} sx={{ marginTop: '16px', marginBottom: '35px' }} textAlign={{ xlg: 'left', lg: 'left', md: 'left', xs: 'center'}}>
        <TextField
          id="filled-field"
          type="text"
          variant="filled"
          sx={Field2CreateProjectStyle}
          multiline
          minRows={5}
          value={description}
          onChange={handleDescriptionChange}
        />
      </Grid>
      </ThemeProvider>

<Box sx={{ flexGrow: 1 }}>
<Grid container spacing={{ xs: 2, md: 3, lg: 3, xlg: 3}} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xlg: 12 }} justifyContent="center">
  {Array.from(Array(3)).map((_, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Item elevation={0}> 
        <Typography marginBottom= '10px' sx={UserCreateProjectStyle}>
          {titles[index]}
        </Typography>
        <SearchBar sx={searchCreateProjectStyle} role={index === 0 ? Role.DEVELOPER : index === 1 ? Role.TESTER : Role.CLIENT} onAddUser={handleAddUser} onRemoveUser={handleRemoveUser} />
      </Item>
    </Grid>

    ))}
  </Grid>
</Box>

<Grid container justifyContent={{ xs: 'center', md: 'flex-end' }} xs={11.7} md={12} lg={12} xlg={12} sx={{ marginTop: '50px' }}>
  <Grid>
    <Button variant="contained" sx={CancelButtonCreateProjectStyle} type='submit' >Cancel</Button>
  </Grid>
  <Grid>
    <Button variant="contained" sx={AddButtonCreateProjectStyle} onClick={handleSubmit}>Add</Button>
  </Grid>
</Grid>

      </>
  );
}
function CreateProject() {

  const isXs = useMediaQuery('(max-width:344px)');
    
  return (
    <div backgroundColor="#FAFAFA"> 
    <Box sx={{ flexGrow: 1 }}>
      <KFHMenu value={0}> 
        <Background>
          <CreateProjectDev/>
        </Background>
      </KFHMenu> 
    </Box>
    </div>
  );
}

export default CreateProject;
