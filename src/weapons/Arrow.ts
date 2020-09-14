import Phaser from 'phaser';
import { x, y } from '../lib/types';

class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: any, x: x, y: y) {
        super(scene, x, y, 'arrow');
    }

    fire(x: x, y: y, player: any) {
        this.body.reset(x, y);

        console.log('X: ',x);
        console.log('Y: ', y);
        console.log(player);
        
        
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(-800);
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
    constructor(scene: any) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 40, // number of arrows left
            key: 'arrow',
            active: false,
            visible: false,
            classType: Arrow
        });
    }

    fireArrow(x: x, y: y, player: any) {
        const arrow = this.getFirstDead(false);

        if (arrow) {
            arrow.fire(x, y, player);
        }
    }
}
