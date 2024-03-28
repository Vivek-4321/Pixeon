import React from 'react';
import { IoImageOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { LuSendHorizonal } from "react-icons/lu";
import { GoPaperclip } from "react-icons/go";
import "./AddPost.css";

function AddPost({handleOpenModal}) {
  return (
    <div className="add__post" onClick={handleOpenModal}>
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
  )
}

export default AddPost;