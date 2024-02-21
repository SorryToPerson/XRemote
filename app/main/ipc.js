const { ipcMain } = require('electron');
const { handleKeyDown, handleMouseUp } = require('./robot');
const { create: createControlWindow } = require('./windows/control');
const { getMainWin } = require('./windows/main');
const { wsSend } = require('./ws');

function handleIPC() {
  ipcMain.on('open-control', async () => {
    createControlWindow();
  });
  ipcMain.on('robot', async (e, data) => {
    const { type, event } = data;
    if (type === 'mouseUp') {
      handleMouseUp(event);
    } else if (type === 'keyDown') {
      handleKeyDown(event);
    }
  });
  ipcMain.on('ws', (data) => {
    console.log('ws=================', data);
    const mainWin = getMainWin();
    mainWin?.webContents.send('ws', data);
  });
  ipcMain.on('send2ws', (e, data) => {
    console.log('send2ws============', data);
    wsSend(data);
  });
}

module.exports = {
  handleIPC,
};
