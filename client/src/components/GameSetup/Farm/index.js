import Phaser from "phaser";
import helpers from "./helpers.js";

import Crops from "./crops.js";
import Dirt from "./Dirt.js";

let buildVisible;
let buildContainer;
let placeActive = false;
let placeMarker;
let dirtLayer;
let plantLayer;
let allLayers;
let grassPlatform;
let canPlace = false;

let farmTileCount = 85;

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
        this.load.image("buttonUp", "Assets/blue_button04.png");
        this.load.image("buttonDown", "Assets/blue_button05.png");
        this.load.image("buttonHover", "Assets/blue_button02.png");

        this.load.image("buildWindow", "Assets/build_window.png");
        this.load.image("dirt2", "Assets/dirt2.png");
        this.load.image("seeds", "Assets/seeds.png");


        // Tilemap - Static - grass
        this.load.image("farmland", "Assets/tilesets/farmland.png");
        this.load.image("plowedDirt", "Assets/tilesets/plowedDirt.png");
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

        this.grassMap = this.make.tilemap({ key: "grass_tilemap" });
        const tileset = this.grassMap.addTilesetImage("farmland", "farmland");
        this.grassMap.addTilesetImage("plowedDirt", "plowedDirt");
        
        // Static Layer
        grassPlatform = this.grassMap.createStaticLayer("grass", tileset);

        // Dynamic Tilemap
        dirtLayer = this.grassMap.createDynamicLayer("dirt", "plowedDirt");
        plantLayer = this.grassMap.createDynamicLayer("plants", "farmland");

        allLayers = this.grassMap.layers;
        

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
                if(!placeActive){
                    this.toggleBuildWindow();
                }
                else{
                    buildBtn.clearTint();
                    placeActive=null;
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


        // Build window
        // =================================
        let buildWindow = this.add.image(0, 0, "buildWindow");
        let buildObjects = []
        buildObjects.push(this.add.image(0, 20, "dirt2").setInteractive({ useHandCursor: true }));
        buildObjects.push(this.add.image(32, 20, "seeds").setInteractive({ useHandCursor: true }));

        buildContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height - 200, [buildWindow, ...buildObjects]).setScale(3).setDepth(2);

        buildContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, buildWindow.width, buildWindow.height), Phaser.Geom.Rectangle.Contains);

        buildContainer.visible = false;

        this.input.setDraggable(buildContainer);
        
        buildContainer.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        });
        
        console.log(buildObjects);

        buildObjects.forEach( function(object){
            object.on("pointerup", function () {
            this.scene.toggleBuildWindow();
            this.scene.createMarker(this.texture);
            placeActive = this.texture.key;
            buildBtn.setTint(0xff2222);
            });
        });
        


        // put the scene to sleep untill it is used
        this.scene.sleep('Farm');
    }

    // Marker Style
    // =====================================
    createMarker(item) {
        const image = this.add.sprite(0,0,item).setOrigin(0).setAlpha(.8).setDisplaySize(32,32);

        const outline = this.add.graphics();
        outline.lineStyle(2, 0x000000, 1);
        outline.strokeRect(0, 0, 32, 32);

        placeMarker = this.add.container(0,0,[outline, image])
    }

    // Clear Marker Style
    // =====================================
    clearPlaceMarker() {
        if (placeMarker) {
            placeMarker.destroy();
        }
    }

    // Toggle Build Window on or off
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
            let object;
            let layer;
            let tilesetOffset;

            //check if canPlace
            const grassTile = grassPlatform.getTileAt(snappedWorldPoint.x/32, snappedWorldPoint.y/32);
            const groundTile = dirtLayer.getTileAt(snappedWorldPoint.x/32, snappedWorldPoint.y/32);

            switch(placeActive){
                case "dirt2":
                    className = Dirt;
                    layer = this.grassMap.getLayer(className.layer).tilemapLayer;
                    tilesetOffset = className.tilesetOffset;
                    object = className.object;
                    canPlace = className.canPlace(grassPlatform, dirtLayer, snappedWorldPoint.x/32, snappedWorldPoint.y/32)
                    break;
                case "seeds":
                    className = Crops;
                    break;
            }

            checkPlacement();
            

            // if(pointer.isDown){
            //     console.log(dirtLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y));
            // }
            if (pointer.isDown && className.canPlace(grassPlatform, dirtLayer, snappedWorldPoint.x/32, snappedWorldPoint.y/32)) {
                const placed = className.put(this.grassMap, worldPoint.x, worldPoint.y)
                //const placed = layer.putTileAtWorldXY(object+tilesetOffset, worldPoint.x, worldPoint.y);

                //this.plantTurnips(plantMarker.x + 20, plantMarker.y + 20);
            }
        } else {
            this.clearPlaceMarker();
        }

        function checkPlacement(){
            placeMarker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
            if (!canPlace){
                placeMarker.list[1].setTint(0xff0000);
                placeMarker.list[0].lineStyle(2, 0xff0000, 1);
                placeMarker.list[0].strokeRect(0, 0, 32, 32)}
            else{
                placeMarker.list[1].clearTint();
                placeMarker.list[0].lineStyle(2, 0x00FF00, 1);
                placeMarker.list[0].strokeRect(0, 0, 32, 32)}
        }

    }
}

export default Farm;