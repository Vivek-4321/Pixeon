import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "./store";
import "./Home.css";
import UserRecommendation from "./UserRecommendations";
import AddPost from "./AddPost";
import Post from "./Post";
import ModalComponent from "./ModalComponent";
import { useCookies } from "react-cookie";
import SideBar from "./SideBar";
import RecommendationSideBar from "./RecommendationSideBar";
import SidebarSkeletonLoader from "./SidebarSkeletonLoader";
import RecommendationSkeletonLoader from "./RecommendationSkeletonLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const notifications = useStore((state) => state.notifications);
  const setNotifications = useStore((state) => state.setNotifications);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);
  const setUser = useStore((state) => state.setUser);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const hasUserLikedPost = (postId) => {
    return user?.likes?.some((like) => like.postId === postId);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      console.log(cookies.token);
      //http://localhost:3000/api/Post/getAllUsersPost
      try {
        const response = await axios.post(
          "https://pixeon-server.onrender.com/api/Post/getAllUsersPost",{token: token},
          { withCredentials: true, credentials: "include" }
        );

        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
        console.log("Everything finished....");
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.post(
          "https://pixeon-server.onrender.com/api/Notify/notifications",{token: token},
          { withCredentials: true, credentials: "include" }
        );
        console.log("This is from notifications: ",response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchNotifications();
    fetchPosts();
  }, []);

  return (
    <div className="home__container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      {/* <div className="color"></div> */}
      <div className="sidebar__wrapper__home">
        {isLoading ? <SidebarSkeletonLoader /> : <SideBar />}
      </div>
      <div className="post__container">
        <div className="post__user__recommendation">
          {isLoading ? (
            <div
              className="user_profile_recommendation"
              style={{
                overflow: "hidden",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <SkeletonTheme
                baseColor={
                  cookies?.selectedTheme?.includes("dark") ? "#000d0d" : ""
                }
                highlightColor={
                  cookies?.selectedTheme?.includes("dark") ? "#14111d" : ""
                }
                borderRadius={8}
              >
                <Skeleton
                  width={860}
                  height={120}
                  style={{ marginBottom: "10px" }}
                />
              </SkeletonTheme>
            </div>
          ) : (
            <UserRecommendation />
          )}
        </div>
        <div className="post__add__post">
          {isLoading ? (
            <div className="add__post" style={{ paddingTop: "0.5rem" }}>
              <SkeletonTheme
                baseColor={
                  cookies?.selectedTheme?.includes("dark") ? "#000d0d" : ""
                }
                highlightColor={
                  cookies?.selectedTheme?.includes("dark") ? "#14111d" : ""
                }
                borderRadius={8}
              >
                <Skeleton
                  width={870}
                  height={105}
                  style={{ marginBottom: "10px" }}
                />
              </SkeletonTheme>
            </div>
          ) : (
            <>
              <AddPost
                handleOpenModal={handleOpenModal}
                link={cookies.user?.profilePicLink}
              />
              <ModalComponent
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                posts={posts}
                setPosts={setPosts}
              />
            </>
          )}
        </div>
        <div className="post__show__wrapper">
          {isLoading ? (
            <SkeletonTheme
              baseColor={
                cookies?.selectedTheme?.includes("dark") ? "#000d0d" : ""
              }
              highlightColor={
                cookies?.selectedTheme?.includes("dark") ? "#14111d" : ""
              }
              borderRadius={8}
            >
              <Skeleton height={400} style={{ marginTop: "16px" }} />
              <Skeleton height={400} style={{ marginTop: "16px" }} />
              <Skeleton height={400} style={{ marginTop: "16px" }} />
            </SkeletonTheme>
          ) : (
            posts.map((post) => (
              <Post
                key={post.postId}
                post={post}
                userLiked={hasUserLikedPost(post.postId)}
                posts={posts}
                setPosts={setPosts}
              />
            ))
          )}
        </div>
      </div>
      <div className="recommendation__wrappper__home">
        {isLoading ? (
          <RecommendationSkeletonLoader />
        ) : (
          <RecommendationSideBar />
        )}
      </div>
    </div>
  );
}

export default Home;
