import React from 'react';
import { AppCardProps } from './types';
import { Box, Typography } from '@mui/material';
import { CSS_NAME_SPACE } from '../../constants';
import { useTheme } from '../../hooks';

function AppCard(props: AppCardProps) {
  const { title, onClick, icon } = props;

  const { globalStyle } = useTheme();

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  };

  const renderIcon = () => {
    const iconProps = {
      style: icon.style,
      className: icon.className,
    };
    switch (icon.type) {
      case 'svg':
        return (
          <svg {...iconProps}>
            <use xlinkHref={icon.target} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      className={`${CSS_NAME_SPACE}-click`}
      sx={{
        ...globalStyle.fcc,
        width: 120,
        p: 1,
        m: 1,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderRadius: 1,
      }}
      onClick={handleOnClick}
    >
      <Box className={`${CSS_NAME_SPACE}-fcc`}>{renderIcon()}</Box>
      <Typography
        variant="body1"
        sx={{ width: '100%', textAlign: 'center', pt: 1 }}
        noWrap
        className={`${CSS_NAME_SPACE}-fcc`}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default AppCard;
