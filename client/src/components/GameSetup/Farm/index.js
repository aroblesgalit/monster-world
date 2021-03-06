import Phaser from "phaser";


class Farm extends Phaser.Scene {
    constructor() {
        super({ key: "Farm" });

        let placeActive = false;
        let dirtLayer;
        let plantLayer;
        let allLayers;
        let grassPlatform;
        let crops;
    }

    preload() {
        //this.load.image("grass", "Assets/grass.png");
        this.load.spritesheet("crop", "Assets/Crop_Spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // Font
        this.load.bitmapFont('atari-smooth', 'Assets/Fonts/atari-smooth.png', 'Assets/Fonts/atari-smooth.xml');

        // Tilemap - Static - grass
        this.load.image("farmland", "Assets/tilesets/farmland.png");
        this.load.image("plowedDirt", "Assets/tilesets/plowedDirt.png");
        this.load.image("plants", "Assets/tilesets/plants.png");
        this.load.tilemapTiledJSON("grass_tilemap", "Assets/tilemaps/grass_tilemap.json")

        // Tilemap - Dynamic - Placed Items
        // this.load.image("buildings", "Assets/tilesets/plowed_soil.png")
        // this.load.tilemapTiledJSON("farmMap", "Assets/tilemaps/platformer.json");
    }

    create() {

        this.crops = [];

        // Grass tilemap
        this.map = this.make.tilemap({ key: "grass_tilemap" });

        const tileset = this.map.addTilesetImage("farmland", "farmland");
        this.map.addTilesetImage("plowedDirt", "plowedDirt");
        this.map.addTilesetImage("plants", "plants");

        // Static Layer
        this.grassPlatform = this.map.createStaticLayer("grass", tileset);

        // Dynamic Tilemap
        this.dirtLayer = this.map.createDynamicLayer("dirt", "plowedDirt", 0, 0);
        this.plantLayer = this.map.createDynamicLayer("plants", "plants", 0, -32);

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

        // Start with tilemap in center of the map
        let mapWidth = this.map.width * this.map.tileWidth;
        let mapHeight = this.map.height * this.map.tileHeight;

        this.cameras.main.scrollX = (mapWidth - this.game.config.width) / 2;
        this.cameras.main.scrollY = (mapHeight - this.game.config.height) / 2;

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

    getCrop(tile, xloc, yloc) {
        // console.log(this.crops);
        let toHarvest = this.crops.find(crop => crop.tile === tile)
        if (toHarvest) {
            let harvested = toHarvest.harvest(this.crops);
            if (harvested) {
                this.createFloatingText(xloc, yloc+8, harvested, 0x33ff00, 'atari-smooth');
            }
        }
    }


    // Effects
    //===============
    createFloatingText(x, y, message, tint, font) {

        let animation = this.add.bitmapText(x, y, font, message).setTint(tint).setScale(.3).setOrigin(1);
        let tween: Phaser.Tweens.Tween = this.add.tween({
            targets: animation,
                duration: 500,
                ease: 'Back.easeIn',
                alpha: 0,
                y: y - 30,
            onComplete: () => {
                animation.destroy();
            }, callbackScope: this
        });
    }

    // Update
    //===============
    update(time, delta) {
        // update all crops
        if (this.crops.length > 0) {
            this.crops.forEach(crop => crop.update(time, delta));
        }
        // remove those that are no longer active
        this.crops = this.crops.filter(crop => crop.tile);

        this.scene.wake("FarmHUD");

        // Placement Variables
        // ========================================
        const pointer = this.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.cameras.main);



        if (pointer.isDown && !this.placeActive) {
            // console.log(this.grassPlatform.getTileAtWorldXY(worldPoint.x, worldPoint.y));
            // console.log(this.dirtLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y));
            // console.log(this.plantLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y-32));


            if (this.game.origDragPoint) {
                // Camera Movement
                // ========================================
                // move the camera by the amount the mouse has moved since last update
                this.cameras.main.scrollX +=
                    this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                this.cameras.main.scrollY +=
                    this.game.origDragPoint.y - this.game.input.activePointer.position.y;
            } // set new drag origin to current position
            this.game.origDragPoint = this.game.input.activePointer.position.clone();


            // Crop Clicking
            //this.grassPlatform.getTileAtWorldXY(worldPoint.x, worldPoint.y);
            //this.dirtLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y);
            this.getCrop(this.plantLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y - 32), worldPoint.x, worldPoint.y - 32);

        } else {
            this.game.origDragPoint = null;
        }


    }
}

export default Farm;