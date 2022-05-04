/* global Phaser */

new Phaser.Game({
  parent: 'parent',
  scene: {
    create: function () {
      this.add.text(0, 0, "Hello 🌎", { font: '72px sans-serif' });
    }
  }
})