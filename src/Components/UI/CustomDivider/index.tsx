import { memo } from 'react';
import Divider, { DividerProps } from '@mui/material/Divider';

export interface CustomDividerProps extends DividerProps {}

const CustomDivider = (props: CustomDividerProps) =>  <Divider {...props} />

export default memo(CustomDivider);
