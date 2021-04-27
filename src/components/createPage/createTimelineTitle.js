import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import HelpTooltip from "../baseComponents/helpTooltip";

const CreateTimelineTitle = ({ setIsInstructionsOpen }) => {
  return (
    <>
      {/* needed to make the title display for SOME GODDAMN REASON */}
      <h2 style={{ color: "white" }}>a</h2>
      <ScrollAnimation
        animateIn="animate__fadeInLeftBig"
        duration={0.7}
        animateOnce={true}
        delay={0}
      >
        <div
          style={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              margin: "50px 20px",
              fontSize: "2em",
            }}
          >
            let's get started!
          </h2>
          <div
            id={"create-page-help"}
            style={{ backgroundColor: "white" }}
            onClick={() => {
              console.log("hi");
              setIsInstructionsOpen(true);
            }}
          >
            <HelpTooltip />
          </div>
        </div>
      </ScrollAnimation>
    </>
  );
};

export default CreateTimelineTitle;
