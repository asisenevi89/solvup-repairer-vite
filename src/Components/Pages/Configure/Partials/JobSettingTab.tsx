import { ChangeEvent, memo, useState } from "react";
import { Button, TextArea, TextField, Typography } from "../../../UI";

const JobSettingTab = () => {
  const [minimumFee, setMinimumFee] = useState(0.00);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [advertiseMessage, setAdvertiseMessage] = useState('');

  const onChangeMinimumFee = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMinimumFee(Number(value));
  };

  const onChangeDeliveryNote = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDeliveryNote(value);
  };

  const onChangeAdvertiseMsg = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAdvertiseMessage(value);
  };

  return (
    <div className="job-setting-tab">
      <div className="field-container">
        <div className="field-column">
          <div className="section-title">
            <Typography variant="h4">Other Information</Typography>
          </div>
          <div className="field-section column-flex">
            <Typography variant="h4">
              Minimum assessment fee for quoting on a product
            </Typography>
            <TextField
              label="Enter 0.00 if you do not charge a minimum  assessment fee $"
              value={minimumFee}
              type="number"
              onChange={onChangeMinimumFee}
            />
          </div>
          <div className="field-section">
            <Typography variant="h4">
              Delivery note, to appear on consignments of products
            </Typography>
            <Typography>
              Use this for any required delivery notes that should be attached to a product when sent from the store.
            </Typography>
            <TextArea
              value={deliveryNote}
              onChange={onChangeDeliveryNote}
            />
          </div>
        </div>
        <div className="field-column">
          <div className="section-title">
            <Typography variant="h4">Advertise Message</Typography>
          </div>
          <div className="field-section">
            <Typography variant="h4">
              A short message to appear to stores when selecting which repairer to use.
            </Typography>
            <TextArea
              value={advertiseMessage}
              onChange={onChangeAdvertiseMsg}
            />
          </div>
        </div>
      </div>
      <div className="action-section">
        <Button color="primary" variant="contained">Save</Button>
      </div>
    </div>
  );
};

export default memo(JobSettingTab);
