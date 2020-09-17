import Phaser from 'phaser';
import Character from './Character';
import { GameScene } from '../scenes';
import { directions } from '../lib/enums';
import { ScreenSize } from '../lib/consts';
import { IPlayer, ICursors, IArcadeGroup, IArcadeStaticGroup } from '../lib/interfaces';

export default class Player extends Character {
    private dude: string = 'dude';
    public hero: IPlayer;
    public direction: directions;
    private callbacks: PlayerPhysicsCallbacks;

    constructor(public scene: Phaser.Scene) {
        super();
        this.callbacks = new PlayerPhysicsCallbacks(this.scene);
    }

    public setSprite(): void {
        this.hero = this.scene.physics.add.sprite(100, 450 , this.dude);
        this.hero.setBounce(0.2);
        this.hero.setCollideWorldBounds(true);

        this.scene.anims.create({
            key: directions.left,
            frames: this.scene.anims.generateFrameNumbers(this.dude, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: directions.right,
            frames: this.scene.anims.generateFrameNumbers(this.dude, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: directions.turn,
            frames: [{ key: this.dude, frame: 4 }],
            frameRate: 20
        });
    }

    public setCollision(platforms: IArcadeStaticGroup, bombs: IArcadeGroup): void {
        this.scene.physics.add.collider(this.hero, platforms);
        this.scene.physics.add.collider(this.hero, bombs, this.callbacks.hitBomb, null, this);
    }

    public setOverlap(stars: IArcadeGroup): void {
        this.scene.physics.add.overlap(this.hero, stars, this.callbacks.collectStar, null, this);
    }

    public setKeyInput(cursors: ICursors): void {

        if (cursors.left.isDown) {
            this.hero.setVelocityX(-160);
            this.hero.anims.play(directions.left, true);
            this.direction = directions.left;

        } else if (cursors.right.isDown) {
            this.hero.setVelocityX(160);
            this.hero.anims.play(directions.right, true);
            this.direction = directions.right;

        } else {
            this.hero.setVelocityX(0);
            this.hero.anims.play(directions.turn);
            this.direction = directions.center;
        }

        if (cursors.up.isDown && this.hero.body.touching.down) {
            this.hero.setVelocityY(-330);
        }
    }
}

class PlayerPhysicsCallbacks {
    
    constructor(private scene: Phaser.Scene) {}

    public collectStar(player: IPlayer, star: any): void {
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

    public hitBomb(player: IPlayer, bomb: any): void {
        this.scene.physics.pause();

        player.setTint(0xff0000);
        player.anims.play(directions.turn);

        GameScene.gameOverText = this.scene.add.text(
            ScreenSize.width / 4,
            ScreenSize.height / 4, //todo center on screen
            'GAME OVER',
            { fontSize: '38px', fill: '#000' });

        GameScene.gameOver = true;
    }
    
}
