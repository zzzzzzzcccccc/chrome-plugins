import React from 'react';
import ReactDOM from 'react-dom/client';
import { OCRResultContextProvider, IOCRResultContext } from '../context';
import { OCRResultApp } from '../components';

const create = (context: IOCRResultContext) => {
  const root = ReactDOM.createRoot(document.getElementById('app') as HTMLDivElement);
  root.render(
    <OCRResultContextProvider {...context}>
      <OCRResultApp />
    </OCRResultContextProvider>,
  );
};

export default {
  create,
};
