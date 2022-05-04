/* global Phaser */

new Phaser.Game({
  parent: 'parent',
  scene: {
    create: function () {
      this.add.text(0, 0, "Hello 🌎", { font: '72px sans-serif' });
    }
  }
});

/*
this.load.image('sky', 'assets/skies/space3.png');
this.load.image('logo', 'assets/sprites/phaser3-logo.png');
this.load.image('red', 'assets/particles/red.png');
*/