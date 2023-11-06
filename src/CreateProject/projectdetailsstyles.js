import React from "react";
import { createTheme } from '@mui/material';

export const headers = {

    fontFamily: 'Arial',
    fontWeight: 800,
    fontSize: '50px',


}

export const h3 = () => createTheme({
    fontSize: 50,

})

export const HeaderStyle = {

    fontSize: {
        xs: '18px',
        sm: '20px',
        md: '22px',

    },


    fontFamily: 'Inter',

    fontStyle: 'normal',

    fontWeight: '500',

    // fontSize: '22px',

    lineHeight: '20px',

    color: '#007C4C',

}
export const circleStyle1 = {
    width: 60,
    height: 60,
    borderRadius: 100,
    justify: "center",
    marginRight: 1,
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '25px',
    lineHeight: '60px',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.045em',
    color: '#4A9170',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0,0.25))',
}

export const versionStyle = {
    withBorderColor: "#444751", 
    backgroundColor: "#fafafa", 
    height: { xs: 400, md: 800 }, 
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#4A9170",
        color: "#fafafa",
        fontSize: 16
    }, 
    "& .MuiDataGrid-virtualScrollerRenderZone": {
        "& .MuiDataGrid-row": {
            "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
        }
    }
}

export const ContentVersionStyle ={
    fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '16px',
        xlg: '16px',
    },
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '19px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#000000',
    alignItems: 'center',
    textAlign: 'center',
  }

  export const DialogVersionStyle ={
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
  }

  export const TitleVersionStyle ={
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

