import React, { useState, useEffect } from "react";
import ViewContainer from "./timeline/viewContainer";
import ViewUI from "./timeline/viewUI";
import * as defaultAnswers from "../answers.json";
import "firebase/firestore";
import { useFirestore } from "reactfire";
import { useRouteMatch } from "react-router-dom";

const ViewPage = () => {
  const [answers, setAnswers] = useState({});

  const docID = useRouteMatch().params.docID;
  const docRef = useFirestore().collection("timelines").doc(docID);
  useEffect(() => {
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
    <ViewContainer
      render={(props) => <ViewUI {...props} />}
      answers={answers}
      setAnswers={setAnswers}
    />
  );
};

export default ViewPage;
