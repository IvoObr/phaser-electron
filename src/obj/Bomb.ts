import ArcedeGroup from './Group';
import IGroup from '../interfaces/IGroup';

export default class Bomb extends ArcedeGroup {
    
  //  private scene: Phaser.Scene;
    
    public addGroup(arg: IGroup): void {
        this.scene.physics.add.group(arg);
    }
}