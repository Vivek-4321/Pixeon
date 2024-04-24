import React,{useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { HiOutlineHome } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";

function SideBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <div className="sidebar__navigation">
      <NavLink to="/" exact activeClassName="active" className="sidebar__tabs">
        <HiOutlineHome />
        <span>Home</span>
      </NavLink>
      <NavLink to="/s" activeClassName="active" className="sidebar__tabs">
        <BiTask />
        <span>Task</span>
      </NavLink>
      <NavLink
        to="/leaderboard"
        activeClassName="active"
        className="sidebar__tabs"
      >
        <MdOutlineLeaderboard />
        <span>Leaderboard</span>
      </NavLink>
      <NavLink to="/profile" activeClassName="active" className="sidebar__tabs">
        <CgProfile />
        <span>Profile</span>
      </NavLink>
      <NavLink
        to="/dashboard"
        activeClassName="active"
        className="sidebar__tabs"
      >
        <MdOutlineSettings />
        <span>Settings</span>
      </NavLink>
      <NavLink
        to="/login"
        activeClassName="active"
        className="sidebar__tabs"
        onClick={() => {
          removeCookie("token");
          removeCookie("user");
        }}
      >
        <IoLogOutOutline/>
        <span>Logout</span>
      </NavLink>
    </div>
  );
}

export default SideBar;
