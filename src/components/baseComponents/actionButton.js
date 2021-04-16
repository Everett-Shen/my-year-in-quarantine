import React from "react";
import { Tooltip } from "@material-ui/core";

const ActionButton = ({
  text,
  onClick,
  disabled = false,
  disabledMessage = "",
}) => {
  return (
    <Tooltip
      title={disabledMessage}
      disableFocusListener={true}
      enterTouchDelay={0}
    >
      <span>
        {" "}
        <button
          className={`action-button ${
            disabled ? "action-button-disabled" : ""
          }`}
          onClick={onClick}
          disabled={disabled}
        >
          <span style={{ outline: "none" }}>{text}</span>
        </button>
      </span>
    </Tooltip>
  );
};

export default ActionButton;
