import React, { useRef } from 'react';
import { Box, AppBar, Toolbar, Tooltip, IconButton, Stack } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoIcon from '@mui/icons-material/Photo';
import { useTheme, useTranslation } from '../../hooks';
import { imagePixiImageEditorInstance } from '../../utils';

function WorkArea() {
  const { globalStyle, theme } = useTheme();
  const t = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectFile = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || !files.length) return;
    for (let i = 0; i < files.length; i++) {
      imagePixiImageEditorInstance.pushImage(files[i]);
    }
  };

  const actions = [
    { icon: <AddPhotoAlternateIcon />, title: t('develop.image_editor.import'), callback: selectFile },
    {
      icon: <PhotoIcon />,
      title: t('develop.image_editor.export'),
      callback: () => imagePixiImageEditorInstance.downloadImage(),
    },
    {
      icon: <DeleteIcon />,
      title: t('develop.image_editor.clear'),
      callback: () => imagePixiImageEditorInstance.clean(),
    },
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
        multiple
        style={{ width: 0, height: 0, display: 'none', position: 'absolute', top: 0, left: 0 }}
      />
    </>
  );
}

export default WorkArea;
