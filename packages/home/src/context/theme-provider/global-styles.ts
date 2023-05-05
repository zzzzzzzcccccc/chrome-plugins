import { createGlobalStyle } from 'styled-components';
import { IInitializeContext } from '../index';
import { CSS_NAME_SPACE } from '../../constants';

interface GlobalStylesProps {
  renderType: IInitializeContext['renderType'];
  isDark: boolean;
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
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

  .${CSS_NAME_SPACE}-fc{
    display: flex;
    flex-direction: column;
  }

  .${CSS_NAME_SPACE}-fr{
    display: flex;
    flex-direction: row;
  }

  .${CSS_NAME_SPACE}-fcc{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .${CSS_NAME_SPACE}-frc{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .${CSS_NAME_SPACE}-click{
    position: relative;
    &:active{
      background-color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.36)' : 'rgba(0, 0, 0, 0.36)')};
    }
  }
`;

export default GlobalStyles;
