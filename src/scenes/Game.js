import Phaser from "../lib/phaser.js";
import Bullet from "../myLib/Bullet.js";
import Tree from "../myLib/Tree.js";
import Resource from "../myLib/Resource.js";
import Mountain from "../myLib/Mountain.js"
import Player from "../myLib/Player.js";
import Enemy from "../myLib/Enemy.js";
import EnemyBullet from "../myLib/EnemyBullet.js"
import resourcer from "../myLib/functions.js"
import WorldFeature from "../myLib/WorldFeature.js";
import MyBullet from "../myLib/MyBullet.js";


// hardware
let mousePointer;

// projectiles
let bullet;
let myBullet;

// groups
let bullets;
let myBullets;
let enemyBullets;
let enemies;
let enemyBullet;
let mountains
let resources;
let trees
let worldFeatures;
let worldFeature;
let onScreenDPad


//sprites and images
let tree;
let player;
let companion;
let mountain;
let enemy;
let mountainImage;
let treeImage;

// MISC
let checkTime = 0
let placeText;
let shootingDistance;
let companionArea;
let startFiringListener;
let stopFiringListener
let enemyStopped
let target
let playerThis
let angleIncrementCounter = 0
let deadMessage


export default class Game extends Phaser.Scene {
    
        constructor() {
        super('game');
    }

    preload() {

        /**Load images and other assets to be used by this scene */
        this.load.spritesheet('blueRocketGuy', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/blueRocketGuy.png?v=1721074668968', {frameWidth:32, frameHeight: 32})
        this.load.spritesheet('redSoldier', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/redSoldiers.png?v=1721074671398', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('blueSoldier', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/blueSoldiers.png?v=1721074669238', {frameWidth: 64, frameHeight: 64});
        this.load.atlas('laser', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/lasers.png?v=1721074670922', '../assets/lasers.json');
        this.load.atlas('worldTilesAtlas', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/worldTiles.png?v=1721074672161', '../assets/worldTiles.json');
        this.load.atlas('bullets', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/lasers.png?v=1721074670922', '../assets/lasers.json');
        this.load.spritesheet('worldTiles', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/worldTiles.png?v=1721074672161', {frameWidth: 64, frameHeight: 64})
        this.load.image('laser1','https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/laser1.png?v=1721074670167');
        this.treeImage = this.load.image('tree', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/tree.png?v=1721074671589');
        this.mountainImage = this.load.image('mountain', 'https://cdn.glitch.global/d25e47bc-9024-4ce3-bedc-f6a5f1430702/mountain.png?v=1721074671154');
        this.load.image('dpad', '/assets/onScreenDPad.png')
        this.load.image('arrowButton', '/assets/onScreenArrow.png')

    }
        
    create() {

        // Create animations for sprites etc
        this.anims.create({
            delay: 0,
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('blueRocketGuy', {
                start: 4,
                end: 6,
                first: 4,
            }),
            key: 'blueRocketAnimationStill',
            repeat: -1,
            yoyo: true,
        })

        this.anims.create({
            delay: 0,
            defaultTextureKey: 'blueRocketGuy',
            duration: -1,
            frameRate: 18,
            frames: [0, 4],
            key: 'blueRocketAnimationUp',
            repeat: -1,
            yoyo: true,
        })

        this.anims.create({
            delay: 0,
            defaultTextureKey: 'blueRocketGuy',
            duration: -1,
            frameRate: 18,
            frames: [1, 4],
            key: 'blueRocketAnimationDown',
            repeat: -1,
            yoyo: true,
        })

        this.anims.create({
            delay: 0,
            defaultTextureKey: 'blueRocketGuy',
            duration: -1,
            frameRate: 18,
            frames: [2, 4],
            key: 'blueRocketAnimationLeft',
            repeat: -1,
            yoyo: true,
        })

        this.anims.create({
            delay: 0,
            defaultTextureKey: 'blueRocketGuy',
            duration: -1,
            frameRate: 18,
            frames: [3, 4],
            key: 'blueRocketAnimationRight',
            repeat: -1,
            yoyo: true,
        })

        /* On Screen control stuff here */

        onScreenDPad = this.add.image(0, 0, 'dpad')
        onScreenDPad.body = new Phaser.Physics.Arcade.Body(this.physics.world, onScreenDPad)
        onScreenDPad.setActive()
        
        let up = new Phaser.Geom.Rectangle(0, 0, 30, 30)
        

        /* Add the inputs for the game here. Currently will only be using certain keys and 
        some mouse */
        this.mousePointer = this.input.activePointer;
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        /* Add tile sprites to game for background etc*/
        this.add.tileSprite(800, 800, 2400, 2400, 'worldTiles', 15).setOrigin(0.5, 0.5);
        this.add.tileSprite(800, 800, 1600, 1600, 'worldTiles', 6).setOrigin(0.5, 0.5);

        /* Create groups for certain game objects*/
        bullets = this.physics.add.staticGroup({
            classType: Bullet,
            defaultFrame: 'laser1',
            runChildUpdate: true,    
        })

        myBullets = this.physics.add.staticGroup({
            defaultFrame: 'laser1',
            active: true,
            classType: MyBullet,
            runChildUpdate: true, 
               
        })
        
        enemyBullets = this.physics.add.staticGroup({
            defaultFrame: 'laser1',
            active: true,
            classType: EnemyBullet,
            runChildUpdate: true,
        })

        this.enemies = this.physics.add.group({
            classType: Enemy,
            active: true,
            setActive: true,
            runChildUpdate: true
        })

        worldFeatures = this.add.group({
            classType: WorldFeature,
            active: true,
            setVisible: true,
            

        })
        
        resources = this.add.group({
                active: false,
                setVisible: false,
                classType: Resource,
                setDepth: -1                
        })

        mountains = this.physics.add.staticGroup({
            classType: Mountain,
            active: true,
        })  

        trees = this.physics.add.staticGroup({
            classType: Tree,
            active: true,
        })
        this.dpad = 
        /**Create and activate player */
        this.player = new Player(this, Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400), 'redSoldier');
        this.player.setActive(true).setVisible(true).setInteractive()
        
        /**Populate map with collidable objects that will hold resources later */
        for (let x = 0; x < 75; x++) {
            mountain = mountains.get(Phaser.Math.Between(40, 1400), Phaser.Math.Between(40, 1400))
            mountain.name = mountain.imageKey + x.toString
            mountain.setMass(200)
            mountain.body.isCircle = true
            mountain.getName()
            mountain.worldFeatureType = 'mountain'
            mountain.resourceType = 'stone'
            mountain.on('destroy', this.resourceAdder)


            tree = trees.get(Phaser.Math.Between(40, 1400), Phaser.Math.Between(40, 1400))
            tree.name = tree.imageKey + x.toString
            tree.setMass(200)
            tree.body.isCircle = true
            tree.getName()
            tree.worldFeatureType = 'tree'
            tree.resourceType = 'wood'
            tree.on('destroy', this.resourceAdder)

            worldFeatures.add(mountain)
            worldFeatures.add(tree)
            
        }   
        /**Create enemies */ 
        for (let x = 0; x < 10; x++) {
            enemy = new Enemy(this, Phaser.Math.Between(1300, 1400), Phaser.Math.Between(1300, 1400),'blueSoldier', resources, this.player)
            enemy.target = this.player
            enemy.setName("Enemy" + x.toString())
            enemy.advance(this.player)
            enemy.setActive(true).setVisible(true).setInteractive()
            this.enemies.add(enemy)
            
            
        }
        // this.player.setData(resourceType, resourceAmount)
        /* Create the companion object. He just follows player around*/
        companion = this.physics.add.sprite(200, 300, 'blueRocketGuy', 4)
            .setVisible(true)
            .setName('Casper')
            .setActive(true)
            .setInteractive()
        companion.body.setCircle(10, 6, 6)

        

        /* Set main camera to center on and follow the player*/
        this.cameras.main.centerOn(this.player.x, this.player.y);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setDeadzone(200, 100)


        this.physics.add.collider(this.player, resources, function (player, resource) {
            resource.setResource
            resource._resourceType = resource.resourceType
            player.incData(resource.resourceType, 25)
            console.log(player.data.get(resource.resourceType))
            console.log(resources.contains(resource.name))
            resource.setActive(false)
            resource.setDepth(-1)
            resource.body.destroy()

        })
        
        /* Add colliders for game objects*/
    
        this.physics.add.collider(this.player, worldFeatures, function (player, worldFeature) {
            
        });

        this.physics.add.collider(this.enemies, resources, function (enemy, resource) {

        });

        
        this.physics.add.collider(this.enemies, worldFeatures, function (enemy, worldFeature) {
            
        });

        this.physics.add.collider(this.enemies, bullets, function(enemy, bullet){
            enemy.destroy()
            bullet.destroy()
            
        })

        this.physics.add.collider(this.player, enemyBullets, function (player = this.player, enemyBullet) {
            player.healthDown(10)
            enemyBullet.destroy()
        })
        this.physics.add.collider(this.enemies, worldFeatures, function(enemy, worldFeature){
            
        })
        
        this.physics.add.collider(myBullets, worldFeatures, function (myBullet, worldFeature) {
            myBullet.destroy()
            worldFeature.destroy()

        })

        this.physics.add.collider(worldFeatures, enemyBullets, function(worldFeature, enemyBullet){
            enemyBullet.destroy()
        })

        this.physics.collide(worldFeatures)

        /**Add some generic colliders */
        this.physics.add.collider(companion, worldFeatures)
        this.physics.add.collider(this.enemies)
        this.physics.add.collider(trees, mountains)
        
        this.events.on('worldFeatureDestroyed', function() {
            console.log(worldFeature.name)
        })
       
        /* Create animations and text objects for game*/
        this.anims.play('blueRocketAnimationStill', companion)

        /**Create rectangle that will follow player so companion will follow */
        this.companionArea = new Phaser.Geom.Rectangle(this.player.x - 60, this.player.y - 60, 40, 40)
         
        /**Create the "HUD" and the on death message, the on death message is
         * set below everything else, it will be displayed on death */
        this.placeText = this.add.text(10, 10, 'Health ' + this.player.getData('health') + "\n" + 'Magic ' + this.player.getData('magic')  + ' Gold ' + this.player.getData('gold') + '\n' + 'Wood ' + this.player.getData('wood') + '   ' + 'Stone ' + this.player.getData('stone'))
            .setScrollFactor(0,0)
            .setBackgroundColor('black')
            .setColor('grey')
            .setScale(1.5, 1.5)
            .setDepth(10)

            
        this.deadMessage = this.add.text(this.cameras.main.x, this.cameras.main.y, "  YOU'RE DEAD  ")
            .setScrollFactor(0,0)
            .setBackgroundColor('black')
            .setColor('red')
            .setScale(5)
            .setDepth(-1)
    }
    
    update(time, delta) {
        /**Ensure companion area fallows player around */
        
        worldFeatures.on('destroyed', function(worldFeature){
            let resCenter = worldFeature.getCenter()
            let resAdded = this.resources.get(resCenter.x, resCenter.y, 'mountain')
            resAdded.setActive(true)
            resAdded.setVisible(true)
            resAdded.body.isCircle = true
        })

        this.companionArea.setPosition(this.player.getCenter().x, this.player.getCenter().y)
        
        /**Update the "HUD" on the screen with relevant info*/
        if (this.player.isAlive) {
            this.placeText.destroy()
            this.placeText = this.add.text(0, 0, 'Health ' + this.player.getData('health') + "\n" + 'Magic ' + this.player.getData('magic')  + ' Gold ' + this.player.getData('gold')
             + '\n' + 'Wood ' + this.player.getData('wood') + '   ' + 'Stone ' + this.player.getData('stone'))
            .setScrollFactor(0,0)
            .setBackgroundColor('black')
            .setColor('grey')
            .setScale(1.5, 1.5)
            .setDepth(10)
        }
        
        /** Check if enemies are in range, stop and fire if so */
        let inRange = false
        this.enemies.children.each(function enemiesLocationCheck(enemy) {
            let playerCurrentLocation = this.player.position
            let enemyCurrentLocation = enemy.position
            let xdiff = Math.abs(enemy.x) - Math.abs(this.player.x)
            let ydiff = Math.abs(enemy.y) - Math.abs(this.player.y)
            if (Math.abs(xdiff) < 300 && Math.abs(ydiff) < 300) {
                // console.log(enemy.name + ' is in range...')
                inRange = true
            }
            if (inRange == true) {
                    if (checkTime < 1500) {
                        checkTime += delta;
                    }
                    else {
                    enemyBullet = enemyBullets.get()
                    if (enemyBullet) {
                        angleIncrementCounter += 0.1
                        // enemyBullet.mouseX = this.player.x;
                        // enemyBullet.mouseY = this.player.y;
                        enemyBullet.body.setMass(100);
                        enemyBullet.fire(enemy.getCenter(), this.player.getCenter(), angleIncrementCounter);
                        if (angleIncrementCounter < 1) {
                            angleIncrementCounter = 0
                        }
                        }
                    checkTime = 0;
                    
                }
            }
            else {
                inRange = false
            }
            
        }, this)
        
        /** Check if companion is in the area (follows player), if not move to the area */
        if (this.companionArea.contains(companion.x, companion.y)) {
            companion.setVelocity(0,0)
        }
        else {
            this.physics.moveTo(companion, this.player.x - 30, this.player.y - 30, 180)
        }
        
        /** Ensure player is actually alive and part of scene before taking input
         * to move him, kept getting crashes due to the player being destoryed and
         * scene trying to set velocity to  0
         */
        if (!this.player.isAlive) {
            this.placeText.destroy()
            this.deadMessage.setDepth(10)
            this.player.destroy()
            this.scene.pause()
        }
        else {
            if (this.w.isDown) {
                this.player.setVelocityY(-200);
                this.player.setFrame(1);
            }        
            else if (this.s.isDown) {
                this.player.setVelocityY(200);
                this.player.setFrame(3);
            }
            else if (this.d.isDown) {
                this.player.setVelocityX(200);
                this.player.setFrame(2);
            }
            else if (this.a.isDown) {
                this.player.setVelocityX(-200);
                this.player.setFrame(0);
            }
            else {
                this.player.setVelocity(0, 0);
            }
        }
        if (this.mousePointer.isDown && this.player.isAlive) {
            
            if (checkTime < 500) {
                checkTime += delta;
            }
            else {
            myBullet = myBullets.get()
            if (myBullet) {
                myBullet.on('destroy', MyBullet.whenDestroyed)
                let mouseVector = new Phaser.Math.Vector2(this.mousePointer.worldX, this.mousePointer.worldY)
                myBullet.body.setMass(100);
                myBullet.fire(this.player.getCenter(), mouseVector);  
                }
            checkTime = 0;
            }
        }                
    }
 
    resourceAdder(resource) {
        let curtime = new Phaser.Math.RandomDataGenerator()
        let tstamp = curtime.uuid()
        let reType = resource.resourceType
        let name = reType + "-" + tstamp
        let resCenter = resource.getCenter()
        let resAdded = resources.get(resCenter.x, resCenter.y, resource.worldFeatureType, resource.resourceType, resource.resourceAmount)
        resAdded.setInteractive()
        resAdded.setActive(true)
        resAdded.setVisible(true)
        resAdded.body.isCircle = true
        resAdded.resourceType = resource.resourceType
        resAdded.resourceAmount = 25
        resAdded.name = name

    }

}
