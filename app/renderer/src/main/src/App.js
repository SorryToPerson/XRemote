import './App.css';

function App() {
  const handleShowControl = () => {
    const { ipcRenderer } = window?.electron;
    console.log(window.electron);
    ipcRenderer?.send('open-control');
  };
  return (
    <div className="App">
      <button onClick={handleShowControl}>点击打开控制窗口</button>
    </div>
  );
}

export default App;
