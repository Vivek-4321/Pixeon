import React from "react";
import "./Forget.css";

function Forget() {
  return (
    <div className="forget__container">
      <div className="navbar_pixeon">
        <h1>Pixeon</h1>
      </div>
      <div className="container_forgot">
        <span className="container__header__signup">Forgot Password ?</span>
        <div className="container_forgot_1">
          <input
            className="Email"
            type="Email"
            placeholder="Email"
          ></input>

          <input
            className="Email"
            type="Email"
            placeholder="Retype Email"
          ></input>
          <button className="submit_button">Send Reset Link</button>
        </div>
        <div className="container_2">
          <span className="not_account">Go back to</span>
          <span className="login_page_link">login page
          </span>
        </div>
      </div>
    </div>
  );
}

export default Forget;
