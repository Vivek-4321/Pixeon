import React, { useState, useEffect, useRef } from "react";
import "./ImageVerification.css";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function ImageVerification() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["selectedTheme"]);
  const selectedTheme = cookies.selectedTheme || "blue-dark";
  const [firstName, setFirstName] = useState("");
  const storage = getStorage();
  const [lastName, setLastName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const themeClass = selectedTheme.endsWith("-dark")
      ? selectedTheme
      : `${selectedTheme}-light`;
    document.documentElement.setAttribute("data-theme", themeClass);
  }, [selectedTheme]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     firstName === "" ||
  //     lastName === "" ||
  //     branch === "" ||
  //     year === "" ||
  //     contactInfo === "" ||
  //     imageFile === null
  //   ) {
  //     toast.error("Please fill all the fields");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const details = {
  //       firstName,
  //       lastName,
  //       branch,
  //       year,
  //       contactInfo,
  //     };

  //     const fileUploadPromise = new Promise(async (resolve, reject) => {
  //       let downloadURL = "";

  //       // ... (rest of the code remains the same)
  //     });

  //     const toastId = toast.promise(fileUploadPromise, {
  //       loading: `Uploading...`,
  //       success: "File uploaded successfully",
  //       error: "Error uploading file",
  //     });

  //     const downloadURL = await fileUploadPromise;

  //     const response = await axios.post(
  //       "http://localhost:3000/api/User/imageVerification",
  //       { details },
  //       {
  //         withCredentials: true,
  //         credentials: "include",
  //       }
  //     );

  //     console.log("Response:", response.data);
  //     toast.success("Verification successful");
  //     navigate("/dashboard"); // Replace "/dashboard" with the desired route
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Verification failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      branch === "" ||
      year === "" ||
      contactInfo === "" ||
      imageFile === null
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const details = {
        firstName,
        lastName,
        branch,
        year,
        contactInfo,
      };
  
      if (!imageFile) {
        toast.error("Please select an image");
        setLoading(false);
        return;
      }
  
      const fileUploadPromise = new Promise(async (resolve, reject) => {
        let downloadURL = "";
  
        if (imageFile) {
          // Upload image
          const storageRef = ref(storage, `/assets/${imageFile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Track upload progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
              console.log(progress);
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            () => {
              // Upload complete, get the download URL
              getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL_) => {
                  console.log("File available at", downloadURL_);
                  downloadURL = downloadURL_;
                  
                  const response = await axios.post(
                          "http://localhost:3000/api/User/imageVerification",
                          { details, idCardLink:downloadURL },
                          {
                            withCredentials: true,
                            credentials: "include",
                          }
                        );
                  
                        console.log("Response:", response.data);
                        toast.success("Verification successful");

                  console.log(downloadURL);
                  setLoading(false);
                  resolve(downloadURL_);
                })
                .catch((error) => {
                  setLoading(false);
                  console.error("Verification Rejected:", error);
                  reject(error);
                });
            }
          );
        }
      });
  
      const toastId = toast.promise(fileUploadPromise, {
        loading: `Uploading...`,
        success: "File uploaded successfully",
        error: "Error uploading file",
      });
  
      const downloadURL = await fileUploadPromise;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading file");
    } finally {
      navigate('/');
    }
  };
  

  return (
    <div className="login__container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      <div className="navbar_pixeon">
        <h1>Pixeon</h1>
      </div>
      <div className="image__verification__container">
        <h1 className="image__verification__header">Verfication</h1>
        <input
          className="Email"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="Email"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="Email"
          type="text"
          placeholder="Branch (CS , ECE, ME, EEE)"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />

        <input
          className="Email"
          type="text"
          placeholder="Phone Number"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />

        <input
          className="Email"
          type="text"
          placeholder="year of graduation"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label htmlFor="image-upload" className="custom-file-upload">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          Choose File
        </label>

        <button
          className="submit_button"
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
          style={{
            backgroundColor: loading ? "#CCCCCC" : "",
            border: loading ? "1px solid #CCCCCC" : "",
          }}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}

export default ImageVerification;
