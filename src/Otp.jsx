import { useEffect, useRef, useState } from "react";
import "./Otp.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const OtpInput = ({ length = 6 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const email = decodeURIComponent(id);
  const navigate = useNavigate();
  const [cookie, setCookie, getCookie] = useCookies(["user"]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    console.log(email);
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    // if (combinedOtp.length === length) handleSubmit();

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    setLoading(true);
    console.log(otpValue);

    const promise = await axios.post("http://localhost:3000/api/User/verify", {
      id : email,
      otp: otpValue,
    });

    // if (promise) {
    //   const maxAge = 10 * 24 * 60 * 60;
    //   setCookie("token", promise.data, {
    //     path: "/",
    //     maxAge,
    //     sameSite: "none",
    //     secure: true,
    //   });
    //   navigate("/");
    // }

    // Use toast.promise to handle loading, success, and error states
    toast.promise(promise, {
      loading: "Verifying OTP...",
      success: () => {
        setLoading(false);
        navigate("/");
        return "OTP verified successfully";
      },
      error: (error) => {
        console.error("Error verifying OTP:", error);
        setLoading(false);
        return "Failed to verify OTP. Please try again.";
      },
    });
  };

  return (
    <div className="otp__container__wrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="navbar_pixeon"><h1>Pixeon</h1></div>
      <div className="otp_container">
        <div className="container__header__otp">
          <span className="container__header__signup">📨 Enter OTP</span>
        </div>
        <div className="otp__input__group">
          {otp.map((value, index) => {
            return (
              <input
                className="otp__input"
                key={index}
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            );
          })}
        </div>
        <button
          className="submit_button"
          style={{
            backgroundColor: loading ? "#CCCCCC" : "",
            border: loading ? "1px solid #CCCCCC" : "",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default OtpInput;
