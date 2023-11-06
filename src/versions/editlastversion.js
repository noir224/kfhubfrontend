import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Add, Margin, Delete, Download, GifBox } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SInputVersionInfo, boxStyled, BInputVersionInfo, ThePlus, TheButton, AddButtonStyle, CancelButtonStyle, TheButton2, FileHeader1Style, FilefontStyle } from './edilastversionStyle.js';
import { Background, KFHMenu } from '../ghadaTemplate/MainComps'
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;


const EditVersionInside = () => {
    const location = useLocation();
    const project = location.state.projectd;
    const versionIndex = project.releases.length - 1
    const lastRelease = project.releases[versionIndex];
    const [versionNumber, setVersionNumber] = useState("");
    const [sitServer, setSitServer] = useState("");
    const [description, setDescription] = useState("");
    const [android, setAndroid] = useState(null);
    const [iosIpa, setiosIpa] = useState(null);
    const [iosPlist, setiosPlist] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [androidName, setAndroidName] = useState(null);
    const [iosIpaName, setiosIpaName] = useState(null);
    const [iosPlistName, setiosPlistName] = useState(null);
    const [androidVisible, setAndroidVisible] = useState(false);
    const [iosIpaVisible, setiosIpaVisible] = useState(false);
    const [iosPlistVisible, setiosPlistVisible] = useState(false);

    const [androidNameVisible, setAndroidNameVisible] = useState(true);
    const [iosIpaNameVisible, setiosIpaNameVisible] = useState(true);
    const [iosPlistNameVisible, setiosPlistNameVisible] = useState(true);

    //.substring(lastRelease.iosipa.lastIndexOf('/') + 1)

    useEffect(() => {

        setVersionNumber(lastRelease.versionnumber);
        setSitServer(lastRelease.sitserver);
        setAndroid(lastRelease.android);
        setiosIpa(lastRelease.iosipa);
        setiosPlist(lastRelease.iosplist);
        setDescription(lastRelease.vdescription);
        setAndroidName(lastRelease.android);
        setiosIpaName(lastRelease.iosipa);
        setiosPlistName(lastRelease.iosplist);
    }, [project]);


    const propsAndroid = {
        name: 'file',
        multiple: false,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {

            }
            if (status === 'done') {
                setAndroid(info.file.originFileObj);


            } else if (status === 'error') {
                console.log("failed")
            }
        },
        onDrop(e) {
            setAndroid(e.dataTransfer.files);
        },
    };

    const propsiosplist = {
        name: 'file',
        multiple: false,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {

            }
            if (status === 'done') {
                setiosPlist(info.file.originFileObj);


            } else if (status === 'error') {
                console.log("failed")
            }
        },
        onDrop(e) {
            setiosPlist(e.dataTransfer.files);
        },
    };

    const propsiosipa = {
        name: 'file',
        multiple: false,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {

            }
            if (status === 'done') {
                setiosIpa(info.file.originFileObj);


            } else if (status === 'error') {
                console.log("failed")
            }
        },
        onDrop(e) {
            setiosIpa(e.dataTransfer.files);
        },
    };



    const handleLabelClick = (inputType) => {
        switch (inputType) {
            case 'android':
                setAndroidVisible(true);

                break;
            case 'iosIpa':
                setiosIpaVisible(true);

                break;
            case 'iosPlist':
                setiosPlistVisible(true);

                break;
            default:
                break;
        }
    };
    const handleVersionChange = (event, inputName) => {
        const inp = event.target.value;
        const specialCharRegex = /^[0-9.]*$/;

        if (!specialCharRegex.test(inp)) {
            // Found a special character
            setMessage('Version number and SIT server can only have numebrs and dots');
        } else {
            setVersionNumber(inp);
            setMessage('');


        }

    };
    const handleSITChange = (event, inputName) => {
        const inp = event.target.value;
        const specialCharRegex = /^[0-9.]*$/;

        if (!specialCharRegex.test(inp)) {
            // Found a special character
            setMessage('Version number and SIT server can only have numebrs and dots');
        } else {

            setSitServer(inp);
            setMessage('');

        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (versionNumber.length === 0 || sitServer.length === 0 || description.length === 0) {
            setMessage("Please fill all the text fields");
            return;
        }


        // Perform file upload and form submission logic here
        const formData = new FormData();

        formData.append('android', android); // Append the Android file to the FormData object

        // Append other properties of the version object
        formData.append('iosipa', iosIpa);
        formData.append('iosplist', iosPlist);
        formData.append('versionnumber', versionNumber);
        formData.append('sitserver', sitServer);
        formData.append('vdescription', description);
        // Define the function to make the PUT request

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/projects/editversion?projectname=${project.name}&vnum=${versionIndex}`, formData, {
                headers: {
                    //'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: localStorage.getItem('token')
                }
            });

            // You can access the updated project object in the response data
            const updatedProject = response.data.data;
            // Do something with the updated project object
            if (updatedProject == null) {
                setMessage(response.data.message);
            } else {
                navigate(`/projects/${project.name}/version/${versionNumber}`, { state: { project: project.name, versionNumber: versionNumber, versionIndex: (updatedProject.releases.length - 1) } });
            }
        } catch (error) {
            // Handle error
            console.error('Error:', error);
            // You can access the error message in the response data
            setMessage("Something went wrong")
            // Do something with the error message

        }




    };

    return (
        <>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={(2)} marginTop={2} justifyContent={'center'} align='center'>

                    <Grid xs={12} >

                        <label style={{ fontSize: '15px', color: 'red' }}>{message && <p>{message}</p>}</label>
                    </Grid>
                    <Grid container direction={'column'} >
                        <Grid align="left">
                            <label style={{ marginLeft: '20px', fontSize: '15px' }}>Version Number</label>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6} xl={6} >
                            <TextField
                                value={versionNumber}
                                id="filled-basic" variant="filled"
                                sx={SInputVersionInfo}
                                color='green'
                                onChange={(e) => handleVersionChange(e, "vnum")}
                            />

                        </Grid>
                    </Grid>


                    <Grid container direction={'column'} >
                        <Grid align="left">
                            <label style={{ marginLeft: '20px', fontSize: '15px' }}>SIT Server</label>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6} xl={6} >
                            <TextField
                                id="filled-basic" variant="filled"
                                sx={SInputVersionInfo}
                                color='green'
                                value={sitServer}
                                onChange={(e) => handleSITChange(e, "sit")}
                            />

                        </Grid>
                    </Grid>


                    <Grid container direction={'column'} >
                        <Grid align="left"><label style={{ marginLeft: '20px', fontSize: '15px' }}>Version Description</label> </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                            <TextField id="filled-multiline"
                                multiline
                                rows={4}
                                value={description}
                                defaultValue="Description"
                                variant="filled"
                                sx={BInputVersionInfo}
                                color='green'
                                onChange={(e) => setDescription(e.target.value)} />
                        </Grid></Grid>





                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} marginTop={7} align='center'>

                        <Grid container direction='column' xs={12} sm={12} md={12} lg={4} xl={4} spacing={0.5} alignItems='center' >



                            <Typography variant="h5" component="h2" sx={FileHeader1Style}>Android</Typography>
                            {!androidVisible ? (
                                <Box direction='row'
                                    style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }} >
                                    <Grid container direction='row' alignItems='center'>

                                        <Grid xs={9}><p className="FilefontStyle">{androidName}</p></Grid><Grid>
                                            <p>
                                                <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}>
                                                    <Delete fontSize="medium" sx={ThePlus} onClick={() => handleLabelClick('android')} />
                                                </button></p>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ) : (
                                <Dragger value={android}
                                    {...propsAndroid} style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined style={{ color: '#007C4C' }} />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>


                                </Dragger>
                            )}







                        </Grid>


                        <Grid container direction='column' xs={12} sm={12} md={12} lg={3.5} xl={3.5} spacing={0.5} alignItems='center' >



                            <Typography variant="h5" component="h2" sx={FileHeader1Style}>iOS Plist</Typography>
                            {!iosPlistVisible ? (
                                <Box direction='row'
                                    style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }} >
                                    <Grid container direction='row' alignItems='center'>
                                        <Grid xs={9}><p className="FilefontStyle" >{iosPlistName}</p></Grid>
                                        <Grid><p >
                                            <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}>
                                                <Delete fontSize="medium" sx={ThePlus} onClick={() => handleLabelClick('iosPlist')} />
                                            </button></p>
                                        </Grid>
                                    </Grid>

                                </Box>
                            ) : (
                                <Dragger value={iosPlist}
                                    {...propsiosplist} style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined style={{ color: '#007C4C' }} />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>


                                </Dragger>
                            )}

                        </Grid>

                        <Grid container direction='column' xs={12} sm={12} md={12} lg={4} xl={4} spacing={0.5} alignItems='center' >



                            <Typography variant="h5" component="h2" sx={FileHeader1Style}>iOS Ipa</Typography>
                            {!iosIpaVisible ? (
                                <Box direction='row'
                                    style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }} >
                                    <Grid container direction='row' alignItems='center' >
                                        <Grid xs={9}><p className="FilefontStyle" >{iosIpaName}</p></Grid>
                                        <Grid><p >
                                            <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}>
                                                <Delete fontSize="medium" sx={ThePlus} onClick={() => handleLabelClick('iosIpa')} />
                                            </button></p>
                                        </Grid>
                                    </Grid>

                                </Box>
                            ) : (
                                <Dragger value={iosIpa}
                                    {...propsiosipa} style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined style={{ color: '#007C4C' }} />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>


                                </Dragger>
                            )}


                        </Grid>


                    </Grid>










                    <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }} xs={12} md={12} lg={12} sx={{ marginTop: '50px', marginBottom: '30px' }}>
                        <Grid>
                            <Button variant="contained" sx={CancelButtonStyle} type='submit' onClick={handleSubmit}>Cancel</Button>
                        </Grid>
                        <Grid>
                            <Button variant="contained" type="submit" sx={AddButtonStyle}>Save</Button>
                        </Grid>
                    </Grid>


                </Grid>



                {/* </Grid> */}

            </form>


        </>
    );
};

function EditVersionN() {

    const isXs = useMediaQuery('(max-width:344px)');

    return (
        <div backgroundColor="#FAFAFA">
            <Box sx={{ flexGrow: 1 }}>
                <KFHMenu>
                    <Background>
                        <EditVersionInside />
                    </Background>
                </KFHMenu>
            </Box>
        </div>
    );
}

export default EditVersionN;
