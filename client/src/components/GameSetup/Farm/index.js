import Phaser from "phaser";
import Crops from "./crops.js";
import Dirt from "./Dirt.js";
import FarmHUD from "../FarmHUD";

let buildVisible;
let placeActive = false;
let placeMarker;
let dirtLayer;
let plantLayer;
let allLayers;
let grassPlatform;

class Farm extends Phaser.Scene {
    constructor() {
        super({ key: "Farm" });
        var buildContainer;
    }

    preload() {
        //this.load.image("grass", "Assets/grass.png");
        this.load.spritesheet("crop", "Assets/Crop_Spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // this.load.image("buildWindow", "Assets/build_window.png");
        // this.load.image("dirt2", "Assets/dirt2.png");
        // this.load.image("seeds", "Assets/seeds.png");


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
        grassPlatform = this.map.createStaticLayer("grass", tileset);

        // Dynamic Tilemap
        dirtLayer = this.map.createDynamicLayer("dirt", "plowedDirt");
        plantLayer = this.map.createDynamicLayer("plants", "farmland");

        allLayers = this.map.layers;


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


        // // Build window
        // // =================================
        // let buildWindow = this.add.image(0, 0, "buildWindow");
        // let buildObjects = []
        // buildObjects.push(this.add.image(0, 20, "dirt2").setInteractive({ useHandCursor: true }));
        // buildObjects.push(this.add.image(32, 20, "seeds").setInteractive({ useHandCursor: true }));

        // this.buildContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height - 200, [buildWindow, ...buildObjects]).setScale(3).setDepth(2);

        // this.buildContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, buildWindow.width, buildWindow.height), Phaser.Geom.Rectangle.Contains);

        // this.buildContainer.visible = false;

        // this.input.setDraggable(this.buildContainer);

        // this.buildContainer.on('drag', function (pointer, dragX, dragY) {
        //     this.x = dragX;
        //     this.y = dragY;
        // });

        // console.log(buildObjects);

        // buildObjects.forEach(function (object) {
        //     object.on("pointerup", function () {
        //         this.scene.toggleBuildWindow();
        //         createMarker(this.scene, this.texture);
        //         placeActive = this.texture.key;
        //         buildBtn.setTint(0xff2222);
        //     });
        // });


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

        this.scene.wake("FarmHUD", {x: 100, y: 100});

        // Placement Variables
        // ========================================
        const pointer = this.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.cameras.main);
        // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and
        // then tile -> world, we end up with the position of the tile under the pointer
        const pointerTileXY = dirtLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = dirtLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);


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


        // placeObject
        // ==========================================
        if (placeActive) {
            let className;

            switch (placeActive) {
                case "dirt2":
                    className = Dirt;
                    break;
                case "seeds":
                    className = Crops;
                    break;
            }

            //check if canPlace
            let canPlace = className.canPlace(grassPlatform, dirtLayer, snappedWorldPoint.x / 32, snappedWorldPoint.y / 32);
            UpdatePlaceMarker(placeMarker, canPlace, snappedWorldPoint.x, snappedWorldPoint.y);


            // if(pointer.isDown){
            //     console.log(dirtLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y));
            // }
            if (pointer.isDown && canPlace) {
                const placed = className.put(this.map, worldPoint.x, worldPoint.y)
                //const placed = layer.putTileAtWorldXY(object+tilesetOffset, worldPoint.x, worldPoint.y);

                //this.plantTurnips(plantMarker.x + 20, plantMarker.y + 20);
            }
        } else {
            clearPlaceMarker(placeMarker);
        }
    }
}

export default Farm;






// placeMarker Stuff
//================================

function createMarker(scene, item) {
    const image = scene.add.sprite(0, 0, item).setOrigin(0).setAlpha(.8).setDisplaySize(32, 32);

    const outline = scene.add.graphics();
    outline.lineStyle(2, 0x000000, 1);
    outline.strokeRect(0, 0, 32, 32);

    placeMarker = scene.add.container(0, 0, [outline, image])
    return placeMarker;
}

// Clear Marker Style
// =====================================
function clearPlaceMarker(placeMarker) {
    if (placeMarker) {
        placeMarker.destroy();
    }
}

function UpdatePlaceMarker(placeMarker, canPlace, x, y) {
    placeMarker.setPosition(x, y);
    if (!canPlace) {
        placeMarker.list[1].setTint(0xff0000);
        placeMarker.list[0].lineStyle(2, 0xff0000, 1);
        placeMarker.list[0].strokeRect(0, 0, 32, 32)
    }
    else {
        placeMarker.list[1].clearTint();
        placeMarker.list[0].lineStyle(2, 0x00FF00, 1);
        placeMarker.list[0].strokeRect(0, 0, 32, 32)
    }
}