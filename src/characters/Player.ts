import { IPlayer, IAnims, IPhysics,
    IArcadeGroup, IArcadeStaticGroup, ICursors } from '../interfaces';
import Character from './Character';

export default class Player extends Character {
    public player: IPlayer;
    public physics: IPhysics;
    public anims: IAnims;

    constructor(physics: IPhysics, anims: IAnims) {
        super();
        this.physics = physics;
        this.anims = anims;
    }

    public setSprite() {
        this.player = this.physics.add.sprite(100, 450 , 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    public setCollision(platforms: IArcadeStaticGroup, bombs: IArcadeGroup, hitBomb: ArcadePhysicsCallback) {
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, bombs, hitBomb, null, this);
    }

    public setOverlap(stars: IArcadeGroup, collectStar: ArcadePhysicsCallback) {
        this.physics.add.overlap(this.player, stars, collectStar, null, this);
    }

    public setKeyInput(cursors: ICursors) {

        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);

        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);

        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}