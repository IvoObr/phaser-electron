import Phaser from 'phaser';
import { IGroup } from '../interfaces';

export default class Star {

    constructor(private scene: Phaser.Scene) {}

    getInstance(props: IGroup) {
        return this.scene.physics.add.group(props);
    }
}
