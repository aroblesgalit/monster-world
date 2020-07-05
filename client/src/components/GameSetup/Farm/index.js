import Phaser from "phaser";
let controls;

class Farm extends Phaser.Scene {
    constructor() {
        super({ key: "Farm" });
    }

    preload() {
        this.load.image("grass", "Assets/grass.png");
        this.load.spritesheet("crop", "Assets/Crop_Spritesheet.png", {
            frameWidth: 10,
            frameHeight: 14
        });
        this.load.image("dirt", "Assets/tilledDirt.png");
    }

    create() {

        const crop = this.add.sprite(200, 100, "crop", 0);
        const dirt = this.add.image(100, 100, "dirt", 0).setDepth(1);
        crop.setDepth(1);

        var config = {
            key: "cropAnimation",
            frames: this.anims.generateFrameNumbers("crop", {
                start: 5, end: 0
            }),
            frameRate: 5,
            repeat: -1
        };

        this.anims.create(config);
        crop.play("cropAnimation");

        // Dirt
        dirt.setInteractive();
        dirt.on("pointerdown", (pointer) => {
            console.log(pointer);
        });

        // Button
        var button = this.add.text(100, 100, "Build", { fill: "#fff" }).setDepth(1);
        button.setInteractive();

        button.on("pointerdown", () => {
            console.log("Button clicked!")
        })


        // Set up farmBg image to centered on screen
        // this.image = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "farmBg");
        var grass = this.add.image(0, 0, "grass").setOrigin(0);
        grass.setScale(0.9);
        this.cameras.main.setBounds(0, 0, 0, 0);
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