const { contextBridge, ipcRenderer } = require('electron');

const electronHandler = {
  ipcRenderer: {
    send(channel, ...args) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel, func) {
      const subscription = (_event, ...args) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel, func) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    emit(channel, args) {
      ipcRenderer.send(channel, args);
    },
    invoke(name, data) {
      ipcRenderer.invoke(name, data);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
