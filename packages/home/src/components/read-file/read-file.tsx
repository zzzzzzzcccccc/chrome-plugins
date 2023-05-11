import React, { useMemo } from 'react';
import DrawerRoute from '../drawer-route';
import { useTheme, useTranslation, useFileInput, useStoreSelector, useStoreDispatch } from '../../hooks';
import { Box, Button, List, Collapse, ListItem, Typography, Tooltip, ListItemButton } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { formatString, formatFileSize } from '../../utils';
import AppIcon from '../app-icon';
import { setReadFile } from '../../store/slices/app-slice';

function ReadFile() {
  const t = useTranslation();
  const { globalStyle } = useTheme();
  const { readFile } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();
  const { files, show: showSelectFiles, handleOnDragOver, handleOnDrop } = useFileInput({ multiple: true });

  const selectedFile = useMemo(
    () => readFile.files[readFile.selectedIndex] || null,
    [readFile.files, readFile.selectedIndex],
  );

  const handleOnClick = (index: number) => () => {
    dispatch(setReadFile({ selectedIndex: index }));
  };

  const renderFileIcon = (contentType: string) => {
    const mime = formatString.toSplitContentType(contentType);
    switch (mime) {
      case 'image':
        return <ImageIcon />;
      case 'video':
        return <VideocamIcon />;
      case 'audio':
        return <AudioFileIcon />;
      default:
        return <AttachFileIcon />;
    }
  };

  const renderFileList = () => {
    return (
      <List sx={{ width: '30%', overflow: 'auto' }}>
        <TransitionGroup>
          {files.map((file, index) => {
            const selected = index === readFile.selectedIndex;
            return (
              <Collapse key={index}>
                <ListItem disablePadding>
                  <ListItemButton selected={selected} onClick={handleOnClick(index)}>
                    <Tooltip title={file.type || ''}>{renderFileIcon(file.type)}</Tooltip>
                    <Tooltip title={file.name}>
                      <Typography variant="body2" noWrap sx={{ pl: 1, pr: 1 }}>
                        {file.name}
                      </Typography>
                    </Tooltip>
                    <Tooltip title={`${file.size}B`}>
                      <Typography variant="body2">{formatFileSize(file.size)}</Typography>
                    </Tooltip>
                  </ListItemButton>
                </ListItem>
              </Collapse>
            );
          })}
        </TransitionGroup>
      </List>
    );
  };

  const renderByLeftMime = () => {
    const type = formatString.toSplitContentType(selectedFile.type);
    switch (type) {
      case 'image':
        return <img src={selectedFile.url} alt={selectedFile.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
      case 'audio':
        return <audio src={selectedFile.url} controls style={{ maxWidth: '100%' }} />;
      case 'video':
        return <video src={selectedFile.url} controls style={{ maxWidth: '100%', maxHeight: '100%' }} />;
      default:
        return null;
    }
  };

  const renderByFullMime = () => {
    const type = selectedFile.type;
    switch (type) {
      case 'application/pdf':
        return (
          <embed src={selectedFile.url} type="application/pdf" width="100%" style={{ width: '100%', height: '100%' }} />
        );
      case 'text/html':
        return <iframe src={selectedFile.url} style={{ width: '100%', height: '100%' }} frameBorder={0} />;
      default:
        return null;
    }
  };

  const renderPreview = () => {
    if (!selectedFile) return null;
    const leftMime = renderByLeftMime();
    const fullMime = renderByFullMime();
    return leftMime || fullMime;
  };

  return (
    <DrawerRoute title={t('develop.read_file')}>
      <Box sx={{ ...globalStyle.fc, flex: 1, width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 1 }} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
          <Button
            fullWidth
            variant="outlined"
            onClick={showSelectFiles}
            sx={{ ...globalStyle.fcc, ...globalStyle.ttn }}
          >
            <AppIcon target="#upload" type="svg" style={{ width: 48, height: 48 }} />
            <Typography variant="h6" sx={{ p: 1 }}>
              {t('click_or_drag_file_title')}
            </Typography>
          </Button>
        </Box>
        <Box sx={{ flex: 1, width: '100%', ...globalStyle.fr, overflow: 'hidden' }}>
          {renderFileList()}
          <Box sx={{ width: '70%', height: '100%', ...globalStyle.fcc }}>{renderPreview()}</Box>
        </Box>
      </Box>
    </DrawerRoute>
  );
}

export default ReadFile;
