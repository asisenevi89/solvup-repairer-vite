import { ReactNode, memo } from 'react';
import Stepper, { StepperProps } from '@mui/material/Stepper';
import Step, { StepProps } from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel, { StepLabelProps } from '@mui/material/StepLabel';

interface CustomStepProps extends StepProps {
  label: ReactNode,
  value: string,
  stepLabelProps?: StepLabelProps,
}

export interface CustomStepperProps extends StepperProps {
  wrapperClass?: string,
  onStepClick?: (value: string) => void,
  steps: CustomStepProps[]
}; 

const CustomStepper = (props: CustomStepperProps) => {
  const {
    wrapperClass,
    onStepClick,
    steps,
    ...stepperProps
  } = props;

  return (
    <div className={`custom-stepper ${wrapperClass}`}>
      <Stepper {...stepperProps}>
      {steps.map(step => {
          const { value, label, stepLabelProps, ...restStepProps } = step;

          return (
            <Step key={value} {...restStepProps}>
              {onStepClick ?
                <StepButton color="inherit" onClick={() => onStepClick(value)}>
                  {label}
                </StepButton> :
                <StepLabel {...stepLabelProps}>{label}</StepLabel>
              }
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default memo(CustomStepper);
