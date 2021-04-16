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
  return ["Publish", "Create Account", "Save and Export"];
}

function getButtonText() {
  return ["Publish", "Next", "Finish"];
}

const PublishStepper = ({ publishDialog, shareDialog, finish }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return { label: "Publish timeline!", component: publishDialog };
      case 1:
        return { label: "Create Account (optional)", component: null };
      case 2:
        return { label: "Export and Share", component: shareDialog };
      default:
        return "Unknown step";
    }
  }
  const isStepOptional = (step) => {
    return step === 1;
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
        classes={{
          root: "centered-div",
        }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>
          {/* content */}
          <Typography
            className={classes.instructions}
            style={{ margin: " 0px 30px" }}
          >
            {getStepContent(activeStep).label}
          </Typography>
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
              text={getButtonText()[activeStep]}
              onClick={
                activeStep !== getSteps().length - 1 ? handleNext : finish
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishStepper;
