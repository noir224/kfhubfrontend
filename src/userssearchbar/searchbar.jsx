import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './searchbar.css';
import {MdDelete} from "react-icons/md";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import{Background, Menu} from '../ghadaTemplate/MainComps'
import Autocomplete from '@mui/material/Autocomplete';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import { AssignedUsersSearchBarStyle, AssignedItemSearchBarStyle, UserTextSearchBarStyle, searchBarStyle, ListItemTextSearchBarStyle, IconButtonSearchBarStyle, SuggestionsItemSearchBarStyle, SuggestionsSearchBarStyle } from './searchbarStyle.js';
import Divider from '@mui/material/Divider';
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

const Role = {
  DEVELOPER: 'DEVELOPER',
  TESTER: 'TESTER',
  CLIENT: 'CLIENT'
};

const usr = {
  DEVELOPER: 'developers',
  TESTER: 'testers',
  CLIENT: 'clients'
};

const SearchBar = ({ role, onAddUser, onRemoveUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pickedusers, setPickedUsers] = useState([]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const fetchSuggestions = async (query) => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      };
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/bysearch?search=${query}&role=${role}`,
        config
      );


      setSuggestions(response.data.data);

      setError(null);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch suggestions. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, role]);


  const handleSuggestionClick = (user) => {
    const isUserExists = pickedusers.some((pickedUser) => pickedUser.email === user.email);
    if (!isUserExists) {
      onAddUser(user.email);
      setPickedUsers((prevUsers) => [...prevUsers, user]);
    }
    setSearchQuery('');
    setSuggestions([]);
  };
  const handleRemoveClick = (user) => {
    onRemoveUser(user.email);
    setPickedUsers(prevUsers => prevUsers.filter(pickedUser => pickedUser.email !== user.email));
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <Grid container spacing={2}>
       <Box sx={{ flexGrow: 1 }} justifyContent="center">
      <Grid container spacing={{ xs: 1, md: 1, lg: 1, xlg: 1 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xlg: 12 }} justifyContent="center">
        <Grid item xs={11} sm={11} md={11} lg={12} xlg={12} justifyContent="center">
          <Item elevation={0}>
            <Box
              sx={{
                width: '100%',
                maxWidth: {
                  xs: '220px',
                  sm: '260px',
                  md: '260px',
                  lg: '260px',
                  xlg: '260px'
                },
                background: 'rgba(255, 255, 255, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto', // Center the box horizontally
              }}
            >
              <ThemeProvider theme={tabsTheme()}>
              <TextField
                sx={searchBarStyle}
                placeholder={`Search for ${role}`}
                type="text"
                variant='filled'
                value={searchQuery}
                onChange={handleInputChange}
                fullWidth
                
              />
              </ThemeProvider>
              {error && <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{error}</Typography>}

              {suggestions && suggestions.length > 0 && (
                <List sx={{ marginTop: '0.2rem' }}>
                {suggestions.map((user) => (
                  <ListItem key={user.id} onClick={() => handleSuggestionClick(user)} className='suggestions_item-searchbar'>
                    <Typography sx={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                      {user.firstname} {user.lastname} ({user.email})
                    </Typography>
                    <Divider />
                  </ListItem>
                ))}
              </List>
              
              )}

              {searchQuery && suggestions && suggestions.length === 0 && (
                <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  No suggestions found.
                </Typography>
              )}
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>


    <Grid item xs={12} sm={12} md={12} lg={12} xlg={12} justifyContent="center" marginTop="15px" container>
      <Box sx={{ flexGrow: 1 }} justifyContent="center">
        <Grid container spacing={{ xs: 1, md: 1, lg: 1, xlg: 1 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xlg: 12 }} justifyContent="center">
          <Grid item xs={11} sm={11} md={11} lg={12} xlg={12} justifyContent="center">
            <Item elevation={0}>
              <Typography sx={UserTextSearchBarStyle} marginBottom='5px' variant="body1">Assigned:</Typography>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: {
                    xs: '220px',
                    sm: '260px',
                    md: '260px',
                    lg: '260px',
                    xlg: '260px'
                  },
                  background: 'rgba(250, 251, 250, 0.37)',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto', // Center the box horizontally
                }}
              >
                <List sx={{ marginTop: '-10px', textAlign: 'left' }}>
                  {pickedusers && pickedusers.length > 0 ? (
                    pickedusers.map((user) => (
                      <ListItem key={user.id} className="assigned-item-searchbar">
                        <Grid>
                        <ListItemText
                          variant="h6"
                          primary={`${user.firstname} ${user.lastname}`}
                          sx={ListItemTextSearchBarStyle}
                        />
                        </Grid>
                        <Grid marginLeft={'25px'}>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="start"
                            aria-label="delete"
                            onClick={() => handleRemoveClick(user)}
                          >
                            <MdDelete color='black' size={25} sx={IconButtonSearchBarStyle} />
                          </IconButton>
                        </ListItemSecondaryAction>
                        </Grid>
                        <Divider />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText
                        variant="h6"
                        primary="No users were assigned."
                        sx={ListItemTextSearchBarStyle}
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Grid>
</Grid>
  );
};

export default SearchBar;
