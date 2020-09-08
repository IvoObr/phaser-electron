import Group from './Group';
import { IGroup } from '../interfaces';

export default class Bomb extends Group {
    
    constructor(protected scene: Phaser.Scene) {
        super(scene);
    } 
    
    public addGroup(arg: IGroup | {}): void {
        this.scene.physics.add.group(arg);
    }
}