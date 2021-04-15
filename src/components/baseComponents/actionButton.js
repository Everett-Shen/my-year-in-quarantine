import React from "react";

const ActionButton = ({ text }) => {
  return (
    <button className="action-button">
      <span style={{ outline: "none" }}>{text}</span>
    </button>
  );
};

export default ActionButton;
