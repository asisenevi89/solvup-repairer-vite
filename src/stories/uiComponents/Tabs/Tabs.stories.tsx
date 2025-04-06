import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tabs } from '../../../Components/UI';
import { ShoppingCart } from '@mui/icons-material';

const tabs = [
  { value: 'products', label: 'Products' },
  { value: 'categories', label: 'Sections' },
  { value: 'departments', label: 'Departments' },
];

const tabPanels = [
  { value: 'products', children:  <h2>Products Tab</h2> },
  { value: 'categories', children: <h2>Categories Tab</h2>},
  { value: 'departments', children: <h2>Departments Tab</h2>},
];

const meta = {
  title: 'UI Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tab component - complete prop list available at https://mui.com/material-ui/api/tabs/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectedTab: { control: 'text', description: 'Current Selected Tab' },
    onTabChange: { description: 'Event listener for close event.' },
  },
  args: {
    tabList: tabs,
    selectedTab: 'products',
    tabPanelList: tabPanels,
    onTabChange: fn()
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    tabList: tabs,
    selectedTab: 'products',
    tabPanelList: tabPanels,
    onTabChange: fn()
  },
};

export const DisabledTab: Story = {
  args: {
    tabList: [
      ...tabs,
      { value: 'stores', label: 'Stores', disabled: true },
    ],
    selectedTab: 'products',
    tabPanelList: tabPanels,
    onTabChange: fn()
  },
};

export const WithTabIcon: Story = {
  args: {
    tabList: [
      ...tabs,
      {
        value: 'cart',
        label: (
          <span style={{ display: 'flex'}}>
            <ShoppingCart fontSize='small' /> Cart
          </span>
        ),
      },
    ],
    selectedTab: 'products',
    tabPanelList: [ 
      ...tabPanels,
      { value: 'cart', children: <h2>Cart Tab</h2>},
    ],
    onTabChange: fn()
  },
};

