import React, { useState, createRef, useEffect } from "react";
import { useUpdateAnswers, useNonInitialEffect } from "../../helpers/hooks";
import { entrySchema } from "../createPage/dialogForm";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import CreateTimelineUI from "./createTimelineUI";
import { Q1, Q2, Q2Schema, Q4, Q5, Q6 } from "./formQuestions";
import { useFirestore } from "reactfire";
import { organizeAnswers } from "helpers/helperFunctions";

const LOCAL_STORAGE_KEY = "my-year-in-quarantine";
const LOCAL_STORAGE_FORM_SUBMITTED_KEY = "my-year-in-quarantine-form-submitted";
const LOCAL_STORAGE_DOC_ID_KEY = "my-year-in-quarantine-doc-id";

const CreateTimelineContainer = ({
  answers,
  setAnswers,
  editMode = false,
  answersFetchedKey,
  pageVisited,
  timelineID,
}) => {
  const history = useHistory();

  const [questionOne, setQuestionOne] = useState({ location: "" });
  const [questionTwo, setQuestionTwo] = useState({
    entries: [{ location: "", date: null }],
  });
  const [questionFour, setQuestionFour] = useState({ entries: [] });
  const [questionFive, setQuestionFive] = useState({ text: "" });
  const [questionSix, setQuestionSix] = useState({ name: "" });
  const [isDialogFormOpen, setIsDialogFormOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isNewEntryFormOpen, setIsNewEntryFormOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isFloatingButtonMenuOpen, setIsFloatingButtonMenuOpen] = useState(
    false
  );
  const [selectedEntry, setSelectedEntry] = useState({});
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(0);
  const formRef = createRef();
  const newEntryFormRef = createRef();
  const timelinesCollection = useFirestore().collection("timelines");
  const fieldValue = useFirestore.FieldValue;

  // update global answers everytime a question gets updated
  useUpdateAnswers(answers, setAnswers, "Q1", questionOne);
  useUpdateAnswers(answers, setAnswers, "Q2", questionTwo);
  useUpdateAnswers(answers, setAnswers, "Q4", questionFour);
  useUpdateAnswers(answers, setAnswers, "Q5", questionFive);
  useUpdateAnswers(answers, setAnswers, "Q6", questionSix);

  // read answers from localStorage upon initial render (only in create mode)
  useEffect(() => {
    if (!editMode) {
      const storageAnswers = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)
      );
      if (storageAnswers) {
        setAnswers(storageAnswers);
        if (storageAnswers.Q1) setQuestionOne(storageAnswers.Q1);
        if (storageAnswers.Q2) setQuestionTwo(storageAnswers.Q2);
        if (storageAnswers.Q4) setQuestionFour(storageAnswers.Q4);
        if (storageAnswers.Q5) setQuestionFive(storageAnswers.Q5);
        if (storageAnswers.Q6) setQuestionSix(storageAnswers.Q6);
      }
    }
  }, []);

  // save answers to localstorage when updated (only in create mode)
  useNonInitialEffect(() => {
    if (!editMode) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  // update question answers from fetched original answers (only in edit mode)
  useNonInitialEffect(() => {
    if (editMode) {
      setQuestionOne(answers.Q1);
      setQuestionTwo(answers.Q2);
      setQuestionFour(answers.Q4);
      setQuestionFive(answers.Q5);
      setQuestionSix(answers.Q6);
    }
  }, [answersFetchedKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useNonInitialEffect(() => {
    if (!pageVisited) setTimeout(() => setIsInstructionsOpen(true), 1000);
  }, [pageVisited]);

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
      placement: "center",
      target: "body",
      content: `This process usually takes around ten minutes. ${
        !editMode
          ? "Feel free to take a break at any point! Your work will be saved"
          : 'To save your changes, click "update"'
      }`,
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
  const schema = Yup.object().shape({
    Q1: Yup.object().shape({
      location: Yup.object()
        .typeError("q1: location is required")
        .shape({
          label: Yup.string().ensure().required("q1: location is required"),
        }),
    }),
    Q2: Q2Schema,
    Q4: Yup.object().shape({
      entries: Yup.array()
        .of(entrySchema)
        .min(3, "q3: please include at least 3 timeline entries"),
    }),
    Q5: Yup.object().shape({
      text: Yup.string()
        .max(500, `max 500 characters`)
        .required("q4: description is required"),
    }),
    Q6: Yup.object().shape({
      name: Yup.string().required("q5: name is required"),
    }),
  });

  const finishButtonContent = !editMode
    ? {
        // create mode: validate answers, set errors, set flags in localStorage, push preview page
        onClick: () => {
          schema
            .validate(answers, { abortEarly: false })
            .then((valid) => {
              setErrors([]);
              console.log(answers);
              // prevent resubmission
              localStorage.setItem(LOCAL_STORAGE_FORM_SUBMITTED_KEY, false);
              localStorage.setItem(LOCAL_STORAGE_DOC_ID_KEY, null);
              history.push("/preview");
            })
            .catch((err) => {
              setErrors(err.errors);
            });
        },
        buttonText: "Preview",
      }
    : {
        // edit mode: validate answers, set errors, update firestore, push view page
        onClick: () => {
          schema
            .validate(answers, { abortEarly: false })
            .then((valid) => {
              setErrors([]);
              console.log(answers);
              // prevent resubmission
              localStorage.setItem(LOCAL_STORAGE_FORM_SUBMITTED_KEY, false);
              localStorage.setItem(LOCAL_STORAGE_DOC_ID_KEY, null);
              // update firestore with both originalAnswers and processedAnswers
              let processedAnswers = organizeAnswers(answers);

              timelinesCollection
                .doc(timelineID)
                .update({
                  ...processedAnswers,
                  originalAnswers: answers,
                  updated: fieldValue.serverTimestamp(),
                })
                .then(() => {
                  history.push(`/view/${timelineID}`);
                })
                .catch(() => {
                  console.log("there was an error in updating your timeline");
                });
            })
            .catch((err) => {
              setErrors(err.errors);
            });
        },
        buttonText: "Update",
      };

  const panels = [
    {
      label: "1. Where were you located when the COVID-19 pandemic began? ",
      id: "Q1",
      component: <Q1 {...{ questionOne, setQuestionOne }} />,
    },
    {
      label:
        "2. Since then, which other places have you called home? Please provide a geographic roadmap of your journey throughout the pandemic. ",
      id: "Q2",
      component: (
        <Q2
          {...{
            questionTwo,
            setQuestionTwo,
          }}
        />
      ),
    },
    {
      label:
        "3. Look back on your year. What are the most significant events or time periods that occurred in your life during the pandemic? ",
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
      label:
        "4. What's going on in your life today? Please share a brief blurb on what you've been doing, how you're feeling, and what you think the future holds. ",
      id: "Q5",
      component: <Q5 {...{ questionFive, setQuestionFive }} />,
    },
    {
      label: "5. Your preferred name ",
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
        finishButtonContent,
      }}
    />
  );
};

export default CreateTimelineContainer;
