import Phaser from 'phaser';

// Scenes
import Default from './Default';
import ShowMap from './Map';
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
}

export default GameSetup;