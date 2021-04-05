import React from "react";
import EntryContainer from "./entryContainer";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const TimelineTitle = ({ title, name, id, compressed }) => {
  return (
    <EntryContainer>
      {
        <div className="entry-content" id={id}>
          <ScrollAnimation
            animateIn="animate__fadeInRight"
            duration={0.9}
            animateOnce={true}
            offset={150}
            delay={1300}
            initiallyVisible={compressed ? true : false}
          >
            <h1 style={{ wordSpacing: "99999px" }}>{title}</h1>
            <br />
            <br />
            <ScrollAnimation
              animateIn="animate__fadeInUp"
              duration={0.4}
              animateOnce={true}
              offset={150}
              delay={2300}
              initiallyVisible={compressed ? true : false}
            >
              <div style={{ height: "100px" }}>
                <p style={{ float: "right" }}>{`by ${name}`}</p>
              </div>
            </ScrollAnimation>
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
