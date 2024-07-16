import Phaser from "../lib/phaser.js";
import { GanglandTakeover } from "../main.js";
import Game from "../scenes/Game.js";

export default class WorldFeature extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    this.setPosition(x, y)
    // this.key = key
    this.name = this.key + 'WorldFeature'
    this.setActive(true)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setMass(200)
    this.body.setCircle(this.width * 0.5)
    this.setInteractive()
    this.setVisible(true)
    this.setImmovable(true)
    this.key
    }
    
    getName() {
        console.log(this.name)
        return this.name
    }

    featurePos() {
        return this.getCenter()
    }

    changeFeatureToResource = function() {
        let toBeResource = new Resource(this.scene, this.x, this.y, this.key)
        toBeResource.name = this.name + 'Resource'
        toBeResource.setActive(true)
        this.scene.add.existing(toBeResource)
        this.scene.physics.add.existing(toBeResource)
        // let getCentered = [this.getLeftCenter(), this.getTopCenter(), this.getRightCenter(), this.getBottomCenter()]
        // let oldPos = this.getCenter()
        // toBeResource.setMass(10)
        // this.scale = 0.25
        // this.setBodySize(this.width, this.height)
        // this.setBodySize(this.width * 0.25, this.height * 0.25)
        // this.setSize(this.width * 0.25, this.height * 0.25)
        // this.setDisplaySize(this.width * 0.25, this.height * 0.25)
        // this.body.setCircle(this.width * 0.5, this.height * 0.5)
        console.log('fin')
        // return toBeResource
    }
    
}