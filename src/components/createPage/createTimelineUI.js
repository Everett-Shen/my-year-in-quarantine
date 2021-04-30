import React from "react";
import FloatingMenuButtons from "../baseComponents/floatingMenuButtons";
import MetaTag from "../baseComponents/metaTag";
import ProductTour from "../baseComponents/productTour";
import CreateTimelineForm from "./createTimelineForm";
import CreateTimelineTitle from "./createTimelineTitle";
import "animate.css/animate.min.css";

const CreateTimelineUI = ({
  joyrideSteps,
  isInstructionsOpen,
  setIsInstructionsOpen,
  panels,
  errors,
  finishButtonContent,
  // isFloatingButtonMenuOpen,
  // setIsFloatingButtonMenuOpen,
}) => {
  return (
    <div className="createForm">
      <MetaTag title={"Create Timeline - My Year in Quarantine"} />

      <div className="timelineForm">
        <CreateTimelineTitle setIsInstructionsOpen={setIsInstructionsOpen} />
        <CreateTimelineForm
          {...{
            panels,

            errors,
            finishButtonContent,
          }}
        />
      </div>

      <ProductTour
        steps={joyrideSteps}
        run={isInstructionsOpen}
        setIsInstructionsOpen={setIsInstructionsOpen}
      />
      {/* <FloatingMenuButtons
        id={"save-for-later"}
        buttons={[
          {
            title: "Save for later",
            onClick: () => console.log("link generated"),
            icon: "share",
          },
        ]}
        isFloatingButtonMenuOpen={isFloatingButtonMenuOpen}
        setIsFloatingButtonMenuOpen={setIsFloatingButtonMenuOpen}
      /> */}
    </div>
  );
};

export default CreateTimelineUI;
