import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Timeline from "./timeline/timeline";
import * as defaultAnswers from "../answers.json";
import _ from "lodash";

const PreviewPage = () => {
  const [answers, setAnswers] = useState({});
  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";

  useEffect(() => {
    // let localStorageAnswers = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (localStorageAnswers) setAnswers(localStorageAnswers);
    setAnswers(organizeAnswers(defaultAnswers.default));
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
      </MetaTags>
      <div className="timeline-container-outer">
        <Timeline answers={answers} />
      </div>
    </div>

    // timeline
    // button row
    // full screen menu
  );
};

export default PreviewPage;
