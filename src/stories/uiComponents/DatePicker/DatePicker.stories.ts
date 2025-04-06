import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../../../Components/UI';
import { fn } from '@storybook/test';
import { Moment } from 'moment';

const meta = {
  title: 'UI Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Stepper component - complete prop list available at https://mui.com/x/api/date-pickers/date-picker/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label of the Date Picker',

    },
    format: {
      control: 'text',
      description: 'Date Format - Should enter valid format',
    },
    disabled: {
      control: 'boolean',
      description: 'Is picket disabled'
    }
  },
  
  args: {
    label: 'Select a date',
    format: 'YYYY MM DD',
    disabled: false,
    onChange: (date: Moment) => {
      alert(`Selected Date - ${date.format('YYYY MM DD')}`)
      fn()
    }
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PastDisabled: Story = {
  args: {
    label: 'Select a date',
    format: 'YYYY MM DD',
    disabled: false,
    disablePast: true,
  },
};

export const FutureDisabled : Story = {
  args: {
    label: 'Select a date',
    format: 'YYYY MM DD',
    disabled: false,
    disableFuture: true,
  },
};