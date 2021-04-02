import React from "react";
import EntryContainer from "./entryContainer";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const TimelineTitle = ({ title, name, id }) => {
  return (
    <EntryContainer>
      {
        <div className="entry-content" id={id}>
          <ScrollAnimation
            animateIn="animate__fadeInRight"
            duration={1.0}
            animateOnce={true}
            offset={150}
            delay={1300}
          >
            <h1 style={{ wordSpacing: "99999px" }}>{title}</h1>
            <br />
            <br />
            <p style={{ float: "right" }}>{`by ${name}`}</p>
            <br />
            <br />
            <br />
            <br />
            {/* <p style={{ textAlign: "center" }}> click or tap to begin</p> */}
          </ScrollAnimation>
        </div>
      }
    </EntryContainer>
  );
};

export default TimelineTitle;
