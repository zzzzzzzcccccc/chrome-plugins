import React, { useMemo, useState } from 'react';
import { ItemProps } from './types';
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import CodeEditor from '../code-editor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useStoreDispatch, useStoreSelector, useTheme, useTranslation } from '../../hooks';
import { DEFAULT_HTTP_METHODS, HEADER, RESPONSE } from '../../constants';
import {
  setHttpBlocking,
  setHttpBlockingActiveId,
  setHttpBlockingOpenId,
  setHttpBlockingRule,
} from '../../store/slices/app-slice';
import ResponseHeader from './response-header';
import { HttpResponseHeaderOperation } from '../../model';

function Item(props: ItemProps) {
  const { id, enabled } = props;
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { httpBlocking } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();
  const [tabId, setTabId] = useState(RESPONSE);

  const tabList = [
    {
      id: RESPONSE,
      label: t('develop.response'),
    },
    {
      id: HEADER,
      label: t('develop.response.header'),
    },
  ];

  const { record, response, show, active } = useMemo(
    () => ({
      record: httpBlocking.rules[id],
      show: httpBlocking.openIds.indexOf(id) > -1,
      response: httpBlocking.rules[id].action.responseData,
      active: httpBlocking.activeIds.indexOf(id) > -1,
    }),
    [httpBlocking, id],
  );

  const handleURLOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (enabled) return;
    dispatch(
      setHttpBlockingRule({
        id,
        item: {
          ...record,
          condition: {
            ...record.condition,
            regexFilter: e.target.value.trim(),
          },
        },
      }),
    );
  };

  const handleOnMethodChange = (event: SelectChangeEvent<string[]>) => {
    if (enabled) return;
    const { value } = event.target;
    dispatch(
      setHttpBlockingRule({
        id,
        item: {
          ...record,
          condition: {
            ...record.condition,
            requestMethods: typeof value === 'string' ? value.split(',') : value,
          },
        },
      }),
    );
  };

  const handleOnCollapseChange = () => {
    dispatch(setHttpBlockingOpenId({ id, open: !show }));
  };

  const handleOnActiveChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (enabled) return;
    dispatch(setHttpBlockingActiveId({ id, open: checked }));
  };

  const handleOnResponseChange = (value: string) => {
    if (enabled) return;
    dispatch(
      setHttpBlockingRule({
        id,
        item: {
          ...record,
          action: {
            ...record.action,
            responseData: value,
          },
        },
      }),
    );
  };

  const handleOnTabChange = (event: React.SyntheticEvent, index: number) => {
    setTabId(tabList[index].id);
  };

  const handleOnResponseHeaderChange = (field: string, index: number, value: string) => {
    if (enabled) return;
    dispatch(
      setHttpBlockingRule({
        id,
        item: {
          ...record,
          action: {
            ...record.action,
            responseHeaders: record.action.responseHeaders.map((item, i) => {
              if (i === index) {
                return {
                  ...item,
                  [field]: value,
                };
              }
              return item;
            }),
          },
        },
      }),
    );
  };

  const handleOnResponseHeaderDelete = (index: number) => {
    if (enabled) return;
    dispatch(
      setHttpBlockingRule({
        id,
        item: {
          ...record,
          action: {
            ...record.action,
            responseHeaders: record.action.responseHeaders.filter((_, i) => i !== index),
          },
        },
      }),
    );
  };

  const handleOnResponseHeaderAdd = () => {
    if (enabled) return;
    dispatch(
      setHttpBlockingRule({
        id,
        item: {
          ...record,
          action: {
            ...record.action,
            responseHeaders: [
              ...record.action.responseHeaders,
              {
                header: '',
                value: '',
                operation: HttpResponseHeaderOperation.SET,
              },
            ],
          },
        },
      }),
    );
  };

  const handleOnResponseHeaderDeleteAll = () => {
    if (enabled) return;
    dispatch(
      setHttpBlockingRule({
        id,
        item: {
          ...record,
          action: {
            ...record.action,
            responseHeaders: [],
          },
        },
      }),
    );
  };

  const handleOnDelete = () => {
    if (enabled) return;
    // eslint-disable no-unused-vars
    const { [id]: _, ...currentRules } = httpBlocking.rules;
    dispatch(
      setHttpBlocking({
        rules: currentRules,
        activeIds: httpBlocking.activeIds.filter((_id) => _id !== id),
        openIds: httpBlocking.openIds.filter((_id) => _id !== id),
      }),
    );
  };

  const renderTabContent: Record<string, React.ReactNode> = {
    [RESPONSE]: (
      <CodeEditor language="json" value={response} onChange={handleOnResponseChange} options={{ readOnly: enabled }} />
    ),
    [HEADER]: (
      <ResponseHeader
        readonly={enabled}
        list={record.action.responseHeaders}
        onChange={handleOnResponseHeaderChange}
        onDelete={handleOnResponseHeaderDelete}
        onAdd={handleOnResponseHeaderAdd}
        onDeleteAll={handleOnResponseHeaderDeleteAll}
      />
    ),
  };

  return (
    <Paper>
      <Stack sx={{ paddingX: 1, paddingY: 2, ...globalStyle.frc }} direction="row" spacing={1}>
        <IconButton color="primary" size="small" onClick={handleOnCollapseChange}>
          {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <TextField
            disabled={enabled}
            fullWidth
            size="small"
            variant="standard"
            label={t('url')}
            value={record.condition.regexFilter}
            onChange={handleURLOnChange}
          />
        </Box>
        <FormControl disabled={enabled} size="small" sx={{ width: 120 }}>
          <Select multiple value={record.condition.requestMethods} onChange={handleOnMethodChange}>
            {Object.keys(DEFAULT_HTTP_METHODS).map((key) => (
              <MenuItem value={DEFAULT_HTTP_METHODS[key]} key={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          disabled={enabled}
          control={<Switch size="small" checked={active} onChange={handleOnActiveChange} />}
          label=""
        />
        <IconButton disabled={enabled} onClick={handleOnDelete} color="primary" size="small">
          <DeleteForeverIcon />
        </IconButton>
      </Stack>
      {show && (
        <Box>
          <Tabs
            sx={{ '.MuiButtonBase-root': { ...globalStyle.ttn } }}
            textColor="inherit"
            variant="fullWidth"
            value={tabList.map((r) => r.id).indexOf(tabId)}
            onChange={handleOnTabChange}
          >
            {tabList.map((item) => (
              <Tab key={item.id} label={item.label} aria-label={item.label} />
            ))}
          </Tabs>
          <Box sx={{ width: '100%', height: 240 }}>{renderTabContent[tabId]}</Box>
        </Box>
      )}
    </Paper>
  );
}

export default Item;
