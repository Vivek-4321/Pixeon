import React from "react";
import "./Signup.css";
import Google from "./assets/google__logo.png";
import Pixeon from "./assets/pixeon.png";

function Signup() {
  return (
    <>
      <div className="signup__container">
        <div className="signup__container__logo__container">
          <img src={Pixeon} className="signup__container__logo__img" />
        </div>
        <div className="signup__container__contents__wrapper">
          <div className="signup__container__contents__wrapper__container">
            <h1 className="signup__header" style={{ animationDelay: "100ms" }}>
              Sign up
            </h1>
            <div className="signup__form">
              <input
                type="text"
                placeholder="Username"
                style={{ animationDelay: "200ms" }}
                className="input-fade-in"
              />
              <input
                type="email"
                placeholder="Email"
                style={{ animationDelay: "250ms" }}
                className="input-fade-in"
              />
              <input
                type="password"
                placeholder="Password"
                style={{ animationDelay: "300ms" }}
                className="input-fade-in"
              />
              <button
                style={{ animationDelay: "400ms" }}
                className="input-fade-in_button"
              >
                Signup
              </button>
              <div
                style={{ animationDelay: "500ms" }}
                className="google__btn__container"
              >
                <button
                  style={{ animationDelay: "500ms" }}
                  className="google__btn__content"
                >
                  <img className="google__logo__image" src={Google} />
                  Continue with Google
                </button>
              </div>

              <span
                style={{ animationDelay: "600ms" }}
                className="page__redirection__link"
              >
                Already have an account?<p>Login</p>
              </span>
              <span
                style={{ animationDelay: "700ms" }}
                className="page__redirection__link"
              >
                <p>Reset password</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
