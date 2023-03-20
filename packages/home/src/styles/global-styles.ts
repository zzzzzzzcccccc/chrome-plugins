import { createGlobalStyle } from 'styled-components';
import { IInitializeContext } from '../context';

const GlobalStyles = createGlobalStyle<{ renderType: IInitializeContext['renderType'] }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ui-monospace, Menlo, Monaco, 'Cascadia Mono',
      'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace',
      'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
  }

  html, body, #__next {
    width: ${(props) => (props.renderType === 'full' ? '100%' : '800px')};
    height: ${(props) => (props.renderType === 'full' ? '100%' : '600px')};
  }
`;

export default GlobalStyles;
