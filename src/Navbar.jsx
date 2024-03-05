import React from "react";
import "./Navbar.css";
import Pixeon from "./assets/pixeon.png";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  return (
    <>
      <div className="navbar__container">
        <div className="navbar__container__logo__container">
          <img src={Pixeon} className="navbar__container__logo__img" />
        </div>
        <div className="navbar__container__searchbar__container">
          <input
            type="text"
            placeholder="Search"
            className="navbar__container__searchbar__input"
          />
          <IoSearchOutline className="navbar__container__searchbar__icon" />
        </div>
        <div className="navbar__container__profile">
          <button className="navbar__container__profile__login">login</button>
          <div className="navbar__container__profile__signup">
            <button>Sign Up</button>
          </div>
        </div>
      </div>
      <div className="navbar__container__mb">
        <div className="navbar__container__mb__top__wrapper">
          <img src={Pixeon} className="navbar__container__mb__top__img"/>
        </div>
        <div className="navbar__container__mb__top__left">
          <CgProfile/>
        </div>
      </div>
    </>
  );
}

export default Navbar;
