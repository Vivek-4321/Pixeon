import React from 'react';
import { IoImageOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { LuSendHorizonal } from "react-icons/lu";
import { GoPaperclip } from "react-icons/go";
import "./AddPost.css";
import { useCookies } from 'react-cookie';

function AddPost({handleOpenModal}) {

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  
  return (
    <div className="add__post" onClick={handleOpenModal}>
          <div className="add__post__top">
            <span className="add__post__image">
              <img src={cookies?.user?.profilePicLink || "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"} />
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