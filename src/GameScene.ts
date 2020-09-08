import Phaser from 'phaser';
import { Screen } from './consts';
import Player from './characters/Player';
import Bomb from './obj/Bomb';
import { IArcadeStaticGroup, IArcadeGroup,
    ICursors, IText } from './interfaces';

export default class GameScene extends Phaser.Scene {
    public player: Player;
    public cursors: ICursors;
    static bombs: Bomb;
    static stars: IArcadeGroup;
    static scoreText: IText;
    static score: number = 0;
    static gameOver: boolean = false;
    static gameOverText: IText;
    
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

        const platforms: IArcadeStaticGroup = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        this.player = new Player(this);
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

        GameScene.bombs = new Bomb(this);
        GameScene.bombs.addGroup({});
      //  GameScene.bombs = this.physics.add.group();
        
        GameScene.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        GameScene.stars.children.iterate((child: any) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.player.setCollision(platforms, GameScene.bombs);
        this.player.setOverlap(GameScene.stars);
        
        this.physics.add.collider(GameScene.stars, platforms);
        this.physics.add.collider(GameScene.bombs, platforms);
        
    }
        
    update() {
        if (GameScene.gameOver) {
            return;
        }

        this.player.setKeyInput(this.cursors);
    }
}