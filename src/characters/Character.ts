import { ICursors, IArcadeGroup, IArcadeStaticGroup } from '../lib/interfaces';
import Phaser from 'phaser';
import { directions } from '../lib/types';

export default abstract class Character {
    
    public abstract scene: Phaser.Scene

    public direction: directions;

    public abstract setCollision(platforms: IArcadeStaticGroup, bombs: IArcadeGroup) : void;
    
    public abstract setOverlap(stars: IArcadeGroup): void;
    
    public abstract setKeyInput(cursors: ICursors): void;

    public abstract setSprite(): void;
}
