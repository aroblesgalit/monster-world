import Phaser from 'phaser';

// Scenes
import Default from './Default';
import ShowMap from './Map';
import Shop from './Shop';

var myCanvas = document.createElement('canvas');
myCanvas.id = "game-canvas";
myCanvas.style = "margin-top: 50px; margin-left: auto; margin-right: auto;"
document.body.appendChild(myCanvas);

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
    scene: [Shop]
  };

  var game = new Phaser.Game(config);
}

export default GameSetup;