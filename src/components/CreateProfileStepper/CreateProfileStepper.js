import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import CreateProfileForm from '../../components/CreateProfileForm/CreateProfileForm';
import CreateCompanyProfileForm from '../../components/CreateProfileForm/CreateCompanyProfileForm';
import QontoConnector from '../../components/CreateProfileStepper/QontoConnector/QontoConnector';
import { useAuth } from '../../services/authentication';
import styles from './CreateProfile.module.css';
import { USER_ROLES } from '../../constants/user.constants';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Personal info', 'Contacts', 'Description'];
  const { user } = useAuth();
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleMovToFirstPage = () => {
    setActiveStep(0);
  };

  const handleStepCLick = (index) => () => {
    setActiveStep(index);
  };

  return (
    user && (
      <div className={styles.stepperWrapper}>
        <Stepper
          className={styles.stepper}
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label, idx) => (
            <Step onClick={handleStepCLick(idx)} key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {user.role === USER_ROLES.user ? (
          <CreateProfileForm
            activeStep={activeStep}
            steps={steps}
            handleBackButton={handleBack}
            moveToFirstPage={handleMovToFirstPage}
            handleNext={handleNext}
          />
        ) : (
          <CreateCompanyProfileForm
            activeStep={activeStep}
            steps={steps}
            handleBackButton={handleBack}
            moveToFirstPage={handleMovToFirstPage}
            handleNext={handleNext}
          />
        )}
      </div>
    )
  );
}

export default CustomizedSteppers;
