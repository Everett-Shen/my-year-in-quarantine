import React from "react";

import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const LandingPageEntry = ({ title, content, id, index }) => {
  return (
    <>
      <div className="intro-block" id={index === 1 ? "learnMore" : ""}>
        <ScrollAnimation
          animateIn="animate__fadeInRight"
          duration={0.4}
          animateOnce={true}
          offset={0}
          delay={index === 0 ? 1000 : 500}
          initiallyVisible={false}
        >
          <h1>{title}</h1>
          <div style={{ marginTop: "20px" }}>{content}</div>
        </ScrollAnimation>
        <span className="circle" />
      </div>
    </>
  );
};

export default LandingPageEntry;
