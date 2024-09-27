import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BilibiliPlayMedia {
  bvid: string;
  aid: string;
  tid: string;
  cid: string;
  part: string;
  first_frame: string;
  owner_mid: string;
  owner_name: string;
}

export interface BilibiliPlaylist {
  id: string;
  name: string;
  media: BilibiliPlayMedia[];
}

export interface MusicState {
  bilibiliQuerying: boolean;
  bilibiliSearchKeywords: string[];
  bilibiliPlaylist: BilibiliPlaylist[];
  bilibiliSearchList: BilibiliPlayMedia[];
  bilibiliPlayingInfo: {
    index: number;
    list: BilibiliPlayMedia[];
  };
  bilibiliSelectedCids: string[];
  bilibiliSelectedPlaylist: string;
}

const initialState: MusicState = {
  bilibiliQuerying: false,
  bilibiliSearchKeywords: [],
  bilibiliPlaylist: [],
  bilibiliSearchList: [],
  bilibiliPlayingInfo: {
    index: -1,
    list: [],
  },
  bilibiliSelectedCids: [],
  bilibiliSelectedPlaylist: '',
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setMusicState: (state, action: PayloadAction<Partial<MusicState>>) => {
      const keys = Object.keys(action.payload) as (keyof MusicState)[];
      keys.forEach((key) => ((state as any)[key] = action.payload[key]));
    },
    setBilibiliPlaylist: (state, action: PayloadAction<Partial<BilibiliPlaylist>>) => {
      const { payload } = action;
      if (payload.id) {
        const index = state.bilibiliPlaylist.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          state.bilibiliPlaylist[index] = { ...state.bilibiliPlaylist[index], ...payload };
        } else {
          state.bilibiliPlaylist = [payload as BilibiliPlaylist, ...state.bilibiliPlaylist];
        }
      }
    },
    removeBilibiliPlaylist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.bilibiliPlaylist = state.bilibiliPlaylist.filter((item) => item.id !== id);
      if (state.bilibiliSelectedPlaylist === id) {
        state.bilibiliSelectedPlaylist = '';
        state.bilibiliPlayingInfo = {
          list: [],
          index: -1,
        };
      }
    },
    addBilibiliPlaylist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const { bilibiliPlaylist, bilibiliSelectedCids, bilibiliPlayingInfo } = state;
      if (!bilibiliSelectedCids.length || !id || !bilibiliPlayingInfo?.list?.length) return;
      const findIndex = bilibiliPlaylist.findIndex((i) => i.id === id);
      if (findIndex === -1) return;
      const media = bilibiliPlaylist[findIndex]?.media || [];
      bilibiliSelectedCids.forEach((cid) => {
        const selected = bilibiliPlayingInfo.list.find((i) => i.cid === cid);
        const hasIndex = media.findIndex((i) => i.cid === cid);
        if (selected) {
          hasIndex > -1 ? (media[hasIndex] = { ...selected }) : media.push(selected);
        }
      });
      state.bilibiliPlaylist[findIndex].media = media;
      state.bilibiliSelectedCids = [];
    },
    updateBilibiliPlayingInfo: (state, action: PayloadAction<MusicState['bilibiliPlayingInfo']>) => {
      state.bilibiliPlayingInfo = action.payload;
    },
    selectBilibiliPlaylist(state, action: PayloadAction<string>) {
      const id = action.payload;
      const playlist = state.bilibiliPlaylist.find((i) => i.id === id);
      if (playlist) {
        state.bilibiliSelectedPlaylist = id;
      }
      if (playlist?.media?.length) {
        state.bilibiliPlayingInfo = {
          index: 0,
          list: playlist.media,
        };
      }
    },
    deleteBilibiliPlaylist(state, action: PayloadAction<string>) {
      const { bilibiliSelectedPlaylist, bilibiliPlaylist, bilibiliPlayingInfo } = state;
      const cid = action.payload;
      const playlistIndex = bilibiliPlaylist.findIndex((i) => i.id === bilibiliSelectedPlaylist);
      if (playlistIndex === -1) return;
      const media = bilibiliPlaylist[playlistIndex]?.media || [];
      const mediaIndex = media.findIndex((i) => i.cid === cid);
      if (mediaIndex === -1) return;
      const updatedMedia = media.filter((i) => i.cid !== cid);
      state.bilibiliPlaylist[playlistIndex].media = updatedMedia;
      if (updatedMedia.length) {
        const playing = bilibiliPlayingInfo.list?.[bilibiliPlayingInfo.index];
        if (playing) {
          const playingCid = playing.cid;
          if (playingCid === cid) {
            state.bilibiliPlayingInfo = {
              index: 0,
              list: updatedMedia,
            };
          } else {
            state.bilibiliPlayingInfo = {
              index: updatedMedia.findIndex((i) => i.cid),
              list: updatedMedia,
            };
          }
        }
      } else {
        state.bilibiliPlayingInfo = {
          index: -1,
          list: [],
        };
      }
    },
  },
});

export const {
  setMusicState,
  setBilibiliPlaylist,
  removeBilibiliPlaylist,
  addBilibiliPlaylist,
  updateBilibiliPlayingInfo,
  selectBilibiliPlaylist,
  deleteBilibiliPlaylist,
} = musicSlice.actions;

export default musicSlice.reducer;
