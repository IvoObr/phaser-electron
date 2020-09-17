import Phaser from 'phaser';
import { GameScene } from '../scenes';
import { directions } from '../lib/enums';
import { x, y } from '../lib/types';

class Arrow extends Phaser.Physics.Arcade.Sprite {
    private arrorSpeed: number = 800;
    
    constructor(scene: Phaser.Scene, x: x, y: y) {
        super(scene, x, y, 'arrow');
    }
    
    fire(x: x, y: y, direction: directions): void {
        this.body.reset(x, y);
   
        this.setActive(true);
        this.setVisible(true);
        
        if (direction == directions.left) {
            this.setVelocityX(this.arrorSpeed * -1);
        }
        
        if (direction == directions.right) {
            this.setVelocityX(this.arrorSpeed);
        }
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if (this.y <= -32) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default class Arrows extends Phaser.Physics.Arcade.Group {
    
    constructor(scene: Phaser.Scene, arrowsLeft: number) {
        super(scene.physics.world, scene);

        // todo fill new arrows
        this.createMultiple({
            frameQuantity: arrowsLeft,
            key: 'arrow',
            active: false,
            visible: false,
            classType: Arrow
        });
    }

    fireArrow(x: x, y: y, direction: directions): void {
        const arrow = this.getFirstDead(false);

        if (arrow) {
            arrow.fire(x, y, direction);
            GameScene.arrowLeft -= 1;
            GameScene.scoreText.setText('Arrows: ' + GameScene.arrowLeft);
        }
    }
}
