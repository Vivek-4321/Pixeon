import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { useCookies } from "react-cookie";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";
import { useNavigate, NavLink } from "react-router-dom";
import useStore from "./store";
import Coin from "./assets/Vivecoin1.png";
import { formatDistanceToNow } from "date-fns";
import _ from "lodash";
import axios from "axios";
import ModalSettings from "./ModalSettings";
import PointsModal from "./PointsModal";

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "theme",
    "selectedTheme",
  ]);
  const [darkTheme, setDarkTheme] = useState(cookies.theme === "dark");
  const navigate = useNavigate();
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationBar, setShowNotificationBar] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState(
    cookies.selectedTheme || "blue-dark"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const notifications = useStore((state) => state.notifications);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);

  const handleOpenPointsModal = () => {
    setIsPointsModalOpen(true);
  };

  const handleClosePointsModal = () => {
    setIsPointsModalOpen(false);
  };

  const handleOpenCookieModal = () => {
    setIsCookieModalOpen(true);
  };

  const handleCloseCookieModal = () => {
    setIsCookieModalOpen(false);
  };

  const handleEnableCookies = () => {
    // setCookie("cookieConsent", true, { path: "/" });
    // handleCloseCookieModal();
    toast.success("Cookies enabled");
  };

  const debouncedSearch = _.debounce(async (searchTerm) => {
    if (searchTerm.trim().length > 0) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/User/searchUsersData`,
          {
            params: {
              searchTerm: searchTerm,
            },
            withCredentials: true,
            credentials: "include",
          }
        );
        console.log(response.data);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  }, 500);

  const toggleTheme = () => {
    const newTheme = selectedTheme;
    const maxAgeInDays = 7;
    const maxAgeInSeconds = maxAgeInDays * 24 * 60 * 60;

    setCookie("theme", newTheme, {
      path: "/",
      maxAge: maxAgeInSeconds,
    });

    setDarkTheme(newTheme.endsWith("-dark"));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://pixeon-server.onrender.com/api/User/mydetails",
          { withCredentials: true, credentials: "include" }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  useEffect(() => {
    // Apply the theme on component mount
    const themeClass = selectedTheme.endsWith("-dark")
      ? selectedTheme
      : `${selectedTheme}-light`;
    document.documentElement.setAttribute("data-theme", themeClass);

    // Update the selectedTheme cookie
    setCookie("selectedTheme", selectedTheme, { path: "/", httpOnly: false, sameSite: 'Lax' });
    console.log("Theme:", cookies.theme);
    console.log(
      "Is Dark Theme:",
      cookies.theme && cookies.theme.includes("dark")
    );
  }, [selectedTheme]);

  return (
    <div className="navbar__container">
      <div onClick={() => navigate("/")} className="navbar__logo">
        <span>Pixeon</span>
      </div>
      <div className="navbar__searchbar">
        <input
          className="navbar__searchbar__input"
          placeholder="Search.."
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
        <span className="navbar__searchbar__icon">
          <IoSearch />
        </span>
        <div
          className="suggestion__container"
          style={{ display: searchTerm.trim().length > 0 ? "block" : "none" }}
        >
          {searchResults.map((result) => (
            <div
              className="search-results"
              onClick={() => {
                navigate(`/userProfile/${result.userId}`);
                setSearchTerm("");
              }}
            >
              <img
                src={
                  result.profilePicLink
                    ? result.profilePicLink
                    : "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"
                }
                alt={result.userId}
              />
              <span>
                <p className="search-username">{result.userName}</p>
                <p>{result.email}</p>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="navbar__contents">
        <div className="theme-dropdown"></div>
        <div className="navbar__contents__icon__group">
          {user?.verified && (
            <span className="navbar__points" onClick={handleOpenPointsModal}>
              <p>{user?.points || 0}</p>
              <img src={Coin} />
            </span>
          )}

          <span
            className="theme__toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {cookies.theme && cookies.theme !== "" ? (
              cookies?.selectedTheme?.includes("dark") ? (
                <LuMoon />
              ) : (
                <MdOutlineWbSunny />
              )
            ) : (
              <MdOutlineWbSunny />
            )}
            {showDropdown && (
              <div className="dropdown-menu">
                <div
                  className={`dropdown-item-blue-dark ${
                    selectedTheme === "blue-dark" ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedTheme("blue-dark");
                    setShowDropdown(false);
                  }}
                >
                  Blue Dark
                </div>
                <div
                  className={`dropdown-item-green-dark ${
                    selectedTheme === "green-dark" ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedTheme("green-dark");
                    setShowDropdown(false);
                  }}
                >
                  Green Dark
                </div>
                <div
                  className={`dropdown-item-red-dark ${
                    selectedTheme === "red-dark" ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedTheme("red-dark");
                    setShowDropdown(false);
                  }}
                >
                  Red Dark
                </div>
                <div
                  className={`dropdown-item ${
                    selectedTheme === "blue-light" ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedTheme("blue-light");
                    setShowDropdown(false);
                    console.log(selectedTheme);
                  }}
                >
                  Blue Light
                </div>
              </div>
            )}
          </span>
          <span
            className="navbar__contents__icon"
            onClick={handleOpenCookieModal}
          >
            <MdOutlineSettings />
          </span>
          <span className="navbar__contents__icon">
            <MdNotificationsNone
              onClick={() => setShowNotificationBar(!showNotificationBar)} // Toggle notification bar visibility on icon click
            />
            {showNotificationBar && (
              <div className="navbar__notification__bar">
                {notifications.length > 0
                  ? notifications.map((notification) => (
                      <div className="notification__card">
                        <div className="notification__card__header">
                          <p className="notification__title">
                            {notification.title}
                          </p>
                          <p className="notification__timeStamp">
                            {" "}
                            {formatDistanceToNow(
                              new Date(
                                notification.createdAt
                                  ? notification.createdAt
                                  : notification.createdAt
                              ),
                              {
                                addSuffix: true,
                              }
                            )}
                          </p>
                        </div>
                        <div className="notification__card__body">
                          <p className="notification__body">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            )}
          </span>
        </div>
        {!user ? (
          <div className="navbar__contents__btn__group">
            <button className="navbar__login__btn">Log in</button>
            <button className="navbar__signup__btn">Sign up</button>
          </div>
        ) : (
          <div
            onClick={() => navigate(`/userProfile/${user?.userId}`)}
            className="profile__pic"
          >
            <img
              src={
                user.profilePicLink ||
                "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"
              }
            />
          </div>
        )}
      </div>
      <ModalSettings
        isModalOpen={isCookieModalOpen}
        handleCloseModal={handleCloseCookieModal}
        handleEnableCookies={handleEnableCookies}
      />

      <PointsModal
        isModalOpen={isPointsModalOpen}
        handleCloseModal={handleClosePointsModal}
        points={user.points} // replace user.points with the actual user points
      />
    </div>
  );
}

export default Navbar;
