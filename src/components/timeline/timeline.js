import React from "react";
import TimelineTitle from "./timelineTitle";
import Entry from "./entry";
import Divider from "./divider";
import { format } from "date-fns";

const Timeline = ({ answers }) => {
  const formatDate = (date) => {
    return format(new Date(date), "MMM dd yyyy");
  };

  const dividerHeight = "400px";

  return (
    <div className="timeline-container">
      {/* title block*/}
      <div className="timeline-content">
        <TimelineTitle title={answers.title} name={answers.name} />
        <Divider height={dividerHeight} />

        {/* introduction block */}
        <Entry
          date={"Jan 2020"}
          title={"The COVID-19 pandemic begins"}
          content={
            <div>
              <p>{`${answers.name} is located in`}</p>
              <p>{`📍 ${answers.location} `}</p>
            </div>
          }
        />
        <Divider height={dividerHeight} />

        {answers.entries &&
          answers.entries.map((entry) => {
            return (
              <div>
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
