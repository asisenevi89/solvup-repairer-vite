import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectChangeEvent } from '../../../Components/UI';

const values = [
  { value: 'vic', label: 'Victoria' },
  { value: 'wa', label: 'Western Australia' },
  { value: 'sa', label: 'South Australia' },
  { value: 'nsw', label: 'New South Wales' },
]

const meta = {
  title: 'UI Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Select component - complete prop list available at https://mui.com/material-ui/api/select/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label of the Select',

    },
    options: {
      description: 'Option list to be selected',
    },
    hasError: {
      control: 'boolean',
      description: 'is select has Error'
    },
    helpText: {
      control: 'text',
      description: 'Help Text'
    }
  },
  
  args: {
    label: 'Select a State',
    options:  values,
    disabled: false,
    sx: {
      width: "300px"
    }
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultBehaviour: Story = {
  args: {
    label: 'Select a State',
    options: values,
  },
};

export const OnchangeTrigger: Story = {
  args: {
    label: 'Select a State',
    options: values,
    onChange: (event: SelectChangeEvent) => {
      alert(`Selected value ${event.target.value}`)
    }
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: 'Select a State',
    options: values,
    disabled: true,
    value: 'vic',
  },
};

export const HasError: Story = {
  args: {
    label: 'Select a State',
    options: values,
    hasError: true,
    helpText: 'Need to Select a value',
    onChange: (event: SelectChangeEvent) => {
      alert(`Selected value ${event.target.value}`)
    }
  },
};
