import Phaser from 'phaser';
import GameScene from './GameScene';
import { ASCII_TEXT, Screen } from './consts';
import { IGameConfig } from './interfaces';
import { Electron } from './Electron';
import { app, BrowserWindow as Window, screen } from 'electron';

class Game {

    constructor(
        private ASCII_TEXT: string,
        private app: any,
        private Window: any,
        private screen: any
    ) { }
    
    initElectron(): void {
        new Electron(this.app, this.Window, this.screen, this.ASCII_TEXT).init();
    }

    setGame(): Phaser.Game {
        const game: GameScene = new GameScene();

        const gameConfig: IGameConfig = {
            type: Phaser.AUTO,
            backgroundColor: '#3e729d',
            width: 800, //, Screen.width,
            height: 600,//, Screen.height,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: {
                preload: game.preload,
                create: game.create,
                update: game.update
            }
        };
        
        console.log(this.ASCII_TEXT);
        return new Phaser.Game(gameConfig);
    }
}

new Game(ASCII_TEXT, app, Window, screen);

