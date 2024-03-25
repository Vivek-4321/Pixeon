import React from "react";
import "./Login.css";
import Google from "./assets/google__logo.png";

function Login() {
  return (
    <div className="login__container">
      <div className="navbar_pixeon">
        <h1>Pixeon</h1>
      </div>
      <div className="container_1">
        <h1 className="container__header">Sign in to Pixeon</h1>

        <button className="google_box"> <img src={Google}/> continue with google</button>

        <span className="or">or</span>
        <input className="Email" type="Email" placeholder="Email"></input>
        <input
          className="password"
          type="password"
          placeholder="Password"
        ></input>
        <button className="submit_button" type="text">
          Login
        </button>
        <span className="reset_password">Reset Password</span>
        <div className="container_2">
          <span className="not_account">No account ?</span>
          <span className="create_account">
            Create one
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
