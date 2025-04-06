import { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Info as InfoIcon } from "@mui/icons-material";
import moment, { Moment } from "moment";
import { Typography, Alert, DatePicker, Button } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { PartsOnOrderType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: PartsOnOrderType | undefined;
  showAlert?: boolean,
  showDate?: boolean,
};


const PartsOnOrderForm = (props: FormType) => {
  const dispatch = useDispatch();

  const {
    jobId,
    currentValues,
    showAlert = true,
    showDate = false,
   } = props;

  const [etaOnParts, setEtaOnParts] = useState(moment());
  const [_, setSubmitted] = useState(false);

  useEffect(() => {
    if (!currentValues) return;
    
    const momentDate = moment(currentValues.etaOnParts);
    const currentDate  = momentDate.isValid() ? momentDate : moment();
    setEtaOnParts(currentDate);
    setSubmitted(!!currentValues.submitted);

  }, [currentValues]);

  const onChangeDate = (date: Moment) => {
    setEtaOnParts(date);
  };

  const saveCheckIn = () => {
    let data: PartsOnOrderType = {
      submitted: true,
    };

    if (showDate) {
      data = {
        ...data,
        etaOnParts: etaOnParts.toString(),
      }
    }
    dispatch(saveCaseActionItems(jobId, 'partsOnOrder', data));
  };

  const getFormClasses = () => {
    let classes = 'form-item-section with-parts-eta';

    if (showAlert && !showDate) {
      classes = `${classes} alert`
    }

    if (showDate && !showAlert) {
      classes = `${classes} date`
    }

    if (showDate && showAlert) {
      classes = `${classes} date-alert`
    }

    return classes;
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Parts on Order</Typography>
      </div>
      <div className={getFormClasses()}>
        {showDate && (
          <div className="info-section no-icon">
            <Typography>
              Please indicate an ETA for the parts that you've ordered.
            </Typography>
          </div>
        )}
        {showAlert && (
          <Alert
            severity="info"
            className="alert-section info"
            icon={<InfoIcon className="alert-icon" />}
          >
            <Typography className="alert-text">
              Click the &apos;Parts on Order&apos; button to indicate that you are
              waiting parts for repair.
            </Typography>
          </Alert>
        )}
        {showDate && (
          <DatePicker label="ETA on Parts" value={etaOnParts} onChange={onChangeDate}/>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={saveCheckIn}
          fullWidth
        >
          {showAlert ? 'Parts on Order' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

export default memo(PartsOnOrderForm);
