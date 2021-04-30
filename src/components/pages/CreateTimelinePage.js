import React, { useState } from "react";
import CreateTimelineContainer from "../createPage/createTimelineContainer";
import { useVisited } from "../../helpers/hooks";

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
  const VISITED_LOCAL_STORAGE_KEY = "my_year_in_quarantine_create_page_visited";
  const pageVisited = useVisited(VISITED_LOCAL_STORAGE_KEY);

  // read from localstorage in CreateTimelineContainer

  return (
    <CreateTimelineContainer
      answers={answers}
      setAnswers={setAnswers}
      editMode={false}
      pageVisited={pageVisited}
    />
  );
};

export default CreateTimelinePage;
