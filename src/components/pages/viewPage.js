import React, { useState, useEffect } from "react";
import ViewContainer from "../timeline/viewContainer";
import ViewUI from "../timeline/viewUI";
import InstructionalOverlay from "../baseComponents/instructionalOverlay";
import ViewInstructions from "../timeline/viewInstructions";
import "firebase/firestore";
import { useFirestore } from "reactfire";
import { useRouteMatch } from "react-router-dom";
import { useVisited } from "../../helpers/hooks";
import { useHistory } from "react-router-dom";

const ViewPage = () => {
  const [answers, setAnswers] = useState({});
  const docID = useRouteMatch().params.docID;
  const docRef = useFirestore().collection("timelines").doc(docID);

  const VISITED_LOCAL_STORAGE_KEY = "my_year_in_quarantine_view_page_visited";
  const pageVisited = useVisited(VISITED_LOCAL_STORAGE_KEY);
  const history = useHistory();

  useEffect(() => {
    // fetch timeline data
    docRef.get().then((doc) => {
      if (doc.exists) {
        let tempAnswers = doc.data();
        // handle anonymity
        if (tempAnswers.anonymous)
          tempAnswers = { ...tempAnswers, name: "Anonymous" };
        setAnswers(tempAnswers);
      } else {
        history.push(`/404/${docID}`);
      }
    });
  }, []);
  return (
    <>
      <ViewContainer
        render={(props) => <ViewUI {...props} />}
        answers={answers}
        setAnswers={setAnswers}
      />
      {!pageVisited && (
        <InstructionalOverlay>
          <ViewInstructions actionButtonLabel={"share / save   "} />
        </InstructionalOverlay>
      )}
    </>
  );
};

export default ViewPage;
