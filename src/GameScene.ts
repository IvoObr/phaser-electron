import Phaser from 'phaser';
import { Screen } from './consts';
import Player from './characters/Player';
import { IArcadeStaticGroup, IArcadeGroup,
    ICursors, IText } from './interfaces';

export default class GameScene extends Phaser.Scene { // implements IGame {
    public platforms: IArcadeStaticGroup;
    public player: Player;
    public cursors: ICursors;
    static bombs: IArcadeGroup;
    static stars: IArcadeGroup;
    static scoreText: IText;
    static score: number = 0;
    static gameOver: boolean = false;
    
    constructor() {
        super('HeroGame');
    }

    preload() {
        this.load.image('sky', 'assets/sky.jpg');        
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(Screen.width / 2 , Screen.height / 2, 'sky');
        GameScene.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = new Player(this.physics, this.anims);
        this.player.setSprite();
        
        const star = this.add.image(400, 70, 'star');

        this.tweens.add({
            targets: star,
            y: 350,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();

        GameScene.bombs = this.physics.add.group();
        
        GameScene.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        GameScene.stars.children.iterate((child: any) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.player.setCollision(this.platforms, GameScene.bombs, hitBomb);
        this.player.setOverlap(GameScene.stars, collectStar);
        
        this.physics.add.collider(GameScene.stars, this.platforms);
        this.physics.add.collider(GameScene.bombs, this.platforms);
        
    }
        
    update() {
        if (GameScene.gameOver) {
            return;
        }

        this.player.setKeyInput(this.cursors);
    }
}

function collectStar(player: any, star: any) {
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

function hitBomb(player: any, bomb: any) {
    this.physics.pause();

    player.setTint(0xff0000);
    player.anims.play('turn');

    GameScene.gameOver = true;
}