import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepButton,
} from "@material-ui/core";
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
  formSubmitted,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const publishAndNext = async () => {
    let success = await publishTimeline();
    if (success) handleNext();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return {
          stepName: "Publish",
          label: "Publish timeline!",
          component: publishDialog,
          action: !formSubmitted ? publishAndNext : handleNext,
          buttonText: !formSubmitted ? "Publish" : "Next",
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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div className="">
      {/* stepper */}
      <Stepper
        nonLinear
        activeStep={activeStep}
        className={classes.root}
        alternativeLabel
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = (
              <Typography variant="caption" align="center">
                Optional
              </Typography>
            );
          }

          return (
            <Step key={label}>
              <StepButton onClick={handleStep(index)} {...buttonProps}>
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>
          {/* content */}

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
              // disabled={activeStep === 0 && formSubmitted}
              // disabledMessage={
              //   activeStep === 0 && formSubmitted
              //     ? "You've already published this timeline!"
              //     : ""
              // }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishStepper;
