import React, { useMemo } from 'react';
import { Box, Container } from '@mui/material';
import Application from './application';
import { useTheme, useStoreSelector, useRect } from '../../hooks';

function AppContainer() {
  const { globalStyle } = useTheme();
  const { active, list } = useStoreSelector((state) => state.menu);
  const rect = useRect(document.body);
  const menuIndex = useMemo(() => list.map((m) => m.id).indexOf(active), [active, list]);

  return (
    <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          width: list.length * 100 + '%',
          height: '100%',
          ...globalStyle.fr,
          flexWrap: 'nowrap',
          transform: `translateX(${-menuIndex * (rect?.width || 0)}px)`,
          transition: 'transform 0.5s ease',
        }}
      >
        {list.map((record) => (
          <Box key={record.id} sx={{ width: '100%', height: '100%' }}>
            <Container sx={{ ...globalStyle.fr, flexWrap: 'wrap' }}>
              <Application apps={record.apps} />
            </Container>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default AppContainer;
