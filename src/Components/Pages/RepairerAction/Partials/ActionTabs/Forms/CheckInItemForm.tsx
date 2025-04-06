import { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Info as InfoIcon } from "@mui/icons-material";
import moment, { Moment } from "moment";
import { Typography, Alert, DatePicker, Button } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { CheckInItemType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
  currentValues: CheckInItemType | undefined;
  hideDate?: boolean
};

const CheckInItemForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues, hideDate = false } = props;

  const [checkInDate, setCheckInDate] = useState(moment());

  useEffect(() => {
    if (!currentValues) return;
    
    const momentDate = moment(currentValues.date);
    const currentDate  = momentDate.isValid() ? momentDate : moment();
    setCheckInDate(currentDate);
  }, [currentValues]);

  const onChangeDate = (date: Moment) => {
    setCheckInDate(date);
  };

  const saveCheckIn = () => {
    if (hideDate) {
      const data = { status: true };
      dispatch(saveCaseActionItems(jobId, 'checkInItem', data));
      return;
    }

    const data = { ...currentValues,  date: checkInDate.toString() };
    dispatch(saveCaseActionItems(jobId, 'checkInItem', data));
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Check In Item</Typography>
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
        {!hideDate && <DatePicker label="CheckIn Date" value={checkInDate} onChange={onChangeDate}/>}
        <Button
          variant="contained"
          color="primary"
          onClick={saveCheckIn}
          fullWidth
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default memo(CheckInItemForm);
