import React from 'react';
import './TaskSidebar.css'
import { HiOutlineHome } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { PiCoinLight } from "react-icons/pi";
import { useCookies } from "react-cookie";
import Coin from "./assets/Vivecoin1.png";
import { MdDateRange } from "react-icons/md";

function TaskSidebar() {
  return (
    <div className="sidebar__container">
        <div className="sidebar__item__wrapper">
          <HiOutlineHome />
          <span>Home</span>
        </div>

        <div className="sidebar__item__wrapper">
          <MdOutlineLeaderboard />
          <span>Leaderboard</span>
        </div>

        <div className="sidebar__item__wrapper">
          <CgProfile />
          <span>Profile</span>
        </div>

        <div className="sidebar__item__wrapper">
          <MdOutlineSettings />
          <span>Settings</span>
        </div>

        <div className="sidebar__item__wrapper">
          <MdOutlineTaskAlt />
          <span>My Contributions</span>
        </div>

        <div className="sidebar__item__wrapper">
          <PiCoinLight />
          <span>My Points</span>
        </div>

        <div className="sidebar__item__wrapper">
          <IoLogOutOutline />
          <span>Logout</span>
        </div>
      </div>
  )
}

export default TaskSidebar;