import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js"
import Bullet from "./Bullet.js";

export default class MyBullet extends Bullet {
    
    constructor(scene, x, y, imageKey, frame) {
        super(scene, x, y, imageKey, frame)
        var lastFired = 0
        var isDown = false
        this.imageKey = imageKey
        this.incX = 0
        this.incY = 0
        this.lifeSpan = 0
        this.speed = Phaser.Math.GetSpeed(600, 1)

    }
    

    fireJS (shooterPosition, angle) {
        // angle = Phaser.Math.Angle.Normalize(angle)
        this.setScale(.5, .5)
        this.setActive(true)
        this.setVisible(true)      
        this.enableBody(true, shooterPosition.x, shooterPosition.y)
        this.setPosition(shooterPosition.x, shooterPosition.y)
        this.setRotation(angle)
        this.body.setSize(this.width * 0.25, this.height * 0.25)
        this.flipX = false
        this.incX = Math.cos(angle)
        this.incY = Math.sin(angle)
        this.incX = -(this.incX)
        this.incY = -(this.incY)
        // this.body.isCircle = true
        this.lifeSpan = 1000
    }
}