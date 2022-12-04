const electron = require('electron');
const url = require('url');
const path = require('path');
const { protocol, ipcMain } = require('electron');
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

const {app, BrowserWindow, Menu} = electron;
let mainWindow;

let status = 0;

// Listen for app to be ready
app.on('ready', function() {
    // Create new window

    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        minWidth: 400,
        minHeight: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('close', function (e) {
        if (status == 0) {
            if (mainWindow) {
            e.preventDefault();
            mainWindow.webContents.send('app-close');
            }
        }
    })

});


ipcMain.on('closed', _ => {
    status = 1;
    mainWindow = null;
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
