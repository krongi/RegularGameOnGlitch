import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js"
import Bullet from "./Bullet.js";

export default class MyBullet extends Bullet {
    
    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey = 'laser1')
        var lastFired = 0
        var isDown = false
        this.imageKey = imageKey
        this.incX = 0
        this.incY = 0
        this.lifeSpan = 0
        this.speed = Phaser.Math.GetSpeed(600, 1)

    }
    
    
}