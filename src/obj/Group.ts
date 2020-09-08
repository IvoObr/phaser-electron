import { x, y } from '../types'; 
import { IGroup } from '../interfaces';

export default abstract class Group {

    constructor(protected scene: Phaser.Scene) {}
    
    public abstract addGroup(arg: IGroup): void;       
}