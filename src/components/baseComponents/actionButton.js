import React from "react";

const ActionButton = ({ text, onClick, disabled = false }) => {
  return (
    <button className="action-button" onClick={onClick} disabled={disabled}>
      <span style={{ outline: "none" }}>{text}</span>
    </button>
  );
};

export default ActionButton;
