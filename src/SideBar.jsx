import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { HiOutlineHome } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";

function SideBar() {
  return (
    <div className="sidebar__navigation">
      <NavLink to="/" exact activeClassName="active" className="sidebar__tabs">
        <HiOutlineHome />
        <span>Home</span>
      </NavLink>
      <NavLink to="/tasks" activeClassName="active" className="sidebar__tabs">
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
        to="/settings"
        activeClassName="active"
        className="sidebar__tabs"
      >
        <MdOutlineSettings />
        <span>Settings</span>
      </NavLink>
    </div>
  );
}

export default SideBar;
