import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { HiOutlineHome } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { CiSquareQuestion } from "react-icons/ci";
import ModalApplication from "./ModalApplication";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import useStore from "./store.js";
import ModalSettings from "./ModalSettings.jsx";

function SideBar() {
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenCookieModal = () => {
    setIsCookieModalOpen(true);
  };

  const handleCloseCookieModal = () => {
    setIsCookieModalOpen(false);
  };

  const handleEnableCookies = () => {
    // setCookie("cookieConsent", true, { path: "/" });
    // handleCloseCookieModal();
    toast.success("Cookies enabled");
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = async () => {
    removeCookie("token");
    removeCookie("user");
    navigate('/login');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFunction = async () => {
    const requestPromise = axios.post(
      "http://localhost:3000/api/Request/create",
      {
        message: "Can you convert my points to activity points?",
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );

    return toast
      .promise(requestPromise, {
        loading: "Creating request...",
        success: "Request created successfully",
        error: "Error creating request",
      })
      .catch((error) => {
        console.error("Error creating request: ", error);
        throw error;
      });
  };

  return (
    <div className="sidebar__navigation">
      <NavLink to="/" exact activeClassName="active" className="sidebar__tabs">
        <HiOutlineHome />
        <span>Home</span>
      </NavLink>
      <NavLink to={user?.verified ? "/dashboard" : "/imageVerification"} activeClassName="active" className="sidebar__tabs">
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
      <NavLink
        to={`/userProfile/${user?.userId}`}
        activeClassName="active"
        className="sidebar__tabs"
      >
        <CgProfile />
        <span>Profile</span>
      </NavLink>
      <div
        onClick={handleOpenCookieModal}
        activeClassName="active"
        className="sidebar__tabs"
      >
        <MdOutlineSettings />
        <span>Settings</span>
      </div>

      <div className="sidebar__tabs" onClick={handleOpenModal}>
        <CiSquareQuestion />
        <span>Conversion Requests</span>
      </div>

      <div className="sidebar__tabs" onClick={handleOpenLogoutModal}>
        <IoLogOutOutline />
        <span>Logout</span>
      </div>

      <ModalApplication
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedTask={selectedTask}
        handleFunction={handleFunction}
        heading="Are you sure want to apply for point conversion.. ?"
      />

      <ModalApplication
        isModalOpen={isLogoutModalOpen}
        handleCloseModal={handleCloseLogoutModal}
        selectedTask={null}
        handleFunction={handleLogout}
        heading="Are you sure you want to logout?"
      />

      <ModalSettings
        isModalOpen={isCookieModalOpen}
        handleCloseModal={handleCloseCookieModal}
        handleEnableCookies={handleEnableCookies}
      />
    </div>
  );
}

export default SideBar;
