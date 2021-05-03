import React, { useState, useEffect } from "react";
import * as defaultAnswers from "../../answers.json";
import InstructionalOverlay from "../baseComponents/instructionalOverlay";
import ViewInstructions from "../timeline/viewInstructions";
import ViewContainer from "../timeline/viewContainer";
import PreviewUI from "../timeline/previewUI";
import _ from "lodash";
import { useVisited } from "../../helpers/hooks";
import { organizeAnswers } from "../../helpers/helperFunctions";

const PreviewPage = () => {
  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";
  const [originalAnswers, setOriginalAnswers] = useState({});
  const [answers, setAnswers] = useState({});

  const VISITED_LOCAL_STORAGE_KEY =
    "my_year_in_quarantine_preview_page_visited";
  const pageVisited = useVisited(VISITED_LOCAL_STORAGE_KEY);

  useEffect(() => {
    // fetch timeline data
    let localStorageAnswers = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (localStorageAnswers) setOriginalAnswers(localStorageAnswers);
    if (localStorageAnswers) setAnswers(organizeAnswers(localStorageAnswers));
    //setAnswers(organizeAnswers(defaultAnswers.default));
  }, []);
  return (
    <>
      <ViewContainer
        render={(props) => <PreviewUI {...props} />}
        answers={answers}
        originalAnswers={originalAnswers}
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
