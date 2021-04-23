import React from "react";
import MetaTags from "react-meta-tags";
import { NavLink } from "react-router-dom";
import Menu from "../menu.js";
import variables from "../../styles/variables.module.scss";
import ScrollAnimation from "react-animate-on-scroll";

const LandingPage = () => {
  return (
    <ScrollAnimation
      animateIn="animate__fadeIn"
      duration={1}
      animateOnce={true}
      offset={0}
      delay={200}
      initiallyVisible={false}
    >
      <div className="landing-page">
        <MetaTags>
          <title>My Year in Quarantine - Home</title>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
        </MetaTags>

        {/* intro block */}

        <div className="intro-block">
          <ScrollAnimation
            animateIn="animate__fadeInRight"
            duration={0.4}
            animateOnce={true}
            offset={0}
            delay={1000}
            initiallyVisible={false}
          >
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
              <span style={{ position: "relative", top: "4px" }}>in</span>{" "}
              <br />
              <span style={{ position: "relative", top: "-5px" }}>
                quarantine
              </span>
            </h1>
            <p>
              My Year in Quarantine is a project that helps you document your
              pandemic journey using beautiful interactive timelines. Timelines
              take only minutes to create and can be shared anywhere.
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
          </ScrollAnimation>
          <span className="circle" />
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default LandingPage;
