import Phaser from 'phaser';

// Scenes
import Default from './Default';
import ShowMap from './Map';
import HUD from './HUD';
import Farm from "./Farm";

function GameSetup() {
  var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight-80, // 80 = height of header
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: [Farm, ShowMap, Default]
  };

  var game = new Phaser.Game(config);
  
  // Add heads up display to game.  This will start the scene on top of the existing one.
  game.scene.add('HUD', HUD, true);

  // start the map and make it sleep
  // game.scene.start("ShowMap");
  // game.scene.sleep("ShowMap");
}

export default GameSetup;