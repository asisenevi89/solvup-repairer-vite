import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../../../Components/UI';


const meta = {
  title: 'UI Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Typography component - Complete Prop list available at https://mui.com/material-ui/api/typography/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ["body1", "body2", "button", 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2'],
      description: 'Variant of text',
    },
    align: {
      control: 'select',
      options: ["center", "inherit", "justify", 'left', 'right'],
      description: 'Alignment of text',
    },
  },
  args: {
    variant: 'h5',
    children: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading5: Story = {
  args: {
    variant: 'h5',
    children: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    color: 'inherit',
    align: 'inherit',
  },
};

export const ParagraphRightAlign: Story = {
  args: {
    variant: 'body1',
    children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    align: 'right'
  },
};

export const ParagraphJustify: Story = {
  args: {
    variant: 'body1',
    children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    align: 'justify'
  },
};