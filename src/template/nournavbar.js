import React from "react";
import '@fortawesome/fontawesome-free/css/all.css'; // import the styles
import logo from '../pics/logo1.png';
import './nournavbar.css';


export function TopNav() {
  
      return (
        <div className="top-nav-nour">
          <ul>
            <li><Logo/></li>
            <li><a href="#">PROJECTS</a></li>
            <li><a href="#">SIGN UP USERS</a></li>
            <li> <button className="newprojbutton2-nour" >New Project </button></li>
          </ul>
        </div>
      );
    
}

function Logo() {
  return (
    <div>
      <img className="logo-nour" src={logo}/>
    </div>
  );
}

function NavBar() {
  return <div>
      <TopNav />
  </div>
  
}

export default NavBar;