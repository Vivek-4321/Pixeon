import React, { useEffect, useState } from "react";
import "./TaskDashboard.css";
import { HiOutlineHome } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { PiCoinLight } from "react-icons/pi";
import { useCookies } from "react-cookie";
import ModalTaskView from "./ModalTaskView";
import Coin from "./assets/Vivecoin1.png";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TaskSidebar from "./TaskSidebar";
import AddTask from "./AddTask";
import ModalComponentForTask from "./ModalComponentForTask";
import axios from "axios";
import { formatDistanceToNow, format } from "date-fns";
import ModalApplication from "./ModalApplication";
import { toast, Toaster } from "react-hot-toast";
import useStore from "./store.js";

function TaskDashboard() {
  const [isViewingImage, setIsViewingImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalAppOpen, setIsModalAppOpen] = useState(false);
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const token = useStore((state) => state.token);

  const deleteTask = async (taskId) => {
    const promise = axios
      .delete(
        `https://pixeon-server.onrender.com/Task/deleteTask/${user?.userId}/${taskId}`,
        {
          token: token
        },{
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((response) => {
        console.log(response.data);
        // handle successful response
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        // handle error
        throw error;
      });

    toast.promise(promise, {
      loading: "Deleting task...",
      success: "Task deleted successfully",
      error: "Error deleting task",
    });
  };

  const handleImageClick = () => {
    console.log(post);
    setIsViewingImage(!isViewingImage);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenModalApp = (task) => {
    setIsModalAppOpen(true);
    setSelectedTask(task);
    console.log("task clicked... ");
  };

  const handleOpenModalTask = (task) => {
    setIsModalTaskOpen(true);
    setTask(task);
    console.log("task clicked... ");
  };

  const handleCloseModalTask = () => {
    setIsModalTaskOpen(false);
  };

  const handleCloseModalApp = () => {
    setIsModalAppOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pixeon-server.onrender.com/api/Task/getAllUsersTask",
          {token: token},{ withCredentials: true, credentials: "include" }
        );
        setData(response.data);
        if (isMounted) {
          console.log(response.data);
          // Update state or perform other actions with the data
        }
      } catch (error) {
        // Handle errors
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false; // Set the flag to indicate that the component is unmounted
      // Any cleanup logic can be placed here
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const handleApplyTask = async (task) => {
    try {
      const response = await axios.post(
        "https://pixeon-server.onrender.com/api/App/create",
        { taskId: task.taskId, token: token },
        { withCredentials: true, credentials: "include" }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewTask = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="taskDashboard__container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      <TaskSidebar />
      <div className="task__container">
        <AddTask handleOpenModal={handleOpenModal} />
        <ModalComponentForTask
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
        {data.map((task, index) => (
          <div className="task__container__map">
            <div
              key={index}
              className="task__post__container__top"
              onClick={() => handleOpenModalTask(task)}
            >
              <div className="container__left">
                <div className="container__image">
                  <img src={task?.owner?.profilePicLink || "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"} />
                </div>
                <div className="container__desc">
                  <span className="user__name">{task?.owner?.userName}</span>
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
              <div className="post__image__wrapper" onClick={handleImageClick}>
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
              <div
                className="task__bottom__right"
                style={{
                  width: user?.userId === task.ownerId ? "14.5rem" : "8rem",
                }}
              >
                {task.status === "OPEN" ? (
                  <button
                    onClick={() =>
                      user?.userId === task.ownerId
                        ? handleViewTask(task.taskId)
                        : handleOpenModalApp(task)
                    }
                  >
                    {user?.userId === task.ownerId ? "View" : "Apply Now"}
                  </button>
                ) : (
                  <button className="closed__button">{task.status}</button>
                )}
                <button
                  style={{
                    display: user?.userId === task.ownerId ? "block" : "none",
                  }}
                  onClick={() => deleteTask(task.taskId)}
                  className="task__bottom__right"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rightSide__container">
        <ModalApplication
          isModalOpen={isModalAppOpen}
          handleCloseModal={handleCloseModalApp}
          selectedTask={selectedTask}
          handleFunction={handleApplyTask}
          heading="Are sure want to apply for this task?"
        />
        <ModalTaskView
          isModalOpen={isModalTaskOpen}
          handleCloseModal={handleCloseModalTask}
          task={task}
        />
      </div>
    </div>
  );
}

export default TaskDashboard;
