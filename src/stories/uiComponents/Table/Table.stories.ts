import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../../../Components/UI';
import { tableData1 } from './sampleData';
import _startCase from 'lodash/startCase';
import './styles.scss';

const meta = {
  title: 'UI Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Table component - complete prop list available at https://mui.com/material-ui/api/table/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { },
  args: {
    data: tableData1,
    wrapperClass: '',
    headers: [
      { key: 'detail', label: 'Detail' },
      { key: 'value', label: 'Value' }
    ],
    rowUniqueIdKey: "detail",
    rowActions: [],
    tableHeaderRowProps: {
      className: 'table-head-default'
    }
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: tableData1,
    wrapperClass: '',
    headers: [
      { key: 'detail', label: 'Detail' },
      { key: 'value', label: 'Value' }
    ],
    rowUniqueIdKey: "detail",
    cellRenderer: (value) => _startCase(value as string)
  },
};

export const ActionTable: Story = {
  args: {
    data: tableData1,
    wrapperClass: '',
    headers: [
      { key: 'detail', label: 'Detail' },
      { key: 'value', label: 'Value' }
    ],
    rowUniqueIdKey: "detail",
    cellRenderer: (value) => _startCase(value as string),
    rowActions: [{ action:'View', handler: () => {} }]
  },
};


export const StripedTable: Story = {
  args: {
    data: tableData1,
    wrapperClass: '',
    headers: [
      { key: 'detail', label: 'Detail' },
      { key: 'value', label: 'Value' }
    ],
    rowUniqueIdKey: "detail",
    cellRenderer: (value) => _startCase(value as string),
    rowActions: [{ action:'View', handler: () => {} }],
    isStripped: true
  },
};

export const NoHeaderTable: Story = {
  args: {
    data: tableData1,
    wrapperClass: '',
    headers: [],
    rowUniqueIdKey: "detail",
    cellRenderer: (value) => _startCase(value as string),
    isStripped: true
  },
};

export const SelectTable: Story = {
  args: {
    data: tableData1,
    wrapperClass: '',
    headers: [
      { key: 'detail', label: 'Detail' },
      { key: 'value', label: 'Value' }
    ],
    rowUniqueIdKey: "detail",
    cellRenderer: (value) => _startCase(value as string),
    rowActions: [{ action:'View', handler: () => {} }],
    selectable: true,
    tableHeaderRowProps: {
      className: 'table-head-inherit'
    }
  },
};
