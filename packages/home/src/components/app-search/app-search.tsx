import React, { useState } from 'react';
import { Box, Paper, IconButton, InputBase, Divider, Tabs, Tab, Portal } from '@mui/material';
import { useTheme, useTranslation, useAppSearch } from '../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import Result from './result';
import AppIcon from '../app-icon';
import { buildSearchUrlByKeyword, createLink } from '../../utils';

export default function AppSearch() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const {
    keyword,
    setKeyword,
    apps,
    filterRecentKeywordMap,
    openSearch,
    handlerSearchApps,
    handleSearchRecentKeyword,
    addRecentKeyword,
    removeRecentKeyword,
  } = useAppSearch();

  const [source, setSource] = useState('google');

  const goToSource = () => {
    const url = buildSearchUrlByKeyword(keyword, source);

    if (!keyword.trim() || !url) return;

    const link = createLink(url);

    addRecentKeyword(keyword, source);

    link.click();
    link.remove();
  };

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
    handlerSearchApps(value);
    handleSearchRecentKeyword(value);
  };

  const handleSearchOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === 'Enter') {
      event.preventDefault();
      goToSource();
    }
  };

  const iconStyle: React.CSSProperties = {
    width: 20,
    height: 20,
  };

  const sources = [
    {
      id: 'google',
      label: t('google'),
    },
    {
      id: 'baidu',
      label: t('baidu'),
    },
    {
      id: 'bing',
      label: t('bing'),
    },
    {
      id: 'yahoo',
      label: t('yahoo'),
    },
  ];

  return (
    <Portal container={document.body}>
      {openSearch && (
        <Box
          sx={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', top: '10%', ...globalStyle.maxZIndex }}
        >
          <Paper sx={{ ...globalStyle.fc, ...globalStyle.glass, width: 320 }} elevation={6}>
            <Box sx={{ ...globalStyle.fcc, pb: 1, width: '100%' }}>
              <Tabs
                sx={{
                  width: '100%',
                  '.MuiButtonBase-root': { ...globalStyle.ttn, minWidth: 'auto', width: '25%', p: 0.5 },
                }}
                value={sources.map((r) => r.id).indexOf(source)}
                onChange={(_, index) => setSource(sources[index].id)}
              >
                {sources.map((record) => (
                  <Tab
                    key={record.id}
                    title={record.label}
                    icon={<AppIcon target={`#${record.id}`} type="svg" style={iconStyle} />}
                    aria-label={record.label}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ ...globalStyle.frc, width: '100%' }} tabIndex={0}>
              <InputBase
                autoFocus
                sx={{ ml: 1, flex: 1 }}
                placeholder={t('search') || ''}
                inputProps={{ 'aria-label': t('search') || '' }}
                value={keyword}
                onFocus={(e) => e.stopPropagation()}
                onBlur={(e) => e.stopPropagation()}
                onKeyDown={handleSearchOnKeyDown}
                onChange={handleSearchOnChange}
              />
              <Divider sx={{ m: 0.5, height: 28 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: 0.5 }} onClick={goToSource}>
                <SearchIcon />
              </IconButton>
            </Box>
            <Result
              apps={apps}
              filterRecentKeywordMap={filterRecentKeywordMap}
              onClickRecentKeyword={goToSource}
              onRemoveRecentKeyword={removeRecentKeyword}
            />
          </Paper>
        </Box>
      )}
    </Portal>
  );
}
