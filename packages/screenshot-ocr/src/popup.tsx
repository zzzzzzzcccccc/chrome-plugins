import React from 'react';
import ReactDOM from 'react-dom';
import Common from '@chrome-plugin/common'

function App() {
  const sendInject = async () => {
    await Common.sendMessageByCurrentTab({ a: 21321321 })
  }

  return(
    <div>
      <button onClick={sendInject}>send inject</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
