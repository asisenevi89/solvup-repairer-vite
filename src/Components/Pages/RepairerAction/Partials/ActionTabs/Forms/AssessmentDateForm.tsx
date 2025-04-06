import { ChangeEvent, memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Warning as WarningIcon } from "@mui/icons-material";
import moment, { Moment } from "moment";
import {
  Typography, 
  Select,
  TextArea,
  Alert,
  DatePicker,
  SelectChangeEvent,
  Button
 } from "../../../../../UI";
import { CONSIGN_REASONS } from "../../../../../../Utils/Constants";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { AssessmentDateType, CommonObjType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: AssessmentDateType | undefined
}

const defaultErrors: CommonObjType = {
  reason: '',
  bookedDate: '',
  remarks: ''
};

const AssessmentDateFrom = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues } = props;

  const [reason, setReason] = useState('');
  const [bookedDate, setBookedDate] = useState(moment());
  const [remarks, setRemarks] = useState('');
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;

    const momentDate = moment(currentValues.date);
    const dateValue = momentDate.isValid() ? momentDate : moment();
    const currentRemarks = currentValues.remarks || '';

    setReason(currentValues.reason);
    setBookedDate(dateValue);
    setRemarks(currentRemarks);
  }, [currentValues]);

  const onChangeReason = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setReason(value as string);
    setErrors({
      ...errors,
      reason: '',
    });
  };

  const onChangeDate = (date: Moment) => {
    setBookedDate(date);
  };

  const onChangeRemarks = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRemarks(value);
  };

  const hasErrors = () => {
    let reasonError = '';
    const validationErrors = [];

    if (!reason) {
      reasonError = 'Please select a reason.';
      validationErrors.push(reasonError);
    }

    setErrors({
      ...errors,
      reason: reasonError,
    });

    return !!validationErrors.length;
  };

  const saveDate = () => {
    if (hasErrors()) return;

    const data = {
      date: bookedDate.toJSON(),
      reason,
      remarks,
    };

    dispatch(saveCaseActionItems(jobId, 'assessmentDate', data));
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">
          Confirm Assessment Booked Date
        </Typography>
      </div>
      <div className="form-item-section with-date">
        <DatePicker label="Booked Date" value={bookedDate} onChange={onChangeDate}/>
        <Alert severity="error" className="alert-section" icon={<WarningIcon className="alert-icon" />}>
          <Typography className="alert-text">
            Warning: Repeated overuse mat lead to removal of this function on your
            account
          </Typography>
        </Alert>
        <Select
          label="Select Reason"
          value={reason}
          options={CONSIGN_REASONS}
          onChange={onChangeReason}
          helpText={errors.reason}
          hasError={!!errors.reason}
        />
        <TextArea
          label="Remarks"
          value={remarks}
          onChange={onChangeRemarks}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={saveDate}
          fullWidth
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default memo(AssessmentDateFrom);
