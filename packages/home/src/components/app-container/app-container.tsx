import React, { useMemo } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Application from './application';
import { useTheme, useRect, useMenus, useStoreDispatch, useTranslation } from '../../hooks';
import AppIcon from '../app-icon';

function AppCarousel() {
  const { globalStyle } = useTheme();
  const { active, list } = useMenus();
  const rect = useRect(document.body);
  const menuIndex = useMemo(() => {
    const index = list.map((m) => m.id).indexOf(active);
    if (index < 0) return 0;
    return index;
  }, [active, list]);

  const sw = rect?.width || 0;

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
  const t = useTranslation();
  const dispatch = useStoreDispatch();

  const handleOnToggleChange = (id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    dispatch(setActive(isExpanded ? id : ''));
  };

  return (
    <Box sx={{ flex: 1, width: '100%', overflow: 'auto' }}>
      {list.map((record) => {
        const enabled = record.id === active;
        const color = enabled ? theme.palette.primary.main : theme.palette.text.primary;
        return (
          <Accordion
            sx={{ backgroundColor: 'transparent' }}
            key={record.id}
            expanded={enabled}
            onChange={handleOnToggleChange(record.id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ ...globalStyle.fr, alignItems: 'center' }}>
                <AppIcon
                  {...record.icon}
                  target={record.icon.type === 'svg' ? `#${record.icon.target}` : record.icon.target}
                  style={{ width: 36, height: 36, color }}
                />
                <Typography sx={{ color, pl: 1 }} variant="h6">
                  {t(record.title)}
                </Typography>
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
