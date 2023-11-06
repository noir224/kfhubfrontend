import React, { useEffect } from 'react';
import { createTheme } from '@mui/material';

export const logoStyle = (isXs) => ( {
 width: isXs ? '40px' : '60px', 
 height: isXs ? '40px' : '60px', 
 marginTop: isXs ? '15px' : '0px' 
});

export const boxStyle = (isXs) => ({
    borderBottom: '1px solid divider',
    marginTop: '7px',
    height: isXs ? '30px' : '50px',
    width: isXs ? '200px' : '400px',
    
  });
  
  export const tabsStyle = {
    indicatorColor: "#007C4C",
    height: 200
  }

  export const tabsTheme = () => createTheme({
    palette:{
        primary: {
            main: "#007C4C",
        }
    },
 
  })
  
 
  
  export const tabStyle = {

    fontSize:{
        xs:16,
        md:24,
    },
  }
  
 

  export const MainCont = {
    marginTop: '20px',
     marginLeft: '10px',
      marginRight: '10px'
  }

  export const profileStyle= (isXs) => ({
     width: isXs ?'40px':'60px',
     height: isXs ?'40px':'60px',
     
  });