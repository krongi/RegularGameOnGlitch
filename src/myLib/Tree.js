import Phaser from "../lib/phaser.js"
import Game from "../scenes/Game.js"

export default class Tree extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey = 'tree')
        this.setPosition(x, y)
        this.setData({wood: 25})
        this.setDisplaySize(this.width * 0.5, this.height * 0.5)
        this.setActive(true)
        this.key = 'tree'
        this.name = 'tree' + x.toString()

    }
    
    add() {
        console.log("add")
        this.setPushable(true)
        this.body.setCircle(5)
    }
    
}