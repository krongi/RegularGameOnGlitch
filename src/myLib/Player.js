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

    powerUp(powerUpType, powerUpTimeLimit) {
        this.powerUpActiveTime = powerUpTimeLimit
        this.powerUpActive = true
        this.startCheck = true
        switch (powerUpType) {
            case 'FiringSpeed':
                if (this.powerUpType.indexOf('FiringSpeed') == -1) {
                    this.firingSpeed = 800
                    this.powerUpType.push('FiringSpeed')
                    
                }
            
            } 
    }

    firingSpeedUp() {
        this.firingSpeed = 800
        this.ammoMass = 150
        this.damageModifier = 1.25
        this.powerUpActiveTime = 30000

    }

    firingSpeedDown() {
        this.firingSpeed = 400
        this.ammoMass = 100
        this.damageModifier = 1
        this.powerUpActiveTime = 0
    }

    powerDown(powerUpType) {
        this.powerUpActiveTime = 0
        this.powerUpActive = false
        this.startCheck =  false
        switch(powerUpType) {
            case 'FiringSpeed':
                this.firingSpeed = 200
                this.powerUpType.pop()
                console.log(this.firingSpeed)
        }
    }

    checkPowerUpActiveTime(delta, powerUpType) {
        this.powerUpActiveTime -= delta
        if (this.powerUpActiveTime <= 0) {
            this.powerDown(this.powerUpType)
            console.log('Power Down')
        }
    }

    update(delta) {

        if (this.powerUpActiveTime > 0) {
            this.powerUpActiveTime -= delta
        }
        else {
            this.firingSpeedDown()
        }
        console.log(this.powerUpActiveTime)
        // this.circle.setPosition(this.x, this.y)
        // this.scene.physics.collide(this.rect, this.scene.enemies)
        // this.rect.setPosition(this.x, this.y)
        
    }
}