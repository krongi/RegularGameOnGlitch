import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js"

export default class Bullet extends Phaser.Physics.Arcade.Image {
    
    constructor(scene, x, y, imageKey, frame, speed = 600) {
        super(scene, x, y, imageKey, frame)
        var lastFired = 0
        var isDown = false
        this.imageKey = imageKey
        this.incX = 0
        this.incY = 0
        this.lifeSpan = 0
        this.speed = Phaser.Math.GetSpeed(speed, 1)
        
        
    
    }
    

    fire(shooterPosition, targetPosition) {
        this.setActive(true)
        this.setVisible(true)      
        this.enableBody(true, shooterPosition.x, shooterPosition.y)
        this.setPosition(shooterPosition.x, shooterPosition.y)
        let angle = Phaser.Math.Angle.Between(targetPosition.x, targetPosition.y, shooterPosition.x, shooterPosition.y)
        this.setRotation(angle)
        this.body.setSize(this.width * 0.25, this.height * 0.25)
        this.flipX = true
        this.body.rotation = angle
        this.incX = Math.cos(angle)
        this.incY = Math.sin(angle)
        // this.body.isCircle = true
        this.lifeSpan = 1000
        return this

    }

    update(time, delta) {
        this.body.radius = 10
        this.lifeSpan -= delta
        this.x -= this.incX * (this.speed * delta)
        this.body.x -= this.incX * (this.speed * delta)
        this.y -= this.incY * (this.speed * delta)
        this.body.y -= this.incY * (this.speed * delta)

        /* using below to fuck with size of bullets*/
        // this.displayHeight += Math.abs(this.incY) * 5.5
        // this.displayWidth += Math.abs(this.incX) * 5.5

        if (this.lifeSpan <= 0) {
            this.setActive(false)
            this.setVisible(false)
            this.destroy()
            
        }
            
    }

static    whenDestroyed() {
        // console.log("\nSo many dicks...\n")
        // console.log("'this' is: " + this)
    }
}