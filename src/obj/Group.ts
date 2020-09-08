import { x, y } from '../types'; 
 
interface IGroup {
    key: string,
    repeat: number,
    setXY: { x: x, y: y, stepX: number }
}

export default abstract class Group {

    constructor(private scene: Phaser.Scene) {}
    
    public abstract addGroup(arg: IGroup): void;       
}