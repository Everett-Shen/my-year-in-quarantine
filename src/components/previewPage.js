import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Timeline from "./timeline/timeline";
import HorizontalTimeline from "./timeline/horizontalTimeline";
import * as defaultAnswers from "../answers.json";
import _ from "lodash";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import ShareDialog from "./shareDialog";
import FloatingMenuButtons from "./timeline/floatingMenuButtons";
import { useHistory } from "react-router-dom";
import {
  downloadTimelineAsVerticalJPEG,
  downloadTimelineAsHorizontalJPEG,
  downloadTimelineAsImageSet,
} from "./timeline/downloadImages";
import BaseDialog from "./timeline/baseDialog.js";
import PublishDialog from "./timeline/publishDialog.js";
import PublishStepper from "./timeline/publishStepper.js";
import BaseSnackbar from "./baseComponents/baseSnackbar";
import "firebase/firestore";
import { useFirestoreDocData, useFirestore } from "reactfire";

const PreviewPage = () => {
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

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 150); // ugly solution, but kinda works

    // let localStorageAnswers = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (localStorageAnswers) setAnswers(organizeAnswers(localStorageAnswers));

    setFormSubmitted(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_FORM_PUBLISHED_KEY))
    );

    setAnswers(organizeAnswers(defaultAnswers.default));
    // localStorage.setItem(
    //   LOCAL_STORAGE_KEY,
    //   JSON.stringify(defaultAnswers.default)
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
    <div className="preview-page" id="preview-page">
      {/* necessary for getting the right font in downloaded image */}
      <link
        rel="preconnect"
        crossOrigin="anonymous"
        href="https://fonts.gstatic.com"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;1,700&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      ></link>
      <MetaTags>
        <title>Preview Timeline - My Year in Quarantine </title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </MetaTags>

      <div className="timeline-container-outer">
        {/* <Timeline answers={answers} /> */}
        <ScrollAnimation
          animateIn="animate__fadeInUpBig"
          duration={1.2}
          animateOnce={true}
          offset={150}
          delay={10}
        >
          <Timeline answers={answers} compressed={false} />
        </ScrollAnimation>
      </div>
      {/* <Divider style={{ margin: "20px auto 40px auto", width: "95%" }} /> */}
      <div className="button-container">
        <div
          style={{
            // float: "right",
            marginRight: "5%",
            position: "relative",
            textAlign: "center",
            zIndex: "8",
            height: "140px",
          }}
        >
          <p>end of preview</p>
          <br />
          <br />
        </div>
      </div>
      <FloatingMenuButtons
        saveAndExport={() => setIsOpen(true)}
        continueEditing={() => history.push("/create")}
      />
      <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <PublishStepper
          publishDialog={
            <PublishDialog
              shareURL={"https://myyearinquarantine.com"}
              makePublic={makePublic}
              setMakePublic={setMakePublic}
              setShowDownloadTimeline={setShowDownloadTimeline}
              makeAnonymous={makeAnonymous}
              setMakeAnonymous={setMakeAnonymous}
              setShowDownloadTimelineHorizontal={
                setShowDownloadTimelineHorizontal
              }
              setShowDownloadTimelineMultiple={setShowDownloadTimelineMultiple}
            />
          }
          shareDialog={
            <ShareDialog
              shareURL={"https://myyearinquarantine.com"}
              setShowDownloadTimeline={setShowDownloadTimeline}
              setShowDownloadTimelineHorizontal={
                setShowDownloadTimelineHorizontal
              }
              setShowDownloadTimelineMultiple={setShowDownloadTimelineMultiple}
              published={published}
              setPublished={setPublished}
            />
          }
          finish={() => {
            setIsOpen(false);
          }}
          publishTimeline={publishTimeline}
          formSubmitted={formSubmitted}
        />
      </BaseDialog>

      {showDownloadTimeline && (
        <Timeline answers={answers} compressed={true} captureID={"capture"} />
      )}
      {(showDownloadTimelineHorizontal || showDownloadTimelineMultiple) && (
        <HorizontalTimeline
          answers={answers}
          compressed={true}
          downloadMultipleMode={showDownloadTimelineMultiple ? true : false}
          captureID={"captureHorizontal"}
        />
      )}
      {/* for publish success */}
      <BaseSnackbar
        open={published}
        setOpen={setPublished}
        message={"Congrats! Your timeline has been published!"}
        severity={"success"}
      />
      {/* for publish failure */}
      <BaseSnackbar
        open={publishFailed}
        setOpen={setPublishFailed}
        message={"There was an error. Please try again later"}
        severity={"error"}
      />
    </div>
  );
};

export default PreviewPage;
