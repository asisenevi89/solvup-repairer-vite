import { memo, useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextArea, Link, Button } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { CommonObjType, PickupItemType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: PickupItemType | undefined;
  itemLink?: string;
  hasNotes?: boolean;
};

const defaultErrors: CommonObjType = {
  'notes': ''
};

const PickupItemForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues, itemLink, hasNotes = false } = props;

  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;

    setNotes(currentValues.notes || '');
  }, [currentValues]);

  const onChangeNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNotes(value);
    setErrors({
      ...errors,
      notes: '',
    });
  };

  const hasErrors = () => {
    let notesError = '';
    const validationErrors = [];

    if (hasNotes && !notes) {
      notesError = 'Please enter notes proceed.';
      validationErrors.push(notesError);
    }

    setErrors({
      ...errors,
      notes: notesError,
    });

    return !!validationErrors.length;
  };

  const saveCheckIn = () => {
    if (hasErrors()) return; 
    
    let data: PickupItemType = { status: true };
    if (hasNotes) {
      data = {
        ...data,
        notes,
      }
    }
    dispatch(saveCaseActionItems(jobId, 'pickupItem', data));
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Pickup Item</Typography>
      </div>
      <div className="info-section">
        <Typography>
          You have indicated that you offer a free pickup and return service for
          this vendor to this store's postcode. Please arrange for the pickup of
          the item.
        </Typography>
      </div>
      <div className="form-item-section with-check-in">
        {hasNotes && (
          <TextArea
            label="Enter any notes"
            value={notes}
            onChange={onChangeNotes}
            helpText={errors.notes}
            error={!!errors.notes}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={saveCheckIn}
          fullWidth
        >
          Item Received
        </Button>
        {itemLink && hasNotes && (
          <Link href={itemLink}>
            To enter an Reference Number before you have received the item, click here
          </Link>
        )}
      </div>
    </div>
  )
}

export default memo(PickupItemForm);
