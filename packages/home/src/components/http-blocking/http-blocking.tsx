import React, { useState, useMemo, useEffect } from 'react';
import { sendMessageByCurrentTab, sendMessageByRunTime, getCurrentTab } from '@chrome-plugin/common';
import { Box, Button, Divider, FormControlLabel, IconButton, Stack, Switch, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DrawerRoute from '../drawer-route';
import { useInitialize, useStoreDispatch, useStoreSelector, useTheme, useToggle, useTranslation } from '../../hooks';
import { setHttpBlocking } from '../../store/slices/app-slice';
import ConfirmDialog from '../confirm-dialog';
import Item from './item';
import { DEFAULT_HTTP_METHODS, DEFAULT_RESPONSE, MAX_HTTP_BLOCKING_TOTAL_RULE } from '../../constants';
import {
  ChromeMessageMethod,
  ChromeMessageTo,
  HttpBlockingActionType,
  HttpBlockingItem,
  HttpResponseHeaderOperation,
} from '../../model';

function HttpBlocking() {
  const t = useTranslation();
  const { isRenderPopup } = useInitialize();
  const { globalStyle } = useTheme();
  const { value: deleteConfirmDialogOpen, open: openDeleteConfirm, close: closeDeleteConfirm } = useToggle();
  const { httpBlocking } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();
  const [chromeTabId, setChromeTabId] = useState<number | undefined>(undefined);
  const [enabled, setEnabled] = useState(false);

  const hasAnyRegexFilter = useMemo(
    () =>
      Object.keys(httpBlocking.rules)
        .filter((id) => httpBlocking.activeIds.indexOf(id) > -1)
        .some((id) => {
          const rule = httpBlocking.rules[id];
          return rule.condition.regexFilter && rule.condition.requestMethods.length > 0;
        }),
    [httpBlocking.rules, httpBlocking.activeIds],
  );

  const reset = () => dispatch(setHttpBlocking({ rules: {}, activeIds: [], openIds: [] }));

  const sendHttpBlockingConfigurationToInject = async (checked: boolean) => {
    const chromeRules = Object.keys(httpBlocking.rules).reduce((acc, id) => {
      const rule = httpBlocking.rules[id];
      if (!rule.condition.regexFilter) return acc;
      acc = [...acc, { ...rule }];
      return acc;
    }, [] as HttpBlockingItem[]);
    return Promise.all([
      sendMessageByCurrentTab({
        to: ChromeMessageTo.CONTENT_SCRIPT,
        method: checked
          ? ChromeMessageMethod.UPDATE_HTTP_BLOCKING_RULES
          : ChromeMessageMethod.REMOVE_HTTP_BLOCKING_RULES,
        data: chromeRules,
      }),
      sendMessageByRunTime({
        to: ChromeMessageTo.BACKGROUND,
        method: ChromeMessageMethod.UPDATE_HTTP_BLOCKING_ENABLED,
        data: {
          checked,
          id: chromeTabId,
        },
      }),
    ]);
  };

  const handleEnabledOnChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!hasAnyRegexFilter) return;
    setEnabled(checked);
    return sendHttpBlockingConfigurationToInject(checked);
  };

  const handleOnDeleteAll = () => {
    closeDeleteConfirm();
    reset();
  };

  const addBlock = () => {
    if (enabled || Object.keys(httpBlocking.rules).length >= MAX_HTTP_BLOCKING_TOTAL_RULE) return;
    const id = new Date().toISOString();
    dispatch(
      setHttpBlocking({
        rules: {
          [id]: {
            id,
            priority: 1,
            action: {
              type: HttpBlockingActionType.MODIFY,
              responseHeaders: [
                { header: 'Content-Type', value: 'application/json', operation: HttpResponseHeaderOperation.SET },
              ],
              responseData: JSON.stringify(DEFAULT_RESPONSE, null, 2),
            },
            condition: {
              regexFilter: '',
              requestMethods: [DEFAULT_HTTP_METHODS.GET],
            },
          },
          ...httpBlocking.rules,
        },
        activeIds: [...httpBlocking.activeIds, id],
        openIds: [id],
      }),
    );
  };

  const renderEnabled = () => {
    return (
      <FormControlLabel
        disabled={!hasAnyRegexFilter || !chromeTabId}
        control={<Switch checked={enabled} onChange={handleEnabledOnChange} />}
        label={
          isRenderPopup ? (
            t(enabled ? 'on' : 'off')
          ) : (
            <Tooltip title={t('develop.http_blocking.tips')}>
              <Typography sx={{ ...globalStyle.frc }} variant="body1">
                {t(enabled ? 'on' : 'off')}
                <HelpOutlineIcon fontSize="small" />
              </Typography>
            </Tooltip>
          )
        }
      />
    );
  };

  useEffect(() => {
    if (!isRenderPopup) return;
    const mounted = async () => {
      const { tab } = await getCurrentTab();
      if (!tab) return;
      const result = await sendMessageByRunTime({
        to: ChromeMessageTo.BACKGROUND,
        method: ChromeMessageMethod.GET_HTTP_BLOCKING_ENABLED,
        data: {
          id: tab.id,
        },
      });
      setChromeTabId(tab.id);
      setEnabled(!!result);
    };
    mounted();
  }, [isRenderPopup]);

  return (
    <>
      <DrawerRoute title={t('develop.http_blocking')}>
        <Box sx={{ ...globalStyle.fr, p: 1 }}>
          {renderEnabled()}
          <Box sx={{ flex: 1, ...globalStyle.frc, justifyContent: 'flex-end' }}>
            <IconButton color="primary" onClick={addBlock} disabled={enabled}>
              <AddIcon />
            </IconButton>
            <IconButton color="primary" onClick={enabled ? () => null : openDeleteConfirm} disabled={enabled}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
        <Stack sx={{ flex: 1 }} divider={<Divider />}>
          {Object.keys(httpBlocking.rules).map((id) => (
            <Item key={id} id={id} enabled={enabled} />
          ))}
        </Stack>
      </DrawerRoute>
      <ConfirmDialog
        open={deleteConfirmDialogOpen}
        onClose={closeDeleteConfirm}
        title={t('develop.delete_all.title')}
        body={t('develop.delete_all.message')}
        action={
          <>
            <Button sx={{ ...globalStyle.ttn }} variant="outlined" onClick={closeDeleteConfirm}>
              {t('cancel')}
            </Button>
            <Button sx={{ ...globalStyle.ttn }} autoFocus variant="contained" onClick={handleOnDeleteAll}>
              {t('confirm')}
            </Button>
          </>
        }
      />
    </>
  );
}

export default HttpBlocking;
