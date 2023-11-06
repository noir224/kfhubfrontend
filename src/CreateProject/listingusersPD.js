
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Box, Grid, Typography } from '@mui/material';
import { circleStyle } from '../viewusers/viewusersStyles';
import { circleStyle1 } from './projectdetailsstyles';


function ListUsers({assignedusers}) {
  return (
    <Box sx={{ 
      width: {
        xs: 270,
        sm:300,
        md:400,
        lg:500,
        xl:600
      }, bgcolor: "#fafafa", borderRadius:2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}>
      
      <List sx={{width:500, flexDirection: 'column' }}>
      {assignedusers.length > 0 ? (
        assignedusers.map((user) => (
          <>
          <ListItem key={user.id} >
          <Typography sx={circleStyle1} style={{ backgroundColor: "#87DFB6" }} variant="body2" component="p">
                          {(user.firstname + " " + user.lastname).substr(0, 2).toUpperCase()}
            </Typography>
            <ListItemText primary={user.firstname+" "+user.lastname} sx={{fontFamily: 'Arial',fontStyle: 'normal'}} secondary={user.email}/>
          </ListItem>
          <Divider sx={{width: {
        xs: 270,
        sm:300,
        md:400,
        lg:500,
        xl:600
      }}}/>
          </>
         
         
        ))
      ) : (
        <ListItem>
        <ListItemText primary="No assigned users"/>
        </ListItem>
      )}
      </List>
     
    </Box>
    
  );
}

export default ListUsers;
