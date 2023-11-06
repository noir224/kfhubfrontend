import React, { useState } from 'react';

import { useNavigate,useLocation } from "react-router-dom";
import './login.css';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  let [message, setMessage] = useState();
  const email1 =  localStorage.getItem("email");

  
    //onSubmit={handleSubmit}
    //onClick={login}
    const handleInputChange = (event, inputName) => {
      const inp = event.target.value;
      const specialCharRegex = /[^a-zA-Z0-9@# $!,.\-_]/g; // matches any character other than letters, numbers, @, #, $, ., -, or _

      if (specialCharRegex.test(inp)) {
        // Found a special character
        setMessage('Input contains special characters!the only allowed special characters are space @, #, $, ., -,!, , or _');
      } else {
        if(inputName==="token")
            setToken(inp);
        else if(inputName==="password")
            setPassword(inp);
        else
            setConfirmPassword(inp);
      }
      
    };

  

//};
async function resetPass(event) {
  event.preventDefault();
  
  let data = {
    password: password,
    resetToken: token,
    email: email1
  };


  if (password.length === 0 || confirmPassword.length === 0 || token.length===0) {
    setMessage("Missing fields");
    return;
  }
  if (password !== confirmPassword) {
    setMessage("Password & Password Comfimation don't match");
    return;
  }else{
    try {
        const response = await axios.put("http://localhost:8080/api/v1/auth/reset-password",data);
        if(response.data.data==null){
          setMessage(response.data.message);
        }else{
            setMessage("Password was changed successfully, go back to login page");
        }
        
      } catch (error) {
        
        setMessage("Somethingb went wrong...");
        
      }
  }
//?email=${email}&phone=${phone}`
 
}


  return (
    <div className="login-form">
    <div className="logo"></div>
    <h3 className="title">Reset Password</h3>
    {message && <p className="error-message">{message}</p>}
    <form onSubmit={resetPass}>
      <label>Reset Passcode (Check your email)</label>
      <input type="text"  onChange={(e) => handleInputChange(e, "token")}/>
      <label>New Password</label>
      <input type="password"   onChange={(e) => handleInputChange(e, "password")} />
      <label>Confirm New Password</label>
      <input type="password"  onChange={(e) => handleInputChange(e, "cpassword")} />
      <button type="submit"  className="login-button">Submit</button>
    </form>
  </div>
  );
}

export default ResetPassword;




