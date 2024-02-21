import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [localCode, setLocalCode] = useState(0);
  const [remoteCode, setRemoteCode] = useState('');

  const handleShowControl = () => {
    if (remoteCode.trim() === '') {
      alert('请填写控制码！');
      return;
    }
    const { ipcRenderer } = window?.electron;
    ipcRenderer?.send('send2ws', {
      event: 'control',
      data: {
        remote: remoteCode,
      },
    });
  };

  const handleMsgFromMain = (message) => {
    const { ipcRenderer } = window?.electron;
    const { event, data } = message;
    console.log(data, 'messagefromdata');
    if (event === 'logined') {
      setLocalCode(data.code);
    } else if (event === 'controlled') {
      ipcRenderer?.send('open-control');
    }
  };

  useEffect(() => {
    const { ipcRenderer } = window?.electron;
    ipcRenderer?.send('send2ws', {
      event: 'login',
    });
    const close = ipcRenderer.on('ws', handleMsgFromMain);
    return close;
  }, []);
  return (
    <div className="app">
      <div>本机控制码：{localCode}</div>
      <input
        type="text"
        value={remoteCode}
        onChange={(e) => setRemoteCode(e.target.value)}
      />
      <button onClick={handleShowControl}>打开控制窗口</button>
    </div>
  );
}

export default App;
