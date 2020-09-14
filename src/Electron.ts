import { IApp, IScreen, IBrowserWindow } from './lib/interfaces';
import { app, BrowserWindow, screen } from 'electron';
import { ASCII_TEXT } from './lib/consts';

export default class Electron {
    private app: IApp;
    private screen: IScreen;

    constructor() {
        this.app = app;
        this.screen = screen;
    }

    public createWindow(): void {

        const { width, height }: {width: number, height: number } = 
            this.screen.getPrimaryDisplay().workAreaSize;
        
        const window: IBrowserWindow = new BrowserWindow({
            width, height,
            webPreferences:
                { nodeIntegration: true }
        });

        window.setFullScreen(true);
        window.loadFile('dist/index.html');
        window.webContents.openDevTools();
        console.log(ASCII_TEXT);
    }
    
    public init(): void {
        
        this.app.whenReady().then(this.createWindow);

        this.app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                this.app.quit();
            }
        });

        this.app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createWindow();
            }
        });
        
        // In this file you can include the rest of your app's specific main process
        // code. You can also put them in separate files and require them here.
    }
}
