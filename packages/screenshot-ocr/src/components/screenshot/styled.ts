import styled from 'styled-components';
import { CSS_NAME_SPACE } from '../../constants';

export const cssPrefix = `${CSS_NAME_SPACE}-screenshot`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  .${cssPrefix}-item {
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    position: absolute;
    cursor: auto;
    background-color: rgb(0, 0, 0, 0.3);
  }
  .${cssPrefix}-center {
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #000;
    cursor: move;
  }
`;
