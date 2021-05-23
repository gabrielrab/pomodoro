const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({ width: 500, height: 700 });
  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);
