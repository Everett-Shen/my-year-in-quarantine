import React from "react";
import EntryContainer from "./entryContainer";

const TimelineTitle = ({ title, name }) => {
  return (
    <EntryContainer>
      {
        <div className="entry-content">
          <h1 style={{ wordSpacing: "99999px" }}>{title}</h1>
          <br />
          <br />
          <p style={{ float: "right" }}>{`by ${name}`}</p>
        </div>
      }
    </EntryContainer>
  );
};

export default TimelineTitle;
