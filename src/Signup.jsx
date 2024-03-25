import React from "react";
import "./Signup.css";
import Google from './assets/google__logo.png'

function Signup() {
  return (
    <div className="signup__container">
      <div className="navbar_pixeon">
        <h1>Pixeon</h1>
      </div>
      <div className="container_3">
        <span className="container__header__signup">Sign up to Pixeon</span>

        <button className="google_box"> <img src={Google}/> continue with google</button>

        <h1 className="or">or</h1>
        <input className="Email" type="Email" placeholder="Email"></input>
        <input
          className="password"
          type="password"
          placeholder="Password"
        ></input>
        <input
          className="retype_password"
          type="password"
          placeholder="Retype Password"
        ></input>
        <button className="submit_button" type="text">
          Create Account{" "}
        </button>

        <div className="container_2">
          <span className="not_account">Have an account ?</span>
          <span className="log_in">
            Login in
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
