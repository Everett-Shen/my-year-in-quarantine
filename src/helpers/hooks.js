import { useState, useEffect, useRef } from "react";

const useVisited = (pageKey) => {
  const [pageVisited, setPageVisited] = useState(false);
  useEffect(() => {
    let visited = localStorage.getItem(pageKey);
    if (visited) setPageVisited(true);
    else localStorage.setItem(pageKey, true);
  }, []);

  return pageVisited;
};

const useUpdateAnswers = (answers, setAnswers, answerKey, updatedAnswer) => {
  useNonInitialEffect(() => {
    setAnswers({ ...answers, [answerKey]: updatedAnswer });
  }, [updatedAnswer]);
};

const useNonInitialEffect = (effect, deps) => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns = () => {};

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    // for cleanup
    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
  }, deps);
};

const useEditID = (localStorageKey = "my-year-in-quarantine-edit-id") => {
  const [editID, setEditID] = useState("");

  useNonInitialEffect(() => {
    localStorage.setItem(localStorageKey, editID);
  }, [editID]);

  return [editID, setEditID];
};

export { useVisited, useUpdateAnswers, useNonInitialEffect, useEditID };
