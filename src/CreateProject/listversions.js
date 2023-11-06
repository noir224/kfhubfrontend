import { useParams, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { versionStyle } from './projectdetailsstyles';
import { Link } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ContentVersionStyle, DialogVersionStyle, TitleVersionStyle } from './projectdetailsstyles.js'; 
import{Background, KFHMenu} from '../ghadaTemplate/MainComps'
import Autocomplete from '@mui/material/Autocomplete';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SearchBar from "../userssearchbar/searchbar";
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { tabsTheme } from '../ghadaTemplate/MainCompsStyle.js';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


function ListVersions({ versions, projectn }) {
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleVersionClick = (index, e) => {
    e.preventDefault();
    const versionNumber = versions[index].versionnumber;
    navigate(`/projects/${projectn}/version/${versionNumber}`,
      { state: { project: projectn, versionNumber: versionNumber, versionIndex: index } });
  };
  const columns = [
    { field: 'id', headerName: '#', width: 100 },
    { field: 'version', headerName: 'Version', width: 160 },
    { field: 'sit', headerName: 'SIT Server', width: 200 },
    {
      field: 'android', headerName: 'Android', width: 150, renderCell: (params) => {
        return <Link href={`http://localhost:8080/uploads/${params.value}`}
        >Download</Link>
      },
    },
    {
      field: 'iOS',
      headerName: 'iOS',
      width: 100,
      renderCell: (params) => {
        return <Link href={`itms-services://?action=download-manifest&url=http://localhost:8080/uploads/${params.value}`}
        >Download</Link>
      },
    }
    //{ field: 'iOS', headerName: 'iOS', width: 100 },

    // Add more columns as needed
  ];
  const rows = versions.length > 0 ? versions.map((version, index) => ({
    id: index,
    version: version.versionnumber,
    sit: version.sitserver,
    android: version.android,
    iOS:version.plist

  })) : [];

  const [openDialog, setOpenDialog] = useState(false);

  const handleRowClick = (row) => {
    const description = versions[row.id].vdescription;
    setDescription(description); // Set the description using the setDescription function
    setOpenDialog(true);
  }

/*
{projects ? (
        projects.length > 0 ? (
          projects.map((item) => (
            <Grid xs={12} lg={3} key={item.id}>
              <Card sx={CardStyle} onClick={() => navigate(`/admindash/${item.name}`)} >
                <CardContent>

                  <Typography variant="h5" component="h2">
                    {item.name}
                  </Typography>

                  <Typography variant="body2" component="p" sx={{ height: 160 }}>
                    {item.description}
                  </Typography>
                  <div align="right">
                    <DeleteIcon />
                    <EditIcon onClick={() => handleEditProject(item)} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
          ) : (
            <p>You don't have any assigned projects</p>
          )
        ) : (
          <p>Loading projects...</p>
        )}

  */
  /*
 {versions &&
       versions.length > 0 ? (
         versions.map((version,index) => (
           <Grid xs={12}  key={version.id}>
             <Card sx={{height:50, width:600}} onClick={(e) => handleVersionClick(index,e)}>
             <CardContent direction="column" >
             <Typography variant="body1" component="body1">
               v{version.versionnumber+" "} 
             </Typography>
             <Typography variant="body1" component="body1">
               {version.sitserver}
             </Typography>
 
             </CardContent>
             </Card>
           <div key={version.id}>
           
             <p></p>
             
           </div>
           </Grid>
         ))
       ) : (
         <p>No versions found </p>
       )}
  */
  const getRowClassName = (params) => {
    return params.rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
  };
//
  return (
    <>
    <Grid item xs={12} sm={6} md={3} lg={3} xlg={3}>
      <Grid justifyContent='center' xs={12} sm={12} md={12} lg={12} xlg={12}>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} sx={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px', marginTop: '75px', marginRight: '15px'}} >
      <div className="cir-signupusers" onClick={() => setOpenDialog(false)}>
      <FontAwesomeIcon className="userIcon-signupusers" icon={faTimes} onClick={() => setOpenDialog(false)} />
      </div>
      <DialogTitle sx={TitleVersionStyle} align='center' marginTop='20px' marginBottom='10px'>Project Description</DialogTitle>
          
     <DialogContent height='auto'>
      <Grid spacing={{ xs: 2, md: 3, lg: 3, xlg: 3 }} justifyContent="center" marginBottom='10px'>
      <Typography sx={ContentVersionStyle}> {description} </Typography>
      </Grid>
      </DialogContent>
            
      </Dialog>
      </Grid>
      </Grid>
      <DataGrid
        withBorderColor="black"
        rows={rows}
        columns={columns}
        sx={versionStyle}
        getRowClassName={getRowClassName}
        onRowClick={(params) => handleRowClick(params.row)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        headerClassName="centered-header"
      />
    </>
  );
}

export default ListVersions;
