// deprecated

import React from "react";
import EntryContainer from "./entryContainer";

const IntroductionBlock = ({ location, name }) => {
  return (
    <EntryContainer>
      {
        <div className="entry-content">
          <h3>Jan 2020</h3>
          <h1 style={{ marginTop: "2px" }}>The COVID-19 pandemic begins</h1>

          <br />
          <p>{`${name} is located in`}</p>
          <p>{`📍 ${location} `}</p>
        </div>
      }
    </EntryContainer>
  );
};

export default IntroductionBlock;
