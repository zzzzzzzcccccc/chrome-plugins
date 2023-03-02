import React from 'react';
import ReactDOM from 'react-dom/client';
import { InjectContextProvider } from '../context';
import { StyleSheetManager } from 'styled-components';
import { ScreenshotApp } from '../components';

let show = false;
let root: ReactDOM.Root | null = null;
let target: HTMLDivElement | null = null;
let shadowRoot: ShadowRoot | null = null;

const remove = () => {
  if (shadowRoot) {
    root?.unmount();
  }
  if (target) {
    target.remove();
  }
  show = false;
  root = null;
  target = null;
  shadowRoot = null;
};

const create = () => {
  if (!show) {
    target = document.createElement('div');
    shadowRoot = target.attachShadow({ mode: 'open' });

    document.body.parentNode ? document.body.parentNode.append(target) : document.body.append(target);

    root = ReactDOM.createRoot(shadowRoot);

    root.render(
      <StyleSheetManager target={shadowRoot}>
        <InjectContextProvider target={target} shadowRoot={shadowRoot} remove={remove}>
          <ScreenshotApp />
        </InjectContextProvider>
      </StyleSheetManager>,
    );

    show = true;
  }
};

export default {
  create,
  remove,
};
