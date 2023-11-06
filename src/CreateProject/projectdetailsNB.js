import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListUsers from './listingusersPD';
import ListVersions from './listversions';
import { Background, KFHMenu } from '../ghadaTemplate/MainComps';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from 'antd';
import { nameStyle } from '../viewusers/viewusersStyles';
import { headers, HeaderStyle } from './projectdetailsstyles';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ButtonStyle, CardStyle, searchStyle } from '../ghadaTemplate/adminMainCompStyles';
import { CircularProgress } from '@mui/material';



const Role = {
  TESTER: 'TESTER',
  DEVELOPER: 'DEVELOPER',
  CLIENT: 'CLIENT'
};
function assignedusersComp(users) {


}

const ProjectDetailsNB = () => {
  const { projectname } = useParams();
  const [project, setProject] = useState(null);
  const [message, setMessage] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [testers, setTesters] = useState([]);
  const [clients, setClients] = useState([]);
  const [versions, setVersions] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem('token')
          },
        };

        // Fetch project details from backend API using Axios
        const response = await axios.get(`http://localhost:8080/api/v1/projects/pd?projectname=${projectname}`, config);

        // Set the fetched project details to state
        setProject(response.data.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectname]);

  useEffect(() => {
    if (project) {
      const users = project.users;
      const developers = users.filter(user => user.role === Role.DEVELOPER);
      const testers = users.filter(user => user.role === Role.TESTER);
      const clients = users.filter(user => user.role === Role.CLIENT);

      // Update the state of the sublists
      setDevelopers(developers);
      setTesters(testers);
      setClients(clients);

      setVersions(project.releases);
      //console.log(project.name);
    }
  }, [project]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    // Add more columns as needed
  ];




  const toAddVersion = (e) => {
    e.preventDefault();
    navigate(`/addversion/${projectname}`);

  };
  const toEditLastVersion = (e) => {
    e.preventDefault();
    if (project.releases == null || project.releases.length === 0) {
      setMessage("No versions to edit yet");
    } else
      navigate('/editlastversion', { state: { projectd: project } });

  };
  /*
  if (!project) {
    return <div>Loading project details...</div>;
  }
*/
  /*
  <div>
      {project ? (
        <>
          <h1>Project Details</h1>
          <div>
          {message && <p>{message}</p>}
            <h2></h2>
            <p>{project.description}</p>
            <h2>Developers</h2>
            <ListUsers assignedusers={developers}/>
            <h2>Testers</h2>
            <ListUsers assignedusers={testers}/>
            <h2>Clients</h2>
            <ListUsers assignedusers={clients}/>
            <h2>Versions</h2>
            <ListVersions versions={versions} projectn={project.name} />
          </div>
          <button onClick={toAddVersion}>Add a Version</button>
          <button onClick={toEditLastVersion}>Edit Last Version</button>
        </>
      ) : (
        <div>Loading project details...</div>
      )}
    </div>
  
  */
  // <Grid item container xs={12} md={6}>
  // </Grid>
  /*
           <Grid container xs={12} md={6}>
 
                   </Grid>
  */
  return (
    <div backgroundColor="#FAFAFA">

      <KFHMenu >
        <Background>
          
          {project ? (

            <Grid container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12} justifyContent='center' alignItems='center' >
              {message && <Grid xs={12}>
                <Typography variant="h1" > {message}</Typography>
              </Grid>}
              <Grid item container xs={12} sm={12} md={12} lg={5.5} xl={6} sx={{ marginLeft:'10px', marginBottom:4, marginRight:'10px' }}>

                <Grid item xs={12} >
                  <h2>{projectname}</h2>
                  <h3> Description </h3>
                  <Typography variant="h4" component="h4" sx={HeaderStyle}> {project.description} </Typography>
                </Grid>
                <Grid xs={12} >
                  <h3>Developers </h3>
                  <ListUsers assignedusers={developers} />
                </Grid>
                <Grid xs={12}>
                  <h3>Testers </h3>
                  <ListUsers assignedusers={testers} />
                </Grid>
                <Grid xs={12}>
                  <h3>Clients</h3>
                  <ListUsers assignedusers={clients} />
                </Grid>


              </Grid>

              <Grid container xs={12} sm={12} md={12} lg={5.5} xl={5.5} marginTop={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{margin:'2px'}} >
                  <ListVersions versions={versions} projectn={project.name} />
                </Grid>
              </Grid>


              
            </Grid>


          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '500px', marginTop: '170px' }}>

            <CircularProgress color="success" size={80} />

          </div>
          )}

        
        </Background>
      </KFHMenu>

    </div>
  );

};
//<Link to={`/projects/${projectname}/addversion`}

export default ProjectDetailsNB;
