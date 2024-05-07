import React, { useState, useRef, useEffect } from "react";
import "./Profile.css";
import SideBar from "./SideBar";
import RecommendationSideBar from "./RecommendationSideBar";
import { GoPencil } from "react-icons/go";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import RecommendationSkeletonLoader from "./RecommendationSkeletonLoader";
import SidebarSkeletonLoader from "./SidebarSkeletonLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [file, setFile] = useState("");
  const token = useStore((state) => state.token);
  const storage = getStorage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // Make the API call to fetch the user? profile
        const response = await axios.get(
          "https://pixeon-server.onrender.com/api/User/mydetails",
          {token: token},
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        console.log(response.data);
        setUser(response.data);

        setLoading(false);
      } catch (err) {
        setError(err?.response?.data?.error);
        setLoading(false);
      }
    };

    console.log(cookie.user?.userId);
    fetchProfile();
  }, []);

  const handleInputChange = (e, inputName) => {
    if (inputName === "skills") {
      setUser({
        ...user,
        skills: e.target.value.split(",").map((skill) => skill.trim()),
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  const handleSubmit = () => {
    // Save user? data
    setEditMode(false);
  };

  const handleSubmitFunction = async () => {
    try {
      if (file) {
        // check if file exists
        const storageRef = ref(storage, `/assets/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const fileUploadPromise = new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Track upload progress
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // Update the toast message with the upload progress
              console.log(progress);
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
          success: "Profile Updated!",
          error: "Error uploading file",
        });

        fileUploadPromise
          .then(async (downloadURL) => {
            // Make API call after file upload is complete
            console.log(downloadURL);
            const token = cookie.token;
            const result = await axios.put(
              "https://pixeon-server.onrender.com/api/User/update",
              {token: token,
                newUserData: {
                  profilePicLink: downloadURL,
                  userName: user?.userName,
                  email: user?.email,
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                  role: user?.role,
                  headLine: user?.headLine,
                  summary: user?.summary,
                  skills: user?.skills,
                  contactInfo: user?.contactInfo,
                  DOB: user?.DOB,
                  updatedAt: new Date(),
                }, // add updatedAt field
              },
              {
                withCredentials: true,
                credentials: "include",
              }
            );
            const maxAge = 10 * 24 * 60 * 60;
            setCookie("user?", response.data, {
              path: "/",
              maxAge,
              sameSite: "none",
              secure: true,
            });

            setLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
          });
      } else {
        // Make API call without uploading file
        const token = cookie.token;
        const resultPromise = new Promise((resolve, reject) => {
          axios
            .put(
              "https://pixeon-server.onrender.com/api/User/update",
              {token:token,
                newUserData: {
                  userName: user?.userName,
                  email: user?.email,
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                  role: user?.role.toUpperCase(),
                  headLine: user?.headLine,
                  summary: user?.summary,
                  skills: user?.skills,
                  contactInfo: user?.contactInfo,
                  DOB: user?.DOB,
                  updatedAt: new Date(),
                }, // add updatedAt field
              },

              {
                withCredentials: true,
                credentials: "include",
              }
            )
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
        });

        const toastId = toast.promise(resultPromise, {
          loading: "Updating...",
          success: "Profile updated successfully!",
          error: "Error updating profile",
        });

        resultPromise
          .then(() => {
            setLoading(false);
            setEditMode(false);
          })
          .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="profile__container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      <div className="sidebar__wrapper">
        {loading ? <SidebarSkeletonLoader /> : <SideBar />}
      </div>
      {loading ? (
        <SkeletonTheme
          baseColor={cookie?.selectedTheme?.includes("dark") ? "#000d0d" : ""}
          highlightColor={
            cookie?.selectedTheme?.includes("dark") ? "#14111d" : ""
          }
          borderRadius={8}
        >
          <Skeleton
            count={1}
            height={1500}
            width={900}
            style={{ marginLeft: "19rem", marginTop: "1rem" }}
          />
        </SkeletonTheme>
      ) : (
        <div className="profile__wrapper">
          <div className="profile__data">
            {editMode ? (
              <div className="profile__data__image__edit">
                {!loading && <img src={user?.profilePicLink} alt="Profile" />}
                <span
                  className="pencil__icon"
                  onClick={() => fileInputRef.current.click()}
                >
                  <GoPencil />
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div>{user?.userName}</div>
              </div>
            ) : (
              <div className="profile__data__image">
                {!loading && <img src={user?.profilePicLink} alt="Profile" />}
                <span>{user?.userName}</span>
              </div>
            )}

            <div className="profile__data__wrapper">
              <span className="profile__data__paragraph">
                <p className="profile__data__title">User Name:</p>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={user?.userName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile__data__description">{user?.userName}</p>
                )}
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Email: </p>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={user?.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile__data__description"> {user?.email}</p>
                )}
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">First Name: </p>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={user?.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile__data__description">
                    {user?.firstName}
                  </p>
                )}
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Last Name: </p>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={user?.lastName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile__data__description">{user?.lastName}</p>
                )}
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Role: </p>{" "}
                {editMode ? (
                  <select
                    name="role"
                    value={user?.role}
                    onChange={handleInputChange}
                  >
                    <option>None</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                ) : (
                  <p className="profile__data__description">{user?.role}</p>
                )}
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Created At: </p>{" "}
                <p className="profile__data__description">
                  {" "}
                  {new Date(user?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Updated At: </p>{" "}
                <p className="profile__data__description">
                  {new Date(user?.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Points: </p>{" "}
                <p className="profile__data__description">{user?.points}</p>
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Headline: </p>{" "}
                {editMode ? (
                  <textarea
                    type="text"
                    name="headLine"
                    placeholder="Headline"
                    value={user?.headLine}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile__data__description__width">
                    {user?.headLine}
                  </p>
                )}
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Summary: </p>{" "}
                {editMode ? (
                  <textarea
                    type="text"
                    name="summary"
                    placeholder="Summary"
                    value={user?.summary}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile__data__description__width">
                    {user?.summary}
                  </p>
                )}
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Skills: </p>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="skills"
                    placeholder="Skills"
                    value={user?.skills?.join(", ")}
                    onChange={(e) => handleInputChange(e, "skills")}
                  />
                ) : (
                  <p className="profile__data__description">
                    {user?.skills?.join(", ")}
                  </p>
                )}
              </span>

              <span className="profile__data__paragraph">
                <p className="profile__data__title">Contact Info: </p>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="contactInfo"
                    placeholder="Contact Info"
                    value={user?.contactInfo}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile__data__description">
                    {user?.contactInfo}
                  </p>
                )}
              </span>
              <span className="profile__data__paragraph">
                <p className="profile__data__title">Date of Birth:</p>{" "}
                {editMode ? (
                  <input
                    type="date"
                    name="DOB"
                    value={user?.DOB}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile__data__description">{user?.DOB}</p>
                )}
              </span>
              {editMode ? (
                <button className="edit__button" onClick={handleSubmitFunction}>
                  Update
                </button>
              ) : (
                <button
                  className="edit__button"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="recommendation__wrapper">
        {loading ? <RecommendationSkeletonLoader /> : <RecommendationSideBar />}
      </div>
    </div>
  );
}

export default Profile;
