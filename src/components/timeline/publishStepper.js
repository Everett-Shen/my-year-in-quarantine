import React, { useState } from "react";
import { Stepper, Step, StepLabel, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ActionButton from "../baseComponents/actionButton";
import SecondaryButton from "../baseComponents/secondaryButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Publish!", "Export and Share", "Create Account"];
}

const PublishStepper = ({
  publishDialog,
  shareDialog,
  finish,
  publishTimeline,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const publishAndNext = () => {
    publishTimeline();
    handleNext();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return {
          stepName: "Publish",
          label: "Publish timeline!",
          component: publishDialog,
          action: publishAndNext,
          buttonText: "Publish",
        };
      case 1:
        return {
          stepName: "Export and Share",
          label: "Export and Share",
          component: shareDialog,
          action: handleNext,
          buttonText: "Next",
        };
      case 2:
        return {
          stepName: "Create Account",
          label: "Create Account (optional)",
          component: "Create an account to edit your timeline later!",
          action: finish,
          buttonText: "Finish",
        };
      default:
        return "Unknown step";
    }
  }
  const isStepOptional = (step) => {
    return step === 2;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="">
      {/* stepper */}
      <Stepper
        activeStep={activeStep}
        className={classes.root}
        alternativeLabel
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption" align="center">
                Optional
              </Typography>
            );
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                classes={{
                  labelContainer: "centered-div",
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>
          {/* content */}
          {/* <Typography
            className={classes.instructions}
            style={{ margin: " 0px 30px" }}
          >
            {getStepContent(activeStep).label}
          </Typography> */}
          {getStepContent(activeStep).component}
          {/* button row */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {activeStep !== 0 && (
              <SecondaryButton onClick={handleBack} text={"back"}>
                Back
              </SecondaryButton>
            )}

            <ActionButton
              text={getStepContent(activeStep).buttonText}
              onClick={getStepContent(activeStep).action}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishStepper;
