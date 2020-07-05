import Phaser from 'phaser';

class HeadsUpDisplay extends Phaser.Scene {
  constructor(game) {
    super({ key: "HeadsUpDisplay" });
    var game = game;

    var gameWidth;
    var background;
  }

  preload() {
    this.load.image('background', 'Assets/hudBackground.png');
    this.load.image('button', 'Assets/hudButton.png');
  }

  create() {
    var gameWidth = this.game.config.width
    var gameHeight = this.game.config.height

    // Set background color (on camera in scene)
    // this.cameras.main.setBackgroundColor('#D8DFEF')

    // Set up background image
    this.background = this.add.image(0,0, 'background').setOrigin(0);

    // set background to fill screen, and overflow on the smaller side
    this.background.displayWidth = gameWidth;

    // Set up map button
    var mapButton = this.add.sprite(this.background.displayWidth/2, 38,'button');
    mapButton.setScale(1.5);

    // other buttons
    var button1 = this.add.sprite(this.background.displayWidth-60, 0,'button').setOrigin(0);
    var button2 = this.add.sprite(this.background.displayWidth-120, 0,'button').setOrigin(0);
    var button3 = this.add.sprite(this.background.displayWidth-180, 0,'button').setOrigin(0);


    // text readouts
    var goldCount = this.add.text(10, 10).setText('0 Gold').setScrollFactor(0);
    goldCount.setShadow(1, 1, '#000000', 2);
  }

  resize() {
    this.background.displayWidth = this.game.config.width;
  }

}

export default HeadsUpDisplay;
