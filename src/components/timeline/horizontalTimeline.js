import React, { useState, useEffect, useRef } from "react";
import TimelineTitle from "./timelineTitle";
import Entry from "./entry";
import Divider from "./divider";
import { format } from "date-fns";
// import { animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
// import { useSwipeable } from "react-swipeable";
// import { useDoubleTap } from "use-double-tap";

const HorizontalTimeline = ({ answers, compressed, captureID }) => {
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

  return (
    <div id={captureID} className="timeline-container-horizontal">
      {/* title block*/}
      <div className="timeline-content-horizontal">
        <TimelineTitle
          title={answers.title}
          name={answers.name}
          id={"0"}
          compressed={compressed}
        />
        <div style={{ width: "100px" }}></div>
        {/* {!compressed && <Divider height={dividerHeight} />} */}

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
        {/* <Divider height={dividerHeight} />*/}

        {answers.entries &&
          answers.entries.map((entry, index) => {
            return (
              <Entry
                date={
                  entry.date
                    ? formatDate(entry.date)
                    : `${formatDate(entry.from)} -  \n ${formatDate(entry.to)}`
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
            );
          })}
      </div>
    </div>
  );
};

export default HorizontalTimeline;
