import React from "react";
import TimelineTitle from "./timelineTitle";

const Timeline = ({ answers }) => {
  return (
    <div className="timeline-container">
      {/* title block*/}
      <div className="timeline-content">
        <TimelineTitle title={answers.title} name={answers.name} />
        {/* location block */}
        {/* entry blocks */}
      </div>
    </div>
  );
};

export default Timeline;
