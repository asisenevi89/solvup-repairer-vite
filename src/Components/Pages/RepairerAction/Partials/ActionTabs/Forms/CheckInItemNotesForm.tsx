import { memo, useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import {
  Info as InfoIcon,
  Warning as WarningIcon
} from "@mui/icons-material";
import { Typography, TextArea, Link, Button, TextField, Alert } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { CheckInItemType, CommonObjType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: CheckInItemType | undefined;
  itemLink?: string;
  hasReference?: boolean
};

const defaultErrors: CommonObjType = {
  notes: '',
  referenceNumber: '',
};

const CheckInItemNotesForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues, itemLink,  hasReference = false} = props;

  const [notes, setNotes] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;

    setNotes(currentValues.notes || '');
    setReferenceNumber(currentValues.referenceNumber || '');
  }, [currentValues]);

  const onChangeNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNotes(value);
    setErrors({
      ...errors,
      notes: '',
    });
  };

  const onChangeReference = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReferenceNumber(value);
    setErrors({
      ...errors,
      referenceNumber: '',
    });
  };

  const hasErrors = () => {
    let notesError = '';
    let referenceNumberError = '';
    const validationErrors = [];

    if (!notes) {
      notesError = 'Please enter notes proceed.';
      validationErrors.push(notesError);
    }

    if (hasReference && !referenceNumber) {
      referenceNumberError = 'Please enter valid reference number.';
      validationErrors.push(referenceNumberError);
    }

    setErrors({
      ...errors,
      notes: notesError,
      referenceNumber: referenceNumberError,
    });

    return !!validationErrors.length;
  };

  const saveCheckIn = () => {
    if (hasErrors()) return;

    let data = { ...currentValues, notes };

    if (hasReference) {
      data = {
        ...data,
        referenceNumber,
      }
    }
    dispatch(saveCaseActionItems(jobId, 'checkInItem', data));
  };

  const getInfoAlert = () => {
    if (hasReference) {
      return `Please enter Reference number below and click the 'Upload RA' button to upload RA number into system.`
    }

    return `Click the 'Item Received' button below to acknowledge that you have received the item.`
  }

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Pickup Item</Typography>
      </div>
      <div className="form-item-section check-in-notes">
        {!hasReference && (
          <Alert
            severity="error"
            className="alert-section"
            icon={<WarningIcon className="alert-icon" />}
          >
            <Typography className="alert-text">
              If you have received the item from the store, this means that
              the store has failed to &apos;check out&apos; the item form
              their premises. You can still check in the item but please
              make a note of it in the comments box.
            </Typography>
          </Alert>
        )}
        <Alert
          severity="info"
          className="alert-section info"
          icon={<InfoIcon className="alert-icon" />}
        >
          <Typography className="alert-text">
            {getInfoAlert()}
          </Typography>
        </Alert>
        <TextArea
          label="Enter any notes"
          value={notes}
          onChange={onChangeNotes}
          helpText={errors.notes}
          error={!!errors.notes}
        />
        {hasReference && (
          <TextField
            label="Repair/Return Reference Number"
            value={referenceNumber}
            onChange={onChangeReference}
            hasError={!!errors.referenceNumber}
            helperText={errors.referenceNumber}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={saveCheckIn}
          fullWidth
        >
          {hasReference ? 'Upload Reference Number' : 'Item Received'}
        </Button>
        {hasReference && <Button variant="text">Cancel</Button>}

        {itemLink && !hasReference && (
          <Link href={itemLink}>
            To enter an Reference Number before you have received the item, click here
          </Link>
        )}
      </div>
    </div>
  )
}

export default memo(CheckInItemNotesForm);
