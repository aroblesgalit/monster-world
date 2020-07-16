/*
================================================
    References / Tutorials
================================================

Demo including draging and animations - https://labs.phaser.io/edit.html?src=src/scenes/drag%20scenes%20demo.js&v=3.23.0
Getting Started with Scene Breakdown - https://www.youtube.com/watch?v=7cpZ5Y7THmo 
*/

import Phaser from 'phaser';

class ShowMap extends Phaser.Scene {
  constructor(game) {
    super({ key: "ShowMap" });
    var game = game;
    var text;
  }

  preload() {
    this.load.image('map', 'Assets/map.png');
    this.load.image('FarmOnMap', 'Assets/farmOnMap.png');
    this.load.image('DefaultOnMap', 'Assets/defaultOnMap.png');
    this.load.image('ShopOnMap', 'assets/potion.png');
  }

  create() {
    var cam = this.cameras.main;
    var gameWidth = this.game.config.width
    var gameHeight = this.game.config.height

    // Set up map image
    var map = this.add.image(0, 0, 'map').setOrigin(0);

    // Map Locations
    //===========================
    this.items = this.add.group([
      {
        key: "FarmOnMap",
        setXY: {
          x: 240,
          y: 950
        },
        setScale: {
          x: 0.13,
          y: 0.13
        }
      },
      {
        key: "DefaultOnMap",
        setXY: {
          x: 100,
          y: 50
        },
        setScale: {
          x: .5,
          y: .5
        }
      },
      {
        key: "ShopOnMap",
        setXY: {
          x: 440,
          y: 230
        },
        setScale: {
          x: 0.13,
          y: 0.13
        }
      },
    ]);

    this.items.setDepth(1);

    // Make Locations Buttons
    //===========================
    Phaser.Actions.Call(this.items.getChildren(), function (item) {
      // Make item interactive
      item.setInteractive();

      var HUD = this.scene.get('HeadsUpDisplay');
      var game = this.game;
      console.log(this.scene);
      item.on("pointerdown", function (pointer) {
        // close map
        HUD.triggerMap();

        var choseScene = item.texture.key.replace("OnMap","");

        //console.log(game.scene.scenes);
        // var list = game.scene.getScenes(true);
        // console.log(list);

        this.scene.scene.sleep('Farm');
        this.scene.scene.sleep('Shop');
        this.scene.scene.sleep('Default');
        this.scene.scene.sleep('FarmHUD');
        this.scene.scene.sleep('Potion');
        this.scene.scene.run(choseScene);
        console.log(this.scene.scene.get(choseScene));
        // this.scene.scene.bringToTop(choseScene);
        // this.scene.scene.bringToTop('HeadsUpDisplay');
        // this.scene.scene.bringToTop('ShowMap');
        


      })

    }, this);

    // blow up image to 4 times the original size
    map.setScale(4);

    // Set map to fill screen, and overflow on the smaller side
    // if (gameWidth > gameHeight) {
    //   map.displayWidth = gameWidth;
    //   map.displayHeight = map.height * map._scaleX;
    // }
    // else {
    //   map.displayHeight = gameHeight;
    //   map.displayWidth = map.width * map._scaleY;
    // }

    // Set up camera settings on scene
    cam.setBackgroundColor('#D8DFEF')
    cam.setBounds(0, 0, map.displayWidth, map.displayHeight);
    this.cameras.main.setViewport(gameWidth * .15, gameHeight * .15, gameWidth * .7, gameHeight * .7);
  }

  update() {
    var pointer = this.input.activePointer;
    var cam = this.cameras.main;

    if (pointer.isDown) {
      if (this.game.origDragPoint) {
        // move the camera by the amount the mouse has moved since last update
        this.cameras.main.scrollX +=
          this.game.origDragPoint.x - this.game.input.activePointer.position.x;
        this.cameras.main.scrollY +=
          this.game.origDragPoint.y - this.game.input.activePointer.position.y;
      } // set new drag origin to current position
      this.game.origDragPoint = this.game.input.activePointer.position.clone();
    } else {
      this.game.origDragPoint = null;
    }
  }
  // update(time,delta) {
  //   controls.update(delta);
  // }
    /////////////////////////
    // var gameWidth = this.game.config.width
    // var gameHeight = this.game.config.height

    // // Set background color (on camera in scene)
    // this.cameras.main.setBackgroundColor('#D8DFEF')

    // // Set up map image
    // var map = this.add.image(gameWidth / 2, gameHeight / 2, 'map');

    // // blow up image to 4 times the original size
    // // map.setScale(4);

    // // set map to fill screen, and overflow on the smaller side
    // if (gameWidth > gameHeight) {
    //   map.displayWidth = gameWidth;
    //   map.displayHeight = map.height * map._scaleX;
    // }
    // else {
    //   map.displayHeight = gameHeight;
    //   map.displayWidth = map.width * map._scaleY;
    // }

    // // set interactive and dragable
    // map.setInteractive(new Phaser.Geom.Rectangle(0, 0, map.width, map.height), Phaser.Geom.Rectangle.Contains);
    // this.input.setDraggable(map);

    // // set draging functionality
    // map.on('drag', function (pointer, dragX, dragY) {
    //   this.y = dragY;
    //   // Confine movement to map height
    //   if (this.y - this.displayHeight / 2 > 0) { this.y = this.displayHeight / 2 }
    //   if (this.y + this.displayHeight / 2 < gameHeight) (this.y = gameHeight - this.displayHeight / 2)

    //   this.x = dragX;
    //   // Confine movement to map width
    //   if (this.x - this.displayWidth / 2 > 0) { this.x = this.displayWidth / 2 }
    //   if (this.x + this.displayWidth / 2 < gameWidth) (this.x = gameWidth - this.displayWidth / 2)
    // });

  // }
}

export default ShowMap;





// // code for moving the CAMERA, instead of the map itself
// // ===========================================================

// if (this.game.input.activePointer.isDown) {
//   if (this.game.origDragPoint) {
// 	// move the camera by the amount the mouse has moved since last update
// 	this.cameras.main.scrollX +=
// 	  this.game.origDragPoint.x - this.game.input.activePointer.position.x;
// 	this.cameras.main.scrollY +=
// 	  this.game.origDragPoint.y - this.game.input.activePointer.position.y;
//   } // set new drag origin to current position
//   this.game.origDragPoint = this.game.input.activePointer.position.clone();
// } else {
//   this.game.origDragPoint = null;
// }