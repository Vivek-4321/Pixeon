import React from "react";
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

function Home() {
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
        <div className="user_profile_recommendation">
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1682685797439-a05dd915cee9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src={Google}
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src={Google}
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src={Google}
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src={Google}
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
          <div className="user_profile_container">
            <img
              className="user_profile_image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D"
            />
            <span className="user_profile_name">Williams Perry Davis</span>
          </div>
        </div>
        <div className="add__post">
          <div className="add__post__top">
            <span className="add__post__image">
              <img src="https://images.unsplash.com/photo-1527082395-e939b847da0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXRzfGVufDB8MXwwfHx8MA%3D%3D" />
            </span>
            <input
              className="add__post__input"
              placeholder="What's on your mind?"
            />
            <span className="add__post__icon">
              <LuSendHorizonal />
            </span>
          </div>
          <div className="add__post__bottom">
            <span className="add__post__tab">
                <IoImageOutline />
              <p>Image/Video</p>
            </span>
            <span className="add__post__tab">
                <GoPaperclip />
              <p>Attachment</p>
            </span>
          </div>
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
