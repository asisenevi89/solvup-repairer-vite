import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../../../Components/UI';
import './styles.scss';


const options = [
  { value: 'google', label: 'Google' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
]

const meta = {
  title: 'UI Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio Group component - complete prop list available at https://mui.com/material-ui/api/radio-group/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { },
  args: {
    items: options,
    wrapperClass: '',
    orientation: 'row',
    helpText: '',
    label: 'Select a Platform'
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: options,
    wrapperClass: '',
    orientation: 'row'
  },
};

export const DisabledOption: Story = {
  args: {
    items: [
      ...options,
      { value: 'twitter', label: 'Twitter', disabled: true }
    ],
    wrapperClass: '',
    orientation: 'row'
  },
};

export const VerticalOrientation: Story = {
  args: {
    items: options,
    wrapperClass: '',
    orientation: 'vertical'
  },
};

export const WithError: Story = {
  args: {
    items: options,
    wrapperClass: '',
    orientation: 'vertical',
    hasError: true,
    helpText: 'Should select an option'
  },
};
