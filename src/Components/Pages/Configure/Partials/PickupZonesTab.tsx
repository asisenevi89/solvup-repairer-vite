import { ChangeEvent, memo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Spinner from '../../../Common/Spinner';
import CheckCircle from '@mui/icons-material/CheckCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import BinIcon from '@mui/icons-material/DeleteOutline';
import { FileUploadType, PlaceResult, TableRowDataType } from '../../../../CustomTypes';
import GoogleAutocomplete from '../../../Common/GoogleAutocomplete';
import googlePin from '../../../../Assets/images/googlePin.png'
import { makePickupStatus, makePickupStatusUpdating, makePostcodeData, makePostcodeListLoading, makePostcodesSaving } from '../../../../Slices/Configuration';
import { initFetchSavedPostCodes, initSavePostCodes, initUpdateNationwidePickup } from '../../../../ActionCreators/Configurations';
import { STATES } from '../../../../Utils/Constants';
import { setNetworkError } from '../../../../Slices/General';
import DetailCard from '../../../Common/DetailCard';
import { isValidPostcode } from '../../../../Utils/Helpers';

const zoneTableHeaders = [
  { key: 'id', label: 'Id', isHidden: true },
  { key: 'city', label: 'City'},
  { key: 'state', label: 'State'},
  { key: 'suburb', label: 'Suburb'},
  { key: 'postcode', label: 'Postcode'},
];

const postcodeType = 'postal_code';

const pageSize = 10;
const defaultPage = 1;

const allowedTypes = ['text/csv'];

const PickupZonesTab = () => {
  const dispatch = useDispatch();
  const nationwidePickup = useSelector(makePickupStatus);
  const isUpdatingPickup = useSelector(makePickupStatusUpdating);
  const savedPostcodeData = useSelector(makePostcodeData);
  const isFetchingPostcodes = useSelector(makePostcodeListLoading);
  const isSavingPostCodes = useSelector(makePostcodesSaving);
  const { totalRecords, records } = savedPostcodeData;

  const [newPlaceData, setNewPlaceData] = useState<PlaceResult | null>(null);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [search, setSearch] = useState('');
  const [uploadList, setUploadList] = useState<string[]>([]);
  const [postcodeListError, setPostcodeListError] = useState(false);
  const [uploadReset, setUploadReset] = useState(0);

  useEffect(() => {
    fetchSavedPostCodes();
  }, []);

  const fetchSavedPostCodes = (
    paginatePage = currentPage,
    currentSearch = search,
  ) => {
    const page = paginatePage - 1;
    dispatch(initFetchSavedPostCodes(page, pageSize, currentSearch));
  }

  const onChangePickup = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    dispatch(initUpdateNationwidePickup(checked));
  };

  const onDeleteRow = (_rowId: TableRowDataType) => {
  };

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    searchLocations(value);
  };

  const searchLocations = useCallback(
    _debounce(
      (value:string) => {
        setCurrentPage(defaultPage);
        fetchSavedPostCodes(defaultPage, value);
      },
     500,
    ),
    [],
  );

  const addNewPickupLocation = () => {
    if (!newPlaceData) return;

    const addressElements = newPlaceData.address_components || [];
  
    let postcode = '';

    addressElements.forEach(item => {

      if (item.types.includes(postcodeType)) {
        postcode = item.long_name;
      }
    });

    setNewPlaceData(null);

    if (!postcode) {
      dispatch(setNetworkError('No Postcode found for the selected location'));
      return;
    }

    dispatch(initSavePostCodes([postcode], onAddSuccess));
  };

  const onAddSuccess = () => {
    setSearch('');
    setCurrentPage(defaultPage);
    fetchSavedPostCodes(defaultPage, '');
  };

  const onPostcodePaginate = (_event: ChangeEvent<unknown>, pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchSavedPostCodes(pageNumber, search);
  };

  const tableCellRenders = (value: TableRowDataType, column: string) => {
    if (column === 'state') {
      const found = STATES.find(state => state.value === value);

      if (!found) return value;

      return found.label;
    }

    return value;
  };

  const beforeUpload = (fileList: FileUploadType) => {
    const file = fileList && fileList[0];

    if (!file) return '';

    if (!allowedTypes.includes(file.type)) {
      return 'An Invalid File Type';
    }

    return '';
  };

  const onFileUpload = (fileList: FileUploadType) => {
    const file = fileList && fileList[0];

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const text = event.target && event.target.result;

      const lines = text && text.toString()
        .trim()
        .split('\n')

      if (!lines?.length) return;

      const [ _, ...postcodes ] = lines;
      const edited = postcodes.map(item => item.trim().replace('\r', ''));
      const hasErrors = hasPostCodeError(edited);
      
      setPostcodeListError(hasErrors);
      setUploadList(edited);
    };

    fileReader.readAsText(file)
  };

  const hasPostCodeError = (list: string[]) => {
    return list.some(item => !isValidPostcode(item));
  }

  const onRemoveFile = () => {
    setUploadList([]);
    setPostcodeListError(false);
  };

  const uploadPostCodeList = () => {
    dispatch(initSavePostCodes(uploadList, onSuccessPostCodeList))
  };

  const onSuccessPostCodeList = () => {
    onAddSuccess();
    setUploadReset(Date.now());
    setUploadList([]);
  };

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

  const renderUploadedPostCodes = () => {
    if (!uploadList.length) return null;

    let listMessage = 'The above postcode list will be uploaded.'
    let messageClass = '';

    if (postcodeListError) {
      listMessage = 'One or more postcodes are invalid. Please reupload a valid list.'
      messageClass = 'upload-error';
    }

    return (
      <div className='uploaded-list'>
        <DetailCard details={uploadList.map((item, index) => (
          { dataKey: `Postcode #${index + 1}`, dataValue: item }
        ))} />
        
        <div className='button-bar'>
          <Typography variant='h5' className={messageClass}>
            {listMessage}
          </Typography>
          <Button variant="contained" onClick={uploadPostCodeList} disabled={postcodeListError}>
            Proceed
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className='pickup-zones-tab'>
      <Spinner backdropProps={{ open: isUpdatingPickup }}>
        <div className='top-area'>
          <div className='switch-section'>
            <Switch 
              checked={nationwidePickup}
              onChange={onChangePickup}
              label={
                <Typography variant='h4'>
                  Free Nationwide Pickup
                </Typography>
              }
            />
          </div>
          <div className='badge-section'>
            {nationwidePickup && (
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
      </Spinner>
      {!nationwidePickup && (
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
                  disabled={isSavingPostCodes}
                >
                  Add
                </Button>
              </div>
              <Spinner backdropProps={{ open: isFetchingPostcodes || isSavingPostCodes }}>
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
                      value={search}
                    /> 
                  </div>
                  <Table
                    wrapperClass='tab-table postcode-list-table'
                    headers={zoneTableHeaders}
                    data={records}
                    rowUniqueIdKey="id"
                    isStripped
                    rowActions={getRowActions()}
                    actionCellAlign="right"
                    hideActionHeader
                    cellRenderer={tableCellRenders}
                    paginateData={{
                      className: 'postcode-pagination',
                      count: Math.ceil(totalRecords / pageSize),
                      page: currentPage,
                      onChange: onPostcodePaginate,
                      variant: "outlined",
                      shape:"rounded",
                    }}
                  />
                </div>
              </Spinner>
            </div>
            <div className='upload-section'>
              <Typography variant='h3'>
                Batch upload free pickup postcodes
              </Typography>
              <Typography className='info'>
                Please submit a text file with one postcode per line with no header
              </Typography>
              <Upload
                variant='outlined'
                onUpload={onFileUpload} 
                beforeUpload={beforeUpload}
                onRemoveFile={onRemoveFile}
                resetCounter={uploadReset}
              />
              {renderUploadedPostCodes()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PickupZonesTab);
