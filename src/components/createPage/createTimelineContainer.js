import React, { useState, createRef, useEffect, useRef } from "react";
import {
  useVisited,
  useUpdateAnswers,
  useNonInitialEffect,
} from "../../helpers/hooks";
import DialogForm, { entrySchema } from "../createPage/dialogForm";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import CreateTimelineUI from "./createTimelineUI";
import { Q1, Q4, Q6 } from "./formQuestions";

const LOCAL_STORAGE_KEY = "my-year-in-quarantine";

const CreateTimelineContainer = () => {
  const history = useHistory();
  const [answers, setAnswers] = useState({
    Q1: { location: "" },
    Q4: {
      entries: [],
    },
    Q6: { name: "" },
  });
  const VISITED_LOCAL_STORAGE_KEY = "my_year_in_quarantine_create_page_visited";
  const pageVisited = useVisited(VISITED_LOCAL_STORAGE_KEY);
  const [questionOne, setQuestionOne] = useState({ location: "" });
  const [questionFour, setQuestionFour] = useState({ entries: [] });
  const [questionSix, setQuestionSix] = useState({ name: "" });
  const [isDialogFormOpen, setIsDialogFormOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isNewEntryFormOpen, setIsNewEntryFormOpen] = useState(false);

  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isFloatingButtonMenuOpen, setIsFloatingButtonMenuOpen] = useState(
    false
  );
  const joyrideSteps = [
    {
      placement: "center",
      target: "body",
      content: (
        <p>
          In this section, you will be asked some questions about your year in
          quarantine. Your answers will be used to generate your personal
          timeline!
        </p>
      ),
    },
    {
      placement: "center",
      target: "body",
      content:
        "We recommend you complete this process with a calendar or photo album nearby to remind you of what happened throughout your year",
    },
    {
      target: "#save-for-later",
      content:
        "This process usually takes around ten minutes. If you need to take a break, feel free to click this button to save your progress and generate an edit link to your timeline.",
    },
    {
      target: "#create-page-help",
      content: "Click this button to see this guide again at anytime",
    },
    {
      placement: "center",
      target: "body",
      content: "Good luck!",
    },
  ];

  const [selectedEntry, setSelectedEntry] = useState({});
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(0);

  const formRef = createRef();
  const newEntryFormRef = createRef();
  const firstUpdate = useRef(true);

  useUpdateAnswers(answers, setAnswers, "Q1", questionOne);
  useUpdateAnswers(answers, setAnswers, "Q4", questionFour);
  useUpdateAnswers(answers, setAnswers, "Q6", questionSix);

  // read answers from localStorage upon initial render
  useEffect(() => {
    const storageAnswers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageAnswers) {
      setAnswers(storageAnswers);
      if (storageAnswers.Q1) setQuestionOne(storageAnswers.Q1);
      if (storageAnswers.Q4) setQuestionFour(storageAnswers.Q4);
      if (storageAnswers.Q6) setQuestionSix(storageAnswers.Q6);
    }
  }, []);

  // save answers to localstorage when updated
  useNonInitialEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useNonInitialEffect(() => {
    if (!pageVisited) setTimeout(() => setIsInstructionsOpen(true), 1000);
  }, [pageVisited]);

  const schema = Yup.object().shape({
    Q1: Yup.object().shape({
      location: Yup.object()
        .typeError("q1: location is required")
        .shape({
          label: Yup.string().ensure().required("q1: location is required"),
        }),
    }),
    Q4: Yup.object().shape({
      entries: Yup.array()
        .of(entrySchema)
        .min(3, "q4: please include at least 3 timeline entries"),
    }),
    Q6: Yup.object().shape({
      name: Yup.string().required("q6: name is required"),
    }),
  });

  const panels = [
    {
      label: "1. Where were you located when the COVID-19 pandemic began? ",
      id: "Q1",
      component: <Q1 {...{ questionOne, setQuestionOne }} />,
    },
    {
      label:
        "3. Look back on your year. What are the most significant events or periods that happened in your life during the pandemic? ",
      id: "Q4",
      component: (
        <Q4
          {...{
            questionFour,
            setQuestionFour,
            isDialogFormOpen,
            setIsDialogFormOpen,
            selectedEntry,
            setSelectedEntry,
            selectedEntryIndex,
            setSelectedEntryIndex,
            formRef,
            isNewEntryFormOpen,
            setIsNewEntryFormOpen,
            newEntryFormRef,
          }}
        />
      ),
    },
    {
      label: "6. Your preferred name ",
      id: "Q6",
      component: <Q6 {...{ questionSix, setQuestionSix }} />,
    },
  ];

  return (
    <CreateTimelineUI
      {...{
        joyrideSteps,
        isInstructionsOpen,
        isFloatingButtonMenuOpen,
        setIsFloatingButtonMenuOpen,
        panels,
        schema,
        setIsInstructionsOpen,
        answers,
        setErrors,
        history,
        errors,
      }}
    />
  );
};

export default CreateTimelineContainer;
