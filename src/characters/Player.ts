import Phaser from 'phaser';
import Character from './Character';
import { GameScene } from '../scenes';
import { eDirections } from '../lib/enums';
import { directions } from '../lib/types';
import { ScreenSize } from '../lib/consts';
import { iPlayer, iCursors, iArcadeGroup, iArcadeStaticGroup } from '../lib/interfaces';

export default class Player extends Character {
    private dude: string = 'dude';
    public player: iPlayer;
    public direction: directions;
    private callbacks: PlayerPhysicsCallbacks;

    constructor(public scene: Phaser.Scene) {
        super();
        this.callbacks = new PlayerPhysicsCallbacks(this.scene);
    }

    public setSprite(): void {
        this.player = this.scene.physics.add.sprite(100, 450 , this.dude);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.scene.anims.create({
            key: eDirections.left,
            frames: this.scene.anims.generateFrameNumbers(this.dude, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: eDirections.turn,
            frames: [{ key: this.dude, frame: 4 }],
            frameRate: 20
        });

        this.scene.anims.create({
            key: eDirections.right,
            frames: this.scene.anims.generateFrameNumbers(this.dude, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    public setCollision(platforms: iArcadeStaticGroup, bombs: iArcadeGroup): void {
        this.scene.physics.add.collider(this.player, platforms);
        this.scene.physics.add.collider(this.player, bombs, this.callbacks.hitBomb, null, this);
    }

    public setOverlap(stars: iArcadeGroup): void {
        this.scene.physics.add.overlap(this.player, stars, this.callbacks.collectStar, null, this);
    }

    public setKeyInput(cursors: iCursors): void {

        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play(eDirections.left, true);
            this.direction = eDirections.left;

        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play(eDirections.right, true);
            this.direction = eDirections.right;

        } else {
            this.player.setVelocityX(0);
            this.player.anims.play(eDirections.turn);
            this.direction = eDirections.center;
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

class PlayerPhysicsCallbacks {
    
    constructor(private scene: Phaser.Scene) {}

    public collectStar(player: iPlayer, star: any): void {
        star.disableBody(true, true);

        GameScene.score += 10;
        GameScene.scoreText.setText('Score: ' + GameScene.score);

        if (GameScene.stars.countActive(true) === 0) {
            GameScene.stars.children.iterate(function(child: any) {
                child.enableBody(true, child.x, 0, true, true);
            });

            const x = (player.x < 400)
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);

            const bomb = GameScene.bombs.create(x, 16, 'bomb');
            
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    public hitBomb(player: iPlayer, bomb: any): void {
        this.scene.physics.pause();

        player.setTint(0xff0000);
        player.anims.play(eDirections.turn);

        GameScene.gameOverText = this.scene.add.text(
            ScreenSize.width / 4,
            ScreenSize.height / 4, //todo center on screen
            'GAME OVER',
            { fontSize: '38px', fill: '#000' });

        GameScene.gameOver = true;
    }
    
}
