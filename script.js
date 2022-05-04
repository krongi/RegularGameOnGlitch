/* global Phaser */

const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  }
};

function preload() {
  this.load.image('sky', 'https://cdn.glitch.global/5d1bb0e8-5e80-4014-a526-5d6763e0b6a5/phaser1.png?v=1651689794274');
  this.load.image('logo', '/phaser3-logo.png');
  this.load.image('red', '/red.png');
}

function create() {  
  this.add.image(400, 300, 'sky');

  const particles = this.add.particles('red');

  const emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  const logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}

function update() {
}

new Phaser.Game(gameConfig);