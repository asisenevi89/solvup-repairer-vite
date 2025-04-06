import { memo, useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import _startCase from 'lodash/startCase';
import { Typography, Button, RadioGroup, TextArea } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { CommonObjType, RepairAssessmentOutcomeType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: RepairAssessmentOutcomeType | undefined;
};

const eligible = 'eligible';
const ineligible = 'ineligible';
const termResults = [eligible, ineligible];

const repairable = 'Yes, I can repair the item.';
const notRepairable = 'No, I cannot repair the item, recommending product replacement.';
const repairResults = [repairable, notRepairable];

const defaultErrors: CommonObjType = {
  assessmentDetails: '',
};

const RepairAssessmentOutcomeForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues } = props;

  const [isEligible, setIsEligible] = useState(true);
  const [isRepairable, setIsRepairable] = useState(true);
  const [assessmentDetails, setAssessmentDetails] = useState('');
  const [errors, setErrors] = useState(defaultErrors)

  useEffect(() => {
    if (!currentValues) return;

    setIsEligible(currentValues.isEligible);
    setIsRepairable(currentValues.isRepairable);
    setAssessmentDetails(currentValues.assessmentDetails);
  }, [currentValues]);

  const onChangeEligibility = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const outcome = value === eligible;
    setIsEligible(outcome);
  };

  const onChangeRepairable = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const repair = value === repairable;
    setIsRepairable(repair);
  };

  const onChangeDetails = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAssessmentDetails(value);
    setErrors({
      ...errors,
      assessmentDetails: '',
    });
  };

  const hasErrors = () => {
    let detailsError = '';
    const validationErrors = [];

    if (!assessmentDetails) {
      detailsError = 'Please enter details of assessment.';
      validationErrors.push(detailsError);
    }

    setErrors({
      ...errors,
      assessmentDetails: detailsError,
    });

    return !!validationErrors.length;
  };

  const getTermOptions = () => (
    termResults.map(item => ({
      value: item,
      label: `${_startCase(item)} for Repair`,
    }))
  );

  const getRepairOptions = () => (
    repairResults.map(item => ({ value: item, label: item}))
  );


  const onConfirm = () => {
    if (hasErrors()) return;

    const data = { isRepairable, isEligible, assessmentDetails }

    dispatch(saveCaseActionItems(jobId, 'repairAssessmentOutcome', data));
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Repair Assessment Outcome</Typography>
      </div>
      <div className='form-item-section with-repair-assess'>
        <RadioGroup
          label='Is the fault recover under the terms of the plan?'
          value={isEligible ? eligible : ineligible }
          onChange={onChangeEligibility}
          items={getTermOptions()}
          orientation="row"
        />
        <TextArea
          label="Details of Assessment"
          value={assessmentDetails}
          onChange={onChangeDetails}
          helpText={errors.assessmentDetails}
          hasError={!!errors.assessmentDetails}
        />
        <RadioGroup
          label='Is the item repairable?'
          value={isRepairable ? repairable : notRepairable }
          onChange={onChangeRepairable}
          items={getRepairOptions()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          fullWidth
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default memo(RepairAssessmentOutcomeForm);
