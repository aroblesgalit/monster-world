import Phaser from 'phaser';

// Scenes
import Default from './Default';
import ShowMap from './Map';
import Shop from './Shop';

var myCanvas = document.createElement('canvas');
myCanvas.id = "game-canvas";
myCanvas.style = "margin-top: 50px; margin-left: auto; margin-right: auto;"
document.body.appendChild(myCanvas);
import HUD from './HUD';
import Farm from "./Farm";

function GameSetup() {
  var config = {
    type: Phaser.CANVAS,
    parent: document.getElementById("game-parent"),
    width: 800,
    height: 600, // 80 = height of header
    canvas: document.getElementById("game-canvas"),
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: [Default, Farm, ShowMap, Shop]
  };

  var game = new Phaser.Game(config);
  
  // Add heads up display to game.  This will start the scene on top of the existing one.
  game.scene.add('HUD', HUD, true);

  // start the map and make it sleep
  game.scene.start("Farm");
  // game.scene.sleep("ShowMap");
}

export default GameSetup;