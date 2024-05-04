import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TaskPage.css";
import TaskSidebar from "./TaskSidebar";
import { MdDateRange } from "react-icons/md";
import { formatDistanceToNow, format } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import Coin from "./assets/Vivecoin1.png";
import Applicants from "./Applicants";
import { toast, Toaster } from "react-hot-toast";
import Wysiwyg from "react-simple-wysiwyg";
import useStore from "./store";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useCookies } from "react-cookie";

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const user = useStore((state) => state.user);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isViewingImage, setIsViewingImage] = useState(false);
  const [cookies, setCookie, getCookie] = useCookies(["user"]);
  const [submission, setSubmission] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (!file) return;

    const url = window.URL.createObjectURL(file);
    setPreviewUrl(url);

    const fileType = file.type;
    const isVideoFile = fileType.includes("video");
    setIsVideo(isVideoFile);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/Task/getTask",
          { taskId: id }, // Directly passing taskId without wrapping in an object
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setTask(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    async function getSubmissionDetailsFromAPI() {
      try {
        // Make the API call
        const response = await axios.post(
          "http://localhost:3000/api/Sub/getDetails",
          { taskId: id }, // Pass taskId in the request body
          { withCredentials: true, credentials: "include" } // Include withCredentials and credentials options
        );
        setSubmission(response.data);
        console.log(response.data); // Log the result
        return response.data; // Return the response data
      } catch (error) {
        console.error("Error fetching submission details from API:", error);
        throw error; // Throw the error to handle it at the calling site
      }
    }

    fetchData();
    getSubmissionDetailsFromAPI();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const handleImageClick = () => {
    setIsViewingImage(!isViewingImage);
  };

  const handleStatusChange = async (taskId, status, applicationId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/App/statusChange",
        {
          taskId,
          status,
          applicationId,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      // Show a success toast message
      toast.success("Status changed successfully!");

      console.log(response);
    } catch (error) {
      console.error("Error changing status:", error);

      // Show an error toast message
      toast.error("Error changing status");
    }
  };

  async function handleSub() {
    try {
      let link = "";

      if (selectedFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `files/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (error) => {
            console.error("Error uploading file:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                link = downloadURL;

                // Define the request body
                const requestBody = {
                  taskId: task.taskId,
                  submissionContent: inputValue,
                  link: downloadURL,
                };

                // Make the POST request to the API endpoint using Axios
                const response = await axios.post(
                  "http://localhost:3000/api/Sub/create",
                  requestBody,
                  {
                    withCredentials: true, // Include credentials in cross-origin requests
                    credentials: "include", // Include cookies in cross-origin requests
                  }
                );
                console.log(response.data);
                return response.data;
              }
            );
          }
        );
      } else {
        // Define the request body without the link if no file is selected
        const requestBody = {
          taskId: task.taskId,
          submissionContent: inputValue,
        };

        // Make the POST request to the API endpoint using Axios
        const response = await axios.post(
          "http://localhost:3000/api/Sub/create",
          requestBody,
          {
            withCredentials: true, // Include credentials in cross-origin requests
            credentials: "include", // Include cookies in cross-origin requests
          }
        );
        console.log(response.data);
        // Return the response data
        return response.data;
      }
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      throw error; // Re-throw the error to handle it outside of this function
    }
  }

  const changeSubmissionStatus = async (value) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/Sub/changeStatus`,
        {
          status: value.toUpperCase(),
          submissionId: submission.submissionId,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
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

  const fileInputRef = useRef(null);

  const handleLabelClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="task_page_container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      <TaskSidebar />
      <div className="task_page_wrapper">
        <div className="task__container__map">
          <div className="task__post__container__top">
            <div className="container__left">
              <div className="container__image">
                <img src={task?.owner?.profilePicLink} />
              </div>
              <div className="container__desc">
                <span className="user__name">{task?.owner?.userName}</span>
                <span className="user__time">
                  {" "}
                  {/* {formatDistanceToNow(new Date(task?.createdAt), {
                    addSuffix: true,
                  })} */}
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
                <span>{task && formatDate(task?.createdAt)}</span>
              </div>
            </div>
            <div className="task__bottom__right">
              {task?.status === "OPEN" ? (
                <button onClick={() => handleOpenModalApp(task)}>
                  Apply Now
                </button>
              ) : (
                <button className="closed__button">{task?.status}</button>
              )}
            </div>
          </div>
        </div>
        <div className="applicants__list__checkbox">
          <label htmlFor="showApplicants">Show Applicants List</label>
          <input
            type="checkbox"
            id="showApplicants"
            checked={showApplicants}
            onChange={(e) => setShowApplicants(e.target.checked)}
          />
        </div>

        {showApplicants && (
          <div className="applicants__list">
            <Applicants
              items={task?.applications}
              taskId={id}
              status="ACCEPTED"
              handleSubmit={handleStatusChange}
            />
          </div>
        )}

        <div className="applicants__list__selected__user">
          {/* <span>Selected User</span> */}
          <div className="user__selected__wrapper">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  task?.selectRelation?.profilePicLink ||
                  "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"
                }
              />
              <span className="user__name__task">
                {task?.selectRelation?.userName}
                <span>{task?.selectRelation?.email}</span>
              </span>
            </div>

            <span className="user__application__status">
              {task?.applications[0]?.status}
            </span>
          </div>
        </div>

        <div
          className="task__submit__container"
          style={{
            display:
              user?.userId ===
              (task &&
                task.applications &&
                task.applications.length > 0 &&
                task.applications[0].userId)
                ? "block"
                : "none",
          }}
        >
          <h4>Make a submission</h4>
          <Wysiwyg
            className="wysiwyg-editor"
            placeholder="Write your post here..."
            value={inputValue}
            onChange={handleInputChange}
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              color: cookies?.selectedTheme?.includes("dark")
                ? "#ffff"
                : "#000",
            }}
            theme={darkTheme}
          />
          <div
            className="file-upload-wrapper"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "-1rem",
            }}
          >
            <div>
              <span className="custom_upload_button">Select File</span>
              <input
                id="file-upload"
                type="file"
                className="upload"
                accept="image/*, video/mp4, video/webm"
                onChange={handleFileChange}
              />
            </div>
            <button
              className="submit__task__btn"
              onClick={() =>
                handleSub(task.taskId, "lkasjdf;lak", "laksdjfa;lsdkfja;")
              }
            >
              Submit
            </button>
          </div>
        </div>

        <div
          style={{
            display:
              (user?.userId === task?.ownerId && submission) &&
              (submission?.status !== "REJECTED" ||
                user?.userId === task.ownerId)
                ? "block"
                : "none",
          }}
          className="task__changeSubmissionStatus"
        >
          <h3>Verfy the submission</h3>
          <div className="post__content__container">
            <span
              className="post__contents"
              dangerouslySetInnerHTML={{ __html: submission?.content }}
            ></span>
          </div>
          <div className="post__image__wrapper" onClick={handleImageClick}>
            {submission?.link?.includes(".m3u8") ? (
              <ReactHlsPlayer
                src={submission?.link}
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
                poster={submission?.thumbnail}
                style={{ width: "100%", height: "90%" }}
              />
            ) : task?.link?.includes(".mp4") ? (
              <video controls style={{ width: "100%", height: "auto" }}>
                <source src={submission.link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={submission?.link}
                className={
                  isViewingImage ? "post__image--expanded" : "post__image__big"
                }
              />
            )}
          </div>
          <span style={{ marginTop: "1rem" }}>
            <button onClick={() => changeSubmissionStatus("ACCEPTED")}>
              Accept
            </button>
            <button
              style={{ backgroundColor: "#d73d63" }}
              onClick={() => changeSubmissionStatus("REJECTED")}
            >
              Decline
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
