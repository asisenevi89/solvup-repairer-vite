import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../../../Components/UI';

const steps = [
  { value: '1', label: 'Download' },
  { value: '2', label: 'Unzip' },
  { value: '3', label: 'Install' },
  { value: '4', label: 'Run' },
];

let selected = 0;

const onSelected = (value: string)  => {
  alert(`Selected value : ${value}`);
};

const meta = {
  title: 'UI Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Stepper component - complete prop list available at https://mui.com/material-ui/api/stepper/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      description: 'Direction of the stepper',
      options: ['vertical', 'horizontal']

    },
    nonLinear: {
      control: 'boolean',
      description: 'Is stepper leaner',
    },
  },
  
  args: {
    steps: steps,
    orientation: 'horizontal',
    nonLinear: true,
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    steps: steps,
    orientation: 'horizontal',
    nonLinear: true,
  },
};

export const AlternativeLabel: Story = {
  args: {
    steps: steps,
    orientation: 'horizontal',
    nonLinear: true,
    alternativeLabel: true,
  },
};

export const Vertical: Story = {
  args: {
    steps: steps,
    orientation: 'vertical',
    nonLinear: true,
  },
};

export const Completed: Story = {
  args: {
    steps: steps.map(step => ({ ...step, completed: true})),
    orientation: 'horizontal',
    nonLinear: true,
  },
};

export const Selection: Story = {
  args: {
    steps,
    orientation: 'horizontal',
    nonLinear: true,
    activeStep: selected,
    onStepClick: (value => {onSelected(value)})
  },
};