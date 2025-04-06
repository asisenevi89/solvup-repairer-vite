import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from '../../../Components/UI';

const options = [
  { value: 'google', label: 'Google' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
]

const meta = {
  title: 'UI Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox Group component'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { },
  args: {
    options,
    orientation: 'row',
    helpText: '',
    heading: 'Select Platforms'
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    orientation: 'row'
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      ...options,
      { value: 'twitter', label: 'Twitter', disabled: true }
    ],
    orientation: 'row'
  },
};

export const VerticalOrientation: Story = {
  args: {
    options,
    orientation: 'column'
  },
};

export const WithError: Story = {
  args: {
    options,
    orientation: 'column',
    hasError: true,
    helpText: 'Should select an option'
  },
};
