import React, { useState } from 'react';
import AppIcon from '../app-icon';
import { AppCardProps } from './types';
import { Box, Typography, Menu } from '@mui/material';
import { CSS_NAME_SPACE } from '../../constants';
import { useTheme } from '../../hooks';

function AppCard(props: AppCardProps) {
  const { title, onClick, menus, onContextMenu, icon, ref, style, enableTab } = props;

  const { globalStyle, theme, appSize } = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      onClick?.(event);
    }
  };

  const handleOnContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (menus) {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      onContextMenu?.(event);
    }
  };

  const handleOnMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        className={`${CSS_NAME_SPACE}-click`}
        tabIndex={enableTab ? 0 : -1}
        sx={{
          ...globalStyle.fcc,
          p: 1,
          m: 1,
          backgroundColor: 'transparent',
          cursor: 'pointer',
          borderRadius: 1,
          width: appSize * 2,
          ...style,
        }}
        ref={ref}
        aria-label={title}
        title={title}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
        onContextMenu={handleOnContextMenu}
      >
        <Box className={`${CSS_NAME_SPACE}-fcc`}>
          <AppIcon
            type={icon.type}
            target={icon.target}
            style={icon.style}
            className={icon.className}
            width={appSize}
            height={appSize}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{ width: '100%', textAlign: 'center', pt: 1, color: theme.palette.text.primary }}
          noWrap
        >
          {title}
        </Typography>
      </Box>
      {menus && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleOnMenuClose}
          MenuListProps={{ 'aria-label': title }}
        >
          {menus}
        </Menu>
      )}
    </>
  );
}

export default AppCard;
