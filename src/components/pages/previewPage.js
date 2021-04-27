import React, { useState, useEffect } from "react";
import * as defaultAnswers from "../../answers.json";
import InstructionalOverlay from "../baseComponents/instructionalOverlay";
import ViewInstructions from "../timeline/viewInstructions";
import ViewContainer from "../timeline/viewContainer";
import PreviewUI from "../timeline/previewUI";
import _ from "lodash";
import { useVisited } from "../../helpers/hooks";

const PreviewPage = () => {
  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";
  const [answers, setAnswers] = useState({});

  const VISITED_LOCAL_STORAGE_KEY =
    "my_year_in_quarantine_preview_page_visited";
  const pageVisited = useVisited(VISITED_LOCAL_STORAGE_KEY);

  const organizeAnswers = (answers) => {
    let toReturn = {};
    if (!_.isEmpty(answers)) {
      toReturn.location = answers.Q1.location.label;
      toReturn.entries = answers.Q4.entries;
      toReturn.name = answers.Q6.name;
      // toReturn.title = answers.Q5.title;
      // ? answers.Q5.title
      // : `${toReturn.name}'s year in quarantine`;
    }

    return toReturn;
  };
  useEffect(() => {
    // fetch timeline data
    let localStorageAnswers = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (localStorageAnswers) setAnswers(organizeAnswers(localStorageAnswers));

    // setAnswers(organizeAnswers(defaultAnswers.default));
  }, []);
  return (
    <>
      <ViewContainer
        render={(props) => <PreviewUI {...props} />}
        answers={answers}
        setAnswers={setAnswers}
      />
      {!pageVisited && (
        <InstructionalOverlay>
          <ViewInstructions actionButtonLabel={"finish up / keep editing"} />
        </InstructionalOverlay>
      )}
    </>
  );
};

export default PreviewPage;
