import React,{useState, useEffect} from "react";
import "./Home.css";
import { HiOutlineHome } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import Google from "./assets/google__logo.png";
import { LuSendHorizonal } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { GoPaperclip } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserRecommendation from "./UserRecommendations";
import AddPost from "./AddPost";
import Post from "./Post";
import ModalComponent from "./ModalComponent";

function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home__container">
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
      <div className="post__container">
      <div className="post__user__recommendation">
      <UserRecommendation/>
      </div>
      <div className="post__add__post">
      <AddPost handleOpenModal={handleOpenModal} />
      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal}/>
      </div>
      <div className="post__show__wrapper">
      <Post/>
      <Post/>
      <Post/>
      </div>
      </div>
      <div className="recommendation__container">
        <span className="recommendation__title">Recommendation</span>
        <div className="recommendation__tab">
          <img
            className="recommendation__image"
            alt="profile_photo"
            src={Google}
          />
          <span>Ellyse Perry Davis</span>
        </div>
        <div className="recommendation__tab">
          <img
            className="recommendation__image"
            alt="profile_photo"
            src={Google}
          />
          <span>Riya Perry Davis</span>
        </div>
        <div className="recommendation__tab">
          <img
            className="recommendation__image"
            alt="profile_photo"
            src={Google}
          />
          <span>Priya Perry Davis</span>
        </div>
        <div className="recommendation__tab">
          <img
            className="recommendation__image"
            alt="profile_photo"
            src={Google}
          />
          <span>Sahithya Perry Davis</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
