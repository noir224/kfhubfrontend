import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import axios from 'axios';
import Cookies from 'js-cookie';



function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    const handlePasswordChange = (event) => {
      const inp = event.target.value;
      const specialCharRegex = /[^a-zA-Z0-9@# $!,.\-_]/g; // matches any character other than letters, numbers, @, #, $, ., -, or _

      if (specialCharRegex.test(inp)) {
        // Found a special character
        setMessage('Input contains special characters!the only allowed special characters are @, #, $, ., -, or _');
      } else {
        setPassword(inp);
      }
      
    };
  

//};
async function login(event) {
  event.preventDefault();
  
  let data = {
    email: email.toLowerCase(),
    password: password,
  };
/*
  if (localStorage.getItem('token') != null) {
    navigate('/projects');
  }
  */

  if (email.length === 0 || password.length === 0) {
    setMessage("Missing email or password field");

    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/login', data, { 
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
  
      }
    });
    if(response.data.error==true){
      setMessage(response.data.message);
    }else{
      if (response.data.token) {
        setMessage(response.data.message);
        localStorage.setItem("token", "Bearer " + response.data.token);
        localStorage.setItem("email", email.toLowerCase());
        props.pullData(response.data.role)
        Cookies.set('userRole', response.data.role);
        navigate('/projects');
      } else {
        localStorage.setItem("token", null);
        setMessage(response.data.message);
        //setMessage("Something went wrong, check login or password");
      }
    }
    
  } catch (error) {
    
    setMessage("Somethingb went wrong... check that the email and password are correct");
    
  }
}


  return (
    <div className="login-form">
    <div className="logo-login"></div>
    <h3 className="title">Welcome to KFHub</h3>
    {message && <p className="error-message-login">{message}</p>}
    <form onSubmit={login}>
      <label>Email</label>
      <input type="email" id="email-login"  onChange={handleEmailChange}/>
      <label>Password</label>
      <input type="password" id="password-login"  onChange={handlePasswordChange} />
      <a href="http://localhost:3000/forgotpassword" className="forgot-password">Forgot password?</a>
      <button type="submit"  className="login-button">Login</button>
    </form>
  </div>
  );
}

export default Login;




