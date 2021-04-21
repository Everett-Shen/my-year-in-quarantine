import React, { useState, useEffect } from "react";

import _ from "lodash";

import { useHistory } from "react-router-dom";
import {
  downloadTimelineAsVerticalJPEG,
  downloadTimelineAsHorizontalJPEG,
  downloadTimelineAsImageSet,
} from "./downloadImages";

import "firebase/firestore";
import { useFirestore } from "reactfire";

const ViewContainer = (props) => {
  //   const setAnswers = props.setAnswers;
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
  const [isDownloading, setIsDownloading] = useState(false);

  const LOCAL_STORAGE_FORM_PUBLISHED_KEY =
    "my-year-in-quarantine-form-submitted";
  const LOCAL_STORAGE_DOC_ID_KEY = "my-year-in-quarantine-doc-id";

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 150); // ugly solution, but kinda works

    setFormSubmitted(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_FORM_PUBLISHED_KEY))
    );
    let docID = localStorage.getItem(LOCAL_STORAGE_DOC_ID_KEY);
    setDocID(docID);
  }, []);

  const answers = props.answers;

  const downloadTimeline = async (
    showTimeline,
    setShowTimeline,
    downloadFunction
  ) => {
    if (showTimeline) {
      setIsDownloading(true);
      // this parameter only gets used by downloadTimelineMultiple
      await downloadFunction(answers.entries.length + 2);

      setIsDownloading(false);

      setTimeout(() => {
        setShowTimeline(false);
      }, 2000);
    }
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
        isDownloading,
        setIsDownloading,
      })}
    </>
  );
};

export default ViewContainer;
