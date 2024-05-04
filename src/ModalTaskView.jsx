import React,{useState,useEffect} from "react";
import "./ModalTaskView.css";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import Coin from "./assets/Vivecoin1.png";
import { MdDateRange } from "react-icons/md";
import axios from "axios";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";

function ModalTaskView({ isModalOpen, handleCloseModal, task }) {
  const [isViewingImage, setIsViewingImage] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const handleImageClick = () => {
    console.log(post);
    setIsViewingImage(!isViewingImage);
  };

  const darkTheme = {
    backgroundColor: "#222",
    textColor: "#ddd",
    boldButtonColor: "#555",
    buttonBackgroundColor: "#555",
    buttonTextColor: "#ddd",
    buttonHoverTextColor: "#fff",
    buttonHoverBackgroundColor: "#333",
    toolbarBackgroundColor: "#333",
    linkColor: "#888",
    borderColor: "#333",
  };

  const customStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      borderRadius: "0.6rem",
      width: "45%",
      height: "45%",
      overflowY: "auto",
      overflowX: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  const darkCustomStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      minHeight: "3rem",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#14111d",
      borderRadius: "0.6rem",
      width: "65%",
      overflowY: "auto",
      overflowX: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffff",
      border: "0.3px solid grey",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  useEffect(() => {
    if (isModalOpen) {
      console.log(task);
    }
  }, [isModalOpen, task]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Example Modal"
      style={
        cookies?.selectedTheme?.includes("dark")
          ? darkCustomStyles
          : customStyles
      }
    >
      <div className="task__container__map">
        <div key={task?.taskId} className="task__post__container__top">
          <div className="container__left">
            <div className="container__image">
              <img src={task?.owner?.profilePicLink} />
            </div>
            <div className="container__desc">
              <span className="user__name">{task?.owner?.userName}</span>
              <span className="user__time">
                {" "}
                {task?.createdAt && formatDistanceToNow(new Date(task?.createdAt), {
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
                  isViewingImage ? "post__image--expanded" : "post__image__big"
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
              <span>{task?.deadLine && formatDate(task?.deadLine)}</span>
            </div>
          </div>
          <div className="task__bottom__right">
            {task?.status === "OPEN" ? (
              <button>Apply Now</button>
            ) : (
              <button className="closed__button">Closed</button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalTaskView;
