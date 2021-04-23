import React from "react";
import Joyride from "react-joyride";
import variables from "../../styles/variables.module.scss";

const ProductTour = ({ run, steps }) => {
  const handleCallback = (data) => {
    if (data.index === data.size - 1) {
      window.scrollTo(0, 0);
    }
  };
  return (
    <Joyride
      run={run}
      steps={steps}
      showSkipButton
      continuous={true}
      callback={handleCallback}
      locale={{
        back: "Back",
        close: "Close",
        last: "Begin",
        next: "Next",
        skip: "Skip",
      }}
      styles={{
        buttonClose: {
          display: "none",
        },
        buttonNext: {
          outline: "none",
          backgroundColor: variables.primaryColor,
        },
        buttonBack: {
          outline: "none",
          color: variables.primaryColor,
        },
        buttonSkip: {
          outline: "none",
        },
        tooltip: {
          padding: "25px",
        },
      }}
    />
  );
};

export default ProductTour;
