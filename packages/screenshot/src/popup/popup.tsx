import React from 'react';
import ReactDOM from 'react-dom/client';
import { sendMessageByCurrentTab } from '@chrome-plugin/common';
import { MessageEvent, MessageTo, MessageMethod } from '../model';

function App() {
  const sendInject = async () => {
    try {
      await sendMessageByCurrentTab<MessageEvent>({
        to: MessageTo.contentScript,
        method: MessageMethod.createCustomScreenShot,
      });
      window.close();
    } catch (e) {
      console.log('screenshot popup sending to content script', e);
    }
  };

  return (
    <div>
      <button onClick={sendInject}>start popup</button>
    </div>
  );
}

const create = () => {
  const root = ReactDOM.createRoot(document.getElementById('app') as HTMLDivElement);
  root.render(<App />);
};

export default {
  create,
};
