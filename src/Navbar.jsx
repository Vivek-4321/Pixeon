import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { useCookies } from "react-cookie";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["theme"]);
  const [darkTheme, setDarkTheme] = useState(cookies.theme === 'dark');

  const toggleTheme = () => {
    const newTheme = darkTheme ? 'light' : 'dark';
    setCookie('theme', newTheme, { path: '/' });
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    // Apply the theme on component mount
    document.documentElement.setAttribute('data-theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);
  return (
    <div className="navbar__container">
      <div className="navbar__logo">
        <span>Pixeon</span>
      </div>
      <div className="navbar__searchbar">
        <input className="navbar__searchbar__input" placeholder="Search.." />
        <span className="navbar__searchbar__icon">
          <IoSearch />
        </span>
        
      </div>
      <div className="navbar__contents">
        <div className="navbar__contents__icon__group">
        <span className="theme__toggle" onClick={toggleTheme}>
          { cookies.theme === "dark" ? <MdOutlineWbSunny /> : <LuMoon /> }
        </span>
          <span className="navbar__contents__icon">
            <MdOutlineSettings />
          </span>
          <span className="navbar__contents__icon">
            <MdNotificationsNone />
          </span>
        </div>
        <div className="navbar__contents__btn__group">
          <button className="navbar__login__btn">Log in</button>
          <button className="navbar__signup__btn">Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
