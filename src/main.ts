import Phaser from 'phaser';
import Game2 from './Game2';
import { Screen } from './consts';
 
console.log(global.screen);

const gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: Screen.width,
    height: Screen.height,
    scene: {
        preload: Game2.preload,
        create: Game2.create,
        update: Game2.update
    }
};

new Phaser.Game(gameConfig);

/* =========================================================*/
