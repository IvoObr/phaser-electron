import Phaser from 'phaser';
import { x, y, directions } from '../lib/types';
import { GameScene } from '../scenes';

class Arrow extends Phaser.Physics.Arcade.Sprite {
    private arrorSpeed: number = 800;
    
    constructor(scene: any, x: x, y: y) {
        super(scene, x, y, 'arrow');
    }
    
    fire(x: x, y: y, direction: directions) {
        this.body.reset(x, y);
   
        this.setActive(true);
        this.setVisible(true);
        
        if (direction == 'left') {
            this.setVelocityX(this.arrorSpeed * -1);
        }
        
        if (direction == 'right') {
            this.setVelocityX(this.arrorSpeed);
        }
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.y <= -32) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default class Arrows extends Phaser.Physics.Arcade.Group {
    constructor(scene: any, arrowsLeft: number) {
        super(scene.physics.world, scene);

        // todo fill new arrows
        this.createMultiple({
            frameQuantity: arrowsLeft, // number of arrows left
            key: 'arrow',
            active: false,
            visible: false,
            classType: Arrow
        });
    }

    fireArrow(x: x, y: y, direction: directions) {
        const arrow = this.getFirstDead(false);

        if (arrow) {
            arrow.fire(x, y, direction);
            GameScene.arrowLeft -= 1;
            GameScene.scoreText.setText('Arrows: ' + GameScene.arrowLeft).alphaTopRight;
        }
    }
}
