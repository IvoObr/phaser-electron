import Phaser from 'phaser';
import { GameScene } from './GameScene';
import { ASCII_TEXT, ScreenSize } from './consts';
import { IGameConfig, IApp, IScreen, IBrowserWindow } from './interfaces';
import { Electron } from './Electron';
import { app, BrowserWindow, screen } from 'electron';

class Game {
    
    initElectron(app: IApp, screen: IScreen, BrowserWindow: IBrowserWindow): Game {
        new Electron(app, screen, BrowserWindow).init();
        return this;
    }

    initPhaser(): Phaser.Game {
        const game: GameScene = new GameScene();
        
        const gameConfig: IGameConfig = {
            type: Phaser.AUTO,
            backgroundColor: '#3e729d',
            width: ScreenSize.width,
            height: ScreenSize.height,
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
        
        console.log(ASCII_TEXT);
        return new Phaser.Game(gameConfig);
    }
}

new Game()
    .initElectron(app, screen, new BrowserWindow())
    .initPhaser();

