import React from 'react';
import ReactDOM from 'react-dom';
import { sendMessageByCurrentTab } from '@chrome-plugin/common';

function App() {
  const sendInject = async () => {
    await sendMessageByCurrentTab({ a: 21321321 });
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
