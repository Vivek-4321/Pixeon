import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Post.css";
import { SlLike } from "react-icons/sl";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import Modal from "react-modal";
import axios from "axios";
import { useCookies } from "react-cookie";
import { formatDistanceToNow } from "date-fns";
import VideoPlayer from "./VideoPlayer";
import ReactHlsPlayer from "react-hls-player";
import { toast, Toaster } from "react-hot-toast";
import { BiSolidLike } from "react-icons/bi";

function Post({ post, userLiked }) {
  const [isViewingImage, setIsViewingImage] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const videoRef = useRef(null);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Construct the request body
    const requestBody = {
      content: content,
      postId: post.id,
    };

    const token = cookie.token;
    console.log(token);

    // Set the Authorization header with the JWT token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request to the API endpoint using Axios
    const promise = axios
      .post("http://localhost:3000/comments", requestBody, config)
      .then((response) => {
        // Handle the successful response from the server
        console.log("Comment submitted successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors that occur during the Axios request
        console.error("Error submitting comment:", error);
      });

    toast.promise(promise, {
      loading: "Submitting comment...",
      success: "Comment submitted successfully!",
      error: "Failed to submit comment. Please try again.",
    });
  };

  const handleImageClick = () => {
    console.log(post);
    setIsViewingImage(!isViewingImage);
  };

  const handleCommentClick = () => {
    setIsCommentModalOpen(!isCommentModalOpen);
  };

  async function likePost(postId) {
    // Define the request headers including the Authorization header with the bearer token
    const token = cookie.token;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Define the request body containing the postId
    const requestBody = {
      postId: postId,
    };

    // Make a POST request to the /likes endpoint with the postId and authentication headers
    const promise = axios
      .post("http://localhost:3000/likes", requestBody, { headers })
      .then((response) => {
        // Handle the successful response
        console.log("Post liked successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors that occur during the request
        console.error("Error liking post:", error);
      });

    toast.promise(promise, {
      loading: "Liking post...",
      success: "🔥",
      error: "😭",
      style: {
        borderRadius: "10px",
        backgroundColor: "#333",
        color: "#fff",
      },
    });
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: `"#fff"`,
      borderRadius: "0.6rem",
      width: "80%",
      height: "75%",
      overflowY: "auto",
      overflowX: "hidden",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      zIndex: "2222",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  const darkCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000e0e",
      borderRadius: "0.6rem",
      width: "80%",
      height: "75%",
      overflowY: "auto",
      overflowX: "hidden",
      alignItems: "center",
      justifyContent: "center",
      border: "0.1px solid grey",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <div className="post__show__container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="post__show__container__top">
        <div className="post__image__container">
          <div className="post__image">
            <img src={post.user.profile_link} alt="profile" />
          </div>
          <div className="post__content">
            <span className="post__content__heading">{post.user.name}</span>
            <span className="post__content__date">
              {formatDistanceToNow(new Date(post.timestamp), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <div className="post__icon__container">
          <BsThreeDotsVertical />
        </div>
      </div>
      <div className="post__show__container__middle">
        <div className="post__content__container">
          <span
            className="post__contents"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></span>
        </div>
        <div className="post__image__wrapper" onClick={handleImageClick}>
          {post.link?.includes(".m3u8") ? (
            <ReactHlsPlayer
              src={post.link}
              autoPlay={false}
              controls={true}
              width="100%"
              height="auto"
              poster={post.thumbnail}
              style={{ width: "100%", height: "90%" }}
            />
          ) : post.link?.includes(".mp4") ? (
            <video controls style={{ width: "100%", height: "auto" }}>
              <source src={post.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={post.link}
              className={
                isViewingImage ? "post__image--expanded" : "post__image__big"
              }
            />
          )}
        </div>
      </div>
      <div className="post__show__container__bottom">
        <div className="post__icon__group__left">
          <span
            className={`post__icon${userLiked ? " liked" : ""}`}
            onClick={() => likePost(post.id)}
          >
            {userLiked ? <BiSolidLike /> : <SlLike />}
          </span>

          <span className="like__count">{post?.likes?.length || 0}</span>
          <span className="post__icon">
            <IoShareSocialOutline />
          </span>
        </div>
        <div className="post__icon__group__right">
          <span className="post__icon" onClick={handleCommentClick}>
            <AiOutlineComment />
          </span>
          <p>{post?.comments?.length}</p>
        </div>
      </div>
      {isViewingImage && (
        <div className="post__image__overlay" onClick={handleImageClick}>
          <img src={post.link} className="post__image--expanded" />
        </div>
      )}

      <Modal
        isOpen={isCommentModalOpen}
        onRequestClose={handleCommentClick}
        contentLabel="Comment Modal"
        style={cookie.selectedTheme.includes("dark") ? darkCustomStyles : customStyles}
      >
        {/* <button onClick={handleCommentClick} className="modal__close__button">
          X
        </button> */}
        <div className="post__show__container__top">
          <div className="post__image__container">
            <div className="post__image">
              <img src={post.user.profile_link} alt="profile" />
            </div>
            <div className="post__content__comment">
              <span className="post__content__heading">{post.user.name}</span>
              <span className="post__content__date">
                {formatDistanceToNow(new Date(post.timestamp), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div className="post__icon__container">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="post__contents__comments__wrapper">
          <span
            className="post__contents__comments"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></span>
        </div>

        {post.link?.includes(".m3u8") ? (
          <ReactHlsPlayer
            src={post.link}
            autoPlay={false}
            controls={true}
            width="100%"
            height="auto"
            poster={post.thumbnail}
            style={{ width: "100%", height: "90%" }}
          />
        ) : post.link?.includes(".mp4") ? (
          <video controls style={{ width: "100%", height: "auto" }}>
            <source src={post.link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={post.link}
            className={
              isViewingImage ? "post__image--expanded" : "post__image__big"
            }
          />
        )}

        <form className="modal__comment__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            className="modal__comment__input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="modal__comment__button">
            Send
          </button>
        </form>
        <div className="modal__comments">
          {post?.comments?.map((comment, index) => (
            <div key={index} className="modal__comment">
              {/* <p className="modal__comment__author">{comment.user.name}</p>
              <p className="modal__comment__text">{comment.content}</p> */}
              <div className="model__comment__top">
                <div className="model__comment__image">
                  <img src={comment.user.profile_link} alt="profile" />
                </div>
                <div className="model__comment__content">
                  <span className="model__comment__heading">
                    {comment.user.name}
                  </span>
                  <span className="model__comment__date">
                    .{" "}
                    {formatDistanceToNow(new Date(comment.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="model__comment__bottom">
                <p className="model__comment__text">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default Post;
