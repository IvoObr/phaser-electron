import Phaser from 'phaser';

export default class Bomb {

    constructor(private scene: Phaser.Scene) {}

    getInstance() {
        return this.scene.physics.add.group();
    }

}
