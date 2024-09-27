import React from 'react';
import DrawerRoute from '../drawer-route';
import { Box, Stack } from '@mui/material';
import { useTheme, useTranslation } from '../../hooks';
import MusicSearch from './music-search';
import MusicList from './music-list';
import MusicPlaylist from './music-playlist';

function BilibiliMusic() {
  const { globalStyle } = useTheme();
  const t = useTranslation();

  return (
    <DrawerRoute title={t('bilibili_music')}>
      <Box sx={{ ...globalStyle.fc, flex: 1, width: '100%' }}>
        <MusicSearch />
        <Box sx={{ ...globalStyle.fr, flex: 1, width: '100%', p: 1, gap: 0.5 }}>
          <MusicList />
          <MusicPlaylist />
        </Box>
      </Box>
    </DrawerRoute>
  );
}

export default BilibiliMusic;
