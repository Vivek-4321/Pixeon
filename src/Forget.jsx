import React, { useState, useEffect } from "react";
import "./Forget.css";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

function Forget() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [cookie, setCookie, getCookie] = useCookies(["user"]);
  const [cookies] = useCookies(["selectedTheme"]);
  const selectedTheme = cookies.selectedTheme || "blue-dark";

  useEffect(() => {
    const themeClass = selectedTheme.endsWith("-dark")
      ? selectedTheme
      : `${selectedTheme}-light`;
    document.documentElement.setAttribute("data-theme", themeClass);
  }, [selectedTheme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      toast.error("Emails do not match");
      return;
    }
  
    const promise = axios.post(
      "http://localhost:3000/api/User/forgotPassword",
      {
        data: { email: email },
        withCredentials: true,
        credentials: "include",
      }
    );
  
    toast.promise(promise, {
      loading: "Sending link...",
      success: "Reset link sent to your email",
      error: "Failed to send reset link",
    });
  };

  return (
    <div className="forget__container">
       <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "toast__popup",
        }}
      />
      <div className="navbar_pixeon">
        <h1>Pixeon</h1>
      </div>
      <div className="container_forgot">
        <span className="container__header__signup">Forgot Password ?</span>
        <div className="container_forgot_1">
          <form onSubmit={handleSubmit} className="form">
            <input
              className="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="Email"
              type="email"
              placeholder="Retype Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <button className="submit_button" type="submit">
              Send Reset Link
            </button>
          </form>
        </div>
        <div className="container_2">
          <span className="not_account">Go back to</span>
          <span className="login_page_link">login page</span>
        </div>
      </div>
    </div>
  );
}

export default Forget;
