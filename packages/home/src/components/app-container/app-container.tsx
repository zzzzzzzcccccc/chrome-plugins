import React, { useMemo, useEffect, useState, useRef } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Application from './application';
import { useTheme, useMenus, useStoreDispatch, useTranslation, useToast, useInitialize } from '../../hooks';
import AppIcon from '../app-icon';
import { DEFAULT_MENUS } from '../../constants';
import { MenuItem as IMenuItem, removeMenu } from '../../store/slices/menu-slice';

function AppCarousel() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { globalStyle } = useTheme();
  const { active, list } = useMenus();
  const { pushOnResizeHandler } = useInitialize();
  const [sw, setSw] = useState(0);
  const menuIndex = useMemo(() => {
    const index = list.map((m) => m.id).indexOf(active);
    if (index < 0) return 0;
    return index;
  }, [active, list]);

  useEffect(() => {
    const clearTimer = () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
    const handler = () => {
      clearTimer();
      timer.current = setTimeout(() => setSw(document.body.clientWidth), 500);
    };
    const unbind = pushOnResizeHandler(handler);

    handler();

    return () => {
      clearTimer();
      unbind();
    };
  }, [pushOnResizeHandler]);

  return (
    <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          width: list.length * sw,
          height: '100%',
          ...globalStyle.fr,
          flexWrap: 'nowrap',
          willChange: 'transform',
          transform: `translateX(${-menuIndex * sw}px)`,
          transition: 'transform 0.5s ease',
        }}
      >
        {list.map((record) => (
          <Box sx={{ width: sw, height: '100%', overflow: 'auto' }} key={record.id}>
            <Application enableTab={active === record.id} id={record.id} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function AppAccordion() {
  const { globalStyle, theme } = useTheme();
  const { active, list, setActive } = useMenus();
  const { show } = useToast();
  const t = useTranslation();
  const dispatch = useStoreDispatch();

  const handleOnToggleChange = (id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    dispatch(setActive(isExpanded ? id : ''));
  };

  const handleOnMenuRemove = (item: IMenuItem) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(removeMenu({ id: item.id }));
    if (active === item.id) {
      dispatch(setActive(list[0].id));
    }
    show({ message: t('delete_success'), type: 'success' });
  };

  return (
    <Box sx={{ flex: 1, width: '100%', overflow: 'auto' }}>
      {list.map((record) => {
        const enabled = record.id === active;
        const color = enabled ? theme.palette.primary.main : theme.palette.text.primary;
        const enabledRemove = !DEFAULT_MENUS[record.id];
        return (
          <Accordion
            sx={{ backgroundColor: 'transparent' }}
            key={record.id}
            expanded={enabled}
            onChange={handleOnToggleChange(record.id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ ...globalStyle.fr, alignItems: 'center', width: '100%' }}>
                <AppIcon
                  {...record.icon}
                  target={record.icon.type === 'svg' ? `#${record.icon.target}` : record.icon.target}
                  style={{ width: 36, height: 36, color }}
                />
                <Typography sx={{ color, pl: 1 }} variant="h6">
                  {t(record.title)}
                </Typography>
                <Box sx={{ ...globalStyle.frc, justifyContent: 'flex-end', flex: 1 }}>
                  {enabledRemove && (
                    <IconButton onClick={handleOnMenuRemove(record)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Application enableTab={active === record.id} id={record.id} />
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

function AppContainer() {
  const { appRenderMode } = useTheme();

  return { carousel: <AppCarousel />, accordion: <AppAccordion /> }[appRenderMode] || null;
}

export default AppContainer;
