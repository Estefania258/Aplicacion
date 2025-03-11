const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Deshabilitar nodeIntegration por razones de seguridad
      contextIsolation: true,  // Asegúrate de que el contexto de renderizado esté aislado
      preload: path.join(__dirname, 'preload.js') // Si tienes un archivo preload.js
    }
  });

  mainWindow.loadURL('http://localhost:8080'); // Asegúrate de que el puerto sea el correcto

  // Agregar Content-Security-Policy
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      document.querySelector('head').innerHTML += '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\'; object-src \'none\';">';
    `);
  });

  mainWindow.webContents.openDevTools(); // Abre las herramientas de desarrollo
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
