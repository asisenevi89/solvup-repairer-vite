import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../../../Components/UI';
import { Search, EmailOutlined } from '@mui/icons-material';

const meta = {
  title: 'UI Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text Field component - complete prop list available at https://mui.com/material-ui/api/text-field/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Text Field Label' },
    variant: {
      control: 'select',
      description: 'Variant of the TextField',
      options: ['outlined', 'filled', 'standard']

    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'Color of the TextField',
    },
    type: {
      control: 'select',
      options: ['text', 'number', 'password'],
      description: 'Type of the Text Field',
    },
    helperText: { control: 'text', description: 'Show Error / Details of the TextField' },
  },
  
  args: {
    label: 'Text Label',
    variant: 'outlined',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AutoFocused: Story = {
  args: {
    label: 'Text Label',
    variant: 'outlined',
    color: 'primary',
    autoFocus: true,
  },
};

export const OutlinePassword: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    type: 'password',
    label: 'Enter Password',
  },
};

export const StandardNumbersOnly: Story = {
  args: {
    variant: 'standard',
    color: 'primary',
    type: 'number',
    label: 'Number Field'
  },
};

export const OutlineDisabled: Story = {
  args: {
    variant: 'outlined',
    disabled: true,
    label: 'Disabled Text',
    value: 'Text Disabled Here'
  },
};

export const FilledSuccess: Story = {
  args: {
    variant: 'filled',
    color: 'success',
    label: 'Filled Text Filed',
  },
};

export const ErrorWithHelpText: Story = {
  args: {
    variant: 'outlined',
    color: 'error',
    label: 'Text Filed with Error',
    helperText: 'This field has an error',
    error: true,
  },
};

export const NumberFieldWithCurrency: Story = {
  args: {
    variant: 'outlined',
    label: 'Amount',
    type: 'number',
    slotProps: { input: { startAdornment: `$` }},
  },
};

export const WithEndText: Story = {
  args: {
    variant: 'outlined',
    label: 'Enter Pixels',
    slotProps: { input: { endAdornment: `px` }},
  },
};


export const WithStartIcon: Story = {
  args: {
    variant: 'outlined',
    label: 'Search for values',
    type: 'email',
    slotProps: { input: { startAdornment: <Search /> }},
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: 'outlined',
    label: 'Enter your email',
    type: 'email',
    slotProps: { input: { endAdornment: <EmailOutlined /> }},
  },
};
