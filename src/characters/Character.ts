import { ICursors, IArcadeGroup, IArcadeStaticGroup } from '../interfaces';

export default abstract class Character {
    
    public abstract setCollision(platforms: IArcadeStaticGroup, bombs: IArcadeGroup) : void;
    
    public abstract setOverlap(stars: IArcadeGroup): void;
    
    public abstract setKeyInput(cursors: ICursors): void;

    public abstract setSprite(): void;
}