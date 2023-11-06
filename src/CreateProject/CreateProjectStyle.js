import React, { useEffect } from 'react';
import { createTheme } from '@mui/material';
import styled, { css } from 'styled-components'


  export const Field1CreateProjectStyle = {
    width:{
        xs: 190,
        sm: 300,
        md:350,
        
    },
    marginLeft: {
        xs: '0px',
        sm: '0px',
        md: '56px',
    },
    borderRadius: '10px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.045em',
    color: '#444751',
    background: 'white',
    
  }

  export const Field2CreateProjectStyle = {
    width:{
        xs: 220,
        sm: 400,
        md: 750,
        lg: 1040,
        xl: 1340
    },
    marginLeft: {
        xs: '0px',
        sm: '0px',
        md: '56px',
    },
    borderRadius: '10px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.045em',
    color: '#444751',
    background: 'white',
  }

  export const AddButtonCreateProjectStyle ={
    height: '40px',
     width:{
        xs: 100,
        md:160
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
  marginBottom: '10px',
  }

  export const CancelButtonCreateProjectStyle ={
    height: '40px',
     width:{
        xs: 100,
        md:160
     },
     marginRight: {
        xs: '10px',
        sm: '10px',
        md: '15px',
     },
     backgroundColor: '#979797',
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
    backgroundColor: '#817C7C', // New background color when hovered
  },
  marginBottom: '10px',

  }

  export const HeaderCreateProjectStyle ={
    fontSize: {
        xs: '18px',
        sm: '20px',
        md: '22px',
    },
    marginLeft: {
        xs: '0px',
        sm: '0px',
        md: '58.5px',
    },
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '20px',
    color: '#007C4C',
  }

  export const searchCreateProjectStyle = {
    borderRadius: '10px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.045em',
    color: '#444751',
    backgroundColor: 'white',
    marginTop: '10px',
  }

  export const ContainerCreateProjectStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  export const UserCreateProjectStyle ={
    fontSize: {
        xs: '16px',
        sm: '18px',
        md: '20px',
    },
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#007C4C',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
  }

