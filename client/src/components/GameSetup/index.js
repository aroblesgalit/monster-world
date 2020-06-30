import Phaser from 'phaser';
import map from '../../assets/zelda.png'
let controls;
function GameSetup() {
  var config = {
    type: Phaser.AUTO,
    width: '100',
    height: '100',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  function preload() {
    this.load.image('map', map);
  }


  function create() {
    this.add.image(0, 0, 'map').setOrigin(0);
    this.cameras.main.setBounds(0, 0, 570, 570);
    this.cameras.main.setZoom(3);

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
        maxSpeed: 1.0
    };
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    
  }


  function update (time, delta)
  {
      controls.update(delta);
  }
}
  export default GameSetup;