import Phaser from 'phaser';
import Demo from './phaser';

const gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1800,
    height: 600,
    scene: Demo
};

const game = new Phaser.Game(gameConfig);

/* =========================================================*/
