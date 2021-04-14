import React, { useState, useEffect, useRef } from "react";
import TimelineTitle from "./timelineTitle";
import Entry from "./entry";
import HorizontalDivider from "./horizontalDivider";
import { format } from "date-fns";
import variables from "../../styles/variables.module.scss";
// import { animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
// import { useSwipeable } from "react-swipeable";
// import { useDoubleTap } from "use-double-tap";

const HorizontalTimeline = ({
  answers,
  compressed,
  captureID,
  downloadMultipleMode,
}) => {
  const [scrollTarget, setScrollTarget] = useState(0);
  const dividerHeight = compressed ? "200px" : "700px";
  const answersRef = useRef(answers);
  const scrollTargetRef = useRef(scrollTarget);
  const preventDefault = (e) => {
    e.preventDefault();
  };

  const formatDate = (date) => {
    return format(new Date(date), "MMM dd yyyy");
  };

  const dividerWidth = downloadMultipleMode
    ? variables.timelineDistanceToLeftCompressed
    : "150px";

  return (
    <div
      id={captureID}
      className={
        downloadMultipleMode
          ? "timeline-container-horizontal-no-margin-left"
          : "timeline-container-horizontal"
      }
    >
      {/* title block*/}
      <div className="timeline-content-horizontal">
        <TimelineTitle
          title={answers.title}
          name={answers.name}
          id={"capture-1"}
          compressed={compressed}
        />
        <HorizontalDivider width={dividerWidth} />

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
        <HorizontalDivider width={dividerWidth} />

        {answers.entries &&
          answers.entries.map((entry, index) => {
            return (
              <React.Fragment key={index}>
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
                  compressed={compressed}
                />
                <HorizontalDivider
                  width={
                    downloadMultipleMode
                      ? index === answers.entries.length - 1
                        ? `calc(${dividerWidth} / 2)`
                        : dividerWidth
                      : dividerWidth
                  }
                />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default HorizontalTimeline;
