import Phaser from "../lib/phaser.js";
import { GanglandTakeover } from "../main.js";
import Game from "../scenes/Game.js";

export default class Resource extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    this.setPosition(x, y)
    this.setDisplaySize(this.width * 0.25, this.height * 0.25)
    this.setActive(true)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setMass(50)
    this.body.setCircle(this.width * 0.5)
    this.setInteractive()
    this.setVisible(true)
    }
    
    resourcePos() {
        return this.getCenter()
    }
}