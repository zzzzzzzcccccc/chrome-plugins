import React from 'react';
import AppIcon from '../app-icon';
import { ResultProps } from './types';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { useStoreDispatch, useTheme, useTranslation, RecentKeywordItem } from '../../hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { setAppState } from '../../store/slices/app-slice';

export default function Result(props: ResultProps) {
  const { apps, filterRecentKeywordMap, onClickRecentKeyword, onRemoveRecentKeyword } = props;

  const t = useTranslation();
  const { globalStyle } = useTheme();
  const dispatch = useStoreDispatch();

  const handleAppOnClick = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    cb?: () => void,
  ) => {
    event.stopPropagation();
    dispatch(setAppState({ openSearch: false }));
    cb?.();
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLElement>, cb?: () => void) => {
    const { key } = event;
    if (key === 'Enter') {
      handleAppOnClick(event, cb);
    }
  };

  const handleOnClickRecentKeyword = (target: string, item: RecentKeywordItem) => () => {
    onClickRecentKeyword?.(target, item.source);
  };

  const handleOnRemoveRecentKeyword = (target: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemoveRecentKeyword?.(target);
  };

  const renderTitle = (children: React.ReactNode) => {
    return (
      <>
        <Typography variant="body1" sx={{ p: 1, pb: 0 }}>
          {children}
        </Typography>
        <Divider />
      </>
    );
  };

  const renderFilterRecentKeyword = () => {
    return (
      <>
        {renderTitle(t('recent_keyword'))}
        <List>
          {Object.keys(filterRecentKeywordMap).map((str, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={handleOnClickRecentKeyword(str, filterRecentKeywordMap[str])}>
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <AppIcon
                    target={`#${filterRecentKeywordMap[str].source}`}
                    type="svg"
                    width={20}
                    height={20}
                    style={{ width: 20, height: 20 }}
                  />
                </ListItemIcon>
                <ListItemText primary={str} title={str} sx={{ pl: 1, '> span': { ...globalStyle.ellipsis } }} />
                <IconButton onClick={handleOnRemoveRecentKeyword(str)} size="small">
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    );
  };

  const renderApplication = () => {
    return (
      <>
        {renderTitle(t('application'))}
        <List>
          {apps.map((app, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={(e) => handleAppOnClick(e, app.onClick)}
              onKeyDown={(e) => handleOnKeyDown(e, app.onClick)}
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <AppIcon
                    target={app.icon.target}
                    type={app.icon.type}
                    width={20}
                    height={20}
                    style={{ width: 20, height: 20 }}
                  />
                </ListItemIcon>
                <ListItemText sx={{ pl: 1 }} primary={app.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    );
  };

  return (
    <Box sx={{ maxHeight: 360, overflow: 'auto', width: '100%' }}>
      {!!Object.keys(filterRecentKeywordMap)?.length && renderFilterRecentKeyword()}
      {!!apps?.length && renderApplication()}
    </Box>
  );
}
