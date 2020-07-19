// guide for making a menu in phaser https://www.youtube.com/watch?v=OS7neDUUhPE

import Phaser from 'phaser';

let HUDdata;
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
  }

  create() {

    // set up use of data from HUD scene
    HUDdata = this.scene.get("HeadsUpDisplay").data;

    this.add.image(0, 0, 'shop').setOrigin(0).setDepth(0);
    let sign20L = this.add.sprite(280, 100, '20sign').setOrigin(0).setDepth(1).setInteractive();
    let sign20R = this.add.sprite(1480, 100, '20sign').setOrigin(0).setDepth(1).setInteractive();

    let sign50 = this.add.sprite(1080, 0, '50sign').setOrigin(0).setDepth(1).setInteractive();
    let freesignL = this.add.sprite(580, 330, 'freesign').setOrigin(0).setDepth(1).setInteractive();
    let freesignR = this.add.sprite(690, 240, 'freesign').setOrigin(0).setDepth(1).setInteractive();
    let sign1M = this.add.sprite(1110, 310, '1Msign').setOrigin(0).setDepth(1).setInteractive();

    // sign onclick functions
    sign20L.on('pointerdown', function () {
      this.setScale(0.97);
    });
    sign20L.on('pointerout', function () {
      this.setScale(1);
    });
    sign20L.on('pointerup', function () {
      sign20L.setScale(1);
      this.scene.wake("Shelf");

    }, this);

    sign20R.on('pointerdown', function () {
      this.setScale(0.97);
    });
    sign20R.on('pointerout', function () {
      this.setScale(1);
    });
    sign20R.on('pointerup', function () {
      this.setScale(1);
    });

    sign50.on('pointerdown', function () {
      this.setScale(0.97);
    });
    sign50.on('pointerout', function () {
      this.setScale(1);
    });
    sign50.on('pointerup', function () {
      this.setScale(1);
    });

    freesignL.on('pointerdown', function () {
      this.setScale(0.97);
    });
    freesignL.on('pointerout', function () {
      this.setScale(1);
    });
    freesignL.on('pointerup', function () {
      this.setScale(1);
    });

    freesignR.on('pointerdown', function () {
      this.setScale(0.97);
    });
    freesignR.on('pointerout', function () {
      this.setScale(1);
    });
    freesignR.on('pointerup', function () {
      this.setScale(1);
    });

    sign1M.on('pointerdown', function () {
      this.setScale(0.97);
    });
    sign1M.on('pointerout', function () {
      this.setScale(1);
    });
    sign1M.on('pointerup', function () {
      this.setScale(1);
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

    this.scene.sleep("Shop");
  }

  update(time, delta) {
    controls.update(delta);
  }
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

// class Potion extends Phaser.Scene {
//   constructor() {
//     super({ key: "Potion" });
//   }

//   index = 0;

//   preload() {
//     this.load.image('potionred', 'assets/potion.png');
//     this.load.image('potionblue', 'assets/potionblue.png');
//     this.load.image('potiongreen', 'assets/potiongreen.png');
//     this.load.image('potionpurple', 'assets/potionpurple.png');
//     this.load.image('arrowright', 'assets/arrow.png');
//     this.load.image('arrowleft', 'assets/arrowleft.png');
//     this.load.image('buybutton', 'assets/buybutton.png');
//     this.load.image('closeButton', 'assets/menuClose.png');
//     this.load.image('shopMenuBox', 'assets/shopMenuBox.png');
//   }

//   create() {
//     var bg = this.add.image(0, 0, "shopMenuBox").setOrigin(0);
//     this.cameras.main.setViewport(this.game.config.width / 2 - Potion.WIDTH / 1.75, this.game.config.height / 2 - Potion.HEIGHT / 5, Potion.WIDTH, Potion.HEIGHT);
//     let price = this.add.text(Potion.WIDTH / 1.85, 65, "20g", { color: "white", fontSize: "24px" });
//     let arrowright = this.add.image(Potion.WIDTH - 65, Potion.HEIGHT / 1.35, 'arrowright').setScale(0.15).setInteractive();
//     let arrowleft = this.add.image(145, Potion.HEIGHT / 1.35, 'arrowleft').setScale(0.15).setInteractive();
//     let potion = this.add.image(Potion.WIDTH / 1.75, Potion.HEIGHT / 2, 'potionred').setScale(0.35);
//     let buybutton = this.add.image(Potion.WIDTH / 1.7, Potion.HEIGHT / 1.35, 'buybutton').setScale(0.2).setInteractive();
//     let closeButton = this.add.image(110, 70, 'closeButton').setScale(0.1).setInteractive();

//     // enable data on potion
//     potion.setDataEnabled();
//     // initiailize potion data with first sprite, in this case the red potion
//     potion.data.set('price', 20);

//     arrowright.on('pointerdown', function () {
//       this.setScale(0.13);
//     });
//     arrowright.on('pointerout', function () {
//       this.setScale(0.15);
//     });
//     arrowright.on('pointerup', function () {
//       this.setScale(0.15);
//     });
//     arrowright.on('pointerup', function () {
//       this.updateSprite('up', potion, price);
//     }, this);

//     arrowleft.on('pointerdown', function () {
//       this.setScale(0.13);
//     });
//     arrowleft.on('pointerout', function () {
//       this.setScale(0.15);
//     });
//     arrowleft.on('pointerup', function () {
//       this.setScale(0.15);
//     });
//     arrowleft.on('pointerup', function () {
//       this.updateSprite('down', potion, price);
//     }, this);

//     buybutton.on('pointerdown', function () {
//       this.setScale(0.18);
//     });
//     buybutton.on('pointerout', function () {
//       this.setScale(0.2);
//     });
//     buybutton.on('pointerup', function () {
//       this.setScale(0.2);
//     });
//     buybutton.on('pointerup', function () {
//       this.handleBuy(potion);
//     }, this);

//     closeButton.on('pointerdown', function () {
//       this.setScale(0.08);
//     });
//     closeButton.on('pointerout', function () {
//       this.setScale(0.1);
//     });
//     closeButton.on('pointerup', function () {
//       this.setScale(0.1);
//     });
//     closeButton.on('pointerup', function () {
//       this.scene.sleep("Potion");
//     }, this);
//     this.scene.sleep("Potion");
//   }

//   // this funtion takes a direction to increment, current index, and an image object as input
//   // cycles through images based on direction to increment
//   updateSprite(dir, potion, price) {
//     if (dir === 'up') {
//       if (this.index === 3) {
//         this.index = 0;
//       }
//       else {
//         this.index++;
//       }
//     }
//     else {
//       if (this.index === 0) {
//         this.index = 3;
//       }
//       else {
//         this.index--;
//       }
//     }
//     switch (this.index) {
//       case 0:
//         potion.setTexture('potionred');
//         break;
//       case 1:
//         potion.setTexture('potionblue');
//         break;
//       case 2:
//         potion.setTexture('potionpurple');
//         break;
//       case 3:
//         potion.setTexture('potiongreen');
//         break;
//       default:
//         return;
//     }
//     this.updateData(potion);
//     price.setText(potion.data.get('price'));
//   }

//   updateData(potion) {
//     switch (potion.frame.texture.key) {
//       case 'potionred':
//         potion.data.set('price', 20);
//         break;
//       case 'potionblue':
//         potion.data.set('price', 25);
//         break;
//       case 'potionpurple':
//         potion.data.set('price', 50);
//         break;
//       case 'potiongreen':
//         potion.data.set('price', 100);
//         break;
//       default:
//         return;
//     }
//   }

//   handleBuy(potion) {
//     let gold = HUDdata.get('gold');
//     if (gold > potion.data.get('price')) {
//       HUDdata.set('gold', gold - potion.data.get('price'));
//       // console.log('you spent ' + potion.data.get('price') + ' and now you have ' + HUDdata.get('gold') + ' gold');
//     }
//     else {
//       console.log('not enough money');
//     }
//   }

// }

// Potion.WIDTH = 400;
// Potion.HEIGHT = 300;

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////


// the following was adapted from https://codepen.io/rexrainbow/pen/YMyBom?editors=0010

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Shelf extends Phaser.Scene {
  constructor() {
    super({
      key: 'Shelf'
    })
  }

  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
    this.load.image('shopMenuBox', 'Assets/shopMenuBox.png');
    this.load.image('potionred', 'Assets/potion.png');
    this.load.image('potionblue', 'Assets/potionblue.png');
    this.load.image('potiongreen', 'Assets/potiongreen.png');
    this.load.image('potionpurple', 'Assets/potionpurple.png');

  }

  create() {
    const data = {
      potions1: [
        {
          name: 'Red',
          price: 20
        },
        {
          name: 'Blue',
          price: 50
        },
        {
          name: 'Green',
          price: 75
        },
        {
          name: 'Purple',
          price: 100
        }
      ],
      potions2: [
        {
          name: 'Red',
          price: 20
        },
        {
          name: 'Blue',
          price: 50
        },
        {
          name: 'Green',
          price: 75
        },
        {
          name: 'Purple',
          price: 100
        },
        {
          name: 'Red',
          price: 120
        },
        {
          name: 'Blue',
          price: 150
        },
        {
          name: 'Green',
          price: 175
        },
        {
          name: 'Purple',
          price: 200
        },
        {
          name: 'Red',
          price: 220
        },
        {
          name: 'Blue',
          price: 250
        },
        {
          name: 'Green',
          price: 275
        },
        {
          name: 'Purple',
          price: 300
        }
      ],

    };

    this.print = this.add.text(0, 0, '');
    var scrollablePanel = this.rexUI.add.scrollablePanel({
      x: 400,
      y: 300,
      width: 400,
      height: 220,

      scrollMode: 1,

      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

      panel: {
        child: createPanel(this, data),

        mask: {
          padding: 1
        },
      },

      slider: {
        track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
      },

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,

        panel: 10,
      }
    })
      .layout()

    // Set icon interactive
    var print = this.add.text(0, 0, '');
    this.input.topOnly = false;
    var labels = [];
    labels.push(...scrollablePanel.getElement('#potions1.items', true));
    labels.push(...scrollablePanel.getElement('#potions2.items', true));
    var scene = this;
    labels.forEach(function (label) {
      if (!label) {
        return;
      }

      var click = scene.rexUI.add.click(label.getElement('icon'), { threshold: 10 })
        .on('click', function () {
          if (!label.getTopmostSizer().isInTouching()) {
            return;
          }
          handleBuy(label.getElement('icon').data.get('price'));
          // console.log(label.getElement('icon').data.get('price'));
        });
    })

    this.scene.sleep("Shelf");

  }

  update() { }
}

var createPanel = function (scene, data) {
  var sizer = scene.rexUI.add.sizer({
    orientation: 'x',
    space: { item: 10 }
  })
    .add(
      createHeader(scene, data), // child
      { expand: true }
    )
    .add(
      createTable(scene, data, 'potions1', 1), // child
      { expand: true }
    )
    .add(
      createTable(scene, data, 'potions2', 2), // child
      { expand: true }
    )
  return sizer;
}

var createHeader = function (scene, data) {
  var title = scene.rexUI.add.label({
    orientation: 'x',
    text: scene.add.text(0, 0, 'Character'),
  });
  var header = scene.rexUI.add.label({
    orientation: 'y',
    icon: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 5, COLOR_LIGHT),
    text: scene.add.text(0, 0, data.name),

    space: { icon: 10 }
  });

  return scene.rexUI.add.sizer({
    orientation: 'y',
    space: { left: 5, right: 5, top: 5, bottom: 5, item: 10 }
  })
    .addBackground(
      scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
    )
    .add(
      title, // child
      { expand: true, align: 'left' }
    )
    .add(header, // child
      { proportion: 1, expand: true }
    );
};

var createTable = function (scene, data, key, rows) {
  var capKey = key.charAt(0).toUpperCase() + key.slice(1);
  var title = scene.rexUI.add.label({
    orientation: 'x',
    text: scene.add.text(0, 0, capKey),
  });

  var items = data[key];
  var columns = Math.ceil(items.length / rows);
  var table = scene.rexUI.add.gridSizer({
    column: columns,
    row: rows,

    rowProportions: 1,
    space: { column: 10, row: 10 },
    name: key  // Search this name to get table back
  });

  var item, r, c;
  var iconSize = (rows === 1) ? 80 : 40;
  for (var i = 0, cnt = items.length; i < cnt; i++) {
    item = items[i];
    r = i % rows;
    c = (i - r) / rows;
    table.add(
      createIcon(scene, item),
      c,
      r,
      'top',
      0,
      true
    );
  }

  return scene.rexUI.add.sizer({
    orientation: 'y',
    space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
  })
    .addBackground(
      scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
    )
    .add(
      title, // child
      0, // proportion
      'left', // align
      0, // paddingConfig
      true // expand
    )
    .add(table, // child
      1, // proportion
      'center', // align
      0, // paddingConfig
      true // expand
    );
}

var createIcon = function (scene, item) {
  let icon;
  switch (item.name) {
    case 'Red':
      icon = scene.add.image(0, 0, 'potionred').setScale(0.12);
      break;
    case 'Blue':
      icon = scene.add.image(0, 0, 'potionblue').setScale(0.12);
      break;
    case 'Purple':
      icon = scene.add.image(0, 0, 'potionpurple').setScale(0.12);
      break;
    case 'Green':
      icon = scene.add.image(0, 0, 'potiongreen').setScale(0.12);
      break;
    default:
      return;
  }

  icon.setDataEnabled();
  icon.data.set('price', item.price);

  var label = scene.rexUI.add.label({
    orientation: 'y',
    icon: icon,
    text: scene.add.text(0, 0, item.name),

    space: { icon: 3 }
  });

  return label;
};

function handleBuy(price) {
  let gold = HUDdata.get('gold');
  if (gold > price) {
    HUDdata.set('gold', gold - price);
    // console.log('you spent ' + potion.data.get('price') + ' and now you have ' + HUDdata.get('gold') + ' gold');
  }
  else {
    console.log('not enough money');
  }
}

export { Shop, Shelf };
