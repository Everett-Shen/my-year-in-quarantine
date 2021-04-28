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

export { useVisited, useUpdateAnswers, useNonInitialEffect };
