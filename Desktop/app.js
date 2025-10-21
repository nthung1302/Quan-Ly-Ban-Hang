const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
require('dotenv').config();

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const win = new BrowserWindow({
        width,
        height,
        frame: false,
        icon: path.join(__dirname, 'src', 'assets', 'app.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    const filePath = path.join(__dirname, 'src', 'index.ejs');

    ejs.renderFile(filePath, {}, (err, html) => {
        if (err) {
            console.error('Lỗi render EJS:', err);
            return;
        }

        win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
