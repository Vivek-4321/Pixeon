import React from 'react';
import "./BottomNavigationBar.css";
import { Link } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function BottomNavigationBar() {
  return (
    <div className="bottom-navigation-bar">
    <Link className="nav-item-link" to="/"><div className="nav-item"><AiOutlineMessage/></div></Link>
    <Link className="nav-item-link" to="/loading"><div className="nav-item"><MdOutlineSettings/></div></Link>
    <Link className="nav-item-link active" to="/signup"><div className="nav-item"><FiHome/></div></Link>
    <Link className="nav-item-link" to="/otp_verification"><div className="nav-item"><IoSearchOutline/></div></Link>
    <Link className="nav-item-link" to="/login"><div className="nav-item"><CgProfile/></div></Link>
  </div>
  )
}

export default BottomNavigationBar;