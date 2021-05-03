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
import { useEditID } from "../../helpers/hooks";
import { sendEmail } from "../../helpers/sendEmail";
import { LOCATIONHOST } from "../../constants/constants";

const ViewContainer = (props) => {
  //   const setAnswers = props.setAnswers;
  const [isOpen, setIsOpen] = useState(false);
  const [isFloatingButtonMenuOpen, setIsFloatingButtonMenuOpen] = useState(
    false
  );
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
  const [emailSent, setEmailSent] = useState(false);
  const [docID, setDocID] = useState("");
  const [editID, setEditID] = useEditID();
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const LOCAL_STORAGE_FORM_PUBLISHED_KEY =
    "my-year-in-quarantine-form-submitted";
  const LOCAL_STORAGE_DOC_ID_KEY = "my-year-in-quarantine-doc-id";
  const LOCAL_STORAGE_EDIT_ID_KEY = "my-year-in-quarantine-edit-id";
  const answers = props.answers;
  const originalAnswers = props.originalAnswers;

  const timelinesRef = useFirestore().collection("timelines");
  const editIDsRef = useFirestore().collection("editIDs");
  const emailsRef = useFirestore().collection("emails");
  const fieldValue = useFirestore.FieldValue;

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 150); // ugly solution, but kinda works

    setFormSubmitted(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_FORM_PUBLISHED_KEY))
    );
    let docID = localStorage.getItem(LOCAL_STORAGE_DOC_ID_KEY);
    setDocID(docID);

    let storedEditID = localStorage.getItem(LOCAL_STORAGE_EDIT_ID_KEY);
    setEditID(storedEditID);
  }, []);

  const downloadTimeline = async (
    showTimeline,
    setShowTimeline,
    downloadFunction
  ) => {
    if (showTimeline) {
      setIsDownloading(true);
      // this parameter only gets used by downloadTimelineMultiple
      await downloadFunction(totalEntryNumber()); // entries + title, start location, present day

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

  const generateEditID = (docID) => {
    editIDsRef
      .add({
        timelineID: docID,
        created: fieldValue.serverTimestamp(),
      })
      .then((doc) => {
        setEditID(doc.id);
        console.log(doc.id);
      })
      .catch((err) => {
        console.log("there was a failure to generate an edit link");
      });
  };

  const addEmail = (email, editID, timelineID) => {
    emailsRef
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        // new email
        if (querySnapshot.docs.length === 0) {
          emailsRef
            .add({
              email: email,
              editIDs: [editID],
              timelineIDs: [timelineID],
            })
            .then((ref) => {
              console.log("Added doc with ID: ", ref.id);
            });
        }
        // pre-existing email
        else {
          let docID = querySnapshot.docs[0].id;
          let docData = querySnapshot.docs[0].data();
          emailsRef
            .doc(docID)
            .update({
              editIDs: [...docData.editIDs, editID],
              timelineIDs: [...docData.timelineIDs, timelineID],
            })
            .then((ref) => {
              console.log("Updated doc with ID: ", docID);
            });
        }
      });
  };

  const publishTimeline = async () => {
    return timelinesRef
      .add({
        ...answers,
        originalAnswers: originalAnswers,
        created: fieldValue.serverTimestamp(),
        public: makePublic,
        anonymous: makeAnonymous,
      })
      .then((doc) => {
        // generate edit ID
        generateEditID(doc.id);

        // generate timeline ID
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

  const sendEmailWithParams = async () => {
    addEmail(email, editID, docID);

    let success = await sendEmail({
      to_name: answers.name,
      edit_link: editID ? `${LOCATIONHOST}/edit/${editID}` : "",
      share_link: docID ? `${LOCATIONHOST}/view/${docID}` : "",
      reply_to: "myyearinquarantine@gmail.com",
      to_email: email,
    });
    console.log("sent to ", email);
    if (success) setEmailSent(true);
    return success;
  };

  const totalEntryNumber = () => {
    return answers.entries ? answers.entries.length + 3 : 3; // entries + title, start location, present day
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
        editID,
        email,
        sendEmail: sendEmailWithParams,
        setEmail,
        published,
        setPublished,
        publishTimeline,
        formSubmitted,
        showDownloadTimelineHorizontal,
        showDownloadTimelineMultiple,
        publishFailed,
        setPublishFailed,
        emailSent,
        setEmailSent,
        isDownloading,
        setIsDownloading,
        isFloatingButtonMenuOpen,
        setIsFloatingButtonMenuOpen,
        totalEntryNumber,
      })}
    </>
  );
};

export default ViewContainer;
