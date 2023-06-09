import React from 'react';
import AppIcon from '../app-icon';
import { AppCardProps } from './types';
import { Box, Typography } from '@mui/material';
import { CSS_NAME_SPACE } from '../../constants';
import { useTheme } from '../../hooks';

function AppCard(props: AppCardProps) {
  const { title, onClick, icon, ref, style } = props;

  const { globalStyle, theme, appSize } = useTheme();

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      onClick?.(event);
    }
  };

  return (
    <Box
      className={`${CSS_NAME_SPACE}-click`}
      tabIndex={0}
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
  );
}

export default AppCard;
