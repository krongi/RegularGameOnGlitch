import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js"
import Bullet from "./Bullet.js";


export default class EnemyBullet extends Bullet {
    
    constructor(scene, x, y, imageKey, frame) {
        super(scene, x, y, 'laser', '22.png')
        var lastFired = 0
        var isDown = false
        var mouseX = 0
        var mouseY = 0
        this.imageKey = imageKey
        this.incX = 0
        this.incY = 0
        this.lifeSpan = 0
        this.speed = Phaser.Math.GetSpeed(400, 1)
        this.setScale(0.25, 0.25)
        // this.body.setSize(this.width, this.height)f

    }

    fire(shooterPosition, targetPosition) {
        let bullet = super.fire(shooterPosition, targetPosition)
        bullet.body.setSize(bullet.displayWidth, bullet.displayHeight)

    }
    
}