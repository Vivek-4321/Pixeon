import React, { useState, useEffect } from "react";
import "./Forget.css";
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import axios from "axios";
import useStore from './store.js'

function ResetPassword() {
    const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookie, setCookie, getCookie] = useCookies(["user"]);
  const [cookies] = useCookies(["selectedTheme"]);
  const selectedTheme = cookies.selectedTheme || "blue-dark";
  const token = useStore((state) => state.token);

  const handleSubmit = async (event) => {
    console.log("reached here")

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try{

        const response = await axios.post(
          "https://pixeon-server.onrender.com/api/User/resetPassVerify",
          
          { data:{ resetId: id, newPassword: password, token: token }, withCredentials: true, credentials: "include" }
        );

      console.log(response.data);

      if (response.status === 200) {
        toast.success("Password reset successful");
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Password reset failed");
    }
  };

  useEffect(() => {
    const themeClass = selectedTheme.endsWith("-dark")
      ? selectedTheme
      : `${selectedTheme}-light`;
    document.documentElement.setAttribute("data-theme", themeClass);
  }, [selectedTheme]);

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
        <span className="container__header__signup">Change Password</span>
        <div className="container_forgot_1">
          <input className="Email" type="Email" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>

          <input
            className="Email"
            type="Email"
            placeholder="Retype Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <button className="submit_button" onClick={handleSubmit}>Reset Password</button>
        </div>
        <div className="container_2">
          <span className="not_account">Go back to</span>
          <span className="login_page_link">login page</span>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
