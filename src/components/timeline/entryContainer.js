import React from "react";

// basically just a div with a circle next to it
const EntryContainer = (props) => {
  return (
    <div className="entry-container">
      {props.children}
      <span className="circle" />
    </div>
  );
};

export default EntryContainer;
