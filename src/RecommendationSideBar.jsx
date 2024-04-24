import React from 'react';
import "./RecommendationSideBar.css";
import { MdOutlineSettings } from "react-icons/md";
import Google from "./assets/google__logo.png";
import { LuSendHorizonal } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { GoPaperclip } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

function RecommendationSideBar() {
  return (
    <div className="recommendation__container">
        <span className="recommendation__title">Recommendation</span>
        <div className="recommendation__tab">
        <img
            className="recommendation__image"
              alt="profile_photo"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <span>Emma Grace Smith</span>
        </div>
        <div className="recommendation__tab">
          <img
            className="recommendation__image"
            alt="profile_photo"
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
          
          />
          <span>Noah Benjamin Martinez</span>
        </div>
        <div className="recommendation__tab">
          <img
            className="recommendation__image"
            alt="profile_photo"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
          />
          <span>Olivia Rose Johnson</span>
        </div>
        <div className="recommendation__tab">
          <img
            className="recommendation__image"
            alt="profile_photo"
            src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
          />
          <span>Ethan Michael Anderson</span>
        </div>
      </div>
  )
}

export default RecommendationSideBar