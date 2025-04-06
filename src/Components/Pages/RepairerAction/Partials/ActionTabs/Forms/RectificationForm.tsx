import { ChangeEvent, memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { InfoOutlined as InfoIcon } from "@mui/icons-material";
import _startCase from 'lodash/startCase';
import moment, { Moment } from "moment";
import {
  Typography,
  Select,
  TextArea,
  CheckboxGroup,
  Button,
  SelectChangeEvent,
  Link,
  RadioGroup,
  DatePicker
} from "../../../../../UI";
import { REPAIR_OUTCOMES, REPAIR_PARTS } from "../../../../../../Utils/Constants";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { RectificationType, CommonObjType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string
  currentValues: RectificationType | undefined,
  liability: string | undefined,
  toLiabilityChange: () => void,
  isSQT?: boolean
}

const defaultErrors: CommonObjType = {
  outcome: '',
  faultParts: '',
  workDetails: ''
};

const store = 'store';
const repairer = 'repairer';
const partyOptions = [
  { value: store, label: 'Store' },
  { value: repairer, label: 'Repairer' },
];

const yesOption = 'yes';
const noOption = 'no';
const rateOptions = [
  { value: yesOption, label: 'Yes' },
  { value: noOption, label: 'No' },
];
const dateOptions = [
  { value: yesOption, label: 'Yes' },
  { value: noOption, label: 'No' },
];

const RectificationForm = (props: FormType) => {
  const dispatch = useDispatch();
  const {
    currentValues,
    liability = '',
    toLiabilityChange,
    isSQT = false,
  } = props;
  const liabilityValue = _startCase(liability);

  const [outcome, setOutcome] = useState('');
  const [faultParts, setFaultParts] = useState<string[]>([]);
  const [replaceParty, setReplaceParty] = useState(store)
  const [workDetails, setWorkDetails] = useState('');
  const [isCompletedAtQuotedRate,  setIsCompletedAtQuotedRate] = useState(true);
  const [isCompletedToday, setIsCompletedToday] = useState(true);
  const [completedDate, setCompletedDate] = useState(moment())

  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;

    setOutcome(currentValues.outcome);
    setFaultParts(currentValues.faultParts);
    setWorkDetails(currentValues.workDetails);
    setReplaceParty(currentValues.replaceParty || store);
    setIsCompletedAtQuotedRate(!!currentValues.isCompletedAtQuotedRate);
    setIsCompletedToday(!!currentValues.isCompletedToday);

    const momentDate = moment(currentValues.completedDate);
    const currentDate  = momentDate.isValid() ? momentDate : moment();
    setCompletedDate(currentDate);
  }, [currentValues])

  const onChangeOutcome = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setOutcome(value as string);
    setErrors({ ...errors, outcome: '' });
  };

  const onChangeParts = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFaultParts((prevValues: string[]) => {
      if (prevValues.includes(value)) {
        return prevValues.filter(item => item !== value)
      }

      return [...prevValues, value]
    });
    setErrors({ ...errors, faultParts: '' });
  };

  const onChangeWorkDetails = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setWorkDetails(value);
    setErrors({ ...errors, workDetails: '' });
  };

  const onChangeParty = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReplaceParty(value as string);
  };

  const onChangeCompleteState = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const outcome = value === yesOption;
    setIsCompletedAtQuotedRate(outcome);
  };

  const onChangeToday = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const outcome = value === yesOption;
    setIsCompletedToday(outcome);
  };

  const onChangeDate = (date: Moment) => {
    setCompletedDate(date);
  };

  const changeLiability = () => {
    toLiabilityChange();
  };

  const hasErrors = () => {
    let outcomeError = '';
    let faultPartsError = '';
    let workDetailsError = '';
    const validationErrors = [];

    if (!outcome) {
      outcomeError = 'Need to select an outcome to proceed.';
      validationErrors.push(outcomeError);
    }

    if (!faultParts.length) {
      faultPartsError = 'Need to select at least one related area.';
      validationErrors.push(faultPartsError);
    }

    if (!workDetails) {
      workDetailsError = 'Please enter related work details.';
      validationErrors.push(workDetailsError);
    }

    setErrors({
      ...errors,
      outcome: outcomeError,
      faultParts: faultPartsError,
      workDetails: workDetailsError,
    });

    return !!validationErrors.length;
  };

  const onSaveRectification = () => {
    if (hasErrors()) return;

    if (isSQT) {
      const data = {
        outcome,
        faultParts,
        workDetails,
        isCompletedAtQuotedRate,
        isCompletedToday,
        completedDate: completedDate.toString(),
      };
      dispatch(saveCaseActionItems(props.jobId, 'rectification', data));
      return;
    }

    const data = { outcome, faultParts, workDetails, replaceParty };

    dispatch(saveCaseActionItems(props.jobId, 'rectification', data));
  };

  const getSQTElements = () => {
    if (!isSQT) return; 
    
    return (
      <>
        <RadioGroup
          label='Was the repair completed at the quoted rate?'
          value={isCompletedAtQuotedRate ? yesOption : noOption}
          onChange={onChangeCompleteState}
          items={rateOptions}
          orientation="row"
        />
        <RadioGroup
          label='Was the repair completed Today?'
          value={isCompletedToday ? yesOption : noOption}
          onChange={onChangeToday}
          items={dateOptions}
          orientation="row"
        />
        <DatePicker
          label="Chose date when repair was completed" 
          value={completedDate}
          onChange={onChangeDate}
        />
      </>
    )
  }

  return (
    <div className="tab-form rectification">
      <div className="header-section">
        <Typography variant="h3">
          Rectification
        </Typography>
      </div>
      <div className="info-section">
        <InfoIcon className="form-icon"/>
        <Typography>
          Current repair liability: <strong>{liabilityValue}</strong>&nbsp;
        </Typography>
        <Typography>&#40;</Typography>
        <Link className="change-link" color="info" onClick={changeLiability}>
          Change Repairer Liability
        </Link>
        <Typography>&#41;</Typography>
      </div>
      <div className="form-item-section">
        <Select
          label="Please select an outcome"
          value={outcome}
          options={REPAIR_OUTCOMES}
          onChange={onChangeOutcome}
          hasError={!!errors.outcome}
          helpText={errors.outcome}
        />
        {!isSQT && (
          <RadioGroup
            label='Who is to replace the item?'
            value={replaceParty}
            onChange={onChangeParty}
            items={partyOptions}
            orientation="row"
          />
        )}
        <CheckboxGroup
          heading="Select where the fault has occurred"
          orientation="column"
          options={REPAIR_PARTS}
          selectedOptions={faultParts}
          onSelectionChange={onChangeParts}
          hasError={!!errors.faultParts}
          helpText={errors.faultParts}
        />
        <TextArea
          label="Please describe the fault, and work completed"
          value={workDetails}
          onChange={onChangeWorkDetails}
          hasError={!!errors.workDetails}
          helpText={errors.workDetails}
        />
        {getSQTElements()}
        <Button
          variant="contained"
          color="primary"
          onClick={onSaveRectification}
          fullWidth
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default memo(RectificationForm);
