export class Electron {
    
    constructor(private app: any, private BrowserWindow: any, private screen: any, ASCII_TEXT: string) {
        console.log(ASCII_TEXT); 
    }

    private createWindow() {
        // Create the browser window.
        const { width, height } = this.screen.getPrimaryDisplay().workAreaSize;
        const window = new this.BrowserWindow({
            width, height,
            webPreferences: {
                nodeIntegration: true
            }
        });

        window.setFullScreen(true);

        // and load the index.html of the app.
        window.loadFile('dist/index.html');

        // Open the DevTools.
        window.webContents.openDevTools();
    }
    
    init() {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        this.app.whenReady().then(this.createWindow);

        // Quit when all windows are closed, except on macOS. There, it's common
        // for applications and their menu bar to stay active until the user quits
        // explicitly with Cmd + Q.
        this.app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                this.app.quit();
            }
        });

        this.app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (this.BrowserWindow.getAllWindows().length === 0) {
                this.createWindow();
            }
        });
        // In this file you can include the rest of your app's specific main process
        // code. You can also put them in separate files and require them here.

    }
}
