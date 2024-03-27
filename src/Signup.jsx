import React, { useState } from "react";
import "./Signup.css";
import Google from "./assets/google__logo.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Display loading toast while waiting for response
    setLoading(!loading);
    const promise = axios
      .post("http://localhost:3000/signup", {
        email,
        password,
      })
      .then((response) => {
        // Assuming the token is returned in the response data
        setLoading(!loading);
        const token = response.data.token;
        setCookie("token", token, { path: "/", sameSite: "none", secure: true });
        console.log("Token:", token);
        navigate(`/otp/${encodeURIComponent(email)}`)
        // Return data to be used in the resolved state of toast.promise
        return response.data;
      })
      .catch((error) => {
        setLoading(!loading);
        console.error("Error signing up:", error);
        // Throw error to be used in the rejected state of toast.promise
        throw error;
      }).finally(() => {
        setLoading(false); // Set loading state to false after login process completes
      });

    // Use toast.promise to display loading, success, or error toast
    toast.promise(promise, {
      loading: "Signing up...",
      success: (data) => `Email sent`,
      error: "Failed to sign up. Please try again.",
    });
  };

  return (
    <div className="signup__container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="navbar_pixeon">
        <h1>Pixeon</h1>
      </div>
      <div className="container_3">
        <span className="container__header__signup">Sign up to Pixeon</span>

        <button className="google_box">
          {" "}
          <img src={Google} alt="Google Logo" /> continue with google
        </button>

        <h1 className="or">or</h1>
        <input
          className="Email"
          type="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="retype_password" type="password" placeholder="Retype Password" />
        <button className="submit_button" onClick={handleSignup} disabled={loading}  style={{
            backgroundColor: loading ? "#CCCCCC" : "", 
            border: loading ? "1px solid #CCCCCC" : "",
          }}>
          {loading ? "Creating Account.." : "Create Account"}
        </button>

        <div className="container_2">
          <span className="not_account">Have an account ?</span>
          <span className="log_in">Login in</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
