import { memo} from 'react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Container, { ContainerProps } from '@mui/material/Container';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';

export interface CustomAppBarProps extends AppBarProps {
  wrapperClass?: string,
  containerProps?: ContainerProps,
  toolbarProps?: ToolbarProps,
};

const CustomAppBar = (props: CustomAppBarProps) => {
  const {
    wrapperClass,
    children,
    containerProps,
    toolbarProps,
    ...appBarProps
  } = props;

  return (
    <div className={wrapperClass}>
      <AppBar {...appBarProps}>
        <Container maxWidth={false} {...containerProps}>
          <Toolbar disableGutters {...toolbarProps}>
            {children}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default memo(CustomAppBar);
