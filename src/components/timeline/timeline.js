import React, { useState, useEffect, useRef } from "react";
import TimelineTitle from "./timelineTitle";
import Entry from "./entry";
import Divider from "./divider";
import { format } from "date-fns";
import { animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
// import { useSwipeable } from "react-swipeable";
import { useDoubleTap } from "use-double-tap";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { useMediaQuery } from "@material-ui/core";

// notes: answers.entries will return undefined. use answersRef.current.entries instead. also, instead of scrollTarget, use scrollTargetRef

const Timeline = ({
  answers,
  compressed,
  captureID,
  setIsFloatingButtonMenuOpen,
  totalEntryNumber,
}) => {
  const mobile = useMediaQuery("(max-width:600px)");
  const [scrollTarget, setScrollTarget] = useState(0);
  const dividerHeight = compressed ? "100px" : mobile ? "600px" : "800px";
  const answersRef = useRef(answers);
  const scrollTargetRef = useRef(scrollTarget);
  const preventDefault = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    scrollTargetRef.current = scrollTarget;
  }, [scrollTarget]);

  useEffect(() => {
    var supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;
    document.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("wheel", handleScroll, wheelOpt);
    window.addEventListener("touchmove", preventDefault, wheelOpt);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("wheel", handleScroll, wheelOpt);

      window.removeEventListener(
        // not being removed for some reason
        "touchmove",
        preventDefault,
        wheelOpt
      );
    };
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), "MMM dd yyyy");
  };

  // const totalEntryNumber = () => {
  //   return answersRef.current.entries
  //     ? answersRef.current.entries.length + 3
  //     : 3; // entries + title, start location, present day
  // };

  const scrollToTarget = (targetID) => {
    if (targetID < 0 || targetID > totalEntryNumber() - 1) return;
    console.log("scrolling");
    scroller.scrollTo(String(targetID), {
      duration: 1300,
      delay: 0,
      smooth: true,
      offset: -70,
    });
    setScrollTarget(targetID);
    // // open floating menu buttons if bottom reached
    if (targetID === totalEntryNumber() - 1) {
      setIsFloatingButtonMenuOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (scrollTargetRef.current >= 1) {
          scrollToTarget(scrollTargetRef.current - 1);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        // 1 less than the total number of timeline entries
        if (scrollTargetRef.current < totalEntryNumber() - 1) {
          scrollToTarget(scrollTargetRef.current + 1);
        }
        break;
      default:
        return;
    }
  };

  // const handleScroll = (e) => {
  //   e.preventDefault();
  //   // add isScrolling stuff

  //   if (e.wheelDelta > 0) {
  //     if (scrollTargetRef.current >= 1) {
  //       scrollToTarget(scrollTargetRef.current - 1);
  //     }
  //   } else if (e.wheelDelta < 0) {
  //     // 1 less than the total number of timeline entries
  //     if (scrollTargetRef.current < totalEntryNumber() - 1) {
  //       scrollToTarget(scrollTargetRef.current + 1);
  //     }
  //   }
  // };

  const doubleTapBind = useDoubleTap((e) => {
    if (e.clientY < window.innerWidth * 0.4) scrollToTarget(scrollTarget - 1);
    else if (e.clientY > window.innerWidth * 0.6)
      scrollToTarget(scrollTarget + 1);
  });

  return (
    <ReactScrollWheelHandler
      upHandler={(e) => scrollToTarget(scrollTarget - 1)}
      downHandler={(e) => scrollToTarget(scrollTarget + 1)}
      preventScroll={true}
      timeout={600}
      style={{
        border: "none",
      }}
    >
      <div
        id={captureID}
        className="timeline-container"
        style={compressed ? { margin: "0px" } : {}}
        {...doubleTapBind}
      >
        {/* title block*/}
        <div className="timeline-content">
          <TimelineTitle
            title={
              answers.title
                ? answers.title
                : `${answers.name}'s year in quarantine`
            }
            name={answers.name}
            // id={"0"}
            compressed={compressed}
          />
          {!compressed && <Divider height={dividerHeight} />}

          {/* introduction block */}
          <Entry
            date={"2020"}
            title={"The COVID-19 pandemic begins"}
            content={
              <div>
                <p>{`${answers.name} is located in`}</p>
                <p>{`📍 ${answers.location} `}</p>
              </div>
            }
            id={"1"}
            compressed={compressed}
          />
          <Divider height={dividerHeight} />

          {answers.entries &&
            answers.entries.map((entry, index) => {
              return (
                <div key={index} className="divider">
                  <Entry
                    date={
                      entry.date
                        ? formatDate(entry.date)
                        : `${formatDate(entry.from)} -  \n ${
                            !entry.ongoing ? formatDate(entry.to) : "present"
                          }`
                    }
                    title={entry.entry}
                    content={
                      <div>
                        <p>{entry.description ? entry.description : ""}</p>
                      </div>
                    }
                    id={String(index + 2)}
                    compressed={compressed}
                  />

                  <Divider height={dividerHeight} />
                </div>
              );
            })}
          {answers.presentBlurb && (
            <div className="divider">
              <Entry
                date={"present day"}
                title={"Life Today"}
                content={
                  <div>
                    <p>{answers.presentBlurb}</p>
                  </div>
                }
                id={totalEntryNumber() - 1}
                compressed={compressed}
              />

              <Divider height={"200px"} />
            </div>
          )}
        </div>
      </div>
    </ReactScrollWheelHandler>
  );
};

export default Timeline;
