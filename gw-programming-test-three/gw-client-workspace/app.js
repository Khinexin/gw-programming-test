const {app, BrowserWindow, Menu, MenuItem, Notification} = require('electron')
const url = require("url");
const path = require("path");
// const {getConnection} = require("./database");
// const {Tracker} = require("./src/app/model/all-models");


// DISPLAY-VIEW-WINDOW--START
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  mainWindow.maximize();

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/gw-client-workspace/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.allowRendererProcessReuse = true;

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// DISPLAY-VIEW-WINDOW--END


module.exports = {

  createWindow,

};






