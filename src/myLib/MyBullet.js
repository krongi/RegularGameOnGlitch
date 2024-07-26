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
    

    fireJS (shooterPosition, angle, speed = 600, caliberMultiplier = 1, damageModifier = 1, ) {
        // angle = Phaser.Math.Angle.Normalize(angle)
        this.setScale(.5 * caliberMultiplier, .5 * caliberMultiplier)
        this.setDisplaySize(this.width * caliberMultiplier, this.height * caliberMultiplier)
        this.speed = Phaser.Math.GetSpeed(speed, 1)
        this.setActive(true)
        this.setVisible(true)      
        this.enableBody(true, shooterPosition.x, shooterPosition.y)
        this.setPosition(shooterPosition.x, shooterPosition.y)
        this.setRotation(angle)
        this.body.setSize(this.width * 0.25 * caliberMultiplier, this.height * 0.25 * caliberMultiplier)
        // this.body.rotation = angle
        this.flipX = false
        this.incX = Math.cos(angle)
        this.incY = Math.sin(angle)
        this.incX = -(this.incX)
        this.incY = -(this.incY)
        // this.body.isCircle = true
        this.lifeSpan = 1000
    }
}