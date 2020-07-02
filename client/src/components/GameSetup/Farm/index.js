import Phaser from "phaser";
let controls;

class Farm extends Phaser.Scene {
    constructor() {
        super({ key: "Farm" });
    }

    preload() {
        this.load.image("farmBg", "Assets/farm.png");
    }

    create() {
        // Set up farmBg image to centered on screen
        // this.image = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "farmBg");
        var farmBg = this.add.image(0, 0, "farmBg").setOrigin(0, 0);
        this.cameras.main.setBounds(0, 0, 730, 416);
        this.cameras.main.setZoom(3);

        // Camera controls
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

    update(time, delta) {
        controls.update(delta);
        if (this.game.input.activePointer.isDown) {
            if (this.game.origDragPoint) {
              // move the camera by the amount the mouse has moved since last update
              this.cameras.main.scrollX += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
              this.cameras.main.scrollY += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
            } // set new drag origin to current position
            this.game.origDragPoint = this.game.input.activePointer.position.clone();
          } else {
            this.game.origDragPoint = null;
          }
    }
}

export default Farm;