import React from "react";
import MetaTags from "react-meta-tags";
import Timeline from "./timeline";
import HorizontalTimeline from "./horizontalTimeline";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import ShareDialog from "../shareDialog";
import FloatingMenuButtons from "./floatingMenuButtons";
import BaseDialog from "./baseDialog.js";

const ViewUI = ({
  answers,
  isOpen,
  setIsOpen,
  history,
  showDownloadTimeline,
  setShowDownloadTimeline,
  setShowDownloadTimelineHorizontal,
  setShowDownloadTimelineMultiple,
  docID,
  showDownloadTimelineHorizontal,
  showDownloadTimelineMultiple,
}) => {
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
      <div className="button-container">
        <div
          style={{
            marginRight: "5%",
            position: "relative",
            textAlign: "center",
            zIndex: "8",
            height: "140px",
          }}
        >
          <p>present</p>
        </div>
      </div>
      <FloatingMenuButtons
        saveAndExport={() => setIsOpen(true)}
        continueEditing={() => history.push("/create")}
        previewMode={false}
      />
      <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <ShareDialog
          shareURL={docID ? `${window.location.host}/view/${docID}` : ""}
          setShowDownloadTimeline={setShowDownloadTimeline}
          setShowDownloadTimelineHorizontal={setShowDownloadTimelineHorizontal}
          setShowDownloadTimelineMultiple={setShowDownloadTimelineMultiple}
        />
      </BaseDialog>

      {/* for downloading timeline */}
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
    </div>
  );
};

export default ViewUI;
