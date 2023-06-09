import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import Application from './application';
import { useTheme, useStoreSelector, useRect } from '../../hooks';

function AppContainer() {
  const { globalStyle } = useTheme();
  const { active, list } = useStoreSelector((state) => state.menu);
  const rect = useRect(document.body);
  const menuIndex = useMemo(() => list.map((m) => m.id).indexOf(active), [active, list]);

  const sw = rect?.width || 0;

  return (
    <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          width: list.length * sw,
          height: '100%',
          ...globalStyle.fr,
          flexWrap: 'nowrap',
          transform: `translateX(${-menuIndex * sw}px)`,
          transition: 'transform 0.5s ease',
        }}
      >
        {list.map((record) => (
          <Box sx={{ width: sw, height: '100%', overflow: 'auto' }} key={record.id}>
            <Application apps={record.apps} id={record.id} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default AppContainer;
