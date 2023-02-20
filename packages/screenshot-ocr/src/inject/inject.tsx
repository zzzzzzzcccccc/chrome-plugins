import React from 'react';
import ReactDOM from 'react-dom';
import { InjectContextProvider, IInjectContext } from '../context';
import { StyleSheetManager } from 'styled-components';
import App from './app';

let show = false;
let target: HTMLDivElement | null = null;
let shadowRoot: ShadowRoot | null = null;

const remove = () => {
  if (shadowRoot) {
    ReactDOM.unmountComponentAtNode(shadowRoot);
  }
  if (target) {
    target.remove();
  }
  show = false;
};

const create = (context: Pick<IInjectContext, 'tab'>) => {
  if (!show) {
    target = document.createElement('div');
    shadowRoot = target.attachShadow({ mode: 'open' });

    document.body.parentNode ? document.body.parentNode.append(target) : document.body.append(target);

    const injectContextProviderProps = { ...context, target, shadowRoot, remove };

    ReactDOM.render(
      <StyleSheetManager target={shadowRoot}>
        <InjectContextProvider {...injectContextProviderProps}>
          <App />
        </InjectContextProvider>
      </StyleSheetManager>,
      shadowRoot,
    );

    show = true;
  }
};

export default {
  create,
  remove,
};
