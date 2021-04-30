import React from "react";
import Accordion from "../Accordion/accordion";

const CreateTimelineForm = ({ panels, errors, finishButtonContent }) => {
  return (
    <>
      <Accordion panels={panels} />
      <div style={{ margin: "20px", height: "100px" }}>
        <button className="finish" onClick={finishButtonContent.onClick}>
          <span style={{ cursor: "pointer", outline: "none" }}>
            {finishButtonContent.buttonText}
          </span>
        </button>
        <div className="errorContainer">
          {errors.map((error, index) => (
            <div
              key={index}
              style={{
                color: "red",
                fontSize: "0.8em",
                marginLeft: "5px",
              }}
            >
              {error}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateTimelineForm;
