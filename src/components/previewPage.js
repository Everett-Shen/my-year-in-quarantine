import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Timeline from "./timeline/timeline";
import HorizontalTimeline from "./timeline/horizontalTimeline";
import * as defaultAnswers from "../answers.json";
import _ from "lodash";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import { NavLink } from "react-router-dom";
import ShareDialog from "./shareDialog";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import Divider from "@material-ui/core/Divider";
import watermark from "watermarkjs";
import FloatingMenuButton from "./timeline/floatingMenuButton";
import { useHistory } from "react-router-dom";

const PreviewPage = () => {
  const [answers, setAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isFloatingButtonMenuOpen, setIsFloatingButtonMenuOpen] = useState(
    false
  );
  const history = useHistory();
  const [makePublic, setMakePublic] = useState(true);
  const [showDownloadTimeline, setShowDownloadTimeline] = useState(false);
  const [
    showDownloadTimelineHorizontal,
    setShowDownloadTimelineHorizontal,
  ] = useState(false);
  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 150); // ugly solution, but kinda works

    // let localStorageAnswers = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (localStorageAnswers) setAnswers(organizeAnswers(localStorageAnswers));
    setAnswers(organizeAnswers(defaultAnswers.default));
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(defaultAnswers.default)
    );
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
  useEffect(() => {
    if (showDownloadTimeline) downloadTimelineAsSingleJPEG();
  }, [showDownloadTimeline]);

  useEffect(() => {
    if (showDownloadTimelineHorizontal) downloadTimelineAsMultipleJPEG();
  }, [showDownloadTimelineHorizontal]);

  const downloadTimelineAsSingleJPEG = () => {
    var node = document.getElementById("capture");
    let scale = 4;
    domtoimage
      .toPng(node, {
        bgcolor: "white",
        width: node.clientWidth * scale,
        height: node.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
        },
      })
      .then(function (dataUrl) {
        var x = function (canvas, metrics, context) {
          return canvas.width - 970;
        };

        var y = function (canvas, metrics, context) {
          return canvas.height - 70;
        };
        let pos = watermark.text.atPos;
        let watermarkContent = "See more at MyYearInQuarantine.com";
        const image = new Image();
        image.src = dataUrl;
        watermark([image])
          .image(pos(x, y, watermarkContent, "48px Montserrat", "#000", 1))
          // .image(watermark.text.lowerRight(watermarkContent, "48px Montserrat", "#000", 1))
          .then((img) => {
            // document.getElementById("preview-page").appendChild(img);
            var link = document.createElement("a");
            link.download = "My Year in Quarantine timeline.jpeg";
            link.href = img.src;
            link.click();
          });
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    setTimeout(() => {
      setShowDownloadTimeline(false);
    }, 300);
  };

  const downloadTimelineAsMultipleJPEG = () => {
    var node = document.getElementById("captureHorizontal");
    let scale = 3;
    domtoimage
      .toPng(node, {
        bgcolor: "white",
        width: node.clientWidth * scale,
        height: node.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
        },
      })
      .then(function (dataUrl) {
        var x = function (canvas, metrics, context) {
          return canvas.width - 970;
        };

        var y = function (canvas, metrics, context) {
          return canvas.height - 70;
        };
        let pos = watermark.text.atPos;
        let watermarkContent = "See more at MyYearInQuarantine.com";
        const image = new Image();
        image.src = dataUrl;
        watermark([image])
          .image(pos(x, y, watermarkContent, "48px Montserrat", "#000", 1))
          // .image(watermark.text.lowerRight(watermarkContent, "48px Montserrat", "#000", 1))
          .then((img) => {
            // document.getElementById("preview-page").appendChild(img);
            var link = document.createElement("a");
            link.download = "My Year in Quarantine timeline.jpeg";
            link.href = img.src;
            link.click();
          });
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    setTimeout(() => {
      setShowDownloadTimeline(false);
    }, 300);
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
          {/* <NavLink className="learnMore" to={"/create"}>
            keep editing
          </NavLink>
          <button
            className="primaryButton"
            style={{ marginLeft: "10px" }}
            onClick={() => setIsOpen(true)}
            to={"/create"}
          >
            continue
          </button> */}
        </div>
      </div>
      <FloatingMenuButton
        saveAndExport={() => setIsOpen(true)}
        continueEditing={() => history.push("/create")}
      />
      <ShareDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        shareURL={"https://myyearinquarantine.com"}
        makePublic={makePublic}
        setMakePublic={setMakePublic}
        downloadTimelineAsSingleJPEG={downloadTimelineAsSingleJPEG}
        setShowDownloadTimeline={setShowDownloadTimeline}
        setShowDownloadTimelineHorizontal={setShowDownloadTimelineHorizontal}
        downloadTimelineAsMultipleJPEG={downloadTimelineAsMultipleJPEG}
      />
      {showDownloadTimeline && (
        <Timeline answers={answers} compressed={true} captureID={"capture"} />
      )}
      {showDownloadTimelineHorizontal && (
        <HorizontalTimeline
          answers={answers}
          compressed={true}
          id={"captureHorizontal"}
        />
      )}
    </div>
  );
};

export default PreviewPage;
