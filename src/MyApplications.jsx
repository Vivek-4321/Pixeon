import React, { useState, useEffect } from "react";
import "./MyApplications.css";
import axios from "axios";
import TaskSidebar from "./TaskSidebar";
import Coin from "./assets/Vivecoin1.png";
import ModalTaskView from "./ModalTaskView";

function MyApplications() {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Accepted");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (task) => {
    setIsModalOpen(true);
    setSelectedTask(task.task);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/App/getAllUserApp",
          { withCredentials: true, credentials: "include" }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="my_applications__container">
      <TaskSidebar />
      <div className="my_applications_header">
        <h3>My Applications</h3>
        <div className="userProfile__buttons">
          <button
            className={`userProfile__button ${
              activeButton === "Accepted" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Accepted")}
          >
            Accepted
          </button>
          <button
            className={`userProfile__button ${
              activeButton === "Rejected" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Rejected")}
          >
            Rejected
          </button>
          <button
            className={`userProfile__button ${
              activeButton === "All" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("All")}
          >
            All
          </button>
        </div>
      </div>
      <div className="applications__wrapper">
        {data.map((item, index) => (
          <div className="application__card">
            <div className="application__title">
              <span>{index+1}.</span>{item.task.title}
            </div>
            <div className="application__points">
              <img src={Coin} />
              <span>{item.task.points}</span>
            </div>
            <div className="application__button">
            <button onClick={() => handleOpenModal(item)}>View More</button>
            </div>
          </div>
        ))}
      </div>
      <ModalTaskView
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          task={selectedTask}
        />
    </div>
  );
}

export default MyApplications;