import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Button } from '@mui/material';
import { ChromeTab } from '@chrome-plugin/common';
import CollectWebsiteForm from './collect-website-form';
import { useMenus, useStoreDispatch, useStoreSelector, useTheme, useToast, useTranslation } from '../../hooks';
import { setAppState } from '../../store/slices/app-slice';
import { addRemoteApp } from '../../store/slices/menu-slice';
import CloseIcon from '@mui/icons-material/Close';
import { FormState, ErrorState } from './types';

function coverValue(tab?: ChromeTab) {
  return {
    title: tab?.title || '',
    url: tab?.url || '',
    iconTarget: tab?.favIconUrl || '',
    id: '',
  };
}

function WithDialog() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { show } = useToast();
  const { openCollectWebsiteForm, activeBrowserTab } = useStoreSelector((state) => state.app);
  const { apps } = useMenus();
  const dispatch = useStoreDispatch();
  const [value, setValue] = useState<FormState>(coverValue(activeBrowserTab));
  const [errors, setErrors] = useState<ErrorState[]>([]);

  const getErrors = (target = value) => {
    const result: ErrorState[] = [];
    if (!target.title.trim()) {
      result.push({ message: t('collect_form.title.no_found'), field: 'title' });
    }
    if (!target.url.trim()) {
      result.push({ message: t('collect_form.url.no_found'), field: 'url' });
    }
    if (!target.id) {
      result.push({ message: t('collect_form.id.no_found'), field: 'id' });
    }
    return result;
  };

  const handleOnChange = (target: Partial<FormState>) => {
    setValue((prev) => ({ ...prev, ...target }));
  };

  const onClose = () => {
    dispatch(setAppState({ openCollectWebsiteForm: false }));
  };

  const onSave = () => {
    const currentErrors = getErrors();
    if (currentErrors.length) {
      setErrors(currentErrors);
      return;
    }
    if (apps.filter((item) => item.url === value.url).length) {
      show({ message: t('collect_form.url.exist'), type: 'error' });
      return;
    }
    dispatch(
      addRemoteApp({
        item: {
          parentId: value.id,
          title: value.title,
          url: value.url,
          icon: {
            target: value.iconTarget,
            type: 'image',
          },
        },
      }),
    );
    show({ message: t('collect_form.save.success'), type: 'success' });
    onClose();
  };

  useEffect(() => {
    setValue(coverValue(activeBrowserTab));
  }, [activeBrowserTab]);

  return (
    <Dialog open={openCollectWebsiteForm} onClose={onClose}>
      <DialogTitle sx={{ ...globalStyle.frc }}>
        <Typography variant="body1" sx={{ flex: 1, color: 'primary.main' }}>
          {t('collect_form')}
        </Typography>
        <IconButton color="primary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 400, p: 0 }}>
        <CollectWebsiteForm onChange={handleOnChange} value={value} errors={errors} />
      </DialogContent>
      <DialogActions>
        <Button sx={{ ...globalStyle.ttn }} onClick={onSave}>
          {t('collect')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WithDialog;
