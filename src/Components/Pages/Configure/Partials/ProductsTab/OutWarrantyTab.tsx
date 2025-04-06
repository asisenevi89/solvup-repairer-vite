import { ChangeEvent, memo, useState, useCallback } from "react";
import _debounce from 'lodash/debounce';
import {
  Button,
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
  { key: 'name', label: 'Product Group' },
  { key: 'products', label: 'Product Brands' },
];

const OutWarrantyTab = () => {
  const [brands] = useState(warrantyBrands);
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [groups, setGroups] = useState(warrantyGroups);
  const [filteredGroups, setFilteredGroups] = useState(warrantyGroups);
  const [tableSearch, setTableSearch] = useState('');

  const onChangeGroup = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedGroup(value as number);

    const targetGroup = groups.find(item => item.id === value);

    if (!targetGroup) return;
    setSelectedBrands(targetGroup.products);
  };

  const getGroups = () => (
    filteredGroups.map(item => (
      { value: item.id, label: item.name }
    ))
  );

  const getBrands = () => (
    brands.map(item => (
      { value: item.id, label: item.name }
    ))
  );

  const onChangeBrands = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const newValues = value as number[];
    
    setSelectedBrands(newValues);
  };

  const onUpdateSelection = () => {
    const target = groups.find(brand => brand.id === selectedGroup);
    const targetIndex = brands.findIndex(brand => brand.id === selectedGroup);

    const filterTarget = filteredGroups.find(item => item.id === selectedGroup);
    const filteredIndex = filteredGroups.findIndex(item => item.id === selectedGroup);

    if (!target || targetIndex === -1) return;
    if (!filterTarget || filteredIndex === -1) return;

    const update = {
      ...target,
      products: selectedBrands,
    };

    const updateFiltered = {
      ...filterTarget,
      products: selectedBrands,
    };

    const updatedList = [...groups];
    updatedList[targetIndex] = update;

    const filteredList = [...filteredGroups];
    filteredList[filteredIndex] = updateFiltered;


    setGroups(updatedList);
    setFilteredGroups(filteredList);

    setSelectedGroup(0);
    setSelectedBrands([]);
  };

  const onDeleteRow = (rowId: TableRowDataType) => {
    // This should be replaced
    
    setGroups(prevState => (
      prevState.filter(item => item.id !== rowId)
    ));
    setFilteredGroups(prevState => (
      prevState.filter(item => item.id !== rowId)
    ));
  };

  const onTableSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTableSearch(value);
    searchGroups(value);
  };

  const searchGroups = useCallback(
    _debounce(
      (value:string) => {
        // This should be replaced
        const filtered = groups.filter(item => 
          item.name.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredGroups(filtered);
      },
     500,
    ),
    [groups],
  );

  const onDeleteTag = (id: number | string) => {
    setSelectedBrands(prevValues => {
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
    if (column === 'products' && Array.isArray(value)) {
      const brandNames = value.reduce((acc, current) => {
        const brand = warrantyBrands.find(item => item.id === current );

        if (!brand) return acc;

        return [...acc, brand.name];
      }, []);

      return brandNames.join(', ');
    }
    
    return value;
  };

  return (
    <div className="sub-tab out-warranty">
      <Typography variant="h3">
        Tell us which product groups you service out of warranty
      </Typography>
      <Typography>
        Please use the panel below to specify categories and brands you repair out of
        warranty. By default, your pickup regions will be replicated from what you
        specify for in warranty jobs, although you can remove the postcodes below.
      </Typography>
      <div className="data-section">
        <Typography className="sub-heading" variant="h4">
          Select Product Groups
        </Typography>
        <div className="action-row">
          <div className="select-01">
            <Typography className="select-label">Product Group</Typography>
            <Select
              placeholder="Select"
              value={selectedGroup}
              options={getGroups()}
              onChange={onChangeGroup}
              MenuProps={{
                className: 'group-select-menu',
              }}
            />
          </div>
          <div className="select-02">
            <Typography className="select-label">Product Brands</Typography>
            <Select
              multiple
              showCheck
              showTags
              placeholder="Select"
              value={selectedBrands}
              options={getBrands()}
              onChange={onChangeBrands}
              disabled={!selectedGroup}
              onDeleteItem={onDeleteTag}
            />
          </div>
          <Button
            disabled={!selectedGroup || !selectedBrands.length}
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
            data={filteredGroups}
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

export default memo(OutWarrantyTab);
