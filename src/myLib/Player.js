import phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";
import Bullet from "./Bullet.js";


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture = 'redSoldier')
        this.setPosition(x, y)
        this.name = "Super Karate Monkey Death Car"
        this.setData({health: 100, magic: 100, gold: 200, wood: 0, stone: 0})
        this.setDisplaySize(this.width * 0.5, this.height * 0.5)
        this.setActive(true)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setMass(2);
        this.setImmovable(false);
        this.body.setCircle(this.width * 0.5)
        this.setInteractive();
        this.setVisible(true)
        this.setCollideWorldBounds(true)
        this.isAlive = true
        this.firingSpeed = 200
        this.powerUpActive = false
        this.powerUpTimeLimit = 0
        this.powerUpActiveTime 
        this.powerUpType = []
        this.startCheck = false
        this.ammoMass = 100
        this.damageModifier = 1
        this.caliberMultiplier = 1
        console.log(this.firingSpeed)
        }

    getLocation() {
        return [this.x, this.y]
    }

    changeResourceQuantity(resource, changedAmount) {
        this.incData(resource, changedAmount)  
    }

    healthDown(dropMax, dropMin = 0 ) {
        this.incData('health', -Phaser.Math.Between(dropMin, dropMax))
        let currentHealth = this.getData('health')
        this.scene.events.emit('gotHit', this.getData('health'))
        if (currentHealth <= 0) {
            this.isAlive = false
           this.setVelocity(0,0)
        }
    }

    firingSpeedUp() {
        this.firingSpeed = 1000
        this.ammoMass = 150
        this.damageModifier = 1.25
        this.powerUpActiveTime = 15000

    }

    firingSpeedDown() {
        this.firingSpeed = 600
        this.ammoMass = 100
        this.damageModifier = 1
        this.powerUpActiveTime = 0
    }

    caliberUp() {
        this.firingSpeed = 450
        this.caliberMultiplier = 1.5
        this.ammoMass = 200
        this.damageModifier = 1.5
        this.powerUpActiveTime = 15000
    }

    caliberDown() {
        this.firingSpeed = 600
        this.caliberMultiplier = 1
        this.ammoMass = 100
        this.damageModifier = 1
        this.powerUpActiveTime = 0
    }

    update(delta) {

        if (this.powerUpActiveTime > 0) {
            this.powerUpActiveTime -= delta
        }
        else {
            this.caliberDown()
        }
        
    }
}