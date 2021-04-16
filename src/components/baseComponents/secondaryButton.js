import React from "react";

const SecondaryButton = ({ text, onClick, disabled = false }) => {
  return (
    <button className="secondary-button" onClick={onClick} disabled={disabled}>
      <span style={{ outline: "none" }}>{text}</span>
    </button>
  );
};

export default SecondaryButton;
