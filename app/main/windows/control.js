const { BrowserWindow, desktopCapturer } = require('electron');
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
  controlWin.webContents.on('did-finish-load', () => {
    desktopCapturer.getSources({ types: ['screen'] }).then(async (sources) => {
      controlWin.webContents.send('SET_SOURCE', sources[0].id);
    });
  });
}

module.exports = {
  create,
};
