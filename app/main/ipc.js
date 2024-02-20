const { ipcMain } = require('electron');
const { create: createControlWindow } = require('./windows/control');

function handleIPC() {
  ipcMain.on('open-control', async () => {
    createControlWindow();
  });
}

module.exports = {
  handleIPC,
};
