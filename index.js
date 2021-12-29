const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 700,
    title: "Pomodoro",
    titleBarStyle: "customButtonsOnHover",
  });
  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);
