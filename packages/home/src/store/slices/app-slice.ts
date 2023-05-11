import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type VisualFile = {
  name: string;
  size: number;
  type: string;
  url: string;
};

export interface AppState {
  activeMenu: string;
  openSetting: boolean;
  openSearch: boolean;
  json: {
    left: string;
    right: string;
  };
  base64: {
    left: string;
    right: string;
  };
  string: {
    left: string;
    right: string;
  };
  htmlToJSX: {
    left: string;
    right: string;
  };
  md5: {
    left: string;
    right: string;
  };
  aes: {
    left: string;
    right: string;
    secret: string;
    iv: string;
    mode: string;
    pad: string;
  };
  sha: {
    left: string;
    right: string;
    mode: string;
  };
  rabbit: {
    left: string;
    right: string;
    secret: string;
    iv: string;
  };
  readFile: {
    files: VisualFile[];
    selectedIndex: number;
  };
}

const initialState: AppState = {
  activeMenu: 'develop',
  openSetting: false,
  openSearch: false,
  json: {
    left: JSON.stringify({ var1: 'value', var2: 100, var3: false }, null, 2),
    right: JSON.stringify([{ var1: 'value', var2: 100, var3: false }], null, 2),
  },
  base64: {
    left: 'hello world',
    right: 'aGVsbG8gd29ybGQ=',
  },
  string: {
    left: 'hello world',
    right: 'hello%20world',
  },
  htmlToJSX: {
    left: `<!-- Hello world -->
<div class='awesome' style='border: 1px solid red'>
  <label for='name'>Enter your name: </label>
  <input type='text' id='name' />
</div>
<p>Enter your HTML here</p>`,
    right: `<>
  {/* Hello world */}
  <div className="awesome" style={{ border: "1px solid red" }}>
    <label htmlFor="name">Enter your name: </label>
    <input type="text" id="name" />
  </div>
  <p>Enter your HTML here</p>
</>
`,
  },
  md5: {
    left: 'hello world',
    right: '5eb63bbbe01eeed093cb22bb8f5acdc3',
  },
  aes: {
    left: 'hello world',
    right: 'U2FsdGVkX1/bY5+HmWJQru9X4aePec8/JPIw6pqbkQk=',
    secret: 'My secret',
    iv: 'My Iv',
    mode: 'CBC',
    pad: 'Pkcs7',
  },
  sha: {
    left: 'hello world',
    right: '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed',
    mode: 'SHA1',
  },
  rabbit: {
    left: 'hello world',
    right: 'U2FsdGVkX192sEv6igV1JyOGyP60mew8KXHa',
    secret: 'My secret',
    iv: 'My Iv',
  },
  readFile: {
    files: [],
    selectedIndex: -1,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<Partial<AppState>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState)[];
      keys.forEach((key) => ((state as any)[key] = action.payload[key]));
    },
    setJson: (state, action: PayloadAction<Partial<AppState['json']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['json'])[];
      keys.forEach((key) => ((state.json as any)[key] = action.payload[key]));
    },
    setBase64: (state, action: PayloadAction<Partial<AppState['base64']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['base64'])[];
      keys.forEach((key) => ((state.base64 as any)[key] = action.payload[key]));
    },
    setString: (state, action: PayloadAction<Partial<AppState['string']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['string'])[];
      keys.forEach((key) => ((state.string as any)[key] = action.payload[key]));
    },
    setHtmlToJSX: (state, action: PayloadAction<Partial<AppState['htmlToJSX']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['htmlToJSX'])[];
      keys.forEach((key) => ((state.htmlToJSX as any)[key] = action.payload[key]));
    },
    setMd5: (state, action: PayloadAction<Partial<AppState['md5']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['md5'])[];
      keys.forEach((key) => ((state.md5 as any)[key] = action.payload[key]));
    },
    setAes: (state, action: PayloadAction<Partial<AppState['aes']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['aes'])[];
      keys.forEach((key) => ((state.aes as any)[key] = action.payload[key]));
    },
    setSha: (state, action: PayloadAction<Partial<AppState['sha']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['sha'])[];
      keys.forEach((key) => ((state.sha as any)[key] = action.payload[key]));
    },
    setRabbit: (state, action: PayloadAction<Partial<AppState['rabbit']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['rabbit'])[];
      keys.forEach((key) => ((state.rabbit as any)[key] = action.payload[key]));
    },
    setReadFile: (state, action: PayloadAction<Partial<AppState['readFile']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['readFile'])[];
      keys.forEach((key) => {
        if (key === 'files') {
          state.readFile.files = state.readFile.files.concat(action.payload[key] as VisualFile[]);
        } else {
          (state.readFile as any)[key] = action.payload[key];
        }
      });
    },
  },
});

export const {
  setAppState,
  setJson,
  setBase64,
  setString,
  setHtmlToJSX,
  setMd5,
  setAes,
  setSha,
  setRabbit,
  setReadFile,
} = appSlice.actions;
export default appSlice.reducer;
