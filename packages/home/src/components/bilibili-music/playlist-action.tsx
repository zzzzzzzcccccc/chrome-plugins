import React, { useState } from 'react';
import { Box, Stack, Button, IconButton, Tooltip, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useTheme } from '../../hooks';
import { BilibiliPlaylist } from '../../store/slices/music-slice';

export interface PlaylistActionProps {
  active?: boolean;
  record: BilibiliPlaylist;
  onUpdate?: (payload: BilibiliPlaylist) => void;
  onRemove?: (id: string) => void;
  onSelect?: (item: BilibiliPlaylist) => void;
}

function PlaylistAction(props: PlaylistActionProps) {
  const { active = false, record, onUpdate, onRemove, onSelect } = props;
  const { name } = record;

  const { globalStyle } = useTheme();
  const [value, setValue] = useState(name);
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    const target = !editing;
    setEditing(target);
    if (!target) {
      setValue(name);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOnClickDeleteOrSave = () => {
    if (editing) {
      const name = value.trim();
      if (name) {
        onUpdate?.({ ...record, name: value });
        setValue(name);
        setEditing(false);
      }
    } else {
      onRemove?.(record.id);
    }
  };

  const handleOnClick = () => {
    onSelect?.(record);
  };

  return (
    <Box sx={{ ...globalStyle.frc, width: '100%', height: 40 }}>
      <Tooltip title={name} placement="left-start">
        <Box
          sx={{ ...globalStyle.ellipsis, ...globalStyle.fcc, alignItems: 'flex-start', flex: 1, overflow: 'hidden' }}
        >
          {editing ? (
            <TextField size="small" value={value} onChange={handleOnChange} />
          ) : (
            <Button
              onClick={handleOnClick}
              variant={active ? 'contained' : 'text'}
              size="small"
              sx={{ width: '100%', ...globalStyle.ttn, justifyContent: 'flex-start' }}
            >
              {name}
            </Button>
          )}
        </Box>
      </Tooltip>
      <Stack direction="row" spacing={0.5}>
        <IconButton size="small" sx={{ ...globalStyle.fcc }} onClick={toggleEditing}>
          {editing ? <CancelIcon /> : <EditIcon />}
        </IconButton>
        <IconButton size="small" sx={{ ...globalStyle.fcc }} onClick={handleOnClickDeleteOrSave}>
          {editing ? <SaveAsIcon /> : <DeleteIcon />}
        </IconButton>
      </Stack>
    </Box>
  );
}

export default PlaylistAction;
