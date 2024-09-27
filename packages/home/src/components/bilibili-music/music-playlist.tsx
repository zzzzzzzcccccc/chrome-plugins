import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useTheme, useTranslation, useStoreDispatch, useStoreSelector } from '../../hooks';
import {
  setBilibiliPlaylist,
  removeBilibiliPlaylist,
  selectBilibiliPlaylist,
  BilibiliPlaylist,
} from '../../store/slices/music-slice';
import PlaylistAction from './playlist-action';

function MusicPlaylist() {
  const { globalStyle } = useTheme();
  const dispatch = useStoreDispatch();
  const { bilibiliPlaylist, bilibiliSelectedPlaylist } = useStoreSelector((state) => state.music);

  const t = useTranslation();

  const [keyword, setKeyword] = useState('');

  const handleOnKeywordChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const name = keyword.trim();
      if (name) {
        dispatch(setBilibiliPlaylist({ id: uuid().replace(/-/gi, ''), name, media: [] }));
        setKeyword('');
      }
    }
  };

  const handleOnRemove = (id: string) => {
    dispatch(removeBilibiliPlaylist(id));
  };

  const handleOnUpdate = (payload: BilibiliPlaylist) => {
    dispatch(setBilibiliPlaylist(payload));
  };

  const handleOnSelect = (item: BilibiliPlaylist) => {
    dispatch(selectBilibiliPlaylist(item.id));
  };

  return (
    <Box sx={{ ...globalStyle.fc, width: 240 }}>
      <TextField
        value={keyword}
        onChange={handleOnKeywordChange}
        size="small"
        label={t('bilibili_music.add_playlist')}
        onKeyDown={handleKeyDown}
      />
      <Box
        sx={{
          ...globalStyle.fc,
          width: '100%',
          height: 'calc(100vh - 30px - 56px - 56px - 48px - 10px)',
          overflow: 'auto',
          pt: 1,
        }}
      >
        {bilibiliPlaylist.map((item) => (
          <PlaylistAction
            active={item.id === bilibiliSelectedPlaylist}
            key={item.id}
            record={item}
            onRemove={handleOnRemove}
            onUpdate={handleOnUpdate}
            onSelect={handleOnSelect}
          />
        ))}
      </Box>
    </Box>
  );
}

export default MusicPlaylist;
