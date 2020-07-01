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
        this.add.image(0, 0, "farmBg").setOrigin(0);
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

        // this.input.keyboard.on("keyup_ArrowRight", function (e) {
        //     this.image.x += 10;
        // }, this);

    }

    update(time, delta) {
        controls.update(delta);
    }
}

export default Farm;