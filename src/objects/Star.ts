import Phaser from 'phaser';
import { iGroup } from '../lib/interfaces';

export default class Star {

    constructor(private scene: Phaser.Scene) {}

    getInstance(props: iGroup) {
        return this.scene.physics.add.group(props);
    }
}
