import React from "react";
import "./ModalApplication.css";
import Modal from "react-modal";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import Coin from "./assets/Vivecoin1.png";

function PointsModal({ isModalOpen, handleCloseModal, points }) {
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
      contentLabel="Points Modal"
      style={
        cookies?.selectedTheme?.includes("dark")
          ? darkCustomStyles
          : customStyles
      }
    >
      <div className="modal__content">
        <h4>Your Points</h4>
        <p>You have {points} <img src={Coin}/>points.</p>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
        />
        <span>
          <button className="cancel__button" onClick={handleCloseModal}>
            Close
          </button>
        </span>
      </div>
    </Modal>
  );
}

export default PointsModal;
