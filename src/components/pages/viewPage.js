import React, { useState, useEffect } from "react";
import ViewContainer from "../timeline/viewContainer";
import ViewUI from "../timeline/viewUI";
import InstructionalOverlay from "../baseComponents/instructionalOverlay";
import ViewInstructions from "../timeline/viewInstructions";
import "firebase/firestore";
import { useFirestore } from "reactfire";
import { useRouteMatch } from "react-router-dom";

const ViewPage = () => {
  const [answers, setAnswers] = useState({});
  const docID = useRouteMatch().params.docID;
  const docRef = useFirestore().collection("timelines").doc(docID);

  const VISITED_LOCAL_STORAGE_KEY = "my_year_in_quarantine_view_page_visited";
  const [pageVisited, setPageVisited] = useState(false);

  useEffect(() => {
    // determine if this is the first time visit
    let visited = localStorage.getItem(VISITED_LOCAL_STORAGE_KEY);
    if (visited) setPageVisited(true);
    else localStorage.setItem(VISITED_LOCAL_STORAGE_KEY, true);

    // fetch timeline data
    docRef.get().then((doc) => {
      if (doc) {
        let tempAnswers = doc.data();
        // handle anonymity
        if (tempAnswers.anonymous)
          tempAnswers = { ...tempAnswers, name: "Anonymous" };
        setAnswers(tempAnswers);
      } else {
        console.log("redirect");
        // redirect to 404 page
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
