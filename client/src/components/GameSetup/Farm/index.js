import Phaser from "phaser";
let buildVisible;
let buildContainer;
let placeActive = false;
let placeMarker;
let groundLayer;

class Farm extends Phaser.Scene {
    constructor() {
        super({ key: "Farm" });
    }

    preload() {
        //this.load.image("grass", "Assets/grass.png");
        this.load.spritesheet("crop", "Assets/Crop_Spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        //this.load.image("dirt", "Assets/tilledDirt.png");
        this.load.image("buttonUp", "Assets/blue_button04.png");
        this.load.image("buttonDown", "Assets/blue_button05.png");
        this.load.image("buttonHover", "Assets/blue_button02.png");

        this.load.image("buildWindow", "Assets/build_window.png");
        this.load.image("dirt2", "Assets/dirt2.png");


        // Tilemap - Static - grass
        this.load.image("farmland", "Assets/tilesets/farmland.png");
        this.load.tilemapTiledJSON("grass_tilemap", "Assets/tilemaps/grass_tilemap.json");

        // Tilemap - Dynamic - Placed Items
        // this.load.image("buildings", "Assets/tilesets/plowed_soil.png")
        // this.load.tilemapTiledJSON("farmMap", "Assets/tilemaps/platformer.json");
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

        const grassMap = this.make.tilemap({ key: "grass_tilemap" });
        const tileset = grassMap.addTilesetImage("farmland", "farmland");
        const grassPlatform = grassMap.createStaticLayer("grass", tileset);

        // Dynamic Tilemap

        groundLayer = grassMap.createDynamicLayer("ground", tileset);

        // groundLayer.putTileAt(10, 10, 10);

        // Crop
        let config = {
            key: "cropAnimation",
            frames: this.anims.generateFrameNumbers("crop", {
                start: 5, end: 0
            }),
            frameRate: 0.1,
            repeat: -1
        };

        // create animation for plants
        this.anims.create(config);

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
                this.toggleBuildWindow();
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


        // Build window
        let buildWindow = this.add.image(0, 0, "buildWindow");
        let dirt2 = this.add.image(0, 20, "dirt2").setInteractive({ useHandCursor: true });

        buildContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height - 200, [buildWindow, dirt2]).setScale(3).setDepth(2);

        buildContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, buildWindow.width, buildWindow.height), Phaser.Geom.Rectangle.Contains);

        buildContainer.visible = false;

        this.input.setDraggable(buildContainer);

        buildContainer.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        });

        dirt2.on("pointerup", function () {
            console.log(this.texture);
            this.scene.toggleBuildWindow();
            this.scene.createMarker(this.texture);
            placeActive = true;
        });

        // put the scene to sleep untill it is used
        this.scene.sleep('Farm');
    }

    createMarker(item) {
        placeMarker = this.add.graphics();
        placeMarker.lineStyle(2, 0x000000, 1);
        placeMarker.strokeRect(0, 0, 32, 32);
    }

    clearPlantMarker() {
        if (placeMarker) {
            placeMarker.clear();
        }
    }

    toggleBuildWindow() {
        buildVisible = !buildVisible;
        if (buildVisible) {
            buildContainer.visible = true;
        } else {
            buildContainer.visible = false;
        }
    }

    // plantTurnips(x, y) {
    //     for (let i = 0; i < 9; i++) {
    //         if (i < 3) {
    //             this.add.sprite(x + (i * 40), y, "crop").setScale(2).play("cropAnimation");
    //         } else if (i < 6) {
    //             this.add.sprite(x + (i - 3) * 40, y + 40, "crop").setScale(2).play("cropAnimation");
    //         } else {
    //             this.add.sprite(x + (i - 6) * 40, y + 80, "crop").setScale(2).play("cropAnimation");
    //         }
    //     }
    // }

    update(time, delta) {
        // Placement Variables
        // ========================================
        const pointer = this.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.cameras.main);
        // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and
        // then tile -> world, we end up with the position of the tile under the pointer
        const pointerTileXY = groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = groundLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);

        // Camera Movement
        // ========================================
        if (pointer.isDown && !placeActive) {
            if (this.game.origDragPoint) {
                // move the camera by the amount the mouse has moved since last update
                this.cameras.main.scrollX +=
                    this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                this.cameras.main.scrollY +=
                    this.game.origDragPoint.y - this.game.input.activePointer.position.y;
            } // set new drag origin to current position
            this.game.origDragPoint = this.game.input.activePointer.position.clone();
        } else {
            this.game.origDragPoint = null;
        }

        // Plant Animations
        // ==========================================
        if (placeActive) {
            placeMarker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
            if (pointer.isDown) {
                const tile = groundLayer.putTileAtWorldXY(10, worldPoint.x, worldPoint.y);
                //placeActive = false;

                //this.plantTurnips(plantMarker.x + 20, plantMarker.y + 20);
            }
        } else {
            this.clearPlantMarker();
        }
    }
}

export default Farm;