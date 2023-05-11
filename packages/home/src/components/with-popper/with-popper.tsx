import React, { cloneElement, useState } from 'react';
import { Popper, Fade } from '@mui/material';
import { WithPopperProps } from './types';
import { useTheme } from '../../hooks';

function WithPopper<Element extends HTMLElement>(props: WithPopperProps) {
  const { children, extra, popperProps } = props;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [open, setOpen] = useState(false);

  const { theme } = useTheme();

  const id = open && Boolean(anchorEl) ? 'transition-popper' : undefined;

  const handleOnClick = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
    setOpen((pre) => !pre);
    children.props?.onClick?.(event);
  };

  const handleOnMouseEnter = (event: React.MouseEvent<Element>) => {
    children.props?.onMouseEnter?.(event);
  };

  const handleOnMouseLeave = (event: React.MouseEvent<Element>) => {
    children.props?.onMouseLeave?.(event);
  };

  const handleCloneElement = () => {
    return cloneElement(children, {
      'aria-describedby': id,
      onClick: handleOnClick,
      onMouseEnter: handleOnMouseEnter,
      onMouseLeave: handleOnMouseLeave,
    });
  };

  return (
    <>
      {handleCloneElement()}
      <Popper
        {...popperProps}
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: theme.zIndex.tooltip, ...popperProps?.sx }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            {extra}
          </Fade>
        )}
      </Popper>
    </>
  );
}

export default WithPopper;
