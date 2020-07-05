// guide for making a menu in phaser https://www.youtube.com/watch?v=OS7neDUUhPE

import Phaser from 'phaser';
let controls;
class Shop extends Phaser.Scene {
  constructor() {
    super({ key: "Shop" });
  }

  preload() {
    this.load.image('shop', 'assets/shop.jpg');
    this.load.image('20sign', 'assets/shop20sign.jpg');
    this.load.image('50sign', 'assets/shop50sign.jpg');
    this.load.image('freesign', 'assets/shopfreesign.jpg');
    this.load.image('1Msign', 'assets/shop1Msign.jpg');
  }

  create() {
    this.add.image(0, 0, 'shop').setOrigin(0).setDepth(0);
    let sign20L = this.add.sprite(280, 100, '20sign').setOrigin(0).setDepth(1).setInteractive();
    let sign20R = this.add.sprite(1480, 100, '20sign').setOrigin(0).setDepth(1).setInteractive();

    let sign50 = this.add.sprite(1080, 0, '50sign').setOrigin(0).setDepth(1).setInteractive();
    let freesignL = this.add.sprite(580, 330, 'freesign').setOrigin(0).setDepth(1).setInteractive();
    let freesignR = this.add.sprite(690, 240, 'freesign').setOrigin(0).setDepth(1).setInteractive();
    let sign1M = this.add.sprite(1110, 310, '1Msign').setOrigin(0).setDepth(1).setInteractive();

    // sign onclick functions
    sign20L.on('pointerup', function () {
      console.log("Clicked sign20L");
    });

    sign20R.on('pointerup', function () {
      console.log("Clicked sign20R");
    });

    sign50.on('pointerup', function () {
      console.log("Clicked sign50");
    });

    freesignL.on('pointerup', function () {
      console.log("Clicked freesignL");
    });

    freesignR.on('pointerup', function () {
      console.log("Clicked freesignR");
    });

    sign1M.on('pointerup', function () {
      console.log("Clicked sign1M");
    });

    this.cameras.main.setBounds(0, 0, 1920, 1600);
    this.cameras.main.setZoom(0.42);


    //  Camera controls
    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 0.75
    };
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

  }

  update(time, delta) {
    controls.update(delta);
  }
}

export default Shop;
