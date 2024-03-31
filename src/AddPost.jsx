import React from 'react';
import { IoImageOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { LuSendHorizonal } from "react-icons/lu";
import { GoPaperclip } from "react-icons/go";
import "./AddPost.css";

function AddPost({handleOpenModal,link}) {
  
  return (
    <div className="add__post" onClick={handleOpenModal}>
          <div className="add__post__top">
            <span className="add__post__image">
              <img src={link} />
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
  )
}

export default AddPost;