import React from "react";
import EntryContainer from "./entryContainer";

const TimelineTitle = ({ title, name, id }) => {
  return (
    <EntryContainer>
      {
        <div className="entry-content" id={id}>
          <h1 style={{ wordSpacing: "99999px" }}>{title}</h1>
          <br />
          <br />
          <p style={{ float: "right" }}>{`by ${name}`}</p>
          <br />
          <br />
          <br />
          <br />
          {/* <p style={{ textAlign: "center" }}> click or tap to begin</p> */}
        </div>
      }
    </EntryContainer>
  );
};

export default TimelineTitle;
