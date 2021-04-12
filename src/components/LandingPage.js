import React from "react";
import MetaTags from "react-meta-tags";
import { NavLink } from "react-router-dom";
import Menu from "./menu.js";
import variables from "../styles/variables.module.scss";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <MetaTags>
        <title>My Year in Quarantine - Home</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </MetaTags>

      {/* intro block */}
      <div className="intro-block">
        <h1>
          my <br />{" "}
          <span
            style={{
              position: "relative",
              top: "-5px",
            }}
          >
            year
          </span>{" "}
          <br />
          <span style={{ position: "relative", top: "4px" }}>in</span> <br />
          <span style={{ position: "relative", top: "-5px" }}>quarantine</span>
        </h1>
        <p>
          My Year in Quarantine is a project aiming to document the pandemic
          journeys of people all over the world using beautiful interactive
          timelines. Timelines take only minutes to create and can be shared
          anywhere across the Internet.
          <br />
          <br />
          Everyone has a story worth telling. Share yours today.
        </p>
        <div>
          <NavLink className="getStarted" to={"/create"}>
            Get started
          </NavLink>
          <NavLink className="learnMore" to={"/create"}>
            Learn more
          </NavLink>
        </div>
        <span className="circle" />
      </div>
    </div>
  );
};

export default LandingPage;
