import React from "react";
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
  // const [scrollTarget, setScrollTarget] = useState(0);
  // const dividerHeight = compressed ? "200px" : "700px";
  // const answersRef = useRef(answers);
  // const scrollTargetRef = useRef(scrollTarget);
  // const preventDefault = (e) => {
  //   e.preventDefault();
  // };

  const formatDate = (date) => {
    return format(new Date(date), "MMM dd yyyy");
  };

  const dividerWidth = downloadMultipleMode
    ? variables.timelineDistanceToLeftCompressed // change the value of this to change the dividerWidth for image set downloading...
    : "150px";

  return (
    <div
      id={captureID}
      className={
        downloadMultipleMode
          ? "timeline-container-horizontal-multi-image"
          : "timeline-container-horizontal"
      }
    >
      {/* title block*/}
      <div className="timeline-content-horizontal">
        <TimelineTitle
          title={
            answers.title
              ? answers.title
              : `${answers.name}'s year in quarantine`
          }
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
                <HorizontalDivider
                  width={downloadMultipleMode ? dividerWidth : dividerWidth}
                />
              </React.Fragment>
            );
          })}
        {answers.presentBlurb && (
          <React.Fragment>
            <Entry
              date={"present day"}
              title={"Life Today"}
              content={
                <div>
                  <p>{answers.presentBlurb}</p>
                </div>
              }
              compressed={compressed}
            />

            <HorizontalDivider
              width={
                downloadMultipleMode
                  ? `calc(${dividerWidth} / 2)`
                  : dividerWidth
              }
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default HorizontalTimeline;
