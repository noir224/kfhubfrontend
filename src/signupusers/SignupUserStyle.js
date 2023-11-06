import React, { useEffect } from 'react';
import { createTheme } from '@mui/material';
import styled, { css } from 'styled-components'


  export const FieldSignupStyle = {
    background: 'rgba(158, 210, 180, 0.32)',
    border: '1px solid #008D41',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.045em',
    color: '#444751',
    height: 'auto',
    maxWidth: '100%',
    marginTop: '10px',
    width: '250px',
  }

  export const ButtonSignupStyle ={
    height: '40px',
     width:{
        xs: 120,
        sm:160,
        md:160,
        lg:160,
        xlg:160,
     },
     marginRight: '30px',
     marginBottom: '15px',
     marginTop: '5px',
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

  export const HeaderSignupStyle ={
    fontSize: {
        xs: '18px',
        sm: '20px',
        md: '22px',
        lg: '22px',
        xlg: '22px',
    },
    fontStyle: 'normal',
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: '3rem',
    textAlign: 'center',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#000000',
    marginTop: '30px'
  }

  export const UserSignupStyle ={
    fontSize: {
        xs: '16px',
        sm: '18px',
        md: '20px',
        lg: '20px',
        xlg: '20px',
    },
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: '1.2',
    textAlign: 'center',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#000000',
  }

  export const DialogSignupStyle ={
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
  }

  export const TitleSignupStyle ={
    fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '16px',
        xlg: '16px',
    },
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: '19px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#000000',
    alignItems: 'center',
    textAlign: 'center',
  }
