import React, { useState, useMemo } from 'react';
import { InputBase, Box, List, ListItem, Button, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation, useLanguage, useTheme } from '../../hooks';
import { formatString } from '../../utils';

type Translation = {
  value: string;
  content: string;
};

const translations: Translation[] = [
  { value: 'zh-CN', content: '🇨🇳' },
  { value: 'en-US', content: '🇺🇸' },
];

export default function TranslationsSetting() {
  const t = useTranslation();
  const { nation, updateNation } = useLanguage();
  const { globalStyle } = useTheme();

  const [keyword, setKeyword] = useState('');

  const getTranslationKey = (value: string) =>
    `setting.translations.${formatString.toSymbol(formatString.toLocaleLowerCase(value))}`;

  const memoTranslations = useMemo(() => {
    const value = keyword.trim();
    const data = translations.map((record) => ({
      ...record,
      label: `${record.content} ${t(`${getTranslationKey(record.value)}`)}`,
      selected: nation === record.value,
    }));
    return !value
      ? data
      : data.filter(
          (record) => formatString.toLocaleLowerCase(record.label).indexOf(formatString.toLocaleLowerCase(value)) > -1,
        );
  }, [nation, keyword, t]);

  return (
    <>
      <Box sx={{ ...globalStyle.frc }}>
        <SearchIcon />
        <InputBase
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder={t('setting.translations.search_placeholder') || ''}
          inputProps={{ 'aria-label': 'Search Languages' }}
        />
      </Box>
      {!memoTranslations.length ? (
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {t('no_result')}
        </Typography>
      ) : (
        <List sx={{ maxHeight: 240, overflow: 'auto' }}>
          {memoTranslations.map((record) => {
            return (
              <ListItem key={record.value} disablePadding disableGutters>
                <Button
                  fullWidth
                  endIcon={record.selected && <DoneIcon />}
                  onClick={() => updateNation(record.value)}
                  sx={{ ...globalStyle.ttn, justifyContent: 'flex-start' }}
                >
                  {record.label}
                </Button>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}
