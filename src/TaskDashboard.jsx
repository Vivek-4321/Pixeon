import React,{useState} from "react";
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
import Coin from "./assets/Vivecoin1.png";
import { MdDateRange } from "react-icons/md";
import TaskSidebar from "./TaskSidebar";

function TaskDashboard() {

  const [isViewingImage, setIsViewingImage] = useState(false);

  const handleImageClick = () => {
    console.log(post);
    setIsViewingImage(!isViewingImage);
  };

  return (
    <div className="taskDashboard__container">
      <TaskSidebar/>
      <div className="task__container">
          <div className="task__post__container__top">
            <div className="container__left">
              <div className="container__image">
                <img src="https://images.unsplash.com/photo-1712672117537-0ab4f26d1e7c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className="container__desc">
                <span className="user__name">Vivek Venugopal</span>
                <span className="user__time">about 3 min ago</span>
              </div>
            </div>
            <div className="container__right">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div className="post__show__container__middle">
            <div className="post__content__container">
              <span className="post__contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur earum atque molestiae quam neque excepturi maxime quod eligendi eum repellendus voluptatem doloremque a nulla laborum reiciendis sapiente impedit quidem unde, incidunt perspiciatis error dolore maiores mollitia ex. Veritatis sunt officiis doloribus fugiat quasi quis necessitatibus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, sapiente dolores corporis odit exercitationem incidunt sunt repellat! Dicta molestiae nulla reprehenderit minus aliquid. Tempore, consectetur dolore! Magnam accusantium similique nihil, totam alias repellat animi, aliquid fugiat cum amet corrupti ducimus quasi id praesentium autem reiciendis!
              </span>
            </div>
            <div className="post__image__wrapper" onClick={handleImageClick}>
              <img className={
                isViewingImage ? "post__image--expanded" : "post__image__big"
              } src="https://images.unsplash.com/photo-1712672117537-0ab4f26d1e7c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
          </div>
          <div className="task__container__bottom">
              <div className="task__bottom__left">
                <img src={Coin} alt="coin_image"/>
                <span>40</span>
                <div className="date__container">
                  <MdDateRange/>
                  <span>25/04/2024</span>
                </div>
              </div>
              <div className="task__bottom__right">
                <button>Apply Now</button>
              </div>
          </div>
      </div>
      <div className="rightSide__container"></div>
    </div>
  );
}

export default TaskDashboard;
