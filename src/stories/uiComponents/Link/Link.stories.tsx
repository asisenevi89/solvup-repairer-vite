import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../../Components/UI';

const meta = {
  title: 'UI Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Link component - Complete prop list available at https://mui.com/material-ui/api/link/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Link Target',
    },
    color: {
      control: 'text',
      description: 'Link Color'
    },
    underline: {
      control: 'select',
      description: 'Link Underline Status',
      options: ["always", "hover", "none", ],
      defaultValue: 'always'
    },
    variant: {
      control: 'select',
      description: 'Link Variant',
      options: [
        'body1',
        'body2',
        'button',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'inherit',
        'overline',
        'subtitle1',
        'subtitle2',
      ],
      defaultValue: 'inherit'
    }
  },
  args: {
    href: 'https://google.com',
    color: 'primary',
    target: "_blank",
    variant: 'inherit',
    children: 'Google'
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://google.com',
    color: 'primary',
    target: "_blank",
    variant: 'inherit',
    children: 'Google',
  },
};

export const ButtonVariant: Story = {
  args: {
    href: 'https://google.com',
    color: 'primary',
    target: "_blank",
    variant: 'button',
    children: 'Google',
    underline: 'none',
  },
};

export const H5TextVariant: Story = {
  args: {
    href: 'https://google.com',
    color: 'primary',
    target: "_blank",
    variant: 'h5',
    children: 'Google',
  },
};

export const SuccessVariant: Story = {
  args: {
    href: 'https://google.com',
    color: 'success',
    target: "_blank",
    variant: 'h5',
    children: 'Google',
  },
};
