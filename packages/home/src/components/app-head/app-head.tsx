import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import RealTime from '../real-time';
import { useTheme, useTranslation, useStoreDispatch, useInitialize, useStoreSelector, useToast } from '../../hooks';
import { setAppState } from '../../store/slices/app-slice';
import AppIcon from '../app-icon';
import { SVGS } from '../../constants';
import { getCurrentTab } from '@chrome-plugin/common';

function AppHead() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { isMac, isRenderPopup } = useInitialize();
  const { show } = useToast();
  const { openSearch, openSetting } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();

  const handleSearchOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setAppState({ openSearch: !openSearch }));
  };

  const handleSettingOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setAppState({ openSetting: !openSetting }));
  };

  const handleCollectOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const { tab } = await getCurrentTab();
    if (tab) {
      dispatch(
        setAppState({
          activeBrowserTab: tab,
          openCollectWebsiteForm: true,
        }),
      );
    } else {
      show({
        message: t('no_found_active_tab'),
        type: 'error',
      });
    }
  };

  const renderTitle = (title: string, subtitle?: string) => {
    return (
      <>
        <Typography variant="subtitle1">{title}</Typography>
        {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
      </>
    );
  };

  return (
    <Box
      sx={{
        ...globalStyle.frc,
        ...globalStyle.glass,
        width: '100%',
        height: 30,
        pl: 2,
        pr: 2,
      }}
    >
      <Box sx={{ ...globalStyle.frc, justifyContent: 'flex-start', flex: 1 }}>
        {isRenderPopup && (
          <Tooltip title={renderTitle(t('bookmark_current_site'))}>
            <IconButton size="small" sx={{ ...globalStyle.fcc }} onClick={handleCollectOnClick}>
              <AppIcon target={`#${SVGS.collect}`} type="svg" style={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Box sx={{ ...globalStyle.frc, justifyContent: 'flex-end', flex: 1 }}>
        <Tooltip title={renderTitle(t('search'), isMac ? 'Command + s' : 'Alt + s')}>
          <IconButton size="small" sx={{ ...globalStyle.fcc }} onClick={handleSearchOnClick}>
            <AppIcon target={`#${SVGS.search}`} type="svg" style={{ width: 20, height: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={renderTitle(t('setting'), isMac ? 'Command + o' : 'Alt + o')}>
          <IconButton size="small" sx={{ ...globalStyle.fcc }} onClick={handleSettingOnClick}>
            <AppIcon target={`#${SVGS.setting}`} type="svg" style={{ width: 20, height: 20 }} />
          </IconButton>
        </Tooltip>
        <RealTime />
      </Box>
    </Box>
  );
}

export default AppHead;
