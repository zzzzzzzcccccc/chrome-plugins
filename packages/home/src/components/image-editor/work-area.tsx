import React, { useRef } from 'react';
import { Box, AppBar, Toolbar, Tooltip, IconButton, Stack } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme, useToast, useTranslation } from '../../hooks';
import { loadImage, imagePixiImageEditorInstance } from '../../utils';

function WorkArea() {
  const { globalStyle, theme } = useTheme();
  const { show } = useToast();
  const t = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectFile = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const reset = () => {
    imagePixiImageEditorInstance.cleanImages();
  };

  const handleOnFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || !files.length) return;
    const file = files[0];
    if (!/^image/gi.test(file.type)) {
      show({ message: t('develop.image_editor.select_error'), type: 'error' });
      return;
    }
    const url = URL.createObjectURL(file);
    const { image } = await loadImage(url);
    if (!image) {
      show({ message: t('develop.image_editor.select_error'), type: 'error' });
      return;
    }
    const { width, height } = image;
    imagePixiImageEditorInstance.addImage({ url, width, height, name: file.name, type: file.type, size: file.size });
  };

  const actions = [
    { icon: <AddPhotoAlternateIcon />, title: t('develop.image_editor.import'), callback: selectFile },
    { icon: <ClearIcon />, title: t('develop.image_editor.clear'), callback: reset },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box sx={{ ...globalStyle.frc, width: '100%' }}>
            <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
              {actions.map((action, index) => (
                <Tooltip title={action.title} key={index}>
                  <IconButton
                    onClick={action.callback}
                    aria-label={action.title}
                    sx={{ color: theme.palette.common.white }}
                    size="small"
                  >
                    {action.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <input
        ref={inputRef}
        type="file"
        onChange={handleOnFileChange}
        accept="image/*"
        style={{ width: 0, height: 0, display: 'none', position: 'absolute', top: 0, left: 0 }}
      />
    </>
  );
}

export default WorkArea;
