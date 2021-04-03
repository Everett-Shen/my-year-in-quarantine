import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Timeline from "./timeline/timeline";
import * as defaultAnswers from "../answers.json";
import _ from "lodash";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import { NavLink } from "react-router-dom";
import ShareDialog from "./shareDialog";

const PreviewPage = () => {
  const [answers, setAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 150); // ugly solution, but kinda works

    let localStorageAnswers = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (localStorageAnswers) setAnswers(organizeAnswers(localStorageAnswers));
    // setAnswers(organizeAnswers(defaultAnswers.default));
    // localStorage.setItem(
    //   LOCAL_STORAGE_KEY,
    //   JSON.stringify(defaultAnswers.default)
    // );
  }, []);

  const organizeAnswers = (answers) => {
    let toReturn = {};
    if (!_.isEmpty(answers)) {
      toReturn.location = answers.Q1.location.label;
      toReturn.entries = answers.Q4.entries;
      toReturn.name = answers.Q6.name;
      toReturn.title = answers.Q5.title
        ? answers.Q5.title
        : `${toReturn.name}'s year in quarantine`;
    }

    return toReturn;
  };

  return (
    <div className="preview-page">
      <MetaTags>
        <title>Preview Timeline - My Year in Quarantine </title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </MetaTags>

      <div className="timeline-container-outer">
        {/* <Timeline answers={answers} /> */}
        <ScrollAnimation
          animateIn="animate__fadeInUpBig"
          duration={1.2}
          animateOnce={true}
          offset={150}
          delay={10}
        >
          <Timeline answers={answers} />
        </ScrollAnimation>
      </div>
      <div
        className="button-container"
        style={{ position: "relative", top: "-200px" }}
      >
        <div
          style={{
            float: "right",
            marginRight: "5%",
            position: "relative",
            textAlign: "center",
            zIndex: "100",
          }}
        >
          <p>end of preview</p>
          <br />
          <br />
          <br />

          <NavLink className="learnMore" to={"/create"}>
            continue editing
          </NavLink>
          <button
            className="primaryButton"
            onClick={() => setIsOpen(true)}
            to={"/create"}
          >
            export and share
          </button>
        </div>
      </div>
      <ShareDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        shareURL={"https://myyearinquarantine.com"}
      />
    </div>
  );
};

export default PreviewPage;
