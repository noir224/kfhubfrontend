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

import { Background, KFHMenu } from '../ghadaTemplate/MainComps.js';
import logo from '../pics/logo.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from 'antd';
import { ThemeProvider } from '@mui/material/styles';
import { tabsTheme } from "../ghadaTemplate/MainCompsStyle.js";
import { CircularProgress } from '@mui/material';
import { TextFieldStyle, TheButton1, TheButton2, circleStyleProfile, infoStyle1, leftm, buttontops } from './viewprofileStyle.js';






function Profile({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                let data = {
                    email: localStorage.getItem('email')
                };
                const response = await axios.get(
                    "http://localhost:8080/api/v1/user/viewprofile", {
                    params: { email: localStorage.getItem('email') },
                    headers: {
                        //'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token')
                    }
                });
                //

                // Set the fetched projects to state
                setUser(response.data.data);
                setLoading(false);
                //console.log(projects[0].id);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching user:', error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleEditProject = async (projectds) => {

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

            {user ? (
                <Grid container xs={12} sm={12} md={12} lg={12} xl={12} sx={{ marginTop: 10 }} alignItems='center' justifyContent='center'>
                    
                    <Grid container xs={12} sm={12} md={12} lg={2} xl={2} justifyContent='center' >
                        <Typography sx={circleStyleProfile} style={{ backgroundColor: "#87DFB6" }} variant="body2" component="p">
                            {(user.firstname + " " + user.lastname).substr(0, 2).toUpperCase()}
                        </Typography>
                    </Grid>
                    <Grid container xs={12} sm={12} md={12} lg={6} xl={6} justifyContent='center' alignItems='center' marginTop={1}>
                        <Grid container justifyContent='center' alignItems='center' sx={leftm}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Typography sx={infoStyle1}>
                            Name
                        </Typography>
                        <TextField
                            id="filled-basic" variant="filled"
                            sx={TextFieldStyle}
                            value={user.firstname + " " + user.lastname}
                            defaultValue='0'
                            color='green'
                            disabled
                        />
                        </Grid> </Grid>

                        <Grid container justifyContent='center' alignItems='center'>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={leftm}>
                        <Typography sx={infoStyle1}>
                            Role
                        </Typography>
                        <TextField
                            id="filled-basic" variant="filled"
                            sx={TextFieldStyle}
                            value={user.role}
                            defaultValue='0'
                            color='green'
                            disabled
                        />
                        </Grid></Grid>

                        <Grid container justifyContent='center' alignItems='center'>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={leftm}>
                        <Typography sx={infoStyle1}>
                            Email
                        </Typography>
                        <TextField
                            id="filled-basic" variant="filled"
                            sx={TextFieldStyle}
                            value={user.email}
                            defaultValue='0'
                            color='green'
                            disabled
                        />
                        </Grid></Grid>

                        <Grid container justifyContent='center' alignItems='center'>
                        <Grid item  xs={12} sm={12} md={12} lg={6} xl={6} sx={leftm}>
                        <Typography sx={infoStyle1}>
                            Phone
                        </Typography>
                        <TextField
                            id="filled-basic" variant="filled"
                            sx={TextFieldStyle}
                            value={user.phone}
                            defaultValue='0'
                            color='green'
                            disabled
                        />
                        </Grid></Grid>
                        
                        </Grid>

                        
                        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} direction="row" margin={2} justifyItems='center'>
                        <Grid container xs={12} sm={12} lg={12} xl={12} alignContent='center' justifyContent='center' alignItems='center' sx={buttontops}>
                        <Button variant="contained" sx={TheButton1} onClick={() => navigate('/editprofile')} >Edit Profile</Button>
                        </Grid>

                        
                        
                        
                        </Grid>


                    
                    
                </Grid>

            ) : (

                <CircularProgress color="success" />

            )

            } 


        </>
    );
}
function Viewprofile() {
    return (
        <div backgroundColor="#FAFAFA">
            <Box sx={{ flexGrow: 1 }}>
                <KFHMenu >
                    <Background>
                        <Profile />
                    </Background>
                </KFHMenu>
            </Box>
        </div>
    );
}

export default Viewprofile;
/*
<Grid container xs={12} sm={12} md={6} lg={6} xl={6} alignContent='center'justifyContent='center' alignItems='center' sx={buttontops}>
                        <Button variant="contained" sx={TheButton2} >Change Password</Button>
                        </Grid>
*/