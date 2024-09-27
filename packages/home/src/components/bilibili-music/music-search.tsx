import React, { useMemo } from 'react';
import { Box, FormControl, Autocomplete, TextField, Chip, Stack, Button } from '@mui/material';
import { SVGS } from '../../constants';
import { useTheme, useTranslation, useStoreSelector, useStoreDispatch, useGetBilibiliViewMutation } from '../../hooks';
import AppIcon from '../app-icon';
import { setMusicState, BilibiliPlayMedia } from '../../store/slices/music-slice';
import { concurrentPromise } from '../../utils/promise-tool';
import { BilibiliViewResponse } from '../../model';

function MusicSearch() {
  const { globalStyle } = useTheme();
  const t = useTranslation();
  const dispatch = useStoreDispatch();
  const { bilibiliSearchKeywords, bilibiliQuerying } = useStoreSelector((state) => state.music);
  const [fetchView] = useGetBilibiliViewMutation();

  const hasKeywords = useMemo(
    () => bilibiliSearchKeywords.map((s) => s.trim()).filter(Boolean).length > 0,
    [bilibiliSearchKeywords],
  );

  const handleOnKeywordsChange = (_: React.SyntheticEvent, value: string[]) => {
    dispatch(setMusicState({ bilibiliSearchKeywords: value }));
  };

  const handleOnSearch = async () => {
    if (!bilibiliSearchKeywords.length || bilibiliQuerying) return;
    dispatch(setMusicState({ bilibiliQuerying: true }));
    const result = await concurrentPromise(
      bilibiliSearchKeywords.map((id) => () => fetchView(id)),
      2,
      true,
    );
    const responses = Object.values(result);
    const searchList = responses
      .map((res) => {
        if (res?.data) {
          const { data } = res.data as unknown as BilibiliViewResponse;
          const { bvid, aid, tid, cid, title, owner, pic, pages } = data;
          return pages.map((page) => ({
            bvid,
            aid,
            tid,
            cid: page.cid || cid,
            part: page.part || title,
            first_frame: page.first_frame || pic,
            owner_mid: owner?.mid,
            owner_name: owner?.name,
          })) as Array<BilibiliPlayMedia>;
        }
        return null;
      })
      .filter(Boolean)
      .flat() as Array<BilibiliPlayMedia>;
    dispatch(setMusicState({ bilibiliQuerying: false, bilibiliSearchList: searchList, bilibiliSelectedPlaylist: '' }));
  };

  return (
    <Box sx={{ ...globalStyle.fc, width: '100%', p: 1 }}>
      <Stack direction="row" spacing={1}>
        <FormControl size="small" sx={{ flex: 1 }}>
          <Autocomplete
            clearIcon={false}
            options={[]}
            freeSolo
            limitTags={20}
            multiple
            value={bilibiliSearchKeywords}
            onChange={handleOnKeywordsChange}
            size="small"
            renderTags={(value, props) =>
              value.map((option, index) => <Chip size="small" label={option} {...props({ index })} key={index + ''} />)
            }
            renderInput={(params) => <TextField label={t('bilibili_music.search_keywords')} {...params} />}
          />
        </FormControl>
        <Button
          disabled={!hasKeywords || bilibiliQuerying}
          variant="outlined"
          size="small"
          sx={{ ...globalStyle.fcc }}
          onClick={handleOnSearch}
        >
          <AppIcon target={`#${SVGS.search}`} type="svg" style={{ width: 20, height: 20 }} />
        </Button>
      </Stack>
    </Box>
  );
}

export default MusicSearch;
