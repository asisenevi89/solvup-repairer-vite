import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '../../../Components/UI';

const meta = {
  title: 'UI Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text Area component - complete prop list available at https://mui.com/material-ui/api/text-field/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Text Area Label' },
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
    helpText: { control: 'text', description: 'Show Error / Details of the TextField' },
  },
  
  args: {
    label: 'Text Label',
    variant: 'outlined',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;


export const PrimaryStory: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    label: 'Enter Text',
    fullWidth: true,
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


