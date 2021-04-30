import React, { useState, useEffect } from "react";
import * as defaultAnswers from "../../answers.json";
import InstructionalOverlay from "../baseComponents/instructionalOverlay";
import ViewInstructions from "../timeline/viewInstructions";
import ViewContainer from "../timeline/viewContainer";
import PreviewUI from "../timeline/previewUI";
import _, { first } from "lodash";
import { useVisited } from "../../helpers/hooks";
import { sortEntries } from "../createPage/formQuestions";

const PreviewPage = () => {
  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";
  const [originalAnswers, setOriginalAnswers] = useState({});
  const [answers, setAnswers] = useState({});

  const VISITED_LOCAL_STORAGE_KEY =
    "my_year_in_quarantine_preview_page_visited";
  const pageVisited = useVisited(VISITED_LOCAL_STORAGE_KEY);

  const getTitleAndDescription = (location) => {
    let firstCommaIndex = location.indexOf(",");
    return [
      location.substring(0, firstCommaIndex),
      location.substring(firstCommaIndex + 1),
    ];
  };
  const organizeAnswers = (answers) => {
    let toReturn = {};
    if (!_.isEmpty(answers)) {
      toReturn.location = answers.Q1.location.label;
      // combine Q2 and Q4, sort
      let nonBlankLocations = [
        ...answers.Q2.entries.filter(
          (entry) => typeof entry.location === "object"
        ),
      ];
      // organize q2 into entry format
      nonBlankLocations.map((entry) => {
        let location = entry.location.label;
        let [entryTitle, entryDescription] = getTitleAndDescription(location);

        entry.entry = entryTitle;
        entry.description = `📍 ${entryDescription.trim()} `;
        entry.location = location;
      });
      toReturn.entries = [...answers.Q4.entries, ...nonBlankLocations];
      sortEntries(toReturn.entries);
      toReturn.presentBlurb = answers.Q5.text;
      toReturn.name = answers.Q6.name;

      // add q5

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
    //setAnswers(organizeAnswers(defaultAnswers.default));

    setOriginalAnswers(defaultAnswers.default);
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
