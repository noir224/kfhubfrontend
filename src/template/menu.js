import React from "react";
import { FaTh, FaUser, FaSignOutAlt, FaUsers, FaBell } from 'react-icons/fa';

export function MenuBar() {
  return (
    <div className="menu-bar">
      <div className="grid">
        <FaTh />
      </div>
      <div className="menu-item">
        <FaBell />
      </div>
      <div className="menu-item">
        <FaUsers />
      </div>
      <div className="menu-item">
        <FaUser />
      </div>
      <div className="log-out">
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