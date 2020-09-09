import Phaser from 'phaser';
import GameScene from './GameScene';
import { ASCII_TEXT, Screen } from './consts';

console.log(ASCII_TEXT);

const game = new GameScene();

const gameConfig = {
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

new Phaser.Game(gameConfig);

/* =========================================================*/
