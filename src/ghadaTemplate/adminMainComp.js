import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ButtonStyle, CardStyle, searchStyle, ButtonGrid } from './adminMainCompStyles.js';
import { Background, CardBackground, KFHMenu } from './MainComps';
import logo from '../pics/logo.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from 'antd';
import { ThemeProvider } from '@mui/material/styles';
import { tabsTheme } from "../ghadaTemplate/MainCompsStyle.js";
import Cookies from 'js-cookie';






function ProjectsAdminDev({ children }) {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [message , setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Role = Object.freeze({
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT',
    DEVELOPER: 'DEVELOPER',
    TESTER: 'TESTER'
  });

  useEffect(() => {
   
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let data = {
          email: localStorage.getItem('email')
        };
        const response = await axios.get(
          "http://localhost:8080/api/v1/projects/list", {
          params: { email: localStorage.getItem('email') },
          headers: {
            //'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
          }
        });
        //

        // Set the fetched projects to state
        setProjects(response.data.data);
        setLoading(false);
        //console.log(projects[0].id);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleEditProject = async (e, projectds) => {
    e.stopPropagation();
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      };

      // Fetch project details from backend API using Axios
      const response = await axios.get(`http://localhost:8080/api/v1/user/getByEmail?emails=${projectds.usersEmails}`, {

        headers: {
          Authorization: localStorage.getItem('token')

        }
      });
      const userss = response.data.data;
      navigate(`/editproject/${projectds.name}`, { state: { projectd: projectds, usersss: userss } });
    } catch (error) {
      console.error('Error fetching project details:', error);
    }

  };

  const handleNavigate = async (e, item) => {
    //const savedRole = Cookies.get('userRole');
    //if(savedRole == Role.DEVELOPER)
      navigate(`/projects/${item.name}`);
   // else
   // navigate(`/projectsNB/${item.name}`);
   

  };

  const handleDeleteProject = async (projectds, index,e) => {
    e.stopPropagation(); // Stop the click event propagation
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      };
      let data ={
        name : projectds
      }
      
      // Fetch project details from backend API using Axios
      const response = await axios.delete(`http://localhost:8080/api/v1/projects/deleteprojects`, {
        params: data,
        headers: {
          Authorization: localStorage.getItem('token')

        }
      });
      if(response.data.data===null){
          setMessage(response.data.message)
      }else{
        projects.splice(index, 1);
        console.log(response.data.message)
        
      }

    } catch (error) {
      console.error('Error fetching project details:', error);
    }

  };
  useEffect(() => {
   
  }, [projects]);
  /*
  {projects ? (
        projects.length > 0 ? (
          
          ) : (
            <p>You don't have any assigned projects</p>
          )
        ) : (
          <p>Loading projects...</p>
        )}
  */
 

  return (
    <>
    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent='center' alignItems='center'>
      <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
      <ThemeProvider theme={tabsTheme()}>
        <TextField
          id="outlined-search"
          placeholder="Projects Search"
          type="search"
          variant="outlined"
          sx={searchStyle}
          value={search}
          onChange={(e) => setSearch(e.target.value)}

        />
      </ThemeProvider>
      </Grid>


      <Grid container xs={12} sm={12} md={6} lg={6} xl={6} sx={ButtonGrid}>
        <Button variant="contained" sx={ButtonStyle} onClick={() => navigate('/createproject')} >Add A Project</Button>
      </Grid>


      {message && (<Grid align={"right"} xs={12} lg={6}>
        <Typography>{message}</Typography>
      </Grid>)}


      {!loading ? (
        !projects && projects.length === 0 ? (
          <Typography variant="body1">You don't have any assigned projects.</Typography>
        ) : (
          projects
          .filter((item) => {
            return search.toLowerCase() === ''
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .map((item, index) => (
            <Grid xs={12} sm={12} md={4} lg={3} xl={3} key={item.id}>
              <Card sx={CardStyle} onClick={(e) => handleNavigate(e, item)}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" component="p" sx={{ height: 160 }}>
                    {item.description}
                  </Typography>
                  <div align="right">
                    <DeleteIcon  onClick={(e) => handleDeleteProject(item.name,index,e)} />
                    <EditIcon onClick={(e) => handleEditProject(e, item)} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )
      ) : (
        <Typography variant="body1">Loading projects...</Typography>
      )}

  </Grid>
    </>
  );
 
}
function AdminMainComp() {
  return (
    <div backgroundColor="#FAFAFA">
      <Box sx={{ flexGrow: 1 }}>
        <KFHMenu >
          <CardBackground>
            <ProjectsAdminDev />
          </CardBackground>
        </KFHMenu>
      </Box>
    </div>
  );
}

export default AdminMainComp;
