import React, { useState } from "react";
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';


const AddVersion = () => {
  const [versionNumber, setVersionNumber] = useState("");
  const [sitServer, setSitServer] = useState("");
  const [description, setDescription] = useState("");
  const [android, setAndroid] = useState(null);
  const [iosipa, setIosIpa] = useState(null);
  const [iosplist, setIosPlist] = useState(null);
  const [message, setMessage] = useState(null);
  const { projectname } = useParams();
  const navigate = useNavigate();




  const handleFileChange = (num, e) => {
    const file = e.target.files[0];
    switch (num) {
      case 1:
        setAndroid(file);
        break;
      case 2:
        setIosIpa(file);
        break;
      case 3:
        setIosPlist(file);
        break;
      default:
        break;
    }
  };
  const handleVersionChange = (event, inputName) => {
    const inp = event.target.value;
    const specialCharRegex =  /^[0-9.]*$/;

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

    if(versionNumber.length===0 || sitServer.length===0 || description.length===0){
      setMessage("Please fill all the text fields");
      return;
    }
    
    
    // Perform file upload and form submission logic here
    const formData = new FormData();
    
    formData.append('android', android); // Append the Android file to the FormData object

    // Append other properties of the version object
    formData.append('iosipa', iosipa);
    formData.append('iosplist', iosplist);
    formData.append('versionnumber', versionNumber);
    formData.append('sitserver', sitServer);
    formData.append('vdescription', description);
// Define the function to make the PUT request
    
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/projects/${projectname}/addversion`, formData, { 
            headers: {
              //'Content-Type': 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem('token')
            }
          });
        
        // You can access the updated project object in the response data
        const updatedProject = response.data.data;
        // Do something with the updated project object
        if(updatedProject==null){
            setMessage(response.data.message);
        }else{
          navigate(`/projects/${projectname}/version/${versionNumber}`, { state: { project: projectname, versionNumber: versionNumber, versionIndex: (updatedProject.releases.length-1) } });
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
    <div>
      {message && <p>{message}</p>}
      <h1>New Version</h1>
      <form onSubmit={handleSubmit}>
        <label>Version Number</label>
        <input
          type="text"
          
          onChange={(e) => handleVersionChange(e, "vnum")}
        />
        <br />
        <label>SIT Server</label>
        <input
          type="text"
          
          onChange={(e) => handleSITChange(e, "sit")}
        />
        <br />
        <label>Description</label>
        <textarea
         
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <label>Android</label>
        <input type="file" onChange={(e) => handleFileChange(1, e)} />
        <br />
        <label>iOS APA</label>
        <input type="file" onChange={(e) => handleFileChange(2, e)} />
        <br />
        <label>iOS APK</label>
        <input type="file" onChange={(e) => handleFileChange(3, e)} />
        <br />
        <button type="submit">Add A Version</button>
      </form>
    </div>
  );
};

export default AddVersion;
