import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js"

export default class PowerUp extends Phaser.Physics.Arcade.Image {
constructor(scene, x, y, imageKey, frame, type = null){
    super(scene, x, y, imageKey, frame)
    
}

spawnPUP(x, y){
    this.setActive(true)
    this.setVisible(true)
    
    this.enableBody(true, x, y)
    this.setPosition(x, y)
    this.setDisplaySize(32, 32)
    this.setMass(10)
    this.body.setSize(32, 32)
    this.timeActive
    
}

destroyPUP(){
    this.destroy()
}

timeActiveStart(seconds) {
    this.timeActive = seconds
}

update(time, delta) {
    
    if (this.timeActive > 0){        
        this.timeActive -= delta
    }
    
}

}