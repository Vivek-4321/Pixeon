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

const ModalComponent = ({ isOpen, onClose, post, posts, setPosts }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (post) {
      setInputValue(post.content);
      setPreviewUrl(post.link);
      setTitle(post.title);
    }
  }, [post]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let downloadURL = "";

      if (selectedFile) {
        // Upload image
        const storageRef = ref(storage, `/assets/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Track upload progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressValue(progress);

            console.log(progress);
          },
          (error) => {
            console.error(error);
            setLoading(false);
          },
          () => {
            // Upload complete, get the download URL
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL_) => {
                console.log("File available at", downloadURL_);
                downloadURL = downloadURL_;

                // Continue with the post creation or update
                await handlePostCreationOrUpdate(downloadURL);
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                setLoading(false);
              });
          }
        );
      } else {
        // No file selected, continue with the post creation or update
        await handlePostCreationOrUpdate(downloadURL);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading file");
    }
  };

  const handlePostCreationOrUpdate = async (downloadURL) => {
    let result;

    if (post) {
      // Update post
      result = await axios.put(
        "http://localhost:3000/api/Post/updatePost",
        {
          postId: post.postId,
          newPostData: {
            content: inputValue,
            link: downloadURL,
            title: title,
          },
        },
        { withCredentials: true, credentials: "include" }
      );
      console.log(result.data);
    } else {
      // Create post
      result = await axios.post(
        "http://localhost:3000/api/Post/createPost",
        {
          content: inputValue,
          title: title,
          link: downloadURL,
        },
        { withCredentials: true, credentials: "include" }
      );

      console.log(result.data);

      const token = cookies.token;

      if (downloadURL.includes("mp4")) {
        const videoTranscoderResult = await axios.post(
          "http://localhost:8000/transcode",
          {
            url: downloadURL,
            videoName: selectedFile?.name || "",
            postId: result.data.postId,
            authenticationBearer: `Bear ${token}`,
          }
        );

        console.log(videoTranscoderResult.data);
      }
    }

    console.log(result);
    setLoading(false);
    onClose();
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
      {/* <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      /> */}
      <h2 className="modal-title">{post ? "Edit Post" : "Create Post"}</h2>
      <input
        className="title__inputbar"
        placeholder="Title..."
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
      {/* <button className="close-modal-button" onClick={onClose}>
        <IoCloseSharp/>
      </button> */}
    </Modal>
  );
};

export default ModalComponent;
