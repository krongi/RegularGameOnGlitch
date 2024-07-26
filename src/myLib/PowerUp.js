import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js"

export default class PowerUp extends Phaser.Physics.Arcade.Image {
constructor(scene, x, y, imageKey, frame, type = null){
    super(scene, x, y, imageKey, frame)
    
}

spawnPUP(x, y){
    this.setActive(true)
    this.setVisible(true)
    this.setPosition(x, y)
    this.enableBody(true, x, y)
    this.setDisplaySize(32, 32)
    this.setMass(10)
    this.body.setSize(32, 32)
    
}

destroyPUP(){
    this.destroy()
}

update(time, delta) {
    this.body.radius = 10
    // this.lifeSpan -= delta
    // this.x -= this.incX * (this.speed * delta)
    // this.body.x -= this.incX * (this.speed * delta)
    // this.y -= this.incY * (this.speed * delta)
    // this.body.y -= this.incY * (this.speed * delta)

    // /* using below to fuck with size of bullets*/
    // // this.displayHeight += Math.abs(this.incY) * 5.5
    // // this.displayWidth += Math.abs(this.incX) * 5.5

    // if (this.lifeSpan <= 0) {
    //     this.setActive(false)
    //     this.setVisible(false)
    //     this.destroy()
        
    // }
        
}

}