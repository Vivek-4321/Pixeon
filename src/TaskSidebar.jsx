import React, { useState, useEffect } from "react";
import "./TaskSidebar.css";
import { HiOutlineHome } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { PiCoinLight } from "react-icons/pi";
import Coin from "./assets/Vivecoin1.png";
import { MdDateRange } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CiSquareQuestion } from "react-icons/ci";
import ModalApplication from "./ModalApplication";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import ModalSettings from "./ModalSettings.jsx";
import useStore from "./store.js";
import PointsModal from "./PointsModal";

function TaskSidebar() {
  const navigate = useNavigate();
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const user = useStore((state) => state.user);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);

  const handleOpenPointsModal = () => {
    setIsPointsModalOpen(true);
  };

  const handleClosePointsModal = () => {
    setIsPointsModalOpen(false);
  };

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
      "https://pixeon-server.onrender.com/api/Request/create",
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
    <div className="sidebar__container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      <div className="sidebar__item__wrapper" onClick={() => navigate("/")}>
        <HiOutlineHome />
        <span>Home</span>
      </div>

      <div
        className="sidebar__item__wrapper"
        onClick={() => navigate("/leaderboard")}
      >
        <MdOutlineLeaderboard />
        <span>Leaderboard</span>
      </div>

      <div
        className="sidebar__item__wrapper"
        onClick={() => navigate(`/userProfile/${user?.userId}`)}
      >
        <CgProfile />
        <span>Profile</span>
      </div>

      <div className="sidebar__item__wrapper" onClick={handleOpenCookieModal}>
        <MdOutlineSettings />
        <span>Settings</span>
      </div>

      <div
        className="sidebar__item__wrapper"
        onClick={() => {
          navigate("/my_applications");
        }}
      >
        <MdOutlineTaskAlt />
        <span>My Contributions</span>
      </div>

      <div
        className="sidebar__item__wrapper"
        onClick={() => {
          navigate("/my_applications");
        }}
      >
        <FaWpforms />
        <span>Applications</span>
      </div>

      <div className="sidebar__item__wrapper" onClick={ user?.role === 'ADMIN' ? () => {navigate('/admin')} : handleOpenPointsModal}>
        <PiCoinLight />
        <span>{user?.role === 'ADMIN' ? "Admin Dashboard" : "My points"}</span>
      </div>

      <div
        className="sidebar__item__wrapper"
        onClick={
          user?.role === "FACULTY" || user?.role === "ADMIN"
            ? () => {
                navigate("/point_conversion");
              }
            : handleOpenModal
        }
      >
        <CiSquareQuestion />
        <span>
          {user?.role === "FACULTY" || user?.role === "ADMIN"
            ? "Conversion Requests"
            : "Request Conversion"}
        </span>
      </div>

      <div className="sidebar__item__wrapper" onClick={handleOpenLogoutModal}>
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

      <PointsModal
        isModalOpen={isPointsModalOpen}
        handleCloseModal={handleClosePointsModal}
        points={user.points} // replace user.points with the actual user points
      />
    </div>
  );
}

export default TaskSidebar;
