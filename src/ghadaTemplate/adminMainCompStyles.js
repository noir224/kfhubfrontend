import React, { useEffect } from 'react';
import { createTheme } from '@mui/material';

export const CardStyle ={
    minWidth: 275, 
    minHeight: 275, 
    borderRadius: '10px' ,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}
  export const searchStyle = {
  //   width:{
  //     xs: 380,
  //     sm: 500,
  //     md:700,
     
  // },
    width: '100%',
    color:"#007C4C"
  }

  export const ButtonGrid={
    alignItems:{
      xs:'center',
      sm:'center',
      md:'right',
      lg:'right',
      xl:'right'
     },
     justifyContent:{
        xs:'center',
        sm:'center',
        md:'right',
        lg:'right',
        xl:'right'
       
     },

     
  }

  export const ButtonStyle ={
    height: '60px',
     width:{
        xs: 270,
        md:200
     },

     margin:{
      xs:'10px',
      sm:'10px',
      md:'20px',
      lg:'20px',
      xl:'20px',
     },

     
     backgroundColor: '#007C4C',
      '&:hover': {
        bgcolor: '#00A965', // Adjust the lighter shade color as per your preference
      },
     
  }

