import React from 'react';
import ReactDOM from 'react-dom';
import { sendMessageByCurrentTab } from '@chrome-plugin/common';
import { MessageEvent, MessageTo, MessageMethod } from '../model';

function App() {
  const sendInject = async () => {
    await sendMessageByCurrentTab<MessageEvent>({
      to: MessageTo.contentScript,
      method: MessageMethod.createCustomScreenShot,
    });
    window.close();
  };

  return (
    <div>
      <button onClick={sendInject}>start popup</button>
    </div>
  );
}

const create = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};

export default {
  create,
};
