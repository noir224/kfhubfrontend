import React from "react";
import {FaTh, FaUser, FaSignOutAlt, FaUsers, FaBell} from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.css'; // import the styles
import './nourmenu.css';

export function MenuBar() {
  return (
    <div className="menu-bar-nour">
      <div className="grid-nour">
        <FaTh />
      </div>
      <div className="menu-item-nour">
        <FaBell />
      </div>
      <div className="menu-item-nour">
        <FaUsers />
      </div>
      <div className="menu-item-nour">
        <FaUser />
      </div>
      <div className="log-out-nour">
        <FaSignOutAlt />
      </div>
    </div>
  );
};

function Menu() {
  return <div>
      <MenuBar />
  </div>
  
}

export default Menu;