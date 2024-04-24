import React, { useState, useEffect } from "react";
import "./Signup.css";
import Google from "./assets/google__logo.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState('');
  const [cookie, setCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [cookies] = useCookies(["selectedTheme"]);
  const selectedTheme = cookies.selectedTheme || "blue-dark";
  const [regNo, setRegNo] = useState("");
  provider.addScope("email");

  useEffect(() => {
    const themeClass = selectedTheme.endsWith("-dark")
      ? selectedTheme
      : `${selectedTheme}-light`;
    document.documentElement.setAttribute("data-theme", themeClass);
  }, [selectedTheme]);

  const signInWithGoogle = async () => {
    // You can return the document data and ID if needed
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const result = await signInWithPopup(auth, provider);
          const User = result.user;
          const userEmail = User.email;
          console.log(User);

          const response = await axios.post(
            `http://localhost:3000/api/auth/google-login`,
            { User }
          );
          // const token = response.data.token;
          // const maxAge = 10 * 24 * 60 * 60;
          // setCookie("token", token, {
          //   path: "/",
          //   maxAge,
          //   sameSite: "none",
          //   secure: true,
          // });
          // console.log("Token:", token);
          resolve("Registration successful!");
          navigate("/");
        } catch (error) {
          reject(error.msg);
          resolve("Error Occured");
        }
      }),
      {
        pending: "Processing...", // Optional message shown when promise is pending
        success: (msg) => msg, // The success message will be the resolved value of the promise
        error: (msg) => msg, // The error message will be the rejected value of the promise
      }
    );
  };

  const handleSignup = async () => {
    // Display loading toast while waiting for response
    setLoading(!loading);

    const promise = axios
      .post("http://localhost:3000/api/User/signUp", {
        email,
        password,
        username,
        role,
      })
      .then((response) => {
        // Assuming the token is returned in the response data
        setLoading(!loading);
        // const token = response.data.token;
        // const maxAge = 10 * 24 * 60 * 60;
        // setCookie("token", token, {
        //   path: "/",
        //   maxAge,
        //   sameSite: "none",
        //   secure: true,
        // });
        // console.log("Token:", token);
        navigate(`/otp/${encodeURIComponent(response.data.id)}`);
        // Return data to be used in the resolved state of toast.promise
        return response.data;
      })
      .catch((error) => {
        setLoading(!loading);
        console.error("Error signing up:", error);
        // Throw error to be used in the rejected state of toast.promise
        throw error;
      })
      .finally(() => {
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
      <div className="container_1">
        <span className="container__header__signup">Sign up to Pixeon</span>

        <button className="google_box" onClick={signInWithGoogle}>
          {" "}
          <img src={Google} alt="Google Logo" /> continue with google
        </button>

        <h1 className="or">or</h1>
        <input
          className="Email"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <input
          className="retype_password"
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button
          className="submit_button"
          onClick={handleSignup}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#CCCCCC" : "",
            border: loading ? "1px solid #CCCCCC" : "",
          }}
        >
          {loading ? "Creating Account.." : "Create Account"}
        </button>

        <div className="container_2">
          <span className="not_account">Have an account ?</span>
          <Link to="/login">
            <span className="log_in">Login in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
