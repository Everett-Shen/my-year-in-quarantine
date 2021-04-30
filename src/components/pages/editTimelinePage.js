import React, { useState, useEffect } from "react";
import CreateTimelineContainer from "../createPage/createTimelineContainer";
import { useRouteMatch } from "react-router-dom";
import { useFirestore } from "reactfire";
import { useVisited } from "../../helpers/hooks";

const EditTimelinePage = () => {
  const [answers, setAnswers] = useState({
    Q1: { location: "" },
    Q2: {
      entries: [{ location: "", date: null }],
    },
    Q4: {
      entries: [],
    },
    Q5: { text: "" },
    Q6: { name: "" },
  });
  const [answersFetchedKey, setAnswersFetchedKey] = useState(0);
  const [timelineID, setTimelineID] = useState("");
  const editID = useRouteMatch().params.editID;
  const editIDRef = useFirestore().collection("editIDs").doc(editID);
  const timelinesCollection = useFirestore().collection("timelines");
  const VISITED_LOCAL_STORAGE_KEY = "my_year_in_quarantine_edit_page_visited";
  const pageVisited = useVisited(VISITED_LOCAL_STORAGE_KEY);

  // on initial load, get timeline ID using edit ID, then use timelineID to get original answers
  useEffect(() => {
    editIDRef.get().then((doc) => {
      if (doc.exists) {
        let timelineID = doc.data().timelineID;
        setTimelineID(timelineID);
        // get original answers
        timelinesCollection
          .doc(timelineID)
          .get()
          .then((doc) => {
            if (doc) {
              let originalAnswers = doc.data().originalAnswers;
              setAnswers(originalAnswers);
              setAnswersFetchedKey(answersFetchedKey + 1); // send signal to container to update answers
            } else {
              console.log("redirect");
              // redirect to 404 page
            }
          });
      } else {
        console.log("redirect");
      }
    });
  }, []);

  return (
    <CreateTimelineContainer
      answers={answers}
      setAnswers={setAnswers}
      editMode={true}
      answersFetchedKey={answersFetchedKey}
      pageVisited={pageVisited}
      timelineID={timelineID}
    />
  );
};

export default EditTimelinePage;
