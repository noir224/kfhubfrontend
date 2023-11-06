import React, { useState  } from 'react';

import { useNavigate } from "react-router-dom";
import './login.css';
import axios from 'axios';

function ForgotPassword() {
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
    const handlePhoneChange = (event) => {
      const inp = event.target.value;
      const specialCharRegex = /[^0-9]/g

      if (specialCharRegex.test(inp)) {
        // Found a special character
        setMessage('Input must contain numbers Only!!');
      } else {
        setPhone(inp);
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
    setMessage("Missing email or phone field");
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
    <h3 className="title">Forgot Password</h3>
    {message && <p className="error-message">{message}</p>}
    <form onSubmit={forgotPass}>
      <label>Email</label>
      <input type="email"   onChange={handleEmailChange}/>
      <label>Phone</label>
      <input type="number"  onChange={handlePhoneChange} />
      <button type="submit"  className="login-button">Submit</button>
    </form>
  </div>
  );
}

export default ForgotPassword;




