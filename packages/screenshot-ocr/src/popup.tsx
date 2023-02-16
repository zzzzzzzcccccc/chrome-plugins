import React from 'react';
import ReactDOM from 'react-dom';
import { sendMessageByCurrentTab } from './utils/chrome'

function App() {
  const sendInject = async () => {
    await sendMessageByCurrentTab({ a: 21321321 })
  }

  return(
    <div>
      <button onClick={sendInject}>send inject</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
