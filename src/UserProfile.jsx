import React, { useState, useEffect } from "react";
import TaskSidebar from "./TaskSidebar";
import "./UserProfile.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import Coin from "./assets/Vivecoin1.png";
import Post from "./Post.jsx";
import { formatDistanceToNow, format } from "date-fns";
import ModalComponentForTask from "./ModalComponentForTask.jsx";
import ModalOptions from "./ModalOptions";

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [isViewingImage, setIsViewingImage] = useState(false);
  const [activeButton, setActiveButton] = useState("Posts"); // Initial active button
  const { id } = useParams();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 

  useEffect(() => {
    // Fetch user data or do something else when the location changes
  }, [location.pathname]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  async function fetchUserData() {
    const response = await axios.get(
      "http://localhost:3000/api/User/getSingleUserData",
      {
        params: {
          userId: id,
        },
        withCredentials: true,
        credentials: "include",
      }
    );
    setUserData(response.data.data);
    console.log(response.data.data);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const hasUserLikedPost = (postId) => {
    return userData?.likes?.some((like) => like.postId === postId);
  };

  const handleImageClick = () => {
    setIsViewingImage(!isViewingImage);
  };

  return (
    <div className="userProfile__wrapper">
      <TaskSidebar />
      <div className="userProfile__container">
        <div className="userProfile__card">
          <img src={userData.profilePicLink} />
          <span className="userProfile__data">
            <span>{userData.userName}</span>
            <span className="userProfile__headline">{userData.headLine}</span>
          </span>
        </div>
        <div className="userProfile__description">
          <div className="userProfile__info">
            <MdOutlineMail />
            <span>{userData.email}</span>
          </div>
          <div className="userProfile__info">
            <FaRegUser />
            <span>{userData.role}</span>
          </div>
          <div className="userProfile__info">
            <img src={Coin} alt="coin" />
            <span>{userData.points ? userData.points : 0}</span>
          </div>
        </div>
        <div className="userProfile__buttons">
          <button
            className={`userProfile__button ${
              activeButton === "Posts" && "active"
            }`}
            onClick={() => handleButtonClick("Posts")}
          >
            Posts
          </button>
          <button
            className={`userProfile__button ${
              activeButton === "Tasks" && "active"
            }`}
            onClick={() => handleButtonClick("Tasks")}
          >
            Tasks
          </button>
          <button
            className={`userProfile__button ${
              activeButton === "Contributions" && "active"
            }`}
            onClick={() => handleButtonClick("Contributions")}
          >
            Contributions
          </button>
        </div>
      </div>
      <div className="userProfile__data__container">
        {activeButton === "Posts" &&
          userData?.posts?.map((post) => (
            <Post
              key={post.postId}
              post={post}
              userLiked={hasUserLikedPost(post.postId)}
            />
          ))}
        {activeButton === "Tasks" &&
          userData?.tasks.map((task, index) => (
            <div className="task__container__map">
              <div key={index} className="task__post__container__top" onClick={() => {navigate(`/task/${task.taskId}`)}}>
                <div className="container__left">
                  <div className="container__image">
                    <img src={userData.profilePicLink} />
                  </div>
                  <div className="container__desc">
                    <span className="user__name">{userData?.userName}</span>
                    <span className="user__time">
                      {" "}
                      {formatDistanceToNow(new Date(task?.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
                <div className="container__right">
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className="post__show__container__middle">
                <div className="post__content__container">
                  <span
                    className="post__contents"
                    dangerouslySetInnerHTML={{ __html: task?.description }}
                  ></span>
                </div>
                <div
                  className="post__image__wrapper"
                  onClick={handleImageClick}
                >
                  {task?.link?.includes(".m3u8") ? (
                    <ReactHlsPlayer
                      src={task?.link}
                      autoPlay={false}
                      controls={true}
                      width="100%"
                      height="auto"
                      poster={task?.thumbnail}
                      style={{ width: "100%", height: "90%" }}
                    />
                  ) : task?.link?.includes(".mp4") ? (
                    <video controls style={{ width: "100%", height: "auto" }}>
                      <source src={post.link} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={task?.link}
                      className={
                        isViewingImage
                          ? "post__image--expanded"
                          : "post__image__big"
                      }
                    />
                  )}
                </div>
              </div>
              <div className="task__container__bottom">
                <div className="task__bottom__left">
                  <img src={Coin} alt="coin_image" />
                  <span>{task?.points}</span>
                  <div className="date__container">
                    <MdDateRange />
                    <span>{formatDate(task?.createdAt)}</span>
                  </div>
                </div>
                <div className="task__bottom__right">
                  <button onClick={() => handleOpenModal(task)}>Edit</button>
                </div>
              </div>
            </div>
          ))}
        {activeButton === "Contributions" && (
          // Display contributions data here
          <div>Contributions data</div>
        )}
      </div>
      <ModalComponentForTask
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
      />
    </div>
  );
}

export default UserProfile;
