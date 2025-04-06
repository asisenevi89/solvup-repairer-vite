import { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Info as InfoIcon } from "@mui/icons-material";
import { Typography, Alert, Button } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { ConfirmAssessmentType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: ConfirmAssessmentType | undefined;
};

const ConfirmAssessmentForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues } = props;

  const [_, setConfirmedAssessment] = useState(false);

  useEffect(() => {
    if (!currentValues) return;
    
    setConfirmedAssessment(currentValues);
  }, [currentValues]);


  const onConfirm = () => {
    dispatch(saveCaseActionItems(jobId, 'confirmAssessment', true));
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Confirm Assessment</Typography>
      </div>
      <div className="form-item-section with-confirm-assess">
        <Alert
          severity="info"
          className="alert-section info"
          icon={<InfoIcon className="alert-icon" />}
        >
          <Typography className="alert-text">
            Click the &apos;confirm&apos; button to acknowledge that the assessment for this
            product has commenced.
          </Typography>
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          fullWidth
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default memo(ConfirmAssessmentForm);
