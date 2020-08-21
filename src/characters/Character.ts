import { IPlayer, IAnims, IPhysics, ICursors,
    IArcadeGroup, IArcadeStaticGroup } from '../interfaces';

export default abstract class Character {
    public abstract player: IPlayer;
    
    public abstract physics: IPhysics;
    
    public abstract anims: IAnims;
    
    public abstract setCollision(platforms: IArcadeStaticGroup, bombs: IArcadeGroup) : void;
    
    public abstract setOverlap(stars: IArcadeGroup): void;
    
    public abstract setKeyInput(cursors: ICursors): void;

    public abstract setSprite(): void;
}