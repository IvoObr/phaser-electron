import { IPlayer, IAnims, IPhysics, ICursors,
    IArcadeGroup, IArcadeStaticGroup } from '../interfaces';

export default abstract class Character {
    public abstract player: IPlayer;
    public abstract physics: IPhysics;
    public abstract anims: IAnims;
    public abstract setSprite(): void;
    public abstract setCollision(
        platforms: IArcadeStaticGroup,
        bombs: IArcadeGroup,
        callback: ArcadePhysicsCallback): void;
    public abstract setOverlap(
        stars: IArcadeGroup,
        collectStar: ArcadePhysicsCallback): void;
    public abstract setKeyInput(
        cursors: ICursors): void;
}