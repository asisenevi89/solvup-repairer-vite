import { ChangeEvent, memo, useState } from "react";
import { getRepairerData } from "../../../../Utils/Helpers";
import {
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Button,
} from "../../../UI";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { STATES } from "../../../../Utils/Constants";

const available = 'available';
const unavailable = 'unavailable';
const availabilityOptions = [
  {
    value: available,
    label: (
      <div className="available-option available">
        <CheckCircleIcon />
        <span>Available</span>
      </div>
    ),
  },
  {
    value: unavailable,
    label: (
      <div className="available-option unavailable">
        <InfoIcon />
        <span>Unavailable</span>
      </div>
    ),
  },
];

const ChangeDetailsTab = ()  => {
  const accountData = getRepairerData();
  const {
    name,
    email,
    retailerSupportLine,
    abn,
    customerSupportLine = '',
    suburb,
    address,
    postcode,
    state,
    website,
    status,
  } = accountData;
  const savedStatus = status ? available : unavailable;

  const [availability, setAvailability] = useState(savedStatus);
  const [repairerName, setRepairerName] = useState(name);
  const [repairerEmail, setRepairerEmail] = useState(email);
  const [supportLine, setSupportLine] = useState(retailerSupportLine);
  const [repairerAbn, setRepairerAbn] = useState(abn);
  const [customerLine, setCustomerLine] = useState(customerSupportLine);
  const [repairerSuburb, setRepairerSuburb] = useState(suburb);
  const [repairerAddress, setRepairerAddress] = useState(address);
  const [repairerPostcode, setRepairerPostcode] = useState(postcode);
  const [repairerState, setRepairerState] = useState(state);
  const [repairerWebsite, setRepairerWebsite] = useState(website);

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerName(value);
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerEmail(value);
  };

  const onSupportChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSupportLine(value);
  };

  const onChangeAbn = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerAbn(value);
  };

  const onChangeCustomerLine = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCustomerLine(value);
  };

  const onSuburbChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerSuburb(value);
  };

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerAddress(value);
  };

  const onChangePostcode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerPostcode(value);
  };

  const onChangeState = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setRepairerState(value as string);
  };

  const onChangeWebsite = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerWebsite(value);
  };

  const onChangeAvailability = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setAvailability(value as string);
  };
 
  return (
    <div className="change-details-tab">
      <div className="data-section">
        <div className="details-section">
          <div className="section-title">
            <Typography variant="h4">Update Contact Details</Typography>
          </div>
          <div className="text-row">
            <TextField 
              wrapperClass="text-row-item"
              label="Name"
              value={repairerName}
              onChange={onNameChange}
            />
            <TextField
              wrapperClass="text-row-item"
              label="Email" value={repairerEmail}
              onChange={onEmailChange}
            />
            <TextField
              wrapperClass="text-row-item"
              label="Retailer Support Line"
              value={supportLine}
              onChange={onSupportChange}
            />
          </div>
          <div className="text-row">
            <TextField
              wrapperClass="text-row-item"
              label="ABN" value={repairerAbn}
              onChange={onChangeAbn}
            />
            <TextField
              wrapperClass="text-row-item"
              label="Customer Support Line"
              value={customerLine}
              onChange={onChangeCustomerLine}
            />
            <TextField
              wrapperClass="text-row-item"
              label="Website"
              value={repairerWebsite}
              onChange={onChangeWebsite}
            />
          </div>
          <div className="text-row">
            <TextField
              wrapperClass="two-third text-row-item"
              label="Address" value={repairerAddress}
              onChange={onChangeAddress}
            />

          </div>
          <div className="text-row ">
            <Select
              wrapperClass="text-row-item"
              className="state-select"
              label="State"
              options={STATES}
              value={repairerState}
              onChange={onChangeState}
              formItemProps={{ fullWidth: false }}
            />
            <TextField
              wrapperClass="text-row-item"
              label="Suburb"
              value={repairerSuburb}
              onChange={onSuburbChange}
            />
            <TextField
              wrapperClass="text-row-item"
              label="Postcode"
              value={repairerPostcode}
              onChange={onChangePostcode}
            />
          </div>
        </div>
        <div className="">
          <Button color="primary" variant="contained">Save</Button>
        </div>
      </div>
      <div className="data-section">
        <div className="details-section">
          <div className="section-title">
            <Typography variant="h4">Repairer Availability</Typography>
          </div>
          <div className="text-row">
            <Select
              className={
                `status-select ${availability === available ? 'success' : 'error'}`
              }
              label="Current Status"
              value={availability}
              options={availabilityOptions}
              onChange={onChangeAvailability}
              formItemProps={{ fullWidth: false }}
            />
          </div>
        </div>
        <div className="">
          <Button color="primary" variant="contained">Save</Button>
        </div>
      </div>
    </div>
  )

}

export default memo(ChangeDetailsTab)