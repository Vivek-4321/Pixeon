import React from 'react';
import "./SideBar.css";
import { HiOutlineHome } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";

function SideBar() {
  return (
    <div className="sidebar__navigation">
    <div className="sidebar__tabs">
      <HiOutlineHome />
      <span>Home</span>
    </div>
    <div className="sidebar__tabs">
      <BiTask />
      <span>Task</span>
    </div>
    <div className="sidebar__tabs">
      <MdOutlineLeaderboard />
      <span>Leaderboard</span>
    </div>
    <div className="sidebar__tabs">
      <CgProfile />
      <span>Profile</span>
    </div>
    <div className="sidebar__tabs">
      <MdOutlineSettings />
      <span>Settings</span>
    </div>
  </div>
  )
}

export default SideBar;