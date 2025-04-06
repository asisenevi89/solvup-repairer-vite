import { ChangeEvent, memo, useState, useCallback } from 'react';
import _debounce from 'lodash/debounce';
import {
  Button,
  Switch,
  TextField,
  Typography,
  Upload,
  Table,
  IconButton,
} from '../../../UI';
import ImageText from '../../../Common/ImageText';
import CheckCircle from '@mui/icons-material/CheckCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import BinIcon from '@mui/icons-material/DeleteOutline';
import { pickupPoints } from '../../../../Utils/DummyData';
import { PickupPointType, PlaceResult, TableRowDataType } from '../../../../CustomTypes';
import GoogleAutocomplete from '../../../Common/GoogleAutocomplete';
import googlePin from '../../../../Assets/images/googlePin.png'

const zoneTableHeaders = [
  { key: 'city', label: 'City'},
  { key: 'state', label: 'State'},
  { key: 'suburb', label: 'Suburb'},
  { key: 'postcode', label: 'Postcode'},
];

const suburbType = 'locality';
const stateType = 'administrative_area_level_1';
const cityType = 'administrative_area_level_2';
const postcodeType = 'postal_code';

const PickupZonesTab = () => {
  const [pickup, setPickUp] = useState(false);
  const [locations, setLocations] = useState(pickupPoints);
  const [filteredLocation, setFilteredLocation] = useState(pickupPoints);
  const [newPlaceData, setNewPlaceData] = useState<PlaceResult | null>(null)

  const onChangePickup = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setPickUp(checked);
  };

  const onDeleteRow = (rowId: TableRowDataType) => {
    // This should be replaced
    setLocations(prevState => (
      prevState.filter(item => item.postcode !== rowId)
    ));
    setFilteredLocation(prevState => (
      prevState.filter(item => item.postcode !== rowId)
    ));
  }

  const getRowActions = () => [
    {
      action:'Delete',
      handler: onDeleteRow,
      component: (
        <IconButton>
          <BinIcon fontSize='large' color='error' />
        </IconButton>
      ),
    },
  ];

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchLocations(value);
  };

  const searchLocations = useCallback(
    _debounce(
      (value:string) => {
        // This should be replaced
        const filtered = locations.filter(item => 
          item.city.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredLocation(filtered);
      },
     500,
    ),
    [locations],
  );

  const addNewPickupLocation = () => {
    if (!newPlaceData) return;

    const addressElements = newPlaceData.address_components || [];
    
    let city = '';
    let state = '';
    let suburb = '';
    let postcode = 0;

    addressElements.forEach(item => {
      if (item.types.includes(suburbType)) {
        suburb = item.long_name;
        return;
      }

      if (item.types.includes(cityType)) {
        city = item.long_name;
        return;
      }

      if (item.types.includes(stateType)) {
        state = item.long_name;
        return;
      }

      if (item.types.includes(postcodeType)) {
        postcode = parseInt(item.long_name);
      }
    });

    city = !city ? suburb : city;
    suburb = !suburb ? city : suburb;

    const newLocation: PickupPointType = { city, state, suburb, postcode };

    setLocations(prevValue => (
      [
        ...prevValue,
        newLocation,
      ]
    ));
    setFilteredLocation(prevValue => (
      [
        ...prevValue,
        newLocation,
      ]
    ));
    setNewPlaceData(null);
  };

  return (
    <div className='pickup-zones-tab'>
      <div className='top-area'>
        <div className='switch-section'>
          <Switch 
            checked={pickup}
            onChange={onChangePickup}
            label={
              <Typography variant='h4'>
                Free Nationwide Pickup
              </Typography>
            }
          />
        </div>
        <div className='badge-section'>
          {pickup && (
            <ImageText
              image={<CheckCircle className='check-icon' />}
              text={
                <Typography variant='h4' color='primary'>
                  Active
                </Typography>
              }
            />
          )}
        </div>
      </div>
      {!pickup && (
        <div className='add-zone-section'>
          <div className='header'>
            <Typography variant='h4'>Free pickup postcodes</Typography>
          </div>
          <div className='action-area'>
            <div className='postcode-section'>
              <div className='postcode-search'>
                <GoogleAutocomplete
                  setPlaceData={setNewPlaceData}
                  searchLabel='Add free pickup postcodes'
                  endIcon={
                    <img className='google-pin' src={googlePin} alt='google pin' />
                  }
                />
                <Button
                  className='add-code'
                  variant='contained'
                  onClick={addNewPickupLocation}
                >
                  Add
                </Button>
              </div>
              <div className='list-area'>
                <div className='header'>
                  <Typography variant='h4'>
                    Selected postcodes
                  </Typography>
                  <TextField 
                    label='Search'
                    slotProps={{
                      input: { endAdornment: <SearchIcon fontSize='large' /> }
                    }}
                    onChange={onSearch}
                  /> 
                </div>
                <Table
                  wrapperClass='tab-table postcode-list-table'
                  headers={zoneTableHeaders}
                  data={filteredLocation}
                  rowUniqueIdKey="postcode"
                  isStripped
                  rowActions={getRowActions()}
                  actionCellAlign="right"
                  hideActionHeader
                />
              </div>
            </div>
            <div className='upload-section'>
              <Typography variant='h3'>
                Batch upload free pickup postcodes
              </Typography>
              <Typography className='info'>
                Please submit a text file with one postcode per line with no header
              </Typography>
              <Upload variant='outlined' onUpload={() => {}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PickupZonesTab);
