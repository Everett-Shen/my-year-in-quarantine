import { useEffect } from "react";

const useUpdateAnswers = ({
  firstUpdate,
  answers,
  setAnswers,
  answerKey,
  updatedAnswer,
}) => {
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setAnswers({ ...answers, [answerKey]: updatedAnswer });
  }, [updatedAnswer]);
};

export { useUpdateAnswers };
