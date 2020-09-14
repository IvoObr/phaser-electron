import { IBrowserWindow } from './lib/interfaces';
import { app, BrowserWindow, screen } from 'electron';
import { ASCII_TEXT } from './lib/consts';

class Electron {
    
    public createWindow(): void {

        const { width, height }: {width: number, height: number } = 
            screen.getPrimaryDisplay().workAreaSize;

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

        app.whenReady().then(this.createWindow);

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createWindow();
            }
        });
    }
}

new Electron().init();
