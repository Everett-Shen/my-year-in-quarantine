import React, { useState, useEffect } from "react";

import * as defaultAnswers from "../../answers.json";
import _ from "lodash";

import { useHistory } from "react-router-dom";
import {
  downloadTimelineAsVerticalJPEG,
  downloadTimelineAsHorizontalJPEG,
  downloadTimelineAsImageSet,
} from "./downloadImages";

import "firebase/firestore";
import { useFirestoreDocData, useFirestore } from "reactfire";

const ViewContainer = (props) => {
  const [answers, setAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [makePublic, setMakePublic] = useState(true);
  const [makeAnonymous, setMakeAnonymous] = useState(false);
  const [showDownloadTimeline, setShowDownloadTimeline] = useState(false);
  const [
    showDownloadTimelineHorizontal,
    setShowDownloadTimelineHorizontal,
  ] = useState(false);
  const [
    showDownloadTimelineMultiple,
    setShowDownloadTimelineMultiple,
  ] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishFailed, setPublishFailed] = useState(false);
  const [docID, setDocID] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";
  const LOCAL_STORAGE_FORM_PUBLISHED_KEY =
    "my-year-in-quarantine-form-submitted";
  const LOCAL_STORAGE_DOC_ID_KEY = "my-year-in-quarantine-doc-id";

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 150); // ugly solution, but kinda works

    // let localStorageAnswers = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (localStorageAnswers) setAnswers(organizeAnswers(localStorageAnswers));

    setFormSubmitted(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_FORM_PUBLISHED_KEY))
    );
    let docID = localStorage.getItem(LOCAL_STORAGE_DOC_ID_KEY);
    setDocID(docID);
    setAnswers(organizeAnswers(defaultAnswers.default));
  }, []);

  const organizeAnswers = (answers) => {
    let toReturn = {};
    if (!_.isEmpty(answers)) {
      toReturn.location = answers.Q1.location.label;
      toReturn.entries = answers.Q4.entries;
      toReturn.name = answers.Q6.name;
      toReturn.title = answers.Q5.title
        ? answers.Q5.title
        : `${toReturn.name}'s year in quarantine`;
    }

    return toReturn;
  };

  const downloadTimeline = (
    showTimeline,
    setShowTimeline,
    downloadFunction
  ) => {
    if (showTimeline) downloadFunction(answers.entries.length + 2); // this parameter only gets used by downloadTimelineMultiple
    setTimeout(() => {
      setShowTimeline(false);
    }, 300);
  };

  // download vertical timeline

  useEffect(() => {
    downloadTimeline(
      showDownloadTimeline,
      setShowDownloadTimeline,
      downloadTimelineAsVerticalJPEG
    );
  }, [showDownloadTimeline]);
  // download horizontal timeline
  useEffect(() => {
    downloadTimeline(
      showDownloadTimelineHorizontal,
      setShowDownloadTimelineHorizontal,
      downloadTimelineAsHorizontalJPEG
    );
  }, [showDownloadTimelineHorizontal]);
  // download image set
  useEffect(() => {
    downloadTimeline(
      showDownloadTimelineMultiple,
      setShowDownloadTimelineMultiple,
      downloadTimelineAsImageSet
    );
  }, [showDownloadTimelineMultiple]);

  const timelinesRef = useFirestore().collection("timelines");
  const fieldValue = useFirestore.FieldValue;

  const publishTimeline = async () => {
    return timelinesRef
      .add({
        ...answers,
        created: fieldValue.serverTimestamp(),
        public: makePublic,
        anonymous: makeAnonymous,
      })
      .then((doc) => {
        setDocID(doc.id);
        localStorage.setItem(LOCAL_STORAGE_DOC_ID_KEY, doc.id);
        console.log("doc ID: ", doc.id);
        setPublished(true);
        localStorage.setItem(LOCAL_STORAGE_FORM_PUBLISHED_KEY, true);
        setFormSubmitted(true);
        return true;
      })
      .catch((err) => {
        setPublishFailed(true);
        return false;
      });
  };

  return (
    <>
      {props.render({
        answers,
        isOpen,
        setIsOpen,
        history,
        makePublic,
        setMakePublic,
        showDownloadTimeline,
        setShowDownloadTimeline,
        makeAnonymous,
        setMakeAnonymous,
        setShowDownloadTimelineHorizontal,
        setShowDownloadTimelineMultiple,
        docID,
        published,
        setPublished,
        publishTimeline,
        formSubmitted,
        showDownloadTimelineHorizontal,
        showDownloadTimelineMultiple,
        publishFailed,
        setPublishFailed,
      })}
    </>
  );
};

export default ViewContainer;