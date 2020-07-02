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
  }

  preload() {
    this.load.image('map', 'Assets/map.png');
    this.load.image('farmOnMap', 'Assets/farmOnMap.png')
  }

  create() {
    var gameWidth = this.game.config.width
    var gameHeight = this.game.config.height

    // Set background color (on camera in scene)
    this.cameras.main.setBackgroundColor('#D8DFEF')

    // Set up map image
    var map = this.add.image(gameWidth / 2, gameHeight / 2, 'map');
    
    // Sprites
    this.items = this.add.group([
      {
        key: "farmOnMap",
        setXY: {
          x: 100,
          y: 100
        },
        setScale: {
          x: 0.5,
          y: 0.5
        }
      }
    ]);

    this.items.setDepth(1);

    Phaser.Actions.Call(this.items.getChildren(), function(item) {
      // Make item interactive
      item.setInteractive();

      item.on("pointerdown", function(pointer) {
        // console.log("you clicked", item.texture.key);
        if (item.texture.key === "farmOnMap") {
          this.scene.scene.start("Farm");
        }
      })

    }, this);

    // blow up image to 4 times the original size
    // map.setScale(4);

    // set map to fill screen, and overflow on the smaller side
    if (gameWidth > gameHeight) {
      map.displayWidth = gameWidth;
      map.displayHeight = map.height * map._scaleX;
    }
    else {
      map.displayHeight = gameHeight;
      map.displayWidth = map.width * map._scaleY;
    }

    // set interactive and dragable
    map.setInteractive(new Phaser.Geom.Rectangle(0, 0, map.width, map.height), Phaser.Geom.Rectangle.Contains);
    this.input.setDraggable(map);

    // set draging functionality
    map.on('drag', function (pointer, dragX, dragY) {
      this.y = dragY;
      // Confine movement to map height
      if (this.y - this.displayHeight / 2 > 0) { this.y = this.displayHeight / 2 }
      if (this.y + this.displayHeight / 2 < gameHeight) (this.y = gameHeight - this.displayHeight / 2)

      this.x = dragX;
      // Confine movement to map width
      if (this.x - this.displayWidth / 2 > 0) { this.x = this.displayWidth / 2 }
      if (this.x + this.displayWidth / 2 < gameWidth) (this.x = gameWidth - this.displayWidth / 2)
    });

  }
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