import { Grid } from '@mui/material';
import axios from 'axios';
import React from 'react';
import unauth from './pics/unauth.png';
import { Typography } from 'antd';


function UnAuth() {
  

  return (
    <Grid container xs={12} >
      <Grid item xs={12}  align={'center'}>
        <img src={unauth} height={600} width={600}/>
      </Grid>
      <Grid item xs={12}  align={'center'}>
        <Typography component="h3">
          Access Denied 
        </Typography>
      </Grid>
    </Grid>
  );
}

export default UnAuth;
