import Phaser from 'phaser';
import { Screen } from './consts';
// import { IGame } from './interfaces';

class Game2 extends Phaser.Scene { // implements IGame {
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    stars: Phaser.Physics.Arcade.Group;
    static scoreText: Phaser.GameObjects.Text;
    static score: number = 0;
    
    constructor() {
        super('HeroGame');
    }

    preload() {
        this.load.image('sky', 'assets/sky.jpg');        
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 });
     
        // this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        // this.load.glsl('stars', 'assets/starfields.glsl.js');
    }

    create() {
        this.add.image(Screen.width / 2 , Screen.height / 2, 'sky');
        Game2.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        
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
        
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        this.stars.children.iterate((child: any) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);

        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
    }
        
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
            
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        
    }
}

export default new Game2();

function collectStar(player: any, star: any) {
    star.disableBody(true, true);

    Game2.score += 10;
    Game2.scoreText.setText('Score: ' + Game2.score);
}