import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "./BottomNavigationBar.css";

function BottomNavigationBar() {
  return (
    <div className="bottom-navigation-bar">
      <NavLink className="nav-item-link" activeClassName="active" to="/">
        <div className="nav-item">
          <AiOutlineMessage />
        </div>
      </NavLink>
      <NavLink className="nav-item-link" activeClassName="active" to="/loading">
        <div className="nav-item">
          <MdOutlineSettings />
        </div>
      </NavLink>
      <NavLink className="nav-item-link" activeClassName="active" to="/signup">
        <div className="nav-item">
          <FiHome />
        </div>
      </NavLink>
      <NavLink
        className="nav-item-link"
        activeClassName="active"
        to="/otp_verification"
      >
        <div className="nav-item">
          <IoSearchOutline />
        </div>
      </NavLink>
      <NavLink className="nav-item-link" activeClassName="active" to="/login">
        <div className="nav-item">
          <CgProfile />
        </div>
      </NavLink>
    </div>
  );
}

export default BottomNavigationBar;
