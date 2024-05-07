import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TaskPage.css";
import TaskSidebar from "./TaskSidebar";
import { MdDateRange, MdOutlineToken } from "react-icons/md";
import { formatDistanceToNow, format } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import Coin from "./assets/Vivecoin1.png";
import Applicants from "./Applicants";
import { toast, Toaster } from "react-hot-toast";
import Wysiwyg from "react-simple-wysiwyg";
import { LuSendHorizonal } from "react-icons/lu";
import useStore from "./store";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useCookies } from "react-cookie";
import ModalOptions from "./ModalOptions";
import ModalComponentForTask from "./ModalComponentForTask";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const socket = io("https://pixeon-server.onrender.com");

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isViewingImage, setIsViewingImage] = useState(false);
  const [cookie, setCookie, getCookie] = useCookies(["user"]);
  const [submission, setSubmission] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [message, setMessage] = useState("");
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([]);
  const token = useStore((state) => state.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleMenu = (event) => {
    setIsModalOpen(true);
    buttonRef.current = event.target;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskCloseModal = () => {
    setIsModalTaskOpen(false);
  };

  const editTask = () => {
    setIsModalOpen(false);
    setIsModalTaskOpen(true);
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `https://pixeon-server.onrender.com/api/Task/deleteTask/${user?.userId}/${task?.taskId}`,
        {token: MdOutlineToken},
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response.data);
      // handle successful response
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const modalItems = [
    { title: "Edit", onClick: editTask },
    { title: "Delete", onClick: deleteTask },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://pixeon-server.onrender.com/api/Task/getTask",
          { taskId: id , token: token},
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setTask(response.data);
        console.log(response.data);

        console.log(user?.userId);

        // Initialize socket connection and join room when task data is available
        if (
          response.data &&
          (user?.userId === response.data.ownerId ||
            user?.userId === response.data.selectedUser)
        ) {
          const acceptedApplication = response.data.applications?.find(
            (application) => application.status === "ACCEPTED"
          );

          if (acceptedApplication) {
            const res = await getMessages(acceptedApplication.applicationId);
            // rest of the code
            setMessages(res);
          }

          console.log(
            user?.userId,
            response.data.ownerId,
            acceptedApplication?.applicationId
          );
          socket.emit("joinRoom", {
            userId: user?.userId,
            taskOwnerId: response.data.ownerId,
            applicationId: acceptedApplication?.applicationId,
          });

          // socket.on("newMessage", (message) => {
          //   setMessages((prevMessages) => [...prevMessages, message]);
          // });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getMessages = async (referenceId) => {
      console.log(referenceId);
      try {
        const response = await axios.post(
          "https://pixeon-server.onrender.com/api/User/getMessages",
          { referenceId, token: token },
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        console.log("Data:", response.data);
        return response.data.messages;
      } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
      }
    };

    async function getSubmissionDetailsFromAPI() {
      try {
        const response = await axios.post(
          "https://pixeon-server.onrender.com/api/Sub/getDetails",
          { taskId: id ,token: token },
          { withCredentials: true, credentials: "include" }
        );
        setSubmission(response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching submission details from API:", error);
        throw error;
      }
    }

    fetchData();
    getSubmissionDetailsFromAPI();
  }, [id, user?.userId, task?.ownerId, task?.selectedUser]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => {
        // Check if the incoming message already exists in the prevMessages array
        const messageExists = prevMessages.some(
          (msg) => msg.messageId === message.messageId
        );

        // If the message doesn't exist, add it to the prevMessages array
        if (!messageExists) {
          return [...prevMessages, message];
        }

        // If the message already exists, return the prevMessages array as is
        return prevMessages;
      });
    };

    socket.on("newMessage", handleNewMessage);

    // Clean up the socket event listener when the component unmounts or dependencies change
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, user?.userId, task?.ownerId]);

  const sendMessage = async () => {
    const acceptedApplication = task?.applications?.find(
      (application) => application?.status === "ACCEPTED"
    );

    if (user?.userId === task?.ownerId || user?.userId === task?.selectedUser) {
      const promise = new Promise((resolve, reject) => {
        socket.emit(
          "sendMessage",
          {
            senderId: user?.userId,
            receiverId: task?.ownerId,
            message,
            applicationId: acceptedApplication?.applicationId,
          },
          (response) => {
            if (response.status === "ok") {
              resolve(response);
            } else {
              reject(response);
            }
          }
        );
      });

      setMessage("");

      return promise;
    }
  };

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3000/api/Task/getTask",
  //         { taskId: id }, // Directly passing taskId without wrapping in an object
  //         {
  //           withCredentials: true,
  //           credentials: "include",
  //         }
  //       );
  //       setTask(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   async function getSubmissionDetailsFromAPI() {
  //     try {
  //       // Make the API call
  //       const response = await axios.post(
  //         "http://localhost:3000/api/Sub/getDetails",
  //         { taskId: id }, // Pass taskId in the request body
  //         { withCredentials: true, credentials: "include" } // Include withCredentials and credentials options
  //       );
  //       setSubmission(response.data);
  //       console.log(response.data); // Log the result
  //       return response.data; // Return the response data
  //     } catch (error) {
  //       console.error("Error fetching submission details from API:", error);
  //       throw error; // Throw the error to handle it at the calling site
  //     }
  //   }

  //   fetchData();
  //   getSubmissionDetailsFromAPI();
  // }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const handleImageClick = () => {
    setIsViewingImage(!isViewingImage);
  };

  const handleStatusChange = async (taskId, status, applicationId) => {
    const toastId = toast.promise(
      axios.post(
        "https://pixeon-server.onrender.com/api/App/statusChange",
        {
          taskId,
          status,
          applicationId,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      ),
      {
        pending: "Changing status...",
        success: "Status changed successfully!",
        error: "Error changing status",
      }
    );

    try {
      const response = await axios.post(
        "https://pixeon-server.onrender.com/api/App/statusChange",
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

      console.log(response);
    } catch (error) {
      console.error("Error changing status:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  async function handleSub() {
    try {
      let link = "";

      if (selectedFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `files/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        const promise = new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
            },
            (error) => {
              console.error("Error uploading file:", error);
              reject(error);
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
                    "https://pixeon-server.onrender.com/api/Sub/create",
                    requestBody,
                    {
                      withCredentials: true, // Include credentials in cross-origin requests
                      credentials: "include", // Include cookies in cross-origin requests
                    }
                  );
                  console.log(response.data);
                  resolve(response.data);
                }
              );
            }
          );
        });

        const toastId = toast.promise(promise, {
          loading: "Submitting task...",
          success: "Task submitted successfully",
          error: "Error submitting task",
        });

        return promise;
      } else {
        // Define the request body without the link if no file is selected
        const requestBody = {
          taskId: task.taskId,
          submissionContent: inputValue,
        };

        // Make the POST request to the API endpoint using Axios
        const response = await axios.post(
          "https://pixeon-server.onrender.com/api/Sub/create",
          requestBody,
          {
            withCredentials: true, // Include credentials in cross-origin requests
            credentials: "include", // Include cookies in cross-origin requests
          }
        );
        console.log(response.data);

        const toastId = toast.promise(Promise.resolve(response.data), {
          loading: "Submitting task...",
          success: "Task submitted successfully",
          error: "Error submitting task",
        });

        return response.data;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to handle it outside of this function
    }
  }

  const changeSubmissionStatus = async (value) => {
    const promise = axios.post(
      `https://pixeon-server.onrender.com/api/Sub/changeStatus`,
      {
        status: value.toUpperCase(),
        submissionId: submission.submissionId,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );

    const toastId = toast.promise(promise, {
      loading: "Changing submission status...",
      success: "Submission status changed successfully",
      error: "Error changing submission status",
    });

    try {
      const response = await promise;
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      toast.dismiss(toastId);
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
    <SkeletonTheme
      baseColor={
        cookie?.selectedTheme?.includes("dark") ? "#000d0d" : "#202020"
      }
      highlightColor={
        cookie?.selectedTheme?.includes("dark") ? "#14111d" : "#444"
      }
      borderRadius={7}
    >
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
                {task ? (
                  <div className="container__image">
                    <img src={task?.owner?.profilePicLink} />
                  </div>
                ) : (
                  <Skeleton circle width={50} height={50} />
                )}
                <div className="container__desc">
                  {task ? (
                    <span className="user__name">{task?.owner?.userName}</span>
                  ) : (
                    <Skeleton width={150} />
                  )}

                  {task ? (
                    <span className="user__time">
                      {" "}
                      {task &&
                        formatDistanceToNow(new Date(task?.createdAt), {
                          addSuffix: true,
                        })}
                    </span>
                  ) : (
                    <Skeleton width={100} />
                  )}
                </div>
              </div>
              <div className="container__right" onClick={handleMenu}>
                <BsThreeDotsVertical />
              </div>
            </div>
            <div className="post__show__container__middle">
              <div className="post__content__container">
                {task ? (
                  <span style={{ marginBottom: "0.2rem" }}>
                    <b>{task?.title}</b>
                  </span>
                ) : (
                  <Skeleton width={100} />
                )}
                {task ? (
                  <span
                    className="post__contents"
                    dangerouslySetInnerHTML={{ __html: task?.description }}
                  ></span>
                ) : (
                  <Skeleton width={800} height={500} />
                )}
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
            <div></div>

            <div className="task__container__bottom">
              <div className="task__bottom__left">
                <img src={Coin} alt="coin_image" />
                {task ? <span>{task?.points}</span> : <Skeleton width={40} />}

                <div className="date__container">
                  <MdDateRange />
                  {task ? (
                    <span>{task && formatDate(task?.createdAt)}</span>
                  ) : (
                    <Skeleton width={40} />
                  )}
                </div>
              </div>
              <div className="task__bottom__right">
                {" "}
                {task ? (
                  task?.status === "OPEN" ? (
                    <button>{task?.status}</button>
                  ) : (
                    <button className="closed__button">{task?.status}</button>
                  )
                ) : (
                  <Skeleton width={60} />
                )}{" "}
              </div>
            </div>
          </div>
          <div className="applicants__list__checkbox">
            {task ? (
              <>
                <label htmlFor="showApplicants">Show Applicants List</label>
                <input
                  type="checkbox"
                  id="showApplicants"
                  checked={showApplicants}
                  onChange={(e) => setShowApplicants(e.target.checked)}
                />
              </>
            ) : (
              <Skeleton width={80} />
            )}
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

          <div className="applicants__list__checkbox">
            {task ? (
              <>
                <label htmlFor="showChatBox">Show Chat Box</label>
                <input
                  type="checkbox"
                  id="showChatBox"
                  checked={showChatBox}
                  onChange={(e) => setShowChatBox(e.target.checked)}
                />
              </>
            ) : (
              <Skeleton width={80} />
            )}
          </div>

          {showChatBox && (
            <div className="chat_box">
              <div className="chat_messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat_message ${
                      msg.senderId === user?.userId
                        ? "message_sender"
                        : "message_receiver"
                    }`}
                  >
                    <div className="message_text" key={index + 100}>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="chat_input">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={() => sendMessage()}>
                  <LuSendHorizonal />
                </button>
              </div>
            </div>
          )}
          <div
            className="applicants__list__selected__user"
            style={{ display: task?.selectedUser ? "block" : "none" }}
          >
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

              <span className="user__application__status" onClick={() => {navigate(`/userProfile/${task.selectedUser}`)}}>
                View Profile
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
                color: cookie?.selectedTheme?.includes("dark")
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
                user?.userId === task?.ownerId &&
                submission &&
                (submission?.status !== "REJECTED" &&
                  user?.userId === task?.ownerId)
                  ? "block"
                  : "none",
            }}
            className="task__changeSubmissionStatus"
          >
            <h3>{submission?.status === "ACCEPTED" ? "Submitted Content" : "Verfy the submission" }</h3>
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
                    isViewingImage
                      ? "post__image--expanded"
                      : "post__image__big"
                  }
                />
              )}
            </div>
            <span style={{ display: submission?.status === "ACCEPTED" ? "none" : "block" ,marginTop: "1rem"}}>
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
        <ModalOptions
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          items={modalItems}
          buttonRef={buttonRef}
        />
        <ModalComponentForTask
          isOpen={isModalTaskOpen}
          onClose={handleTaskCloseModal}
          task={task}
        />
      </div>
    </SkeletonTheme>
  );
}

export default TaskPage;
