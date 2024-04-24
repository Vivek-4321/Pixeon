import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { useCookies } from "react-cookie";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "theme",
    "selectedTheme",
  ]);
  const [darkTheme, setDarkTheme] = useState(cookies.theme === "dark");
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(
    cookies.selectedTheme || "blue-dark"
  );

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
    // Apply the theme on component mount
    const themeClass = selectedTheme.endsWith("-dark")
      ? selectedTheme
      : `${selectedTheme}-light`;
    document.documentElement.setAttribute("data-theme", themeClass);

    // Update the selectedTheme cookie
    setCookie("selectedTheme", selectedTheme, { path: "/" });
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
        <input className="navbar__searchbar__input" placeholder="Search.." />
        <span className="navbar__searchbar__icon">
          <IoSearch />
        </span>
      </div>
      <div className="navbar__contents">
        <div className="theme-dropdown">
          {/* <div
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {cookies.theme === "dark" ? <MdOutlineWbSunny /> : <LuMoon />}
          </div> */}
        </div>
        <div className="navbar__contents__icon__group">
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
          <span className="navbar__contents__icon">
            <MdOutlineSettings />
          </span>
          <span className="navbar__contents__icon">
            <MdNotificationsNone />
          </span>
        </div>
        {!cookies.user ? (
          <div className="navbar__contents__btn__group">
            <button className="navbar__login__btn">Log in</button>
            <button className="navbar__signup__btn">Sign up</button>
          </div>
        ) : (
          <div onClick={() => navigate("/profile")} className="profile__pic">
            <img src={cookies.user.profilePicLink || "https://imgs.search.brave.com/K0dB0P72H9JRxFsZG-pTF8xlPmqPzd_fa94PwnTWJN8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
