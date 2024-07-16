import Phaser from "../lib/phaser.js"
import Game from "../scenes/Game.js"
import Resource from "./Resource.js"
import WorldFeature from "./WorldFeature.js"

export default class Mountain extends WorldFeature {

    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey = 'mountain')
        this.setPosition(x, y)
        this.setData({stone: 25})
        this.setActive(true)
        this.name = imageKey
        // this.key = 'mountain'
        // this.name = 'mountain' + x.toString()
    }

    add() {
        console.log("add")
        this.setPushable(true)
        this.body.setCircle(5)
    }

}