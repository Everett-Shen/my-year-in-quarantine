import { useState, useEffect } from "react";

const useVisited = (pageKey) => {
  const [pageVisited, setPageVisited] = useState(false);
  useEffect(() => {
    let visited = localStorage.getItem(pageKey);
    if (visited) setPageVisited(true);
    else localStorage.setItem(pageKey, true);
  }, []);

  return pageVisited;
};

const useUpdateAnswers = (
  firstUpdate,
  answers,
  setAnswers,
  answerKey,
  updatedAnswer
) => {
  useEffect(() => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // }
    setAnswers({ ...answers, [answerKey]: updatedAnswer });
  }, [updatedAnswer]);
};

export { useVisited, useUpdateAnswers };
