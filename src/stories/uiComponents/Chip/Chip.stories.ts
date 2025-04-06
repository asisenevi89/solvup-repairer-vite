import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../../../Components/UI';

const meta = {
  title: 'UI Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chip component - complete prop list available at https://mui.com/material-ui/api/chip/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { },
  args: {
    color: 'info',
    variant: 'outlined',
    label: 'Primary Chip'
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'outlined',
    color: 'info',
    label: 'Primary Chip'
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    color: 'success',
    label: 'Filled Chip'
  },
};

export const Deletable: Story = {
  args: {
    variant: 'outlined',
    color: 'warning',
    label: 'Deletable Chip',
    onDelete: () => {}
  },
};

export const Clickable: Story = {
  args: {
    variant: 'outlined',
    color: 'error',
    label: 'Clickable Chip',
    onClick: () => {}
  },
};