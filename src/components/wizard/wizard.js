import React, { useState } from "react";
import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid
} from "@material-ui/core";

import useStyles from "./styles";

import { Formik, Field } from "formik";

import { TextField } from "formik-material-ui";

const steps = ["Basic Info", "Address", "Contact"];

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
        return (
          <Formik>
            {formik => (
              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <Field
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    component={TextField}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Field
                    name="secondName"
                    label="Second Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    component={TextField}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Field
                    name="matriculation"
                    label="Matriculation"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    component={TextField}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Field
                    name="cpf"
                    label="CPF"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
              </Grid>
            )}
          </Formik>
        );
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
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <Typography className={classes.instructions}>
            All steps completed - finished!
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
