import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Add, Margin } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SInputVersionInfo, boxStyled, BInputVersionInfo, ThePlus, TheButton, AddButtonStyle, CancelButtonStyle, Header1Style, FileHeader1Style } from './AddAVersionStyle.js';
import { Background, KFHMenu } from '../ghadaTemplate/MainComps'
import React, { useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;



function AddAVersionInside() {

  const isXs = useMediaQuery('(max-width:344px)');
  const [versionNumber, setVersionNumber] = useState("");
  const [sitServer, setSitServer] = useState("");
  const [description, setDescription] = useState("");
  const [android, setAndroid] = useState(null);
  const [iosipa, setIosIpa] = useState(null);
  const [iosplist, setIosPlist] = useState(null);
  const [message, setMessage] = useState(null);
  const { projectname } = useParams();
  const navigate = useNavigate();



  const handleVersionChange = (event, inputName) => {
    const inp = event.target.value;
    const specialCharRegex = /^[0-9.]*$/;

    if (!specialCharRegex.test(inp)) {
      // Found a special character
      setMessage('Version number and SIT server can only have numebrs and dots');
    } else {
      setVersionNumber(inp);
      setMessage('');


    }

  };

  const handleSITChange = (event, inputName) => {
    const inp = event.target.value;
    const specialCharRegex = /^[0-9.]*$/;

    if (!specialCharRegex.test(inp)) {
      // Found a special character
      setMessage('Version number and SIT server can only have numebrs and dots');
    } else {

      setSitServer(inp);
      setMessage('');

    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (versionNumber.length === 0 || sitServer.length === 0 || description.length === 0) {
      setMessage("Please fill all the text fields");
      return;
    }


    // Perform file upload and form submission logic here
    const formData = new FormData();

    formData.append('android', android); // Append the Android file to the FormData object

    // Append other properties of the version object
    formData.append('iosipa', iosipa);
    formData.append('iosplist', iosplist);
    formData.append('versionnumber', versionNumber);
    formData.append('sitserver', sitServer);
    formData.append('vdescription', description);
    // Define the function to make the PUT request

    try {
      const response = await axios.put(`http://localhost:8080/api/v1/projects/${projectname}/addversion`, formData, {
        headers: {
          //'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token')
        }
      });

      // You can access the updated project object in the response data
      const updatedProject = response.data.data;
      // Do something with the updated project object
      if (updatedProject == null) {
        setMessage(response.data.message);
      } else {
        navigate(`/projects/${projectname}`, { state: { project: projectname, versionNumber: versionNumber, versionIndex: (updatedProject.releases.length - 1) } });
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      // You can access the error message in the response data
      setMessage("Something went wrong")
      // Do something with the error message

    }

  }


  const propsAndroid = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
       
      }
      if (status === 'done') {
        setAndroid(info.file.originFileObj);         
       

      } else if (status === 'error') {
        console.log("failed")
      }
    },
    onDrop(e) {
      setAndroid(e.dataTransfer.files);
    },
  };

  const propsiosplist = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
       
      }
      if (status === 'done') {
        setIosPlist(info.file.originFileObj);         
       

      } else if (status === 'error') {
        console.log("failed")
      }
    },
    onDrop(e) {
      setIosPlist(e.dataTransfer.files);
    },
  };

  const propsiosipa = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
       
      }
      if (status === 'done') {
        setIosIpa(info.file.originFileObj);         
       

      } else if (status === 'error') {
        console.log("failed")
      }
    },
    onDrop(e) {
      setIosIpa(e.dataTransfer.files);
    },
  };



  return (
    <>


      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} marginTop={2} justifyContent={'center'} align='center'>

          <Grid xs={12} >

            <label style={{ fontSize: '15px', color: 'red' }}>{message && <p>{message}</p>}</label>
          </Grid>

          <Grid container direction={'column'} >
            <Grid align="left">
              <Typography variant="h5" component="h2" sx={Header1Style}>Version Number</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6} xl={6} >
              <TextField
                id="filled-field" variant="filled"
                sx={SInputVersionInfo}
                color='green'
                onChange={(e) => handleVersionChange(e, "vnum")}
              />

            </Grid>
          </Grid>


          <Grid container direction={'column'} >
            <Grid align="left">
              <Typography variant="h5" component="h2" sx={Header1Style}>SIT Server</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6} xl={6} >
              <TextField
                id="filled-field" type="text" variant="filled"
                sx={SInputVersionInfo}
                value={sitServer}
                onChange={(e) => handleSITChange(e, "sit")}
              />

            </Grid>
          </Grid>


          <Grid container direction={'column'} >
            <Grid align="left">
              <Typography variant="h5" component="h2" sx={Header1Style}>Version Description</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                id="filled-field"
                type="text"
                variant="filled"
                sx={BInputVersionInfo}
                multiline
                minRows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />



            </Grid></Grid>



          <Grid container xs={12} sm={12} md={12} lg={12} xl={12} marginTop={7} align='center'>

            <Grid container direction='column' xs={12} sm={12} md={4} lg={4} xl={4} spacing={0.5} >
              
              <Typography variant="h5" component="h2" sx={FileHeader1Style}>Android APK</Typography>
              <Dragger value={android}
                {...propsAndroid} style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#007C4C' }} />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>


              </Dragger>
             
              
            </Grid>


            <Grid container direction='column' xs={12} sm={12} md={4} lg={4} xl={3.8} spacing={0.5} >
              <Typography variant="h5"  component="h2" sx={FileHeader1Style}>iOS iPA</Typography>
              <Dragger value={iosipa}
                {...propsiosipa} style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#007C4C' }} />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>


              </Dragger>

            </Grid>
            
            <Grid container direction='column' xs={12} sm={12} md={4} lg={4} xl={4} spacing={0.5}>
              <Typography variant="h5"  component="h2" sx={FileHeader1Style}>iOS PLIST</Typography>
              <Dragger value={iosplist}
                {...propsiosplist} style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#007C4C' }} />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>


              </Dragger>

            </Grid>





          </Grid>


          <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }} xs={11.7} md={12} lg={12} sx={{ marginTop: '50px', marginBottom: '30px' }}>
            <Grid>
              <Button variant="contained" sx={CancelButtonStyle} type='submit' >Cancel</Button>
            </Grid>
            <Grid>
              <Button variant="contained" sx={AddButtonStyle} onClick={handleSubmit}>Add</Button>
            </Grid>
          </Grid>




        </Grid>

      </form>


    </>
  );
}
function AddAVersion() {

  const isXs = useMediaQuery('(max-width:344px)');

  return (
    <div backgroundColor="#FAFAFA">
      <Box sx={{ flexGrow: 1 }}>
        <KFHMenu>
          <Background>
            <AddAVersionInside />
          </Background>
        </KFHMenu>
      </Box>
    </div>
  );
}

export default AddAVersion;
