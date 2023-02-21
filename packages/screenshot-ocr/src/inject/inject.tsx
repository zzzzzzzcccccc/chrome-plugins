import React from 'react';
import ReactDOM from 'react-dom';
import { InjectContextProvider } from '../context';
import { StyleSheetManager } from 'styled-components';
import { ScreenshotApp } from '../components';

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

const create = () => {
  if (!show) {
    target = document.createElement('div');
    shadowRoot = target.attachShadow({ mode: 'open' });

    document.body.parentNode ? document.body.parentNode.append(target) : document.body.append(target);

    ReactDOM.render(
      <StyleSheetManager target={shadowRoot}>
        <InjectContextProvider target={target} shadowRoot={shadowRoot} remove={remove}>
          <ScreenshotApp />
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
