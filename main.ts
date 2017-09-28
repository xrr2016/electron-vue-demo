const { app, BrowserWindow } = require('electron')
let win;
function createWindow () {
  win = new BrowserWindow({
    width: 360,
    height: 550,
    backgroundColor: '#fff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })
  win.loadURL(`file://${__dirname}/dist/index.html`)
  win.on('closed', function () {
    win = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
