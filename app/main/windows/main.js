const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWin;

function create() {
  mainWin = new BrowserWindow({
    width: 400,
    height: 200,
    resizable: true,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      preload: path.resolve(__dirname, '../../common/preload.js'),
    },
  });
  if (isDev) {
    mainWin.loadURL('http://localhost:3000');
  } else {
    mainWin.loadFile(
      path.resolve(__dirname, '../renderer/pages/main/index.html'),
    );
  }

  mainWin.webContents.on('did-finish-load', () => {
    mainWin?.webContents.openDevTools();
  });
}

function getMainWin() {
  return mainWin;
}

module.exports = {
  create,
  getMainWin,
};
