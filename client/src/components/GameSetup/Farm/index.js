import Phaser from "phaser";
let controls;
let buildVisible;

class Farm extends Phaser.Scene {
    constructor() {
        super({ key: "Farm" });
    }

    preload() {
        // this.load.image("grass", "Assets/grass.png");
        this.load.spritesheet("crop", "Assets/Crop_Spritesheet.png", {
            frameWidth: 10,
            frameHeight: 14
        });
        this.load.image("dirt", "Assets/tilledDirt.png");
        this.load.image("buttonUp", "Assets/blue_button04.png");
        this.load.image("buttonDown", "Assets/blue_button05.png");
        this.load.image("buttonHover", "Assets/blue_button02.png");

        this.load.image("buildWindow", "Assets/build_window.png");
        this.load.image("dirt2", "Assets/dirt2.png");

        
        // Tilemap - grass
        this.load.image("grass_tiles", "Assets/tilesets/tallgrass.png");
        this.load.image("plowedSoil_tiles", "Asset/tilesets/plowed_soil.png");
        this.load.tilemapTiledJSON("grass_tilemap", "Assets/tilemaps/grass_tilemap.json");
    }

    create() {

        // Width and Height of game setup
        // let gameW = this.sys.game.config.width;
        // let gameH = this.sys.game.config.height;

        // Set up farmBg image to centered on screen
        // this.image = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "farmBg");
        // let grass = this.add.image(0, 0, "grass")
        //     .setOrigin(0, 0)
        //     .setScale(0.4);
        // this.cameras.main.setBounds(0, 0, 0, 0);
        // this.cameras.main.setZoom(3);

        // Grass tilemap
        const grassMap = this.make.tilemap({ key: "grass_tilemap"});
        const tileset = grassMap.addTilesetImage("tallGrass_tileset", "grass_tiles");
        const grassPlatform = grassMap.createStaticLayer("grass", tileset);

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
            // .setOrigin(0)
            .setScale(0.8)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                buildBtn.setTexture("buttonDown")
                    .setPosition(0, 1);
                buildBtnText.setPosition(buildBtn.x - 20, buildBtn.y - 10);
            })
            .on("pointerup", () => {
                buildVisible = !buildVisible;
                if (buildVisible) {
                    buildContainer.visible = true;
                } else {
                    buildContainer.visible = false;
                }
            }, this)
            .on("pointerover", () => {
                buildBtn.setTexture("buttonHover");
            })
            .on("pointerout", () => {
                buildBtn.setTexture("buttonUp")
                    .setPosition(0, 0);
                buildBtnText.setPosition(buildBtn.x - 20, buildBtn.y - 10);
            })
        let buildBtnText = this.add.text(buildBtn.x - 20, buildBtn.y - 10, "Build", { font: "20px Arial", fill: "#000" });
        this.add.container(this.cameras.main.width / 2, this.cameras.main.height - 36, [buildBtn, buildBtnText]);
        // const buildBtn = this.add.text(100, 100, "Build", { fill: "#fff" })
        //     .setDepth(1)
        //     .setInteractive({ useHandCursor: true })
        //     .on("pointerdown", () => {
        //     console.log("Button clicked!")
        // })

        // Build window
        let buildWindow = this.add.image(0, 0, "buildWindow");
        let dirt2 = this.add.image(0, 20, "dirt2").setInteractive({ useHandCursor: true });

        let buildContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height - 200, [buildWindow, dirt2]).setScale(3);

        buildContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, buildWindow.width, buildWindow.height), Phaser.Geom.Rectangle.Contains);

        buildContainer.visible = false;

        this.input.setDraggable(buildContainer);

        buildContainer.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        });

        dirt2.on("pointerup", function () {
            console.log("Clicked on dirt2.");
        }, this);
    }

    // createWindow(func) {
    //     var x = Phaser.Math.Between(400, 600);
    //     var y = Phaser.Math.Between(64, 128);

    //     var handle = 'window';

    //     var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);

    //     var demo = new func(handle, win);

    //     this.input.setDraggable(win);

    //     win.on('drag', function (pointer, dragX, dragY) {

    //         this.x = dragX;
    //         this.y = dragY;

    //         demo.refresh()

    //     });

    //     this.scene.add(handle, demo, true);
    // }

    update(time, delta) {
        controls.update(delta);
        // if (this.game.input.activePointer.isDown) {
        //     if (this.game.origDragPoint) {
        //         // move the camera by the amount the mouse has moved since last update
        //         this.cameras.main.scrollX += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
        //         this.cameras.main.scrollY += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
        //     } // set new drag origin to current position
        //     this.game.origDragPoint = this.game.input.activePointer.position.clone();
        // } else {
        //     this.game.origDragPoint = null;
        // }
    }
}

// class Build extends Phaser.Scene {
//     constructor(handle, parent) {
//         super(handle);
//         this.parent = parent;
//     }

//     create() {
//         let buildWindow = this.add.image(0, 0, "buildWindow").setOrigin(0);
//         let dirt2 = this.add.image(8, 20, "dirt2").setOrigin(0).setInteractive({ useHandCursor: true });

//         let buildContainer = this.add.container(76, this.cameras.main.height / 6.3, [buildWindow, dirt2]);

//         buildContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, buildWindow.width, buildWindow.height), Phaser.Geom.Rectangle.Contains);

//         this.input.setDraggable(buildContainer);

//         buildContainer.on('drag', function (pointer, dragX, dragY) {
//             this.x = dragX;
//             this.y = dragY;
//         });

//         dirt2.on("pointerup", function () {
//             console.log("Clicked on dirt2.");
//         }, this);
//     }
// }


export default Farm;