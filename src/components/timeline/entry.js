import React from "react";
import EntryContainer from "./entryContainer";

const Entry = ({ date, title, content, id }) => {
  return (
    <EntryContainer>
      {
        <div className="entry-content" id={id}>
          <h3>{date}</h3>
          <h2 style={{ marginTop: "6px" }}>{title}</h2>

          <div style={{ marginTop: "15px" }}>{content}</div>
        </div>
      }
    </EntryContainer>
  );
};

export default Entry;
