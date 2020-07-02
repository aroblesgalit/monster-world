import Phaser from 'phaser';

// Scenes
import Default from './Default';
import ShowMap from './Map';
import Shop from './Shop';

function GameSetup() {
  var config = {
    type: Phaser.AUTO,
    width: '100',
    height: window.innerHeight-80, // 80 = height of header
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