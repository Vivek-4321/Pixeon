import React from "react";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";

function Navbar() {
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
