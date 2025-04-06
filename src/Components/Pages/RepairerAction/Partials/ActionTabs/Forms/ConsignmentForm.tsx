import { ChangeEvent, memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { InfoOutlined as InfoIcon } from "@mui/icons-material";
import { Typography, Select, TextArea, TextField, Button, SelectChangeEvent } from "../../../../../UI";
import { COURIERS } from "../../../../../../Utils/Constants";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { CommonObjType, ConsignmentNoteType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string
  currentValues: ConsignmentNoteType | undefined
}

const defaultErrors: CommonObjType = {
  courier: '',
  noteNumber: '',
  comments: ''
};

const ConsignmentForm = (props: FormType) => {
  const dispatch = useDispatch();
  const { currentValues } = props;

  const [courier, setCourier] = useState('');
  const [noteNumber, setNoteNumber] = useState('');
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;

    setCourier(currentValues.courier);
    setNoteNumber(currentValues.noteNumber.toString());
    setComments(currentValues.comments || '');
  }, [currentValues])

  const onChangeCourier = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setCourier(value as string);
    setErrors({
      ...errors,
      courier: '',
    });
  };

  const onChangeNoteNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNoteNumber(value);
    setErrors({
      ...errors,
      noteNumber: '',
    });
  };

  const onChangeComments = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setComments(value);
  };

  const hasErrors = () => {
    let courierError = '';
    let noteNumberError = '';
    const validationErrors = [];

    if (!courier) {
      courierError = 'Need to select a courier to proceed.';
      validationErrors.push(courierError);
    }

    if (!noteNumber) {
      noteNumberError = 'Consignment Note number cannot be empty.';
      validationErrors.push(noteNumberError);
    }

    setErrors({
      ...errors,
      courier: courierError,
      noteNumber: noteNumberError,
    });

    return !!validationErrors.length;
  };

  const saveConsignmentNote = () => {
    if (hasErrors()) return;

    const data = {
      courier,
      noteNumber,
      comments,
    };

    dispatch(saveCaseActionItems(props.jobId, 'consignmentNote', data));
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">
          Send Consignment Note
        </Typography>
      </div>
      <div className="info-section">
        <InfoIcon className="form-icon"/>
        <Typography>
          Please enter tracking information
        </Typography>
      </div>
      <div className="form-item-section">
        <Select
          label="Select the courier"
          value={courier}
          options={COURIERS}
          onChange={onChangeCourier}
          helpText={errors.courier}
          hasError={!!errors.courier}
        />
        <TextField
          type="number"
          label="Consignment Note Number"
          value={noteNumber}
          onChange={onChangeNoteNumber}
          helperText={errors.noteNumber}
          hasError={!!errors.noteNumber}
        />
        <TextArea
          label="Please enter any additional comments"
          value={comments}
          onChange={onChangeComments}
          helpText={errors.comments}
          error={!!errors.comments}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={saveConsignmentNote}
          fullWidth
        >
          Send Consignment Note
        </Button>
      </div>
    </div>
  )
}

export default memo(ConsignmentForm);
