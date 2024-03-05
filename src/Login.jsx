import React from "react";
import "./Login.css";
import Google from "./assets/google__logo.png";
import Pixeon from "./assets/pixeon.png";

function Login() {
  const inputDelays = [0, 500, 1000];

  return (
    <>
      <div className="login__container">
        <div className="login__container__logo__container">
          <img src={Pixeon} className="login__container__logo__img" />
        </div>
        <div className="login__container__contents__wrapper">
          <div className="login__container__contents__wrapper__container">
            <h1 className="login__header" style={{ animationDelay: "100ms" }}>
              Sign in
            </h1>
            <div className="login__form">
              <input
                type="text"
                placeholder="Username"
                style={{ animationDelay: "200ms" }}
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
                Login
              </button>

              <div style={{ animationDelay: "500ms" }} className="google__btn__container">
                <button
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
                Don't have an account?<p>Create One</p>
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

export default Login;
