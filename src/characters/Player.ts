import Character from './Character';
import GameScene from '../GameScene';
import Phaser from 'phaser';
import { IPlayer, IAnims, IPhysics, ICursors,
    IArcadeGroup, IArcadeStaticGroup } from '../interfaces';

export default class Player extends Character {
    public player: IPlayer;
    public physics: IPhysics;
    public anims: IAnims;
    private callbacks: PlayerPhysicsCallbacks;

    constructor(physics: IPhysics, anims: IAnims) {
        super();
        this.physics = physics;
        this.anims = anims;
        this.callbacks = new PlayerPhysicsCallbacks(physics);
    }

    public setSprite(): void {
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

    public setCollision(platforms: IArcadeStaticGroup, bombs: IArcadeGroup): void {
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, bombs, this.callbacks.hitBomb, null, this);
    }

    public setOverlap(stars: IArcadeGroup): void {
        this.physics.add.overlap(this.player, stars, this.callbacks.collectStar, null, this);
    }

    public setKeyInput(cursors: ICursors): void {

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

class PlayerPhysicsCallbacks {
    public physics: IPhysics;
    
    constructor(physics: IPhysics) {
        this.physics = physics;
    }
    
    collectStar(player: IPlayer, star: any): void {
        star.disableBody(true, true);

        GameScene.score += 10;
        GameScene.scoreText.setText('Score: ' + GameScene.score);

        if (GameScene.stars.countActive(true) === 0) {
            GameScene.stars.children.iterate(function(child: any) {
                child.enableBody(true, child.x, 0, true, true);
            });

            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = GameScene.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    hitBomb(player: IPlayer, bomb: any): void {
        this.physics.pause();

        player.setTint(0xff0000);
        player.anims.play('turn');

        GameScene.gameOver = true;
    }
    
}