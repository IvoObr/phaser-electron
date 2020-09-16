import Phaser from 'phaser';
import { directions } from '../lib/types';
import { iCursors, iArcadeGroup, iArcadeStaticGroup } from '../lib/interfaces';

export default abstract class Character {
    
    public abstract scene: Phaser.Scene

    public direction: directions;

    public abstract setCollision(platforms: iArcadeStaticGroup, bombs: iArcadeGroup) : void;
    
    public abstract setOverlap(stars: iArcadeGroup): void;
    
    public abstract setKeyInput(cursors: iCursors): void;

    public abstract setSprite(): void;
}
