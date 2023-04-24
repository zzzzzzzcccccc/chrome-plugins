import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  activeMenu: string;
  leftJson: string;
  rightJson: string;
  leftBase64: string;
  rightBase64: string;
  leftString: string;
  rightString: string;
  leftHTMLToJSX: string;
  rightHTMLToJSX: string;
}

const initialState: AppState = {
  activeMenu: 'develop',
  leftJson: JSON.stringify({ var1: 'value', var2: 100, var3: false }, null, 2),
  rightJson: JSON.stringify([{ var1: 'value', var2: 100, var3: false }], null, 2),
  leftBase64: 'hello world',
  rightBase64: 'aGVsbG8gd29ybGQ=',
  leftString: 'hello world',
  rightString: 'hello%20world',
  leftHTMLToJSX: `<!-- Hello world -->
<div class='awesome' style='border: 1px solid red'>
  <label for='name'>Enter your name: </label>
  <input type='text' id='name' />
</div>
<p>Enter your HTML here</p>`,
  rightHTMLToJSX: `<>
  {/* Hello world */}
  <div className="awesome" style={{ border: "1px solid red" }}>
    <label htmlFor="name">Enter your name: </label>
    <input type="text" id="name" />
  </div>
  <p>Enter your HTML here</p>
</>
`,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<AppState['activeMenu']>) => {
      state.activeMenu = action.payload;
    },
    setLeftJson: (state, action: PayloadAction<AppState['leftJson']>) => {
      state.leftJson = action.payload;
    },
    setRightJson: (state, action: PayloadAction<AppState['rightJson']>) => {
      state.rightJson = action.payload;
    },
    setLeftBase64: (state, action: PayloadAction<AppState['leftBase64']>) => {
      state.leftBase64 = action.payload;
    },
    setRightBase64: (state, action: PayloadAction<AppState['rightBase64']>) => {
      state.rightBase64 = action.payload;
    },
    setLeftString: (state, action: PayloadAction<AppState['leftString']>) => {
      state.leftString = action.payload;
    },
    setRightString: (state, action: PayloadAction<AppState['rightString']>) => {
      state.rightString = action.payload;
    },
    setLeftHTMLToJSX: (state, action: PayloadAction<AppState['leftHTMLToJSX']>) => {
      state.leftHTMLToJSX = action.payload;
    },
    setRightHTMLToJSX: (state, action: PayloadAction<AppState['rightHTMLToJSX']>) => {
      state.rightHTMLToJSX = action.payload;
    },
  },
});

export const {
  setActiveMenu,
  setLeftJson,
  setRightJson,
  setLeftBase64,
  setRightBase64,
  setLeftString,
  setRightString,
  setLeftHTMLToJSX,
  setRightHTMLToJSX,
} = appSlice.actions;
export default appSlice.reducer;
