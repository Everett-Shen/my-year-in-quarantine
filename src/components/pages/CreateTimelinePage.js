import React, { useState } from "react";
import CreateTimelineContainer from "../createPage/createTimelineContainer";

const CreateTimelinePage = () => {
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

  // read from localstorage in CreateTimelineContainer

  return (
    <CreateTimelineContainer
      answers={answers}
      setAnswers={setAnswers}
      editMode={false}
    />
  );
};

export default CreateTimelinePage;
