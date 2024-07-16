import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";
import Bullet from "./Bullet.js";
import EnemyBullet from "./EnemyBullet.js";
import Resource from "./Resource.js";

let scene
let x
let y
let texture
let group
let anObject

export default function resourcer(scene, x, y, texture, group) {
    let single = new Resource(scene, x, y, texture)
    single.setActive(true)
    // group.get(Phaser.Math.Between(40, 1400), Phaser.Math.Between(40, 1400))
    single.setMass(50)
    single.setBodySize(single.width * 0.5, single.height * 0.5)
    single.body.setCircle(single.body.width * 0.5, single.body.height * 0.5)
    group.add(single)
    console.log(single)
    return single
}

export function test(anObject) {
    anObject.setMass(50)
}