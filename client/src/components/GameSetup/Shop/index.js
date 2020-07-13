// guide for making a menu in phaser https://www.youtube.com/watch?v=OS7neDUUhPE

import Phaser from 'phaser';
import ShopMenu from '../../../ui/ShopMenu';

let controls;
class Shop extends Phaser.Scene {
  constructor() {
    super({ key: "Shop" });
    this.shopMenu = undefined;
  }

  preload() {
    this.load.image('shop', 'assets/shop.jpg');
    this.load.image('20sign', 'assets/shop20sign.jpg');
    this.load.image('50sign', 'assets/shop50sign.jpg');
    this.load.image('freesign', 'assets/shopfreesign.jpg');
    this.load.image('1Msign', 'assets/shop1Msign.jpg');
    this.load.image('shopMenuBox', 'assets/shopMenuBox.png');
  }

  create() {
    this.add.image(0, 0, 'shop').setOrigin(0).setDepth(0);
    let sign20L = this.add.sprite(280, 100, '20sign').setOrigin(0).setDepth(1).setInteractive();
    let sign20R = this.add.sprite(1480, 100, '20sign').setOrigin(0).setDepth(1).setInteractive();

    let sign50 = this.add.sprite(1080, 0, '50sign').setOrigin(0).setDepth(1).setInteractive();
    let freesignL = this.add.sprite(580, 330, 'freesign').setOrigin(0).setDepth(1).setInteractive();
    let freesignR = this.add.sprite(690, 240, 'freesign').setOrigin(0).setDepth(1).setInteractive();
    let sign1M = this.add.sprite(1110, 310, '1Msign').setOrigin(0).setDepth(1).setInteractive();
    // let shopMenuBox = this.add.sprite(75, 800, 'shopMenuBox').setOrigin(0).setDepth(1).setScale(2);


    // function setShopText(value) {
    //   let shopText = this.add.text(300, 100, value, { font: '24px Courier', fill: '#00ff00' })
    // }
    // const shopMenu = this.shopMenu = this.createShopMenu(550, 1000, "Welcome!").setDepth(2);

    // sign onclick functions
    sign20L.on('pointerdown', function () {
      this.setScale(0.97);
    });
    sign20L.on('pointerout', function () {
      this.setScale(1);
    });
    sign20L.on('pointerup', function() {
      sign20L.setScale(1);
      // Shop.shopMenu("sign20L");
      // let shopText = this.add.text(300, 100, "sign20L", { font: '24px Courier', fill: '#00ff00' })
      // shopMenu.setText("You clicked sign20L!");
      this.createShopMenu(Potion);

    }, this);

    sign20R.on('pointerdown', function () {
      this.setScale(0.97);
    });
    sign20R.on('pointerout', function () {
      this.setScale(1);
    });
    sign20R.on('pointerup', function () {
      this.setScale(1);
      // shopMenu.setText("You clicked sign20R!");

    });

    sign50.on('pointerdown', function () {
      this.setScale(0.97);
    });
    sign50.on('pointerout', function () {
      this.setScale(1);
    });
    sign50.on('pointerup', function () {
      this.setScale(1);
      // shopMenu.setText("You clicked sign50!");
    });

    freesignL.on('pointerdown', function () {
      this.setScale(0.97);
    });
    freesignL.on('pointerout', function () {
      this.setScale(1);
    });
    freesignL.on('pointerup', function () {
      this.setScale(1);
      // shopMenu.setText("You clicked freesignL!");
    });

    freesignR.on('pointerdown', function () {
      this.setScale(0.97);
    });
    freesignR.on('pointerout', function () {
      this.setScale(1);
    });
    freesignR.on('pointerup', function () {
      this.setScale(1);
      // shopMenu.setText("You clicked freesignR!");
    });

    sign1M.on('pointerdown', function () {
      this.setScale(0.97);
    });
    sign1M.on('pointerout', function () {
      this.setScale(1);
    });
    sign1M.on('pointerup', function () {
      this.setScale(1);
      // shopMenu.setText("You clicked sign1M!");
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

  createShopMenu(func)
  {
    // const style = { fontSize: '64px', color: '#fff' }
    // const menu = new ShopMenu(this, x, y, value, style)
    var handle = func.NAME;
    // this.add.existing(menu);
    // return menu;
    var win = this.add.zone(550, 800, func.WIDTH, func.HEIGHT).setOrigin(0);
    var demo = new func(win);
    this.scene.add(handle, demo, true)
  }

  update(time, delta) {
    controls.update(delta);
  }
}

class Potion extends Phaser.Scene {
  constructor(handle, parent)
  {
    super(handle);
    this.parent = parent;
  }

  index = 0;

  preload() {
    this.load.image('potionred', 'assets/potion.png');
    this.load.image('potionblue', 'assets/potionblue.png');
    this.load.image('potiongreen', 'assets/potiongreen.png');
    this.load.image('potionpurple', 'assets/potionpurple.png');
    this.load.image('arrowright', 'assets/arrow.png');
    this.load.image('arrowleft', 'assets/arrowleft.png');
    // this.load.spritesheet('diamonds', '/assets/diamonds32x24x5.png');
  }

  create() 
  {
    var bg = this.add.image(0, 0, "shopMenuBox").setOrigin(0);
    this.cameras.main.setViewport(this.game.config.width/2 - Potion.WIDTH/1.75, this.game.config.height/2 - Potion.HEIGHT/5, Potion.WIDTH, Potion.HEIGHT);
    this.add.text(90,50,"Potions HERE!", {color: "white", fontSize: "30px"});
    let arrowright = this.add.image(Potion.WIDTH-65, Potion.HEIGHT/1.35, 'arrowright').setScale(0.15).setInteractive();
    let arrowleft = this.add.image(145, Potion.HEIGHT/1.35, 'arrowleft').setScale(0.15).setInteractive();
    let potion = this.add.image(Potion.WIDTH/1.75, Potion.HEIGHT/2, 'potionred').setScale(0.35);


    arrowright.on('pointerdown', function () {
      this.setScale(0.13);
    });
    arrowright.on('pointerout', function () {
      this.setScale(0.15);
    });
    arrowright.on('pointerup', function () {
      this.setScale(0.15);
    });
    arrowright.on('pointerup', function () {
      this.updateSprite('up', potion);
    }, this);

    arrowleft.on('pointerdown', function () {
      this.setScale(0.13);
    });
    arrowleft.on('pointerout', function () {
      this.setScale(0.15);
    });
    arrowleft.on('pointerup', function () {
      this.setScale(0.15);
    });
    arrowleft.on('pointerup', function () {
      this.updateSprite('down', potion);
    }, this);

  }

  // this funtion takes a direction to increment, current index, and an image object as input
  // cycles through images based on direction to increment
  updateSprite(dir, potion) {
    if (dir === 'up') {
      if (this.index === 3) {
        this.index = 0;
      }
      else {
        this.index++;
      }
    }
    else {
      if (this.index === 0) {
        this.index = 3;
      }
      else {
        this.index--;
      }
    }
    console.log(this.index)
    switch (this.index) {
      case 0: 
        potion.setTexture('potionred');
        break;
      case 1:
        potion.setTexture('potionblue');
        break;
      case 2:
        potion.setTexture('potionpurple');
        break;
      case 3:
        potion.setTexture('potiongreen');
        break;
      default:
        return;
    }
  }

}

Potion.WIDTH = 400;
Potion.HEIGHT = 300;

export default Shop;
