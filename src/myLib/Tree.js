import Phaser from "../lib/phaser.js"
import Game from "../scenes/Game.js"
import Resource from "./Resource.js"
import WorldFeature from "./WorldFeature.js"

export default class Tree extends WorldFeature {

    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey = 'tree')
        this.setPosition(x, y)
        this.setData({wood: 25})
        this.setActive(true)
        this.name = imageKey
        // this.key = 'tree'
        // this.name = 'tree' + x.toString()
    }

    add() {
        console.log("add")
        this.setPushable(true)
        this.body.setCircle(5)
    }
}