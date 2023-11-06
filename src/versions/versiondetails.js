

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Download } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SInputVersionInfo, boxStyled, BInputVersionInfo, ThePlus, TheButton, AddButtonStyle} from './versiondetailsStyle.js'; 
import{Background, KFHMenu} from '../ghadaTemplate/MainComps'
import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';

import { useParams, useLocation   } from 'react-router-dom';



function VersionDetailsInside () {

    const [version, setVersion] = useState("");

    const [message, setMessage] = useState(null);
    const { projectname } = useParams();
    const location = useLocation();
    const project = location.state.project;
    const versionNumber = location.state.versionNumber;
    const versionIndex = location.state.versionIndex;
  
  
  
    useEffect(() => {
      const fetchVersionDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/projects/vd?projectname=${project}&vnum=${versionIndex}`, { 
              headers: {
                Authorization: localStorage.getItem('token')
              }
            });
          // Set the fetched project details to state
          setVersion(response.data.data);
        } catch (error) {
          console.error('Error fetching version details:', error);
        }
      };
      fetchVersionDetails();
    }, [project,versionNumber]);
  
    if (!version) {
      return <div>Loading version details...</div>;
    }
  
  
  return (
    <>

    
    
    <Grid container spacing={(2)} marginTop={2} justifyContent={'center'} align='center'>

      <Grid xs={12} >
        
        <label style={{fontSize: '15px', color:'red'}}>{message && <p>{message}</p>}</label>
      </Grid>
      <Grid container direction={'column'} >
      <Grid align="left">
      <label style={{ marginLeft: '20px', fontSize: '15px' }}>Version Number</label>
      </Grid>  
      <Grid  xs={12} sm= {12} md={6} lg={6} xl={6} >
        <TextField
          id="filled-basic"  variant="filled" 
        value = {versionNumber}
          defaultValue = '0.0'
          sx={SInputVersionInfo} 
          color='green'
          disabled
          />
        
      </Grid>
      </Grid>


      <Grid container direction={'column'} >
      <Grid align="left">
      <label style={{ marginLeft: '20px', fontSize: '15px' }}>SIT Server</label>
      </Grid>  
      <Grid  xs={12} sm= {12} md={6} lg={6} xl={6} >
        <TextField
          id="filled-basic"  variant="filled" 
          sx={SInputVersionInfo} 
         value={version.sitserver}
          defaultValue ='0'
          color='green'
          disabled
          />
        
      </Grid>
      </Grid>
      

      <Grid container direction={'column'} >
      <Grid align="left"><label style={{ marginLeft: '20px', fontSize: '15px' }}>Version Description</label> </Grid>
      <Grid xs={12} sm= {12} md={12} lg={12} xl={12}>
      <TextField id="filled-multiline"
          multiline
          rows={4}
          defaultValue="Description"
          variant="filled"
        value = {version.vdescription}
          sx={BInputVersionInfo} 
          color ='green'
          disabled
          />
      </Grid></Grid>


      
      <Grid container xs={12} sm={12} md={12} lg={12} xl={12} marginTop={7} align= 'center'>

      <Grid xs={12} sm={12} md={4} lg={4} xl={4} direction={'column'} >
        <Grid sx={boxStyled}>
        <Grid>
          <label style={{ fontSize: '15px' }}>Android</label>
        </Grid>
        <Grid>
        {/* <input
              id="upload-input"
              type="file"
              style={{ display: 'none' }}
              // Handle file upload logic here
            /> */}
            <Button component="span" size="large" sx={TheButton}>
                <Download fontSize="large" sx={ThePlus} />
            </Button>
        </Grid></Grid>

      </Grid>
      <Grid xs={12} sm={12} md={4} lg={4} xl={4} direction={'column'}>
       <Grid sx={boxStyled}>
        <Grid>
          <label style={{ fontSize: '15px' }}>IOS APK</label>
        </Grid>
        <Grid>
        {/* <input
              id="upload-input"
              type="file"
              style={{ display: 'none' }}
               // Handle file upload logic here
            /> */}
            <Button component="span" size="large" sx={TheButton}>
            <Download fontSize="large" sx={ThePlus} />
            </Button>
        </Grid>
        </Grid>

      </Grid>
      <Grid xs={12} sm={12} md={4} lg={4} xl={4} direction={'column'} >
      <Grid sx={boxStyled}>
        <Grid>
          <label style={{ fontSize: '15px' }}>IOS APA</label>
        </Grid>
        <Grid>
        {/* <input
              id="upload-input"
              type="file"
              style={{ display: 'none' }}
              // Handle file upload logic here
            /> */}
            <Button component="span" size="large" sx={TheButton}>
            <Download fontSize="large" sx={ThePlus} />
            </Button>
        </Grid>
        </Grid>

      </Grid>

      </Grid>


      <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={{ xs: 'center', md: 'flex-end' }} sx={{ marginTop: '50px', marginBottom: '30px' }}>
        <Grid>
        <Button variant='contianed' sx={{ ...AddButtonStyle, display: 'inline-flex' }}
        style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Edit Latest Version</Button>
        </Grid>
      </Grid>

      


    </Grid>

    

    
      </>
  );
}
function VersionDetails1() {

  const isXs = useMediaQuery('(max-width:344px)');
    
  return (
    <div backgroundColor="#FAFAFA"> 
    <Box sx={{ flexGrow: 1 }}>
      <KFHMenu>
        <Background>
        <VersionDetailsInside/>
        </Background>
      </KFHMenu> 
    </Box>
    </div>
  );
}

export default VersionDetails1;
