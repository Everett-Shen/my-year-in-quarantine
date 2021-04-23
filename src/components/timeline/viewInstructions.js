import React from "react";
import arrow from "../../images/double-ended-arrow.png";
import curvedArrow from "../../images/curvedArrow.png";
import { isDesktop } from "react-device-detect";

const ViewInstructions = ({ actionButtonLabel }) => {
  return (
    <div>
      <div style={{ position: "relative", bottom: "50px" }}>
        <img src={arrow} alt="arrow" style={{ height: "200px" }} />
        <h2 style={{ margin: "30px" }}>
          {isDesktop
            ? "use arrow keys or scroll to navigate"
            : "swipe or double tap to navigate"}
        </h2>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "40px",
          right: "80px",
          display: "flex",
          flexDirection: "column",

          alignItems: "flex-end",
        }}
      >
        <h2>{actionButtonLabel}</h2>
        <img
          src={curvedArrow}
          alt="arrow"
          style={{ height: "80px", width: "120px", margin: "10px" }}
        />
      </div>
    </div>
  );
};

export default ViewInstructions;
