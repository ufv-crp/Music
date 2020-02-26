import React, { useState } from "react";
import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel
} from "@material-ui/core";

import useStyles from "./styles";

const steps = ["Part A", "Part B", "Part C"];

function Wizard(props) {
  const { field1, field2, field3, field4, field5, field6 } = props;

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const [formValues, setFormValues] = useState({
    field1,
    field2,
    field3,
    field4,
    field5,
    field6
  });

  const handleNext = newValues => {
    setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep + 1);
  };

  const handleBack = newValues => {
    setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    const isLastStep = activeStep === steps.length - 1;

    switch (step) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      default:
        throw new Error("Mis-step!");
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <Typography className={classes.instructions}>
            All steps completed - you&apos;re finished
          </Typography>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
}

export default Wizard;
