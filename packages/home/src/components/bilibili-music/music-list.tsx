import React, { useState, useMemo } from 'react';
import { Box, IconButton, Button, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import {
  useTheme,
  useTranslation,
  useStoreSelector,
  useStoreDispatch,
  useBilibiliPlayUrlDownloadMutation,
} from '../../hooks';
import {
  BilibiliPlayMedia,
  BilibiliPlaylist,
  updateBilibiliPlayingInfo,
  setMusicState,
  addBilibiliPlaylist,
  deleteBilibiliPlaylist,
} from '../../store/slices/music-slice';

function MusicList() {
  const { globalStyle } = useTheme();
  const t = useTranslation();
  const dispatch = useStoreDispatch();
  const { bilibiliSearchList, bilibiliSelectedPlaylist, bilibiliPlaylist } = useStoreSelector((state) => state.music);
  const enableSearch = !bilibiliSelectedPlaylist;
  const [download] = useBilibiliPlayUrlDownloadMutation();

  const playlistMedia = useMemo(() => {
    if (!bilibiliSelectedPlaylist) {
      return [];
    }
    const playlist = bilibiliPlaylist.find((i) => i.id === bilibiliSelectedPlaylist);
    return playlist?.media || [];
  }, [bilibiliSelectedPlaylist, bilibiliPlaylist]);

  const dataSource = useMemo(() => {
    if (bilibiliSelectedPlaylist) {
      return playlistMedia;
    }
    return bilibiliSearchList;
  }, [bilibiliSelectedPlaylist, playlistMedia, bilibiliSearchList]);

  const handleOnClickPart =
    (params: GridRenderCellParams<BilibiliPlayMedia>) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const rowIndex = dataSource.findIndex((i) => i.cid === params.row.cid);
      if (rowIndex > -1) {
        dispatch(
          updateBilibiliPlayingInfo({
            index: rowIndex,
            list: dataSource,
          }),
        );
      }
    };

  const handleOnClickDelete = (params: GridRenderCellParams<BilibiliPlayMedia>) => () => {
    dispatch(deleteBilibiliPlaylist(params.row.cid));
  };

  const handleOnDownload = (params: GridRenderCellParams<BilibiliPlayMedia>) => () => {
    download({
      bvid: params.row.bvid,
      cid: params.row.cid,
      fileName: params.row.part,
    });
  };

  const handleOnRowSelectionModelChange = (cids: GridRowSelectionModel) => {
    if (enableSearch) {
      dispatch(
        setMusicState({
          bilibiliSelectedCids: cids as string[],
        }),
      );
    }
  };

  const columns: GridColDef<(typeof dataSource)[number]>[] = [
    {
      field: 'part',
      headerName: t('bilibili_music.data_title') as string,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={handleOnClickPart(params)} variant="text" sx={{ ...globalStyle.ttn }}>
          {params.row.part}
        </Button>
      ),
    },
    {
      field: 'owner_name',
      headerName: t('bilibili_music.data_author') as string,
      width: 160,
      sortable: false,
    },
    {
      field: '__actions__',
      headerName: t('bilibili_music.data_actions') as string,
      width: 160,
      renderCell: (params) => (
        <Box sx={{ ...globalStyle.frc, gap: 0.5, height: '100%' }}>
          {!enableSearch && (
            <IconButton size="small" onClick={handleOnClickDelete(params)}>
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton size="small" onClick={handleOnDownload(params)}>
            <CloudDownloadIcon />
          </IconButton>
        </Box>
      ),
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  return (
    <Box sx={{ ...globalStyle.fc, flex: 1, height: 'calc(100vh - 30px - 56px - 56px - 20px)', overflow: 'auto' }}>
      <DataGrid
        localeText={{ noRowsLabel: t('bilibili_music.data_no_found') as string }}
        rows={dataSource}
        columns={columns}
        hideFooter={true}
        hideFooterPagination={true}
        disableColumnMenu={true}
        checkboxSelection={enableSearch}
        getRowId={(row) => row.cid}
        onRowSelectionModelChange={handleOnRowSelectionModelChange}
        slots={{
          toolbar: () => <DataGridToolbar />,
        }}
      />
    </Box>
  );
}

function DataGridToolbar() {
  const { globalStyle } = useTheme();
  const t = useTranslation();
  const dispatch = useStoreDispatch();
  const { bilibiliPlaylist, bilibiliSelectedPlaylist } = useStoreSelector((state) => state.music);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const enableSearch = !bilibiliSelectedPlaylist;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnAddPlaylist = (item: BilibiliPlaylist) => () => {
    dispatch(addBilibiliPlaylist(item.id));
    handleClose();
  };

  if (!enableSearch) return <></>;

  return (
    <Box sx={{ ...globalStyle.fr, p: 1 }}>
      <Button onClick={handleClick} sx={{ ...globalStyle.ttn }} size="small" id="basic-add-playlist">
        {t('bilibili_music.data_add_playlist')}
      </Button>
      <Menu
        id="basic-add-playlist"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-add-playlist' }}
      >
        {!bilibiliPlaylist.length ? (
          <MenuItem onClick={handleClose}>{t('bilibili_music.data_add_playlist_no_found')}</MenuItem>
        ) : (
          bilibiliPlaylist.map((item) => (
            <MenuItem key={item.id} onClick={handleOnAddPlaylist(item)}>
              {item.name}
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
}

export default MusicList;
