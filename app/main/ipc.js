const { ipcMain } = require('electron');
const { handleKey, handleMouse } = require('./robot');
const { create: createControlWindow } = require('./windows/control');

function handleIPC() {
  ipcMain.on('open-control', async () => {
    createControlWindow();
  });
  ipcMain.on('robot', async (e, data) => {
    const { type, event } = data;
    if (type === 'mouse') {
      handleMouse(event);
    } else if (type === 'key') {
      handleKey(event);
    }
  });
}

module.exports = {
  handleIPC,
};
