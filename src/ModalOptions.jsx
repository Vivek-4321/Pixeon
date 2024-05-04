import React, { useState, useEffect } from "react";
import "./ModalOptions.css";
import { useCookies } from "react-cookie";
import Modal from "react-modal";

function ModalOptions({
  isModalOpen,
  handleCloseModal,
  items,
  buttonRef,
  post,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isModalOpen && buttonRef?.current) {
      const { top, left } = buttonRef.current.getBoundingClientRect();
      setModalPosition({ top: top + window.scrollY, left: left });
    }
  }, [isModalOpen]);

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
      width: "25%",
      height: "25%",
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
      minHeight: "3rem",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#14111d",
      borderRadius: "0.6rem",
      width: "25%",
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

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Example Modal"
      style={{
        ...(cookies?.selectedTheme?.includes("dark")
          ? darkCustomStyles
          : customStyles),
        ...{
          top: modalPosition?.top,
          left: modalPosition?.left,
        },
      }}
    >
      <ul>
        {items?.map((item, index) => (
          <li key={index} onClick={item?.onClick}>
            {item?.title}
          </li>
        ))}
      </ul>
    </Modal>
  );
}

export default ModalOptions;
