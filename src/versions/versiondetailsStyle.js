import React, { useEffect } from 'react';
import { createTheme } from '@mui/material';


export const dialogStyle={
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: "100%",
      maxWidth: "500px",  // Set your width here
    },
  }

}

export const dialogButtonsStyle={
  bgcolor: '#007C4C', '&:hover': {
    bgcolor: '#00A965', // Adjust the lighter shade color as per your preference
  },
  
}

export const iconStyle={
  marginLeft:34.5,'&:hover': {
    color: '#00A965', // Adjust the lighter shade color as per your preference
  },
}

export const saveIconStyle={
  marginLeft:2,
  
  '&:hover': {
    color: '#00A965', // Adjust the lighter shade color as per your preference
  },
}

  export const boxStyled = {
    
      backgroundColor: 'rgba(0, 124, 76, 0.15)',
      borderRadius: '10px',
      
      width:{
        xs: 150,
        sm: 150,
        md:150
     },
     height:{
        xs: 150,
        sm:150,
        md:150,
     },
    
    
  };

  export const SInputVersionInfo = {
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '14px',
    width:{
        xs: 350,
        sm: 350,
        md:400,
        lg: 550,
        xl: 700,
        
     },
     height:{
        xs: 55,
        md:55,
     },
    border: 'none',
    

    '& .MuiFilledInput-root': {
        '& .MuiFilledInput-notchedOutline': {
          borderBottomColor: 'black',
        },
      
      '&.Mui-focused': {
        '& .MuiFilledInput-notchedOutline': {
          borderBottomColor: 'black', 
        },
      },

      
    },
    backgroundColor: 'white'

      

  };

  export const BInputVersionInfo = {
    
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '14px',
    width:{
        xs: 350,
        sm:400,
        md:815,
        lg: 1115,
        xl:1415,
     },
     height:{
        xs: 55,
        md:75,
     },
    border: 'none',
    margin: '5px',

    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'green', // Change the color of the border when focused
      },
  };


  export const ThePlus ={
      color: '#007B4C',

  };

  export const TheButton ={
    backgroundColor: 'rgba(0, 122, 75, 0.1)',

    '&:hover': {
      backgroundColor: 'rgba(0, 122, 75, 0.3)', // Change the color to a darker shade
    },
  };

  export const AddButtonStyle ={
    height: '40px',
    width:{
      xs: 210,
      sm:210,
      md:220,
      lg:220,
      xl:220,
    },
    backgroundColor: '#007C4C',
    borderRadius: '25px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '18px',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.045em',
    color: '#FFFFFF',
    transition: 'background-color 0.3s ease', // Transition for smooth hover effect
    '&:hover': {
    backgroundColor: '#005D3E', // New background color when hovered
    },
    }
    
    
    












  //////////////////////////////////////

