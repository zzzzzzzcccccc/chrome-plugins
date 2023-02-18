import React from 'react';
import ReactDOM from 'react-dom';
import { InjectContext, IInjectContext } from '../context';
import App from './app';

const create = (context : IInjectContext) => {
  ReactDOM.render(<InjectContext.Provider value={context}>
    <App />
  </InjectContext.Provider>, context.target);
};

export default {
  create,
};
