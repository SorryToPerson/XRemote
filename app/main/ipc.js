const { ipcMain } = require('electron');
const { handleKeyDown, handleMouseUp } = require('./robot');
const { create: createControlWindow } = require('./windows/control');

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
}

module.exports = {
  handleIPC,
};
