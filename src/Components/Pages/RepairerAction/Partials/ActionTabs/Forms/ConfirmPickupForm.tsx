import { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Info as InfoIcon } from "@mui/icons-material";
import moment, { Moment } from "moment";
import { Typography, Alert, DatePicker, Button } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { PickupConfirmType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: PickupConfirmType | undefined;
};

const ConfirmPickupForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues } = props;

  const [pickupDate, setPickupInDate] = useState(moment());

  useEffect(() => {
    if (!currentValues) return;
    
    const momentDate = moment(currentValues.date);
    const currentDate  = momentDate.isValid() ? momentDate : moment();
    setPickupInDate(currentDate);
  }, [currentValues]);

  const onChangeDate = (date: Moment) => {
    setPickupInDate(date);
  };

  const savePickup = () => {
    const data = { date: pickupDate.toString() };
    dispatch(saveCaseActionItems(jobId, 'pickupConfirm', data));
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Confirm Pickup</Typography>
      </div>
      <div className="form-item-section with-check-in">
        <Alert
          severity="info"
          className="alert-section info"
          icon={<InfoIcon className="alert-icon" />}
          >
          <Typography className="alert-text">
            Please check the item in. If you&apos;ve received the product earlier than
            today, select the appropriate date below.
          </Typography>
        </Alert>
        <DatePicker label="Pickup Date" value={pickupDate} onChange={onChangeDate}/>
        <Button
          variant="contained"
          color="primary"
          onClick={savePickup}
          fullWidth
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default memo(ConfirmPickupForm);
