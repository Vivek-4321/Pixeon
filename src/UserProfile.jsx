import React, { useState, useEffect } from "react";
import TaskSidebar from "./TaskSidebar";
import "./UserProfile.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import Coin from "./assets/Vivecoin1.png";
import Post from "./Post.jsx";
import { formatDistanceToNow, format } from "date-fns";
import ModalComponentForTask from "./ModalComponentForTask.jsx";
import ModalOptions from "./ModalOptions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SidebarSkeletonLoader from "./SidebarSkeletonLoader";
import { useCookies } from "react-cookie";
import useStore from './store.js'

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [isViewingImage, setIsViewingImage] = useState(false);
  const [activeButton, setActiveButton] = useState("Posts"); // Initial active button
  const { id } = useParams();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);

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
    setLoading(true);
    try {
      const response = await axios.get(
        "https://pixeon-server.onrender.com/api/User/getSingleUserData",
        {
          params: {
            token: token,
            userId: id,
          },
          withCredentials: true,
          credentials: "include",
        }
      );
      setLoading(false);
      setUserData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
    }
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

  if (loading) {
    return (
      <SkeletonTheme
              baseColor={
                cookie?.selectedTheme?.includes("dark") ? "#000d0d" : ""
              }
              highlightColor={
                cookie?.selectedTheme?.includes("dark") ? "#14111d" : ""
              }
              borderRadius={8}
            >
        <div className="userProfile__wrapper">
          <div className="sidebar__wrapper">
            <TaskSidebar />
          </div>
          <div className="userProfile__container">
            <div className="userProfile__card">
              <Skeleton
                circle
                width={80}
                height={80}
                style={{ marginLeft: "-10px" }}
              />
              <span className="userProfile__data">
                <Skeleton width={150} />
                <Skeleton width={250} />
              </span>
            </div>
            <div className="userProfile__description">
              <div className="userProfile__info">
                <MdOutlineMail />
                <Skeleton width={200} />
              </div>
              <div className="userProfile__info">
                <FaRegUser />
                <Skeleton width={100} />
              </div>
              <div className="userProfile__info">
                <img src={Coin} alt="coin" />
                <Skeleton width={100} />
              </div>
            </div>
            <div className="userProfile__buttons">
              <button className="userProfile__button">Posts</button>
              <button className="userProfile__button">Tasks</button>
              <button className="userProfile__button">Contributions</button>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="userProfile__wrapper">
      <TaskSidebar />
      <div className="userProfile__container">
        <div className="userProfile__card">
          <img src={userData.profilePicLink || "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"} />
          <span className="userProfile__data">
            <span>{userData.userName}</span>
            <span className="userProfile__headline">{userData.headLine}</span>
            
          </span>
          <span className="pencil__icon" style={{ display: userData?.userId === user?.userId ? "block" : "none", paddingTop: "0.5rem", paddingLeft: '0.6rem'}} onClick={() => {navigate('/profile')}}><GoPencil/></span>
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
        {activeButton === "Posts" && userData?.posts && userData?.posts?.length > 0 ? (
          userData?.posts?.map((post) => (
            <Post
              key={post.postId}
              post={post}
              userLiked={hasUserLikedPost(post.postId)}
            />
          ))
        ) : (
          <div style={{display: activeButton === "Posts" ? 'block' : 'none'}}>No posts</div>

        )}
        {activeButton === "Tasks" && userData?.posts && userData?.tasks?.length > 0 ? (
          userData?.tasks?.map((task, index) => (
            <div className="task__container__map">
              <div
                key={index}
                className="task__post__container__top"
                onClick={() => {
                  navigate(`/task/${task.taskId}`);
                }}
              >
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
          ))
        ) : (
          <div style={{display: activeButton === "Tasks" ? 'block' : 'none'}}>No tasks</div>
        )}
        {activeButton === "Contributions" && userData?.posts &&
          userData?.applications?.length > 0 ? (
            userData?.applications
              .filter((application) => application.status === "ACCEPTED")
              .map((task, index) => (
                <div className="task__container__map">
                  <div
                    key={index}
                    className="task__post__container__top"
                    onClick={() => {
                      navigate(`/task/${task.taskApplied.taskId}`);
                    }}
                  >
                    <div className="container__left">
                      <div className="container__image">
                        <img src={userData.profilePicLink || "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"} />
                      </div>
                      <div className="container__desc">
                        <span className="user__name">{userData?.userName}</span>
                        <span className="user__time">
                          {" "}
                          {task?.taskApplied.createdAt && formatDistanceToNow(new Date(task?.taskApplied.createdAt), {
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
                        dangerouslySetInnerHTML={{ __html: task?.taskApplied?.description }}
                      ></span>
                    </div>
                    <div
                      className="post__image__wrapper"
                      onClick={handleImageClick}
                    >
                      {task?.taskApplied?.link?.includes(".m3u8") ? (
                        <ReactHlsPlayer
                          src={task?.link}
                          autoPlay={false}
                          controls={true}
                          width="100%"
                          height="auto"
                          poster={task?.taskApplied?.thumbnail}
                          style={{ width: "100%", height: "90%" }}
                        />
                      ) : task?.taskApplied?.link?.includes(".mp4") ? (
                        <video controls style={{ width: "100%", height: "auto" }}>
                          <source src={task?.taskApplied?.link} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={task?.taskApplied?.link}
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
                      <span>{task?.taskApplied?.points}</span>
                      <div className="date__container">
                        <MdDateRange />
                        <span>{task?.taskApplied?.createdAt && formatDate(task?.taskApplied?.createdAt)}</span>
                      </div>
                    </div>
                    <div className="task__bottom__right">
                      <button onClick={() => handleOpenModal(task?.taskApplied)}>Edit</button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div style={{display: activeButton === "Contributions" ? 'block' : 'none'}}>No contributions</div>
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
