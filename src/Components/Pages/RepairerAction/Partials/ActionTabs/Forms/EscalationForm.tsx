import { memo, useState, useEffect, ChangeEvent } from "react";
import { Warning as WarningIcon } from "@mui/icons-material";
import { Typography, Alert, TextArea, Button } from "../../../../../UI";
import { CommonObjType, EscalationCaseType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: EscalationCaseType | undefined;
};

const defaultErrors: CommonObjType = {
  escalationNotes: ''
};

const ItemForm = (props: FormType) => {
  const { currentValues } = props;

  const [escalationNotes, setEscalationNotes] = useState('');
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;
    
    setEscalationNotes(currentValues.escalationNotes);
  }, [currentValues]);

  const onChangeNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setEscalationNotes(value);
    setErrors({
      ...errors,
      escalationNotes: '',
    });
  };

  const hasErrors = () => {
    let escalationNoteError = '';
    const validationErrors = [];

    if (!escalationNotes) {
      escalationNoteError = 'Please enter a note.';
      validationErrors.push(escalationNoteError);
    }

    setErrors({
      ...errors,
      escalationNotes: escalationNoteError,
    });

    return !!validationErrors.length;
  };

  const saveEscalation = () => {
    if (hasErrors()) return;
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Escalate Case</Typography>
      </div>
      <div className="info-section">
        <Typography variant="h4">
          Make this case for escalation to Square Trade Management
        </Typography>
      </div>
      <div className="form-item-section with-escalation">
        <Alert
          severity="error"
          className="alert-section"
          icon={<WarningIcon className="alert-icon" />}
        >
          <Typography className="alert-text">
            Warning: Repeated overuse mat lead to removal of this function on your
            account
          </Typography>
        </Alert>
        <TextArea
          label="Enter a note about this action"
          value={escalationNotes}
          onChange={onChangeNotes}
          helpText={errors.escalationNotes}
          error={!!errors.escalationNotes}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={saveEscalation}
          fullWidth
        >
          Escalate the Case
        </Button>
      </div>
    </div>
  )
}

export default memo(ItemForm);
