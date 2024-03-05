import React from "react";
import "./OtpVerification.css";
import Pixeon from "./assets/pixeon.png";
import Verification from "./assets/verification.png";

const OtpVerification = () => {
  return (
    <div className="otp__container">
      <div className="otp__container__logo__container">
        <img src={Pixeon} className="otp__container__logo__img" />
      </div>
      <div className="otp__container__contents__wrapper">
        <div className="otp__container__contents__wrapper__container">
          <h1 className="otp__header" style={{ animationDelay: "100ms" }}>
            📨 Enter OTP
          </h1>
          <p>Please enter the OTP sent to your email below.</p>
          <div className="otp__form">
            <input
              type="text"
              style={{ animationDelay: "230ms" }}
              className="input-fade-in"
            />
            <input
              type="text"
              style={{ animationDelay: "330ms" }}
              className="input-fade-in"
            />
            <input
              type="text"
              style={{ animationDelay: "430ms" }}
              className="input-fade-in"
            />
            <input
              type="text"
              style={{ animationDelay: "530ms" }}
              className="input-fade-in"
            />
          </div>
          <div className="input-fade-in_button_otp" style={{ animationDelay: "630ms" }}>
            <button
              className="input-fade-in_button_otp__btn"
              
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
