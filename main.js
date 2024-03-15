//Might skip the first lines because of the debugger

const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'Scripts/preload.js')
    }
  })

  win.loadFile('Views/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')  
  createWindow()

  //Open a window if none are open (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//Close the app when all windows closed (Windows & Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
        console.log('app closed')
    } 
})