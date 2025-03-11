const { app, BrowserWindow } = require('electron');

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL('http://localhost:8080'); // Ajusta el puerto según el de tu React
}

app.whenReady().then(createWindow);
