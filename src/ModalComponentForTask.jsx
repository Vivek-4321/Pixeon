import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Wysiwyg from "react-simple-wysiwyg";
import "./ModalComponent.css";
import { IoCloseSharp } from "react-icons/io5";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "./firebase.js";
import {
  updateDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";

const ModalComponent = ({ isOpen, onClose, task }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const [deadLine, setDeadLine] = useState("");
  const [points, setPoints] = useState(0);
  const [status, setStatus] = useState("OPEN");
  const [title, setTitle] = useState("");
  const token = useStore((state) => state.token);

  useEffect(() => {
    if (task) {
      console.log(task);
      setTitle(task.title);
      setInputValue(task.description);
      if (task && task.deadline) {
        setDeadLine(task.deadline.split("T")[0]);
        console.log(task.deadline.split("T")[0]);
      }
      setPoints(task.points);
      setStatus(task.status);
      setPreviewUrl(task.link);
      setIsVideo(task.link?.includes(".mp4"));
    }
    console.log(task);
  }, [task]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let promise;

      if (selectedFile) {
        // Upload the file first
        const storageRef = ref(storage, `/assets/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        // Show a loading toast while uploading
        const promise = new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Track upload progress
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            () => {
              // Upload complete, get the download URL
              getDownloadURL(uploadTask.snapshot.ref)
                .then(async (url) => {
                  console.log("File available at", url);

                  // Make the API call after file upload (if any)
                  let result;
                  if (task) {
                    // Call the update API
                    result = await axios.put(
                      "https://pixeon-server.onrender.com/api/Task/updateTask",
                      {
                        taskId: task.taskId,
                        token: token,
                        taskData: {
                          title: title,
                          description: inputValue,
                          deadline: new Date(deadLine).toISOString(),
                          points: points,
                          status: status.toUpperCase(),
                          link: url, // Include the download URL if available
                        },
                      },
                      { withCredentials: true, credentials: "include" }
                    );
                    console.log("This is for testing...", url);
                  } else {
                    // Call the create API
                    result = await axios.post(
                      "https://pixeon-server.onrender.com/api/Task/createTask",
                      {
                        token: token,
                        taskData: {
                          title: title,
                          description: inputValue,
                          deadLine: deadLine,
                          points: points,
                          status: status.toUpperCase(),
                          link: url, // Include the download URL if available
                        },
                      },
                      { withCredentials: true, credentials: "include" }
                    );
                  }
                  console.log("This is for testing...", url);
                  resolve(result);
                })
                .catch((error) => {
                  console.error("Error getting download URL:", error);
                  reject(error);
                });
            }
          );
        });

        // Use toast.promise to handle loading, success, and error states
        await toast.promise(promise, {
          loading: "Uploading...",
          success: task
            ? "Task updated successfully!"
            : "Task created successfully!",
          error: "Error uploading file",
        });
      } else {
        const promise = new Promise(async (resolve, reject) => {
          let result;
          if (task) {
            // Call the update API
            result = await axios.post(
              "https://pixeon-server.onrender.com/api/Task/updateTask",
              {
                token: token,
                taskId: task.taskId,
                taskData: {
                  title: title,
                  description: inputValue,
                  deadline: new Date(deadLine).toISOString(),
                  points: points,
                  status: status.toUpperCase(),
                  link: "", // Include the download URL if available
                },
              },
              { withCredentials: true, credentials: "include" }
            );
          } else {
            // Call the create API
            result = await axios.post(
              "https://pixeon-server.onrender.com/api/Task/createTask",
              {
                token: token,
                taskData: {
                  title: title,
                  description: inputValue,
                  deadLine: deadLine,
                  points: points,
                  status: status.toUpperCase(),
                  link: "", // Include the download URL if available
                },
              },
              { withCredentials: true, credentials: "include" }
            );
          }
      
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Error uploading file"));
          }
        });
      
        // Use toast.promise to handle loading, success, and error states
        await toast.promise(promise, {
          loading: "Uploading...",
          success: task ? "Task updated successfully!" : "Task created successfully!",
          error: "Error uploading file",
        });
      }

      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast.error("Error uploading file");
    }
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
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      borderRadius: "0.6rem",
      width: "80%",
      height: "70%",
      overflowY: "auto",
      overflowX: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  const darkCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#14111d",
      borderRadius: "0.6rem",
      width: "80%",
      height: "75%",
      overflowY: "auto",
      overflowX: "hidden",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffff",
      border: "0.3px solid grey",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      style={
        cookies?.selectedTheme?.includes("dark")
          ? darkCustomStyles
          : customStyles
      }
    >
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      <h2 className="modal-title">{task ? "Edit Task" : "Create Task"}</h2>
      <input
        className="title__inputbar"
        placeholder="Title.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Wysiwyg
        className="wysiwyg-editor"
        placeholder="Write your post here..."
        value={inputValue}
        onChange={handleInputChange}
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          color: cookies?.selectedTheme?.includes("dark") ? "#ffff" : "#000",
        }}
        theme={darkTheme}
      />
      <div className="file-upload-wrapper">
        <label htmlFor="file-upload" className="custom_upload_button">
          Select File
        </label>
        <input
          id="file-upload"
          type="file"
          className="custom_upload"
          accept="image/*, video/mp4, video/webm"
          onChange={handleFileChange}
        />
        Deadline :
        <input
          type="date"
          className="date_input"
          onChange={(e) => {
            setDeadLine(e.target.value);
            console.log(e.target.value);
          }}
          value={deadLine}
        />
        Points:
        <input
          type="number"
          placeholder="Points"
          className="time_input"
          onChange={(e) => {
            setPoints(e.target.value);
          }}
          value={points}
        />
        <label htmlFor="status-select">Status:</label>
        <select
          id="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="OPEN">Open</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button className="submit" onClick={handleSubmit} disabled={loading}>
          Submit
        </button>
      </div>
      {previewUrl && (
        <div className="preview">
          {isVideo && (
            <video width="320" height="180" autoPlay loop>
              <source type="video/mp4" src={previewUrl} />
            </video>
          )}
          {!isVideo && (
            <img
              src={previewUrl}
              alt=""
              style={{ width: "320px", height: "180px", objectFit: "cover" }}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ModalComponent;
