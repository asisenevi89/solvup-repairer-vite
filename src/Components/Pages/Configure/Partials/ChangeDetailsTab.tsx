import { ChangeEvent, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _startCase from "lodash/startCase";
import {
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Button,
} from "../../../UI";
import Spinner from "../../../Common/Spinner";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import {
  makeAccountSummary,
  makeAccountSummaryUpdating,
  makeAvailabilityUpdating,
} from "../../../../Slices/Configuration";
import { initUpdateAccountSummary, initUpdateRepairerAvailability } from "../../../../ActionCreators/Configurations";
import { AccountSummarySaveType } from "../../../../CustomTypes/ConfigurationTypes";
import { STATES } from "../../../../Utils/Constants";
import { 
  isValidEmail,
  isValidPhoneNumber,
  isValidPostcode,
  isValidWebsite,
} from "../../../../Utils/Helpers";

const available = 'available';
const unavailable = 'unavailable';
const defaultValidationErrors = {
  repairerName: '',
  repairerEmail: '',
  supportLine: '',
  repairerAbn: '',
  customerLine: '',
  repairerSuburb: '',
  repairerAddress: '',
  repairerPostcode: '',
  repairerState: '',
  repairerWebsite: ''
};

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
  const dispatch = useDispatch();
  const accountData = useSelector(makeAccountSummary);
  const isUpdatingData = useSelector(makeAccountSummaryUpdating);
  const isUpdatingAvailability = useSelector(makeAvailabilityUpdating);

  const {
    repairerName: name,
    contactEmail: email,
    retailerSupportLine,
    abn,
    consumerSupportLine,
    suburb,
    streetAddress: address,
    postalcode,
    state,
    websiteUrl,
    availability: statusValue,
  } = accountData;
  const savedStatus = statusValue ? available : unavailable;

  const [availability, setAvailability] = useState(savedStatus);
  const [repairerName, setRepairerName] = useState(name);
  const [repairerEmail, setRepairerEmail] = useState(email);
  const [supportLine, setSupportLine] = useState(retailerSupportLine);
  const [repairerAbn, setRepairerAbn] = useState(abn);
  const [customerLine, setCustomerLine] = useState(consumerSupportLine);
  const [repairerSuburb, setRepairerSuburb] = useState(suburb);
  const [repairerAddress, setRepairerAddress] = useState(address);
  const [repairerPostcode, setRepairerPostcode] = useState(postalcode);
  const [repairerState, setRepairerState] = useState(state);
  const [repairerWebsite, setRepairerWebsite] = useState(websiteUrl);
  const [validationErrors, setValidationError] = useState(defaultValidationErrors);

  const validateData = (value: string, field: string) => {
    switch (field) {
      case 'repairerName':
      case 'repairerAbn':
      case 'repairerSuburb':
      case 'repairerAddress':
      case 'repairerState':
        if (!value) {
          setValidationError((prev) => ({
            ...prev,
            [field]: `${_startCase(field)} cannot be empty.`,
          }));
          return;
        }
        setValidationError((prev) => ({
          ...prev,
          [field]: '',
        }));
        break;
      case 'repairerEmail':
        if (!value) {
          setValidationError((prev) => ({
            ...prev,
            repairerEmail: 'Email cannot be empty.',
          }));
          return;
        }
        if (!isValidEmail(value)) {
          setValidationError((prev) => ({ 
            ...prev,
            repairerEmail: 'Invalid email format.',
          }));
          return;
        }
        setValidationError((prev) => ({
          ...prev,
          repairerEmail: '',
        }));
        break;
      case 'supportLine':
        if (!value) {
          setValidationError((prev) => ({
            ...prev,
            supportLine: 'Support line cannot be empty.',
          }));
          return;
        }
        if (!isValidPhoneNumber(value)) {
          setValidationError((prev) => ({
            ...prev,
            supportLine: 'Invalid phone number format.',
          }));
          return;
        }
        setValidationError((prev) => ({
          ...prev,
          supportLine: '',
        }));
        break;
      case 'customerLine':
        if (!value) {
          setValidationError((prev) => ({
            ...prev,
            customerLine: 'Customer line cannot be empty.',
          }));
          return;
        }
        if (!isValidPhoneNumber(value)) {
          setValidationError((prev) => ({
            ...prev,
            customerLine: 'Invalid phone number format.',
          }));
          return;
        }
        setValidationError((prev) => ({
          ...prev,
          customerLine: '',
        }));
        break;
      case 'repairerWebsite':
        if (!value) { 
          setValidationError((prev) => ({
            ...prev,
            repairerWebsite: 'Website cannot be empty.',
          }));
          return;
        }
        if (!isValidWebsite(value)) {
          setValidationError((prev) => ({
            ...prev,
            repairerWebsite: 'Invalid website format.',
          }));
          return;
        }
        setValidationError((prev) => ({
          ...prev,
          repairerWebsite: '',
        }));
        break;
      case 'repairerPostcode':
        if (!value) { 
          setValidationError((prev) => ({
            ...prev,
            repairerPostcode: 'Postcode cannot be empty.',
          }));
          return;
        }
        if (!isValidPostcode(value)) {
          setValidationError((prev) => ({
            ...prev,
            repairerPostcode: 'Invalid Postcode format.',
          }));
          return;
        }
        setValidationError((prev) => ({
          ...prev,
          repairerPostcode: '',
        }));
        break;
      default:
        break;
    };
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerName(value);
    validateData(value, 'repairerName');
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerEmail(value);
    validateData(value, 'repairerEmail');
  };

  const onSupportChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSupportLine(value);
    validateData(value, 'supportLine');
  };

  const onChangeAbn = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerAbn(value);
    validateData(value, 'repairerAbn');
  };

  const onChangeCustomerLine = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCustomerLine(value);
    validateData(value, 'customerLine');
  };

  const onSuburbChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerSuburb(value);
    validateData(value, 'repairerSuburb');
  };

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerAddress(value);
    validateData(value, 'repairerAddress');
  };

  const onChangePostcode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerPostcode(value);
    validateData(value, 'repairerPostcode');
  };

  const onChangeState = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setRepairerState(value as string);
    validateData(value as string, 'repairerState');
  };

  const onChangeWebsite = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepairerWebsite(value);
    validateData(value, 'repairerWebsite');
  };

  const onChangeAvailability = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setAvailability(value as string);
  };

  const hasValidationErrors = () => {
    return Object.values(validationErrors).some(value => !!value);
  };

  const onSaveData = () => {
    if (hasValidationErrors()) return;

    const data: AccountSummarySaveType = {
      name: repairerName,
      retailerSupportLine: supportLine,
      consumerSupportLine: customerLine,
      address: repairerAddress,
      state: repairerState,
      website: repairerWebsite,
      email: repairerEmail,
      abn: repairerAbn,
      suburb: repairerSuburb,
      postCode: repairerPostcode
    };

    dispatch(initUpdateAccountSummary(data));
  };

  const onUpdateAvailability = () => {
    const value = availability === available;

    dispatch(initUpdateRepairerAvailability(value));
  };
  
  return (
    <div className="change-details-tab">
      <Spinner backdropProps={{ open: isUpdatingData }}>
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
                helperText={validationErrors.repairerName}
                error={!!validationErrors.repairerName}
              />
              <TextField
                wrapperClass="text-row-item"
                label="Email"
                value={repairerEmail}
                onChange={onEmailChange}
                helperText={validationErrors.repairerEmail}
                error={!!validationErrors.repairerEmail}
              />
              <TextField
                wrapperClass="text-row-item"
                label="Retailer Support Line"
                value={supportLine}
                onChange={onSupportChange}
                helperText={validationErrors.supportLine}
                error={!!validationErrors.supportLine}
              />
            </div>
            <div className="text-row">
              <TextField
                wrapperClass="text-row-item"
                label="ABN"
                value={repairerAbn}
                onChange={onChangeAbn}
                helperText={validationErrors.repairerAbn}
                error={!!validationErrors.repairerAbn}
              />
              <TextField
                wrapperClass="text-row-item"
                label="Customer Support Line"
                value={customerLine}
                onChange={onChangeCustomerLine}
                helperText={validationErrors.customerLine}
                error={!!validationErrors.customerLine}
              />
              <TextField
                wrapperClass="text-row-item"
                label="Website"
                value={repairerWebsite}
                onChange={onChangeWebsite}
                helperText={validationErrors.repairerWebsite}
                error={!!validationErrors.repairerWebsite}
              />
            </div>
            <div className="text-row">
              <TextField
                wrapperClass="two-third text-row-item"
                label="Address"
                value={repairerAddress}
                onChange={onChangeAddress}
                helperText={validationErrors.repairerAddress}
                error={!!validationErrors.repairerAddress}
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
                helpText={validationErrors.repairerState}
                error={!!validationErrors.repairerState}
              />
              <TextField
                wrapperClass="text-row-item"
                label="Suburb"
                value={repairerSuburb}
                onChange={onSuburbChange}
                helperText={validationErrors.repairerSuburb}
                error={!!validationErrors.repairerSuburb}
              />
              <TextField
                wrapperClass="text-row-item"
                label="Postcode"
                value={repairerPostcode}
                onChange={onChangePostcode}
                helperText={validationErrors.repairerPostcode}
                error={!!validationErrors.repairerPostcode}
              />
            </div>
          </div>
          <div className="">
            <Button
              color="primary"
              variant="contained"
              onClick={onSaveData}
              disabled={hasValidationErrors()}
            >
              Save
            </Button>
          </div>
        </div>
      </Spinner>
      <Spinner backdropProps={{ open: isUpdatingAvailability}}>
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
            <Button color="primary" variant="contained" onClick={onUpdateAvailability}>
              Save
            </Button>
          </div>
        </div>
      </Spinner>
    </div>
  )

}

export default memo(ChangeDetailsTab)