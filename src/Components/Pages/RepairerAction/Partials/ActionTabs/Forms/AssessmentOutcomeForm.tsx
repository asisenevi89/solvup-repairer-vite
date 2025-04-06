import { memo, useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import _startCase from 'lodash/startCase';
import {
  Typography,
  Select,
  Button,
  RadioGroup,
  SelectChangeEvent,
  TextArea,
} from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { AssessmentOutcomeType, CommonObjType } from "../../../../../../CustomTypes";
import { CONSIGN_REASONS } from "../../../../../../Utils/Constants";

type FormType = {
  jobId: string,
  currentValues: AssessmentOutcomeType | undefined;
};

const approved = 'approved';
const rejected = 'rejected';
const outcomeOptions = [approved, rejected];

const defaultErrors: CommonObjType = {
  rejectReason: '',
  detailsOfOutcome: '',
};

const ConfirmAssessmentForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues } = props;

  const [isApproved, setIsApproved] = useState(true);
  const [rejectReason, setRejectReason] = useState('');
  const [detailsOfOutcome, setDetailsOfOutcome] = useState('');
  const [errors, setErrors] = useState(defaultErrors)

  useEffect(() => {
    if (!currentValues) return;

    setIsApproved(currentValues.isApproved);
    setRejectReason(currentValues.rejectReason);
    setDetailsOfOutcome(currentValues.detailsOfOutcome);
  }, [currentValues]);

  const onChangeOutcome = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const outcome = value === approved;
    setIsApproved(outcome);
  };

  const onChangeReason = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setRejectReason(value as string);
    setErrors({
      ...errors,
      rejectReason: '',
    });
  };

  const onChangeDetails = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDetailsOfOutcome(value);
    setErrors({
      ...errors,
      detailsOfOutcome: '',
    });
  };

  const hasErrors = () => {
    let reasonError = '';
    let detailsError = '';
    const validationErrors = [];

    if (!isApproved && !rejectReason) {
      reasonError = 'Please select a reject reason.';
      validationErrors.push(reasonError);
    }

    if (!detailsOfOutcome) {
      detailsError = 'Please enter details of outcome.';
      validationErrors.push(detailsError);
    }

    setErrors({
      ...errors,
      rejectReason: reasonError,
      detailsOfOutcome: detailsError,
    });

    return !!validationErrors.length;
  };

  const getOutcomeOptions = () => (
    outcomeOptions.map(item => ({
      value: item,
      label: `${_startCase(item)} Replacement`,
    }))
  );

  const onConfirm = () => {
    if (hasErrors()) return;

    const data = { isApproved, rejectReason, detailsOfOutcome }

    dispatch(saveCaseActionItems(jobId, 'assessmentOutcome', data));
  };

  const getFormClass = () => {
    let className = 'form-item-section with-assess-outcome approve'

    if (!isApproved) {
      className = 'form-item-section with-assess-outcome'
    }

    return className;
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Assessment Outcome</Typography>
      </div>
      <div className={getFormClass()}>
        <RadioGroup
          label='What is the outcome of this assignment'
          value={isApproved ? approved : rejected}
          onChange={onChangeOutcome}
          items={getOutcomeOptions()}
          orientation="row"
        />
        {!isApproved && (
          <Select
            label="Select Action to Reject Request"
            value={rejectReason}
            options={CONSIGN_REASONS}
            onChange={onChangeReason}
            helpText={errors.rejectReason}
            hasError={!!errors.rejectReason}
          />
        )}
        <TextArea
          label="Details of Outcome"
          value={detailsOfOutcome}
          onChange={onChangeDetails}
          helpText={errors.detailsOfOutcome}
          hasError={!!errors.detailsOfOutcome}
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

export default memo(ConfirmAssessmentForm);
