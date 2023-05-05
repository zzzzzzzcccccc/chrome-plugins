import React from 'react';
import { AppCardProps } from './types';
import { Box, Typography } from '@mui/material';
import { CSS_NAME_SPACE } from '../../constants';
import { useTheme } from '../../hooks';
import Image from 'next/image';

function AppCard(props: AppCardProps) {
  const { title, onClick, icon } = props;

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
      case 'image':
        return <Image width={appSize} height={appSize} {...iconProps} alt="icon" src={icon.target} />;
      default:
        return null;
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
      }}
      title={title}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
    >
      <Box className={`${CSS_NAME_SPACE}-fcc`}>{renderIcon()}</Box>
      <Typography
        variant="body2"
        sx={{ width: '100%', textAlign: 'center', pt: 1, color: theme.palette.text.primary }}
        noWrap
        className={`${CSS_NAME_SPACE}-fcc`}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default AppCard;
