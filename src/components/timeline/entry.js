import React from "react";
import EntryContainer from "./entryContainer";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const Entry = ({ date, title, content, id, compressed }) => {
  return (
    <EntryContainer>
      {
        <div className="entry-content" id={id} style={{ overflowX: "hidden" }}>
          <ScrollAnimation
            animateIn="animate__fadeIn"
            duration={1.0}
            animateOnce={true}
            offset={-200}
            delay={900}
            initiallyVisible={compressed ? true : false}
          >
            <h3>{date}</h3>
            <h2 style={{ marginTop: "6px" }}>{title}</h2>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="animate__fadeInRight"
            duration={0.5}
            animateOnce={true}
            offset={-200}
            delay={1600}
            initiallyVisible={compressed ? true : false}
          >
            <div style={{ marginTop: "15px" }}>{content}</div>
          </ScrollAnimation>
          {/* <div style={{ marginTop: "15px" }}>{content}</div> */}
        </div>
      }
    </EntryContainer>
  );
};

export default Entry;
