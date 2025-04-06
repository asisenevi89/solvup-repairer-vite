import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../../Components/UI';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Switch component - complete prop list available at https://mui.com/material-ui/api/switch/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'Color of the Switch',
    },
  },
  args: {
    color: 'info',
    label: 'Enable Routing'
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'info',
    label: 'Primary Chip',
    checked: true,
  },
};

export const Controlled: Story = {
  
  args: {
    color: 'info',
    label: 'Controlled Chip',
    defaultChecked: true,
    onChange: fn((event) =>  alert(`Changed to ${event.target.checked}`))
  },
};

export const NoLabel: Story = {
  args: {
    color: 'info',
    label: '',
    defaultChecked: false,
  },
};
