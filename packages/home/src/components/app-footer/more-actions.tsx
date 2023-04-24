import React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useTheme, useTranslation } from '../../hooks';

function MoreActions() {
  const t = useTranslation();
  const { theme } = useTheme();

  return (
    <Box>
      <Tooltip title={t('menu_actions')}>
        <Button sx={{ minWidth: 'auto', p: 0, borderRadius: 0 }}>
          <svg style={{ width: 36, height: 36, color: theme.palette.text.primary }}>
            <use xlinkHref="#more-menu" />
          </svg>
        </Button>
      </Tooltip>
    </Box>
  );
}

export default MoreActions;