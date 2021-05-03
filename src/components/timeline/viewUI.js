import React from "react";
import MetaTags from "react-meta-tags";
import Timeline from "./timeline";
import HorizontalTimeline from "./horizontalTimeline";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import ShareDialog from "./shareDialog";
import FloatingMenuButtons from "../baseComponents/floatingMenuButtons";
import BaseDialog from "../baseComponents/baseDialog.js";
import LoadingBackdrop from "../baseComponents/loadingBackdrop";

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
  isDownloading,
  setIsDownloading,
  isFloatingButtonMenuOpen,
  setIsFloatingButtonMenuOpen,
  totalEntryNumber,
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
        <title>View Timeline - My Year in Quarantine </title>
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
          {/* setting captureID to 0 for the main timeline is technically a hack, but it gets the job of scrolling to the top of the timeline instead of just the top of the title block done */}
          <Timeline
            answers={answers}
            compressed={false}
            captureID={"0"}
            totalEntryNumber={totalEntryNumber}
            setIsFloatingButtonMenuOpen={setIsFloatingButtonMenuOpen}
          />
        </ScrollAnimation>
      </div>
      <div className="button-container">
        <div
          style={{
            marginRight: "5%",
            position: "relative",
            textAlign: "center",
            zIndex: "8",
          }}
        >
          <p>present</p>
        </div>
      </div>
      <FloatingMenuButtons
        buttons={[
          {
            title: "Share / Export",
            onClick: () => setIsOpen(true),
            icon: "share",
          },
        ]}
        isFloatingButtonMenuOpen={isFloatingButtonMenuOpen}
        setIsFloatingButtonMenuOpen={setIsFloatingButtonMenuOpen}
      />
      <BaseDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Share / Export"}
      >
        <ShareDialog
          shareURL={window.location}
          setShowDownloadTimeline={setShowDownloadTimeline}
          setShowDownloadTimelineHorizontal={setShowDownloadTimelineHorizontal}
          setShowDownloadTimelineMultiple={setShowDownloadTimelineMultiple}
        />
      </BaseDialog>

      {/* for downloading timeline */}
      {showDownloadTimeline && (
        <Timeline
          answers={answers}
          compressed={true}
          captureID={"capture"}
          totalEntryNumber={totalEntryNumber}
        />
      )}
      {(showDownloadTimelineHorizontal || showDownloadTimelineMultiple) && (
        <HorizontalTimeline
          answers={answers}
          compressed={true}
          downloadMultipleMode={showDownloadTimelineMultiple ? true : false}
          captureID={"captureHorizontal"}
        />
      )}
      <LoadingBackdrop open={isDownloading} setOpen={setIsDownloading} />
    </div>
  );
};

export default ViewUI;
