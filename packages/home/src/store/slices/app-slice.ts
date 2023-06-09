import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SVGS } from '../../constants';

export type VisualFile = {
  name: string;
  size: number;
  type: string;
  url: string;
};

export interface AppState {
  openSetting: boolean;
  openSearch: boolean;
  activeSetting: string;
  contextMenu: {
    open: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
  };
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
  jsonYaml: {
    left: string;
    right: string;
  };
  jsonXml: {
    left: string;
    right: string;
  };
  urlParse: {
    list: string[];
    result: {
      url: string;
      validate: boolean;
      protocol?: string;
      domain?: string;
      queryParams: { key: string; value: string }[];
    }[];
  };
}

const initialState: AppState = {
  openSetting: false,
  openSearch: false,
  activeSetting: SVGS.theme,
  contextMenu: {
    open: false,
    x: 0,
    y: 0,
    width: 160,
    height: 300,
  },
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
  jsonYaml: {
    left: JSON.stringify({ var1: 'value', var2: false, var3: 100 }, null, 2),
    right: `var1: value
var2: false
var3: 100
`,
  },
  jsonXml: {
    left: JSON.stringify({ var1: 'value', var2: false, var3: 100 }, null, 2),
    right: `<var1>value</var1>
<var2>false</var2>
<var3>100</var3>
`,
  },
  urlParse: {
    list: ['https://domain.hello-world?a=1&b=2&c=3&c=4&c=5', 'https://domain.hello-world?ids=1,2,3,4'],
    result: [
      {
        url: 'https://domain.hello-world?a=1&b=2&c=3&c=4&c=5',
        validate: true,
        protocol: 'https:',
        domain: 'domain.hello-world',
        queryParams: [
          {
            key: 'a',
            value: '1',
          },
          {
            key: 'b',
            value: '2',
          },
          {
            key: 'c',
            value: '3',
          },
          {
            key: 'c',
            value: '4',
          },
          {
            key: 'c',
            value: '5',
          },
        ],
      },
      {
        url: 'https://domain.hello-world?ids=1,2,3,4',
        validate: true,
        protocol: 'https:',
        domain: 'domain.hello-world',
        queryParams: [
          {
            key: 'ids',
            value: '1,2,3,4',
          },
        ],
      },
    ],
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
    setContextMenu: (state, action: PayloadAction<Partial<AppState['contextMenu']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['contextMenu'])[];
      keys.forEach((key) => ((state.contextMenu as any)[key] = action.payload[key]));
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
    setJsonYaml: (state, action: PayloadAction<Partial<AppState['jsonYaml']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['jsonYaml'])[];
      keys.forEach((key) => ((state.jsonYaml as any)[key] = action.payload[key]));
    },
    setJsonXml: (state, action: PayloadAction<Partial<AppState['jsonXml']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['jsonXml'])[];
      keys.forEach((key) => ((state.jsonXml as any)[key] = action.payload[key]));
    },
    setUrlParse: (state, action: PayloadAction<Partial<AppState['urlParse']>>) => {
      const keys = Object.keys(action.payload) as (keyof AppState['urlParse'])[];
      keys.forEach((key) => ((state.urlParse as any)[key] = action.payload[key]));
    },
  },
});

export const {
  setAppState,
  setContextMenu,
  setJson,
  setBase64,
  setString,
  setHtmlToJSX,
  setMd5,
  setAes,
  setSha,
  setRabbit,
  setReadFile,
  setJsonYaml,
  setJsonXml,
  setUrlParse,
} = appSlice.actions;

export default appSlice.reducer;
