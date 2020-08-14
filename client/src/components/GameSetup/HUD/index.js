import Phaser from 'phaser';
import ShowMap from '../Map'
import Inventory from '../Inventory';
import farmObject from '../Objects/Object';
import Potato from '../Objects/Crops/Potato';
import Carrot from '../Objects/Crops/Carrot';
import Tomato from '../Objects/Crops/Tomato';

let goldCount;
class HeadsUpDisplay extends Phaser.Scene {
  constructor(game) {
    super({ key: "HeadsUpDisplay" });
    var game = game;

    var gameWidth;
    var background;
    var status;
    this.inventory = farmObject.getInventory();
  }
  
  preload() {
    this.status = "closed";
    this.load.image('background', 'Assets/hudBackground.png');
    this.load.image('button', 'Assets/hudButton.png');
    this.load.image('settings', 'Assets/hudSettings.png');
  }

  create() {
    // Testing to give players default inventory
    this.inventory.addItem(Carrot, 2);
    this.inventory.addItem(Tomato, 2);
    this.inventory.addItem(Potato, 2);


    var gameWidth = this.game.config.width
    var gameHeight = this.game.config.height

    // Set background color (on camera in scene)
    // this.cameras.main.setBackgroundColor('#D8DFEF')

    // Set up background image
    this.background = this.add.image(0, 0, 'background').setOrigin(0);

    // set background to fill screen, and overflow on the smaller side
    this.background.displayWidth = gameWidth;

    // Set up map button
    //==========================================

    var mapButton = this.add.sprite(0, 0, 'button').setOrigin(0)
    var mapText = this.add.text(22, 28).setText("Map")
    mapButton.setScale(1.5);

    mapButton.setInteractive();
    var mapContainer = this.add.container((this.background.displayWidth - mapButton.displayWidth) / 2, 0, [mapButton, mapText]);

    mapButton.on('pointerup', this.triggerMap, this);

    // button down
    mapButton.on('pointerdown', function (event, gameObjects) {
      this.setTint(0xbbbbff);
    });
    // button down
    mapButton.on('pointerup', function (event, gameObjects) {
      this.setTint(0xddddff);
    });

    // button hover
    mapButton.on('pointerover', function (event, gameObjects) {
      this.setTint(0xddddff);
    });
    mapButton.on('pointerout', function (event, gameObjects) {
      this.clearTint();
    });

    

    // other buttons
    var settingsButton = this.add.sprite(0, 0, 'button').setOrigin(0);
    var settingsDisplay = this.add.sprite(13, 5, 'settings').setOrigin(0);
    settingsDisplay.setScale(.15);
    var settingsContainer = this.add.container((this.background.displayWidth - 60), 0, [settingsButton, settingsDisplay]);

    var button2 = this.add.sprite(this.background.displayWidth - 120, 0, 'button').setOrigin(0);
    var button3 = this.add.sprite(this.background.displayWidth - 180, 0, 'button').setOrigin(0);


    // text readouts
    this.data.set('gold', 200);
    goldCount = this.add.text(10, 10).setText(this.data.get('gold') + ' Gold').setScrollFactor(0);
    goldCount.setShadow(1, 1, '#000000', 2);

    // Inventory
    this.data.set('inventory', {});
  }

  resize() {
    this.background.displayWidth = this.game.config.width;
  }

  triggerMap() {
    if (this.status === "closed") {
      this.status = "open";
      if (!this.game.scene.isActive()) {
        this.game.scene.start('ShowMap');
      }
      else {
        this.game.scene.wake('ShowMap');
      }

      //this.game.scene.sleep();
    }
    else {
      this.status = "closed";
      this.game.scene.sleep('ShowMap');
      //this.game.scene.sendToBack();
    }
  }

  // // Inventory Functions
  // //====================================
  // addItem(item, count){
  //   this.data['inventory'][item]+=count;
  //   console.log(this.data['inventory'])
  // }

  // removeItem(item, count){
  //   this.data['inventory'][item]-=count;
  //   console.log(this.data['inventory'])
  // }

  // UPDATE
  //====================================
  update() {
    goldCount.setText(this.data.get('gold') + ' Gold');
  }
}

export default HeadsUpDisplay;
