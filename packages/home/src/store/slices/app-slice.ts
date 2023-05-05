import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  activeMenu: string;
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
}

const initialState: AppState = {
  activeMenu: 'develop',
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
  },
});

export const { setAppState, setJson, setBase64, setString, setHtmlToJSX, setMd5, setAes } = appSlice.actions;
export default appSlice.reducer;
