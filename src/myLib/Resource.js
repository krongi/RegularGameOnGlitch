import Phaser from "../lib/phaser.js";
import { GanglandTakeover } from "../main.js";
import Game from "../scenes/Game.js";

export default class Resource extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, resourceType, resourceAmount = 25) {
    super(scene, x, y, texture)
    var _resourceType = resourceType
    var _resourceAmount = resourceAmount
    this.setPosition(x, y)
    this.setDisplaySize(this.width * 0.25, this.height * 0.25)
    this.setActive(true)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setMass(50)
    this.body.setCircle(this.width * 0.5)
    this.setInteractive()
    this.setVisible(true)
    this.resourceType = _resourceType
    this.resourceAmount = _resourceAmount
    this.data = {_resourceType: _resourceAmount}
    }
    
    resourcePos() {
        return this.getCenter()
    }

    setResource = function () {
        this.resourceType = this._resourceType
        this.resourceAmount = this._resourceAmount
        this.setData(this.resourceType, this.resourceAmount)
    }

    resourceAmountAdjuster(incrementNumber) {
        this.resourceAmount += incrementNumber
    }

    resourcePicked = function()
    {

        console.log(player + "\n")
        console.log(this.data.getAll + "\n")
        return this.data.getAll + "\n"
        // let amount = this.data.get(this.resourceType)
        // let resourceType = this.resourceType
        // let pickedUp = {resourceType: resourceAmount}
        // picker.data.set(resourceType, resourceAmount)
        
    }
}
// var resourcePicked = function()
//     {

//         console.log(player + "\n")
//         console.log(this.data.getAll + "\n")
//         return this.data.getAll + "\n"
//         // let amount = this.data.get(this.resourceType)
//         // let resourceType = this.resourceType
//         // let pickedUp = {resourceType: resourceAmount}
//         // picker.data.set(resourceType, resourceAmount)
        
//     }