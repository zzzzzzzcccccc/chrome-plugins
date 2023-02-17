import React from 'react';
import ReactDOM from 'react-dom';
import { InjectContext } from '../context';
import App from './app';

let rootDom: HTMLDivElement;

const create = () => {
  if (!rootDom) {
    rootDom = document.createElement('div');
    document.body.appendChild(rootDom);
  }
  const { clientWidth, clientHeight } = document.body;

  ReactDOM.render(<InjectContext.Provider value={{ root: rootDom, clientWidth, clientHeight }}>
    <App />
  </InjectContext.Provider>, rootDom);
};

export default {
  create,
};
