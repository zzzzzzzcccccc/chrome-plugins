import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ui-monospace, Menlo, Monaco, 'Cascadia Mono',
      'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace',
      'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
  }

  html, body, #__next {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyles;
