import Phaser from 'phaser';
import GameScene from './GameScene';
import { Screen } from './consts';

const game = new GameScene();

const gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#3e729d',
    width: Screen.width,
    height: Screen.height,
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
