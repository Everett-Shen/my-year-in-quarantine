import React from "react";

import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const LandingPageEntry = ({ title, content, image, id, index }) => {
  return (
    <>
      <div className="intro-block-container">
        <div className="intro-block" id={index === 1 ? "learnMore" : ""}>
          <ScrollAnimation
            animateIn="animate__fadeInRight"
            duration={0.4}
            animateOnce={true}
            offset={0}
            delay={index === 0 ? 1000 : 500}
            initiallyVisible={false}
          >
            <div className="intro-block-text">
              <h1>{title}</h1>
              <div
                style={{
                  marginTop: "20px",
                  height: "fit-content",
                }}
              >
                {content}
              </div>
            </div>
            {image}
          </ScrollAnimation>
        </div>

        <span className="circle" />
      </div>
    </>
  );
};

export default LandingPageEntry;
