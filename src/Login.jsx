import React, { useState } from "react";
import "./Login.css";
import Google from "./assets/google__logo.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies(["user"]);

  const handleLogin = async () => {
    setLoading(!loading); // Set loading state to true when login process starts
    const promise = axios
      .post("http://localhost:3000/login", {
        email,
        password,
      })
      .then((response) => {
        // Assuming the token is returned in the response data
        const token = response.data.token;
        setCookie("token", token, { path: "/", sameSite: "none", secure: true });
        console.log("Token:", token);
        return response.data;
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        throw error;
      })
      .finally(() => {
        setLoading(!loading); // Set loading state to false after login process completes
      });

    toast.promise(promise, {
      loading: "Logging in...",
      success: "Logged in successfully!",
      error: "Failed to log in. Please try again.",
    });
  };

  return (
    <div className="login__container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="navbar_pixeon">
        <h1>Pixeon</h1>
      </div>
      <div className="container_1">
        <h1 className="container__header">Sign in to Pixeon</h1>

        <button className="google_box">
          {" "}
          <img src={Google} alt="Google Logo" /> continue with google
        </button>

        <span className="or">or</span>
        <input
          className="Email"
          type="email"
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
        <button
          className="submit_button"
          onClick={handleLogin}
          disabled={loading} // Disable button when loading
          style={{
            backgroundColor: loading ? "#CCCCCC" : "", 
            border: loading ? "1px solid #CCCCCC" : "",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <span className="reset_password">Reset Password</span>
        <div className="container_2">
          <span className="not_account">No account ?</span>
          <span className="create_account">Create one</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
