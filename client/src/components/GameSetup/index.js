import Phaser from 'phaser';

// Scenes
import Default from './Default';
import ShowMap from './Map';
import { Shop, Shelf } from './Shop';
import HUD from './HUD';
import Farm from "./Farm";
import FarmHUD from "./FarmHUD";

function GameSetup() {
  var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight, // 80 = height of header
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: [Default, Farm, Shop, Shelf, FarmHUD, ShowMap]
  };

  var game = new Phaser.Game(config);

  // start the map and make it sleep
  game.scene.start("Farm");
  game.scene.start("Shop");
  game.scene.start("Potion");
  game.scene.start("FarmHUD");
  game.scene.start("Shelf");
  // game.scene.sleep("ShowMap");

  // Add heads up display to game.  This will start on the very top of all existing scenes.
  game.scene.add('HUD', HUD, true);
}

export default GameSetup;