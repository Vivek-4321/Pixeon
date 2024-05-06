import React from "react";
import "./ModalApplication.css";
import Modal from "react-modal";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";

function ModalSettings({ isModalOpen, handleCloseModal, handleEnableCookies }) {
  const darkTheme = {
    backgroundColor: "#222",
    textColor: "#ddd",
    boldButtonColor: "#555",
    buttonBackgroundColor: "#555",
    buttonTextColor: "#ddd",
    buttonHoverTextColor: "#fff",
    buttonHoverBackgroundColor: "#333",
    toolbarBackgroundColor: "#333",
    linkColor: "#888",
    borderColor: "#333",
  };

  const customStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      borderRadius: "0.6rem",
      width: "45%",
      height: "45%",
      overflowY: "auto",
      overflowX: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  const darkCustomStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#14111d",
      borderRadius: "0.6rem",
      width: "35%",
      height: "45%",
      overflowY: "auto",
      overflowX: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffff",
      border: "0.3px solid grey",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  const [cookies] = useCookies(["cookieConsent"]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Cookie Consent Modal"
      style={
        cookies?.selectedTheme?.includes("dark")
          ? darkCustomStyles
          : customStyles
      }
    >
      <div className="modal__content">
        <h4>Enable Cookies</h4>
        <p>
          We use cookies to improve your experience on our site. By enabling
          cookies, you allow us to provide you with a personalized and efficient
          browsing experience.
        </p>
        <span>
          <button className="cancel__button" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="ok__button" onClick={handleEnableCookies}>
            Enable Cookies
          </button>
        </span>
      </div>
    </Modal>
  );
}

export default ModalSettings;
