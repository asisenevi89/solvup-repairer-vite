import {
  ChangeEvent,
  MouseEvent, 
  memo,
  useEffect,
  useState,
  useReducer,
  SyntheticEvent,
  HTMLAttributes,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import _startCase from 'lodash/startCase';
import html2canvas from "html2canvas";
import { Moment } from "moment";
import {
  setSelectedJobStatus,
  makeJobListLoading,
  makeJobList,
  makeJobStatusList,
  makeBookmarkedStatuses,
  makeBookmarkedStatusesLoading,
  makeBookmarkListSaving,
  makeBookmarkLastSave,
} from "../../../Slices/CaseList";
import {
  Button,
  DatePicker,
  Grid,
  Table,
  TextField,
  Typography,
  Chip,
  Autocomplete,
  Checkbox,
  IconButton,
  Dialog
} from "../../UI";
import BasicList from "../../UI/CustomBasicList";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Spinner from "../../Common/Spinner";
import {
  fetchCaseList,
  fetchCaseStatuses,
  fetchBookmarkedStatuses,
  deleteBookmarkedStatusById,
  saveBookmarkedStatusList,
  initFetchAnnouncements,
} from "../../../ActionCreators/CaseList";
import { cellStartCase, cellAge } from "../../../Utils/Helpers";
import {
  JobResponseDataType,
  TableRowDataType,
  Order,
  RowObjectType,
  JobStatusType,
  TextFilters,
  CellRenderType,
  StateFilterType,
  StateActionType,
  TextFilterKey,
  ListValueType,
  DateType,
  SelectItemType,
  BookmarkedStatusType
} from "../../../CustomTypes";
import {
  COLUMN_ID,
  COLUMN_CUSTOMER,
  COLUMN_PRODUCT,
  COLUMN_BRAND,
  COLUMN_STORE,
  COLUMN_DATE,
  COLUMN_STATUS,
  DEFAULT_DATE_FORMAT,
} from "../../../Utils/Constants";
import AnnouncementList from "./Partials/AnnouncementList";
import BinIcon from '@mui/icons-material/DeleteOutline';
import './styles.scss';

const textFilters: TextFilters[]  = [
  { value: COLUMN_ID, label: 'Case ID'},
  { value: COLUMN_CUSTOMER, label: 'Customer'},
  { value: COLUMN_PRODUCT, label: 'Product'},
  { value: COLUMN_BRAND, label: 'Brand'},
  { value: COLUMN_STORE, label: 'Store'},
];

const tableColumns = [
  { key: COLUMN_ID, label:'ID' },
  { key: COLUMN_CUSTOMER, label: 'Customer' },
  { key: COLUMN_PRODUCT, label: 'Product'},
  { key: COLUMN_BRAND, label: 'Brand' },
  { key: COLUMN_STORE, label: 'Store' },
  { key: COLUMN_DATE, label: 'Age' },
  { key: COLUMN_STATUS, label: 'Status' } ,
];

const tablePageSize = 10;
const defaultPage = 1;
const anyStatus = 0;
const allStatus = { value: anyStatus, label: 'Any' }

const cellRenderers: CellRenderType = {
  brand: cellStartCase,
  date: cellAge,
  status: cellStartCase,
};

const filterInitialState = {
  [COLUMN_ID]: '',
  [COLUMN_CUSTOMER]: '',
  [COLUMN_PRODUCT]: '',
  [COLUMN_BRAND]: '',
  [COLUMN_STORE]: ''
};

const RepairerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterReducer = (state: StateFilterType, action: StateActionType) => {
    const { type, payload } = action;
    
    switch(type) {
      case 'id_changed':
        return { ...state, id: payload };
      case 'customer_changed':
        return { ...state, customer: payload };
      case 'product_changed':
        return { ...state, product: payload };
      case 'brand_changed':
        return { ...state, brand: payload };
      case 'store_changed':
        return { ...state, store: payload };
      default:
        return state;
    } 
  };

  const isJobListLoading: boolean = useSelector(makeJobListLoading);
  const jobListData: JobResponseDataType = useSelector(makeJobList);
  const jobStatuses: JobStatusType[] = useSelector(makeJobStatusList);
  const bookmarkedStatuses: BookmarkedStatusType[] = useSelector(makeBookmarkedStatuses);
  const bookmarkedStatusesLoading = useSelector(makeBookmarkedStatusesLoading);
  const isBookmarkListSaving = useSelector(makeBookmarkListSaving);
  const bookmarkListLastSave = useSelector(makeBookmarkLastSave);

  const { records: jobList, totalCount } = jobListData;

  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof RowObjectType>('id');
  const [selectedStatuses, setSelectedStatuses] = useState<SelectItemType []>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [fromDate, setFromDate] = useState<DateType>(null);
  const [optionList, setOptionList] = useState<SelectItemType []>([]);
  const [deleteBMDialog, setDeleteBMDialog] = useState(false);
  const [bookmarkDeleteId, setBookmarkDeleteId] = useState(0);
  const [filterState, filterDispatch] = useReducer(filterReducer, filterInitialState);

  useEffect(() => {
    const list =  jobStatuses.map(status => (
      { value: status.statusCode, label: _startCase(status.statusDesc) }
    ));
    setOptionList(list);
  }, [JSON.stringify(jobStatuses)]);

  useEffect(() => {
    onFetchJobs(defaultPage, order, orderBy, null);
    dispatch(fetchCaseStatuses());
    dispatch(fetchBookmarkedStatuses());
    dispatch(initFetchAnnouncements());
  },[]);

  useEffect(() => {
    if (!bookmarkListLastSave) return;
    dispatch(fetchBookmarkedStatuses());
  }, [bookmarkListLastSave])

  // Field Row Mapping
  const getRows = () => (
    jobList.map(item => {
      const {id, lastName, productName, productBrand, storeName, created, statusText } = item;
      return {
        id,
        customer: lastName,
        product: productName,
        brand: productBrand,
        store: storeName,
        date: created,
        status: statusText,
      };
    })
  );

  const onViewJob = (rowId: TableRowDataType) => {
    navigate(`/repairer-action/${rowId}`)
  };

  const onPaginate = (event: ChangeEvent<unknown>, pageNumber: number) => {
    setCurrentPage(pageNumber);
    onFetchJobs(pageNumber, order, orderBy, null);
  };

  const getRowActions = () => [
    { action:'View', handler: onViewJob },
  ];

  const cellRenderer = (value: TableRowDataType, column: string) => {
    const renderer: Function = cellRenderers[column];
    const hasBull = column === COLUMN_STATUS;

    if (!renderer) {
      return value;
    }

    if (hasBull) {
      return (
        <Typography className="cell-data text-bold">
          <span className="cell-bull">&#9679;</span>
          {renderer(value)}
        </Typography>
      );
    }

    return <Typography className="cell-data">{renderer(value)}</Typography>
  };

  const onSortTable = (
    event: MouseEvent<unknown>,
    property: keyof RowObjectType,
    order: Order
  ) => {
    setOrder(order);
    setOrderBy(property);
    onFetchJobs(currentPage, order, property, null);
  };

  const onChangeTextFilters = (event: ChangeEvent<HTMLInputElement>, column: TextFilterKey) => {
    const { value } = event.target;
    filterDispatch({ type: `${column}_changed`, payload: value });
  };

  const onSelectStatus = (event: SyntheticEvent, value: SelectItemType[]) => {
    if ( !value ) {
      setSelectedStatuses([]);
      return;
    }
    
    setSelectedStatuses(value);
  };

  const onSearch = () => {
    const selectedIds = selectedStatuses.map(item => item.value);
    setCurrentPage(defaultPage);
    setSelectedCategories(selectedIds);
    onFetchJobs(defaultPage, order, orderBy, selectedIds);
  };

  const onBookmark = () => {
    const selectedIds = selectedStatuses.map(item => item.value);
    const bookmarkedIds = bookmarkedStatuses.map(item => item.statusCode);

    const newList = selectedIds.filter(value => !bookmarkedIds.includes(value));
    dispatch(saveBookmarkedStatusList(newList));
  };

  const onFetchJobs = (
    page: number,
    order: Order,
    orderBy: keyof RowObjectType,
    status: null | number[],
  ) => {
    const fetchPage = page - 1;
    const newStatus = status !== null ? status : selectedCategories;
    const selectedFromDate = fromDate ? fromDate.format(DEFAULT_DATE_FORMAT) : '';
    
    dispatch(fetchCaseList({
      size: tablePageSize,
      page: fetchPage,
      order,
      orderBy,
      status: newStatus,
      fromDate: selectedFromDate,
      ...filterState,
    }));
    dispatch(setSelectedJobStatus(newStatus));
  };

  const onDeleteBookmark = (bookmarkId: number) => {
    setBookmarkDeleteId(bookmarkId);
    setDeleteBMDialog(true);
  };

  const onBookMarkDialogClose = () => {
    setDeleteBMDialog(false);
    setBookmarkDeleteId(0);
  };

  const onConfirmBookmarkDelete = () => {
    setSelectedCategories(prevData => 
      prevData.filter(item => item !== bookmarkDeleteId)
    );
    dispatch(deleteBookmarkedStatusById(bookmarkDeleteId));
    onBookMarkDialogClose();
  };

  const onPrintDownload = () => {
    const printWindow = window.open("", "_blank");
    const contentDiv = document.getElementById('repairer-list-table');

    if (!contentDiv || !printWindow) return;
    html2canvas(contentDiv).then(canvas => {
      // Convert canvas to an image
      const imgData = canvas.toDataURL("image/png");

      // Open a new window and add the image
      printWindow.document.open();
      printWindow.document.write(`<img src="${imgData}" style="max-width: 100%; max-height: 100%;"/>`);
      printWindow.document.close();
      
      // Wait for the image to load, then print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    });
  };

  const onSelectListStatus = (value: ListValueType) => {
    const valueStr = value as number
    const found = jobStatuses.find(item => item.statusCode === valueStr);

    if (!found) return;

    const newStatus = { value: found.statusCode, label: found.statusInternalDesc };

    // deselecting if already selected
    if (selectedCategories.includes(valueStr)) {
      const updatedCategory = selectedCategories.filter(item => item !== valueStr);
      const updatedSelections = selectedStatuses.filter(item => item.value !== valueStr);
      setSelectedCategories(updatedCategory);
      setSelectedStatuses(updatedSelections);
      setCurrentPage(defaultPage);
      onFetchJobs(defaultPage, order, orderBy, updatedCategory);
      return;
    }

    const updated = [...selectedCategories, valueStr]
    setSelectedStatuses([...selectedStatuses, newStatus]);
    setSelectedCategories(updated);
    setCurrentPage(defaultPage);
    onFetchJobs(defaultPage, order, orderBy, updated);
  };

  const getStatusList = () => (
    bookmarkedStatuses.map(status => {
      const text = _startCase(status.description);
      return {
        value: status.statusCode,
        tooltipText: text,
        primaryText: (
          <Typography className="chip-desc" variant="h4">
            {text}
          </Typography>
        ),
        secondaryAction: (
          <div className="chip-wrapper">
            <Chip
              className={selectedCategories.includes(status.statusCode) ? 'selected' : ''}
              label={
                <Typography className="chip-text" variant="h4">
                  {status.caseCount}
                </Typography>
              }
            />
            <IconButton onClick={() => onDeleteBookmark(status.id)}>
              <BinIcon fontSize='large' color='error' />
            </IconButton>
          </div>
        ),
        
        disabled: bookmarkedStatusesLoading,
      }
    })
  );

  const onDateChange = (value: Moment) => {
    setFromDate(value);
  };

  const getSelectedStatusLabel = () => {

    if (selectedCategories.length) return 'Filtered'

    return allStatus.label
  };

  const getBookmarkBtnStatus = () => {
    if (!selectedStatuses.length) return false;

    const selectedValues = selectedStatuses.map(item => item.value);
    const bookMarkedValues = bookmarkedStatuses.map(item => item.statusCode);

    return selectedValues.some(value => !bookMarkedValues.includes(value));
  }

  const renderOptionLabel = (
    itemProps: HTMLAttributes<HTMLLIElement> & { key: string },
    option: SelectItemType
  ) => {
    const selected = selectedStatuses.find(item => item.value === option.value);
    const { key, ...restProps } = itemProps;

    return (
      <span key={key}  {...restProps}>
        <Checkbox value={option.label} checked={!!selected} />
        {option.label}
      </span>
    )
  }

  const getMoreTag = (value: number) => {
    return (
      <Chip
        label={
          <Typography className="chip-text" variant="h4">{`+${value}`}</Typography>
        }
      />
    );
  };

  return (
    <div className="repairer-list-container">
      <div className="announcement_section">
        <AnnouncementList />
      </div>
      <div className="filter-section">
        <div className="status-menu-wrapper">
          <Spinner backdropProps={{ open: bookmarkedStatusesLoading}}>
            <BasicList
              wrapperClass="status-menu-list"
              listItems={getStatusList()}
              selectedValues={selectedCategories}
              onSelectItem={onSelectListStatus}
            />
          </Spinner>
        </div>
        <Typography variant="h3">Filter by</Typography>
        <Grid container spacing={2} size={12} wrapperClass="filter-grid">
          {textFilters.map(filter => (
            <Grid key={filter.value} wrapper={false} size={{ xs: 12, sm: 6, md:3, lg: 2 }}>
              <TextField
                label={filter.label}
                value={filterState[filter.value]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeTextFilters(event, filter.value)}
                fullWidth
              />
            </Grid>
          ))}
          <Grid wrapper={false} size={{ xs: 12, sm: 6, md:3, lg: 2 }}>
            <DatePicker
              formItemProps={{ fullWidth: false}}
              onChange={onDateChange}
              label="Created From"
              format={DEFAULT_DATE_FORMAT}
              slotProps={{ field: { clearable: true } }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} size={12} wrapperClass="filter-grid"> 
          <Grid wrapper={false}  size={{ xs: 12, sm: 6, md:3, lg: 6 }}>
            <Autocomplete
              id="tags-outlined"
              className="status-search"
              renderOption={renderOptionLabel}
              options={optionList}
              value={selectedStatuses}
              onChange={onSelectStatus}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search"
                  label='Status'
                />
              )}
              disableClearable
              multiple
              getLimitTagsText={getMoreTag}
              limitTags={2}
              disableCloseOnSelect
            />
          </Grid>
          <Grid wrapper={false} size={{ xs: 12, sm: 6, md:3, lg: 1.5 }}>
            <Button
              fullWidth
              variant="contained"
              wrapperClass="filter-button"
              onClick={onSearch}
            >
              Search
            </Button>
          </Grid>
          {getBookmarkBtnStatus() && (
            <Grid wrapper={false} size={{ xs: 12, sm: 6, md:3, lg: 1.5 }}>
              <Button
                fullWidth
                variant="outlined"
                wrapperClass="filter-button"
                onClick={onBookmark}
                disabled={isBookmarkListSaving}
              >
                Bookmark
              </Button>
            </Grid>
          )}
        </Grid>
      </div> 
      <Spinner backdropProps={{ open: isJobListLoading }}>
        <div className="table-section">
          <div className="header">
            <Typography variant="h1">
              {getSelectedStatusLabel()}
            </Typography>
            <div className="summary">
              <div className="total">
                <Typography variant="h5">Total Number of Cases</Typography>
                <Typography variant="h2" className="total-number">
                  {totalCount}
                </Typography>
              </div>
              <Button
                variant="contained"
                size="large"
                startIcon={<SaveAltIcon />}
                onClick={onPrintDownload}
              >
                Download List
              </Button>
            </div>
          </div>
          <Table
            id="repairer-list-table"
            wrapperClass="job-table"
            headers={tableColumns}
            data={getRows()}
            rowUniqueIdKey="id"
            rowActions={getRowActions()}
            cellRenderer={cellRenderer}
            paginateData={{
              className: 'table-pagination',
              count: Math.ceil(totalCount / tablePageSize),
              page: currentPage,
              onChange: onPaginate,
              variant: "outlined",
              shape:"rounded",
            }}
            sortable
            onRequestSort={onSortTable}
          />
        </div>
      </Spinner> 
      <Dialog
        open={deleteBMDialog}
        heading="Confirm Deletion"
        message="You are about to delete a bookmarked status. Please confirm."
        onCancel={onBookMarkDialogClose}
        onAccept={onConfirmBookmarkDelete}
      />
    </div>
  );
};

export default memo(RepairerList);

