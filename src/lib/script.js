/* global Phaser */

const gameConfig = {
  autoFocus: false,
  roundPixels: false,
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    parent: 'parent'
  },
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
  this.load.image('space', 'https://cdn.glitch.global/5d1bb0e8-5e80-4014-a526-5d6763e0b6a5/space2.png?v=1651689827462');
  this.load.image('logo', 'https://cdn.glitch.global/5d1bb0e8-5e80-4014-a526-5d6763e0b6a5/phaser1.png?v=1651689794274');
  this.load.image('yellow', 'https://cdn.glitch.global/5d1bb0e8-5e80-4014-a526-5d6763e0b6a5/yellow.png?v=1651689856507');
}

function create() {  
  this.add.image(400, 300, 'space');

  const emitter = this.add.particles(0, 0, 'yellow', {
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

document.getElementById('version').innerText = `Phaser v${Phaser.VERSION}`

new Phaser.Game(gameConfig);