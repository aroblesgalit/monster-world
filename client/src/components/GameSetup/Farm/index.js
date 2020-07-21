import Phaser from "phaser";
import Crops from "./crops.js";
import Dirt from "./Dirt.js";

class Farm extends Phaser.Scene {
    constructor() {
        super({ key: "Farm" });

        let placeActive = false;
        let dirtLayer;
        let plantLayer;
        let allLayers;
        let grassPlatform;
    }

    preload() {
        //this.load.image("grass", "Assets/grass.png");
        this.load.spritesheet("crop", "Assets/Crop_Spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });


        // Tilemap - Static - grass
        this.load.image("farmland", "Assets/tilesets/farmland.png");
        this.load.image("plowedDirt", "Assets/tilesets/plowedDirt.png");
        this.load.tilemapTiledJSON("grass_tilemap", "Assets/tilemaps/grass_tilemap.json");

        // Tilemap - Dynamic - Placed Items
        // this.load.image("buildings", "Assets/tilesets/plowed_soil.png")
        // this.load.tilemapTiledJSON("farmMap", "Assets/tilemaps/platformer.json");
    }

    create() {

        // Grass tilemap
        this.map = this.make.tilemap({ key: "grass_tilemap" });
        const tileset = this.map.addTilesetImage("farmland", "farmland");
        this.map.addTilesetImage("plowedDirt", "plowedDirt");


        // Static Layer
        this.grassPlatform = this.map.createStaticLayer("grass", tileset);

        // Dynamic Tilemap
        this.dirtLayer = this.map.createDynamicLayer("dirt", "plowedDirt");
        this.plantLayer = this.map.createDynamicLayer("plants", "farmland");

        this.allLayers = this.map.layers;


        // setTile= 10, 10, 10);

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

        // put the scene to sleep untill it is used
        this.scene.sleep('Farm');
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

        this.scene.wake("FarmHUD");

        // Placement Variables
        // ========================================
        const pointer = this.input.activePointer;


        // Camera Movement
        // ========================================
        if (pointer.isDown && !this.placeActive) {
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

    }
}

export default Farm;