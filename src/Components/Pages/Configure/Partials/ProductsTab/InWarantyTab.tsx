import { ChangeEvent, memo, useState, useCallback } from "react";
import _debounce from 'lodash/debounce';
import {
  Button,
  Link,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Table,
  IconButton,
} from "../../../../UI";
import Search from "@mui/icons-material/Search";
import BinIcon from '@mui/icons-material/DeleteOutline';
import { warrantyBrands, warrantyGroups } from "../../../../../Utils/DummyData";
import { TableRowDataType } from "../../../../../CustomTypes";

const tableHeaders = [
  { key: 'id', label: 'Id', isHidden: true,},
  { key: 'name', label: 'Product Brand' },
  { key: 'group', label: 'Product Groups' },
];

const InWarrantyTab = () => {
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [groups] = useState(warrantyGroups);
  const [brands, setBrands] = useState(warrantyBrands);
  const [filteredBrands, setFilteredBrands] = useState(warrantyBrands);
  const [tableSearch, setTableSearch] = useState('');

  const onChangeBrand = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedBrand(value as number);

    const targetBrand = brands.find(brand => brand.id === value);

    if (!targetBrand) return;
    setSelectedGroups(targetBrand.groups);
  };

  const getBrands = () => (
    filteredBrands.map(brand => (
      { value: brand.id, label: brand.name }
    ))
  );

  const getGroups = () => (
    groups.map(group => (
      { value: group.id, label: group.name }
    ))
  );

  const onChangeGroups = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const newValues = value as number[];
    
    setSelectedGroups(newValues);
  };

  const onUpdateSelection = () => {
    const target = brands.find(brand => brand.id === selectedBrand);
    const targetIndex = brands.findIndex(brand => brand.id === selectedBrand);

    const filterTarget = filteredBrands.find(brand => brand.id === selectedBrand);
    const filteredIndex = filteredBrands.findIndex(brand => brand.id === selectedBrand);

    if (!target || targetIndex === -1) return;
    if (!filterTarget || filteredIndex === -1) return;

    const update = {
      ...target,
      groups: selectedGroups
    };

    const updateFiltered = {
      ...filterTarget,
      groups: selectedGroups
    };

    const updatedList = [...brands];
    updatedList[targetIndex] = update;

    const filteredList = [...filteredBrands];
    filteredList[filteredIndex] = updateFiltered;


    setBrands(updatedList);
    setFilteredBrands(filteredList);

    setSelectedBrand(0);
    setSelectedGroups([]);
  };

  const onDeleteRow = (rowId: TableRowDataType) => {
    // This should be replaced
    
    setBrands(prevState => (
      prevState.filter(item => item.id !== rowId)
    ));
    setFilteredBrands(prevState => (
      prevState.filter(item => item.id !== rowId)
    ));
  };

  const onTableSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTableSearch(value);
    searchBrands(value);
  };

  const searchBrands = useCallback(
    _debounce(
      (value:string) => {
        // This should be replaced
        const filtered = brands.filter(item => 
          item.name.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredBrands(filtered);
      },
     500,
    ),
    [brands],
  );

  const onDeleteTag = (id: number | string) => {
    setSelectedGroups(prevValues => {
      return prevValues.filter(item => item !== id)
    });
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

  const cellRenderer = (value: TableRowDataType, column: string) => {
    if (column === 'groups' && Array.isArray(value)) {
      const groupNames = value.reduce((acc, current) => {
        const group = warrantyGroups.find(item => item.id === current );

        if (!group) return acc;

        return [...acc, group.name];
      }, []);

      return groupNames.join(', ');
    }
    return value;
  };

  return (
    <div className="sub-tab in-warranty">
      <Typography variant="h3">
        Tell us which brands you are authorized to repair
      </Typography>
      <Typography>
        Please use the panel below to indicate which brands and categories of products you are
        authorized to repair under warranty. Your selection will be automatically saved.
      </Typography>
      <Typography>
        You must only select the brands you have authorization for. False information will result
        in removal from the TIC repairs platform.
      </Typography>
      <Typography>
        If applicable you are able to designate regions from which you will pick up items for repair
        free of charge. If required consult &nbsp;
        <Link className="post-link" href="https://auspost.com.au/apps/postcode.html" target="__blank">
          Australia Post
        </Link>&nbsp;for help with postcodes.
      </Typography>
      <div className="data-section">
        <Typography className="sub-heading" variant="h4">Select Products</Typography>
        <div className="action-row">
          <div className="select-01">
            <Typography className="select-label">Product Brand</Typography>
            <Select
              placeholder="Select"
              value={selectedBrand}
              options={getBrands()}
              onChange={onChangeBrand}
            />
          </div>
          <div className="select-02">
            <Typography className="select-label">Product Groups</Typography>
            <Select
              multiple
              showCheck
              showTags
              placeholder="Select"
              value={selectedGroups}
              options={getGroups()}
              onChange={onChangeGroups}
              disabled={!selectedBrand}
              MenuProps={{
                className: 'group-select-menu',
              }}
              onDeleteItem={onDeleteTag}
            />
          </div>
          <Button
            disabled={!selectedBrand || !selectedGroups.length}
            wrapper={false}
            className="add-btn"
            variant="contained"
            onClick={onUpdateSelection}
          >
            Add Product
          </Button>
        </div>
        <div className="table-section">
          <div className="header">
            <Typography variant="h4">Selected Products</Typography>
            <TextField
              label="Search"
              onChange={onTableSearch}
              slotProps={{
                input: {
                  endAdornment: <Search />
                }
              }}
              value={tableSearch}
            />
          </div>
          <Table
            wrapperClass='tab-table brand-list-table'
            headers={tableHeaders}
            data={filteredBrands}
            cellRenderer={cellRenderer}
            rowUniqueIdKey="id"
            isStripped
            rowActions={getRowActions()}
            actionCellAlign="right"
            hideActionHeader
            />
        </div>
      </div>
    </div>
  );
};

export default memo(InWarrantyTab);
