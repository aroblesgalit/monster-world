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
        this.load.image("buttonUp", "Assets/blue_button04.png");
        this.load.image("buttonDown", "Assets/blue_button05.png");
        this.load.image("buttonHover", "Assets/blue_button02.png");
    }

    create() {

        // Width and Height of game setup
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;

        // Set up farmBg image to centered on screen
        // this.image = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "farmBg");
        let grass = this.add.image(0, 0, "grass")
            .setOrigin(0, 0)
            .setScale(0.4);
        this.cameras.main.setBounds(0, 0, 0, 0);
        this.cameras.main.setZoom(3);

        // Camera controls
        let cursors = this.input.keyboard.createCursorKeys();

        let controlConfig = {
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

        const dirt = this.add.image(100, 100, "dirt", 0)

        // Crop
        const crop = this.add.sprite(200, 100, "crop")
        console.log(crop);

        let config = {
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

        // Build Button
        let buildBtn = this.add.image(0, 0, "buttonUp")
            .setOrigin(0)
            .setScale(0.3)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                buildBtn.setTexture("buttonDown")
                    .setPosition(0, 1);
                buildBtnText.setPosition(buildBtn.x + 18, buildBtn.y);
            })
            .on("pointerover", () => {
                buildBtn.setTexture("buttonHover");
            })
            .on("pointerout", () => {
                buildBtn.setTexture("buttonUp")
                    .setPosition(0, 0);
                buildBtnText.setPosition(buildBtn.x + 18, buildBtn.y);

            })
        let buildBtnText = this.add.text(buildBtn.x + 18, buildBtn.y, "Build", { font: "10px Arial", fill: "#000" });
        this.add.container(100, this.cameras.main.height / 3.3, [buildBtn, buildBtnText]);
        // const buildBtn = this.add.text(100, 100, "Build", { fill: "#fff" })
        //     .setDepth(1)
        //     .setInteractive({ useHandCursor: true })
        //     .on("pointerdown", () => {
        //     console.log("Button clicked!")
        // })

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