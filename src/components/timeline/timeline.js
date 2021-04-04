import React, { useState, useEffect, useRef } from "react";
import TimelineTitle from "./timelineTitle";
import Entry from "./entry";
import Divider from "./divider";
import { format } from "date-fns";
import { animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
import { useSwipeable } from "react-swipeable";
import { useDoubleTap } from "use-double-tap";

const Timeline = ({ answers }) => {
  const [scrollTarget, setScrollTarget] = useState(0);
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
    window.addEventListener("wheel", handleScroll, wheelOpt);
    window.addEventListener("touchmove", preventDefault, wheelOpt);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleScroll, wheelOpt);

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

  const dividerHeight = "600px";

  const scrollToTarget = (targetID) => {
    scroller.scrollTo(String(targetID), {
      duration: 1300,
      delay: 0,
      smooth: true,
      offset: -70,
    });
    setScrollTarget(targetID);
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
        if (
          scrollTargetRef.current <
          answersRef.current.entries.length + 2 - 1
        ) {
          scrollToTarget(scrollTargetRef.current + 1);
        }
        break;
      default:
        return;
    }
  };

  const handleScroll = (e) => {
    e.preventDefault();
    // add isScrolling stuff

    if (e.wheelDelta > 0) {
      if (scrollTargetRef.current >= 1) {
        scrollToTarget(scrollTargetRef.current - 1);
      }
    } else if (e.wheelDelta < 0) {
      // 1 less than the total number of timeline entries
      if (scrollTargetRef.current < answersRef.current.entries.length + 2 - 1) {
        scrollToTarget(scrollTargetRef.current + 1);
      }
    }
  };
  const handlers = useSwipeable({
    onSwipedUp: (eventData) => scrollToTarget(scrollTarget + 1),
    onSwipedDown: (eventData) => scrollToTarget(scrollTarget - 1),
    delta: 10, // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
  });

  const bind = useDoubleTap((e) => {
    if (e.clientY < window.innerWidth * 0.4) scrollToTarget(scrollTarget - 1);
    else if (e.clientY > window.innerWidth * 0.6)
      scrollToTarget(scrollTarget + 1);
  });

  return (
    <div className="timeline-container" {...handlers} {...bind} id={"0"}>
      {/* title block*/}
      <div className="timeline-content">
        <TimelineTitle title={answers.title} name={answers.name} />
        <Divider height={dividerHeight} />

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
        />
        <Divider height={dividerHeight} />

        {answers.entries &&
          answers.entries.map((entry, index) => {
            return (
              <div key={index}>
                <Entry
                  date={
                    entry.date
                      ? formatDate(entry.date)
                      : `${formatDate(entry.from)} -  \n ${formatDate(
                          entry.to
                        )}`
                  }
                  title={entry.entry}
                  content={
                    <div>
                      <p>{entry.description ? entry.description : ""}</p>
                    </div>
                  }
                  id={String(index + 2)}
                />

                <Divider height={dividerHeight} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Timeline;
