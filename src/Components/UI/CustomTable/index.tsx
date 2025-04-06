import React, { useState, memo, ChangeEvent, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableSortLabel,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainerProps,
  TableProps,
  TableBodyProps,
  TableHeadProps,
  TableCellProps,
  TableRowProps,
  Pagination,
  PaginationProps,
  Box,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CustomButton from '../CustomButton';
import {
  TableRowDataType,
  TableHeaderType,
  RowActionType,
  Order,
  RowObjectType,
  CommonObjType,
} from '../../../CustomTypes';

type CellAlignType = 'left' | 'center' | 'right';

export interface CustomTableProps {
  id?: string,
  headers: TableHeaderType[];
  data: RowObjectType[];
  rowUniqueIdKey: string,
  onRowSelect?: (rowData: any[], isRowSelected: boolean) => void,
  cellRenderer?: (
    value: TableRowDataType,
    columnId: string
  ) => React.ReactNode;
  onRequestSort?: (
    event: React.MouseEvent<unknown>,
    property: keyof RowObjectType,
    order: Order,
  ) => void,
  sortable?: boolean,
  isStripped?: boolean,
  paginateData?: PaginationProps,
  wrapperClass?: string,
  rowActions?: RowActionType[],
  selectable?: boolean,
  tableContainerProps?: TableContainerProps,
  tableProps?: TableProps,
  tableBodyProps?: TableBodyProps,
  tableHeadProps?: TableHeadProps,
  tableRowCellProps?: TableCellProps 
  tableCellProps?: TableCellProps,
  tableHeaderRowProps?: TableRowProps,
  tableRowProps?: TableRowProps,
  rowClasses?: CommonObjType,
  dataCellAlign?: CellAlignType,
  actionCellAlign?: CellAlignType,
  hideActionHeader?: boolean
}

const cellMinWidth = 150;

const CustomTable = ({
  id = '',
  headers,
  data,
  rowUniqueIdKey,
  onRowSelect = () => {},
  cellRenderer,
  onRequestSort,
  sortable = false,
  rowActions,
  selectable = false,
  isStripped = false,
  paginateData,
  wrapperClass,
  tableContainerProps,
  tableProps,
  tableBodyProps,
  tableHeadProps,
  tableRowCellProps,
  tableCellProps,
  tableHeaderRowProps,
  tableRowProps,
  rowClasses = {},
  dataCellAlign = 'left',
  actionCellAlign = 'right',
  hideActionHeader = false,
}: CustomTableProps) => {
  const defaultSelected: TableRowDataType[] = [] 
  const rowCount  = data.length;

  const [selectedRows, setSelectedRows] = useState(defaultSelected);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof RowObjectType>('_id');
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  useEffect(() => {
    const hidden = headers.reduce((acc: string[], current) => {
      if (current.isHidden) {
        return [...acc, current.key]
      }
      return acc
    }, []);
    setHiddenColumns(hidden);
  }, []);

  const handleRowClick = (rowData: any) => {
    const selectedId: TableRowDataType  = rowData[rowUniqueIdKey];

    if (!(selectable && onRowSelect)) return;

    const isSelected = selectedRows.includes(selectedId);
    const newSelectedRows = isSelected
      ? selectedRows.filter((rowId: TableRowDataType) => rowId !== selectedId )
      : [...selectedRows, selectedId];
    
    setSelectedRows(newSelectedRows);  
    onRowSelect(newSelectedRows, !isSelected);
  };

  const handleSort = (property: keyof RowObjectType) => (event: React.MouseEvent<unknown>) => {
    if (!onRequestSort) return;

    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    setOrder(newOrder);
    setOrderBy(property);

    onRequestSort(event, property, newOrder);
  };

  const onSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) {
      const selected = data.map(item => item[rowUniqueIdKey]);
      setSelectedRows(selected);
      onRowSelect(selected, checked)
      return
    }

    setSelectedRows([]);
    onRowSelect([], checked);
  };

  const getRowClass = (rowIndex:number) => {
    const rowDynamicClass = rowClasses[rowIndex];

    if (rowDynamicClass) {
      return rowDynamicClass;
    }

    if (isStripped && rowIndex%2 === 1) {
      return 'table-row-striped'
    };

    return 'table-row-normal'
  }

  const renderTableHeader = () => {
    const numSelected = selectedRows.length;

    const selectAllCheck = (
      <Checkbox
        color="primary"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllClick}
        inputProps={{
          'aria-label': 'select all desserts',
        }}
      />
    );

    if (!(sortable && onRequestSort)) {
      return (
        <TableHead {...tableHeadProps}>
          <TableRow {...tableHeaderRowProps}>
            {selectable && (
              <TableCell {...tableRowCellProps}>
                {selectAllCheck}
              </TableCell>
            )}
            {headers.map((header) => {
              if (hiddenColumns.includes(header.key)) return null;

              return (
                <TableCell
                  key={`table-cell-key-${header.key}`}
                  align={dataCellAlign}
                  sx={{ minWidth: cellMinWidth }}
                  {...tableRowCellProps}
                >
                  {header.label}
                </TableCell>
              );
             })}
            {rowActions && rowActions.length > 0 && (
              <TableCell align={actionCellAlign} sx={{ minWidth: cellMinWidth }}>
                { hideActionHeader ? '' : 'Actions' }
              </TableCell>
            )}
          </TableRow>
        </TableHead>
      );
    }

    return (
      <TableHead>
        <TableRow>
          {selectable && (
            <TableCell>
              {selectAllCheck}
            </TableCell>
          )}
          {headers.map(header => {
            if (hiddenColumns.includes(header.key)) return null;

            return (
              <TableCell
                key={header.key}
                align={dataCellAlign}
                padding='normal'
                sortDirection={orderBy === header.key ? order : false}
                {...tableRowCellProps}
              >
                <TableSortLabel
                  active={orderBy === header.key}
                  direction={orderBy === header.key ? order : 'asc'}
                  onClick={handleSort(header.key)}
                >
                  {header.label}
                  {orderBy === header.key ? (
                    <Box component="span" sx={{ display:  'none' }}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          })}
          {rowActions && rowActions.length > 0 && (
            <TableCell align={actionCellAlign} sx={{ minWidth: cellMinWidth }}>
              { hideActionHeader ? '' : 'Actions' }
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  }

  const renderActionElement = (item: RowActionType, row: RowObjectType)  => {
    if (item.component) {
      const modifiedElement = React.cloneElement(item.component, {
        key: item.action,
        onClick: () => {item.handler(row[`${rowUniqueIdKey}`])},
      });

      return modifiedElement;
    }

    return (
      <CustomButton
        size = 'small'
        key={item.action}
        onClick={() => {item.handler(row[`${rowUniqueIdKey}`])}}
        variant='outlined'
      >
        {item.action}
      </CustomButton>
    )
  }

  return (
    <div className={wrapperClass} id={id}>
      <TableContainer component={Paper} {...tableContainerProps}>
        <Table aria-label='custom table' {...tableProps}>
          {renderTableHeader()}
          <TableBody {...tableBodyProps}>
            {data.map((row, rowIndex) => (
              <TableRow
                key={`table-row-key-${rowIndex}`}
                onClick={() =>
                  handleRowClick(row)
                }
                className={getRowClass(rowIndex)}
                {...tableRowProps}
              >
                {selectable && (
                  <TableCell {...tableCellProps}>
                    <Checkbox
                      checked={selectedRows.includes(row[rowUniqueIdKey])}
                    />
                  </TableCell>
                )}
                {Object.keys(row).map((key) => {
                  if (hiddenColumns.includes(key)) return null;

                  return (
                    <TableCell
                      key={`table-cell-key-${key}`}
                      align={dataCellAlign}
                      sx={{ wordWrap: 'break-word' }}
                      {...tableCellProps}
                    >
                      {cellRenderer
                        ? cellRenderer(row[key], key)
                        : row[key]
                      }
                    </TableCell>
                  )
                })}
                {rowActions && rowActions.length > 0 && (
                  <TableCell align={actionCellAlign} {...tableCellProps}>
                    {rowActions.map(item => (
                      renderActionElement(item, row)
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {paginateData && <Pagination {...paginateData} />}
    </div>
  );
};

export default memo(CustomTable);
