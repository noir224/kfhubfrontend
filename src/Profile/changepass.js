import React, { useState  } from 'react';

import { useNavigate } from "react-router-dom";
import './change.css';
import axios from 'axios';

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  let [message, setMessage] = useState();
  const navigate = useNavigate();
  

  
    //onSubmit={handleSubmit}
    //onClick={login}
    const handleEmailChange = (event) => {
      const inp = event.target.value;
      const specialCharRegex = /[^a-zA-Z0-9@# $!,.\-_]/g; // matches any character other than letters, numbers, @, #, $, ., -, or _

      if (specialCharRegex.test(inp)) {
        // Found a special character
        setMessage('Input contains special characters!the only allowed special characters are space @, #, $, ., -,!, , or _');
      } else {
        setEmail(inp);
      }
      
    };
    
  

//};
async function forgotPass(event) {
  event.preventDefault();
  
  let data = {
    email: email.toLowerCase(),
    phone: phone,
  };


  if (email.length === 0 || phone.length === 0) {
    setMessage("Missing field");
    return;
  }
//?email=${email}&phone=${phone}`
  try {
    const response = await axios.put("http://localhost:8080/api/v1/auth/forgot-password",data);
    if(response.data.data==null){
      setMessage(response.data.message);
    }else{
        localStorage.setItem("email", email.toLowerCase());
        navigate('/resetpass');
    }
    
  } catch (error) {
    
    setMessage("Somethingb went wrong...");
    
  }
}


  return (
    <div className="login-form">
    <div className="logo"></div>
    <h3 className="title">Change Password</h3>
    {message && <p className="error-message">{message}</p>}
    <form onSubmit={forgotPass}>
      <label>Current Password</label>
      <input type="password"   />
      <label>New Password</label>
      <input type="password"   />
      <label>Confirm New Password</label>
      <input type="password"   />
      <button type="submit"  className="login-button">Save Changes</button>
    </form>
  </div>
  );
}

export default ChangePassword;




