import React from "react";
import MetaTags from "react-meta-tags";
import Timeline from "./timeline";
import HorizontalTimeline from "./horizontalTimeline";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import ShareDialog from "./shareDialog";
import FloatingMenuButtons from "../baseComponents/floatingMenuButtons";
import BaseDialog from "../baseComponents/baseDialog.js";
import PublishDialog from "./publishDialog.js";
import PublishStepper from "./publishStepper.js";
import BaseSnackbar from "../baseComponents/baseSnackbar";
import LoadingBackdrop from "../baseComponents/loadingBackdrop";

const PreviewUI = ({
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
  isFloatingButtonMenuOpen,
  setIsFloatingButtonMenuOpen,
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
          {/* setting captureID to 0 for the main timeline is technically a hack, but it gets the job of scrolling to the top of the timeline instead of just the top of the title block done */}
          <Timeline
            answers={answers}
            compressed={false}
            captureID={"0"}
            setIsFloatingButtonMenuOpen={setIsFloatingButtonMenuOpen}
          />
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
          }}
        >
          <p>end of preview</p>
        </div>
      </div>
      <FloatingMenuButtons
        buttons={
          !formSubmitted
            ? [
                {
                  title: "Finish up",
                  onClick: () => setIsOpen(true),
                  icon: "done",
                },
                {
                  title: "Continue editing",
                  onClick: () => history.push("/create"),
                  icon: "edit",
                },
              ]
            : [
                {
                  title: "Finish up",
                  onClick: () => setIsOpen(true),
                  icon: "done",
                },
              ]
        }
        isFloatingButtonMenuOpen={isFloatingButtonMenuOpen}
        setIsFloatingButtonMenuOpen={setIsFloatingButtonMenuOpen}
      />
      <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <PublishStepper
          publishDialog={
            <PublishDialog
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
              shareURL={docID ? `${window.location.host}/view/${docID}` : ""}
              setShowDownloadTimeline={setShowDownloadTimeline}
              setShowDownloadTimelineHorizontal={
                setShowDownloadTimelineHorizontal
              }
              setShowDownloadTimelineMultiple={setShowDownloadTimelineMultiple}
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
      {/* <HorizontalTimeline
        answers={answers}
        compressed={true}
        downloadMultipleMode={showDownloadTimelineMultiple ? true : false}
        captureID={"captureHorizontal"}
      /> */}
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
      <LoadingBackdrop open={isDownloading} setOpen={setIsDownloading} />
    </div>
  );
};

export default PreviewUI;
