const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let controlWin;

function create() {
  controlWin = new BrowserWindow({
    width: 1000,
    height: 600,
    resizable: true,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      preload: path.resolve(__dirname, '../../common/preload.js'),
    },
  });
  if (isDev) {
    controlWin.loadFile(
      path.resolve(__dirname, '../../renderer/pages/control/index.html'),
    );
  } else {
    controlWin.loadFile(
      path.resolve(__dirname, '../../renderer/pages/control/index.html'),
    );
  }
  controlWin.on('ready-to-show', () => {
    controlWin.webContents.openDevTools();
  });
}

module.exports = {
  create,
};
