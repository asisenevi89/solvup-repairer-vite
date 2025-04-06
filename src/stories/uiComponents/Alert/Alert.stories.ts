import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Alert } from '../../../Components/UI';

const meta = {
  title: 'UI Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Alert component - complete prop list available at https://mui.com/material-ui/api/alert/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'text', description: 'Variant of the alert' },
    severity: {
      control: 'select',
      options: ["success", "info", "warning", "error"],
      description: 'Color / severity of the alert',
    },
    children: { control: 'text', description: 'Alert Content' },
    wrapperClass: { control: 'text',  description: 'Class for custom styling' },
    onClose: { description: 'Event listener for close event.' },
  },
  args: {
    variant: 'standard',
    severity: 'success',
    wrapperClass: '',
    onClose: fn()
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    variant: 'standard',
    children: 'Standard Alert',
    severity: 'success'
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'Filled Info  Alert',
    severity: 'info'
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Warning Alert',
    severity: 'warning'
  },
};
