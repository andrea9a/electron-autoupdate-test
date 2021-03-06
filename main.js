// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs');
const { autoUpdater } = require('electron-updater');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// const { ipcMain } = require('electron');

var mainProcessVars = {
  token: "name",
}

ipcMain.on('variable-request', function (event, arg) {
  console.log("process reuqest")
  // fs.readFile('test', 'utf8', (err, contents) => {
  //   if (err) throw err;
  //   //event.sender.send('variable-reply', [contents]);
  //   event.sender.send('variable-reply', [app.getVersion()]);
  // });
  event.sender.send('variable-reply', [app.getVersion()]);
});

autoUpdater.checkForUpdatesAndNotify();
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost/laravel/public/home")
  //mainWindow.loadFile("index.html")
  mainWindow.webContents.openDevTools()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
