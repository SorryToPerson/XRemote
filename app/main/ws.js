const WebSocket = require('ws');
const { ipcMain } = require('electron');

let ws;

ws = new WebSocket('ws://43.142.156.150:6666');
ws.onopen = () => {
  console.log('ws连接成功！');
};

ws.onmessage = (message) => {
  let data = {};
  try {
    data = JSON.parse(message?.data);
  } catch (error) {
    console.log('parse error', error);
  }
  ipcMain.emit('ws', data);
};

function wsSend(data) {
  ws.send(JSON.stringify(data));
}

module.exports = {
  ws,
  wsSend,
};
