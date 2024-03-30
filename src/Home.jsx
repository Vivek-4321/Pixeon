import React, { useState, useEffect } from "react";
import axios from "axios";
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

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = cookies.token;
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home__container">
      <div className="sidebar__wrapper__home">
        {isLoading ? <SidebarSkeletonLoader /> : <SideBar />}
      </div>
      <div className="post__container">
        <div className="post__user__recommendation">
          {isLoading ? (
             <SkeletonTheme
             baseColor={cookies.theme === "dark" ? "#202020" : ""}
             highlightColor={cookies.theme === "dark" ? "#444" : ""}
             borderRadius={8}
           >
              <Skeleton
                width={850}
                height={120}
                style={{ marginBottom: "10px" }}
              />
            </SkeletonTheme>
          ) : (
            <UserRecommendation />
          )}
        </div>
        <div className="post__add__post">
          {isLoading ? (
             <SkeletonTheme
             baseColor={cookies.theme === "dark" ? "#202020" : ""}
             highlightColor={cookies.theme === "dark" ? "#444" : ""}
             borderRadius={8}
           >
              <Skeleton
                width={850}
                height={120}
                style={{ marginBottom: "10px" }}
              />
            </SkeletonTheme>
          ) : (
            <>
              <AddPost handleOpenModal={handleOpenModal} />
              <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} />
            </>
          )}
        </div>
        <div className="post__show__wrapper">
          {isLoading ? (
             <SkeletonTheme
             baseColor={cookies.theme === "dark" ? "#202020" : ""}
             highlightColor={cookies.theme === "dark" ? "#444" : ""}
             borderRadius={8}
           >
              <Skeleton height={400} style={{ marginTop: "16px" }} />
              <Skeleton height={400} style={{ marginTop: "16px" }} />
              <Skeleton height={400} style={{ marginTop: "16px" }} />
            </SkeletonTheme>
          ) : (
            posts.map((post) => <Post key={post.id} post={post} />)
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
