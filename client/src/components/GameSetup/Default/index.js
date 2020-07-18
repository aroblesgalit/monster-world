import Phaser from 'phaser';

class Default extends Phaser.Scene{
  constructor(){
    super({key:"Default"});
  }

  preload(){ 
    this.load.image('sky', 'Assets/Default/space3.png');
    this.load.image('logo', 'Assets/Default/phaser3-logo.png');
    this.load.image('red', 'Assets/Default/red.png');
  }

  create() {

    let background = this.add.image(0, 0, 'sky').setOrigin(0);
    background.displayWidth=this.game.config.width;
    background.displayHeight = this.game.config.height;

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}

export default Default;
