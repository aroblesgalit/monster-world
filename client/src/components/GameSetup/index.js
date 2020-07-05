import Phaser from 'phaser';

// Scenes
import Default from './Default';
import ShowMap from './Map';
import HUD from './HUD';


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
    scene: [Default, ShowMap]
  };

  var game = new Phaser.Game(config);
  
  // Add heads up display to game
  game.scene.add('HUD', HUD, true);
}

export default GameSetup;