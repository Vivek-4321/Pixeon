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
  )
}

export default RecommendationSideBar