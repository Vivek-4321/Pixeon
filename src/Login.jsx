import React, { useState,useEffect } from "react";
import "./Login.css";
import Google from "./assets/google__logo.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie, getCookie] = useCookies(["user"]);
  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  const navigate = useNavigate();
  const [cookies] = useCookies(["selectedTheme"]);
  const selectedTheme = cookies.selectedTheme || "blue-dark";

  useEffect(() => {
    const themeClass = selectedTheme.endsWith("-dark")
      ? selectedTheme
      : `${selectedTheme}-light`;
    document.documentElement.setAttribute("data-theme", themeClass);
  }, [selectedTheme]);
  

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
        const maxAge = 10 * 24 * 60 * 60;
        setCookie("token", token, {
          path: "/",
          maxAge,
          sameSite: "none",
          secure: true,
        });
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
      success: () => {
        setLoading(false);
        navigate("/");
        return "Login Successfull";
      },
      error: (error) => {
        console.error("Error :", error);
        setLoading(false);
        return "Failed to login.";
      },
    });
  };

  const signInWithGoogle = async () => {
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
          const token = response.data.token;
          const maxAge = 10 * 24 * 60 * 60;
          setCookie("token", token, {
            path: "/",
            maxAge,
            sameSite: "none",
            secure: true,
          });
          console.log("Token:", token);
          resolve("Login successful!");
        } catch (error) {
          reject(error);
          resolve("Error Occured")
        }
      }),
      { // Optional message shown when promise is pending
          loading: "Logging in...",
          success: () => {
            setLoading(false);
            navigate("/");
            return "Login Successfull";
          },
          error: (error) => {
            console.error("Error :", error);
            setLoading(false);
            return "Failed to login.";
          },
      }
    );
  };

  return (
    <div className="login__container">
      {/* <div className="color"></div> */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="navbar_pixeon">
        <h1>Pixeon</h1>
      </div>
      <div className="container_1">
        <h1 className="container__header">Sign in to Pixeon</h1>

        <button className="google_box" onClick={signInWithGoogle}>
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
