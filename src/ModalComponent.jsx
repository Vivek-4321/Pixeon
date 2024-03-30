import React, { useState } from "react";
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

const ModalComponent = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const storage = getStorage();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const storageRef = ref(storage, `/assets/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
      const fileUploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Track upload progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // Update the toast message with the upload progress
            toast.update(toastId, {
              loading: `Uploading... ${progress.toFixed(2)}%`,
            });
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            // Upload complete, get the download URL
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                console.log("File available at", downloadURL);
                setDownloadUrl(downloadURL);
                resolve(downloadURL);
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                reject(error);
              });
          }
        );
      });
  
      const toastId = toast.promise(fileUploadPromise, {
        loading: "Uploading...",
        success: "File uploaded successfully!",
        error: "Error uploading file",
      });
  
      fileUploadPromise
        .then(async (downloadURL) => {
          // Make API call after file upload is complete
          console.log(downloadURL);
          const token = cookies.token;
          const result = await axios.post(
            "http://localhost:3000/posts",
            {
              content: inputValue,
              link: downloadURL,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          setLoading(false);
          onClose();
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error:", error);
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="modal-title">Create Post</h2>
      <Wysiwyg
        className="wysiwyg-editor"
        placeholder="Write your post here..."
        value={inputValue}
        onChange={handleInputChange}
        style={{ maxHeight: "200px", overflowY: "auto" }}
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
          onChange={handleFileChange}
        />
        <button
          className="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
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
