import Phaser from 'phaser';
let controls;
class Shop extends Phaser.Scene{
  constructor(){
    super({key:"Shop"});
  }

  preload(){ 
    this.load.image('shop', 'assets/shop.jpg');
  }

  create() {
    this.add.image(0, 0, 'shop').setOrigin(0);
    this.cameras.main.setBounds(0, 0, 1920, 1600);
    this.cameras.main.setZoom(0.75);


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
      maxSpeed: 0.75
    };
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    this.input.on('pointerdown', function(event) {
      if (event.x < 356 && event.x > 175 && event.y > 125 && event.y < 537) {
        console.log("clicked bookcase ", event.x + " : " + event.y );
      }

    },)
  }

  update(time,delta) {
    controls.update(delta);
  }
}

export default Shop;
