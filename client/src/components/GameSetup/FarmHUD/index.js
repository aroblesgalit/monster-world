import Phaser from "phaser";
import Dirt from "../Objects/Dirt.js";
import Crops from "../Objects/crops.js";
import Potato from "../Objects/Crops/Potato.js";
import Tomato from "../Objects/Crops/Tomato.js";
import Carrot from "../Objects/Crops/Carrot.js";

let controls;
let buildVisible;
let buildContainer;
let placeActive = false;
let placeMarker;

var classes = {
    "Tomato": Tomato,
    "Potato": Potato,
    "Carrot": Carrot
};


class FarmHUD extends Phaser.Scene {
    constructor(game) {
        super({ key: "FarmHUD" });

        // var Farm = this.scene.scenes.get("Farm");
        let Farm;

        var game = game;
    }

    preload() {
        // Button
        this.load.image("buttonUp", "Assets/blue_button04.png");
        this.load.image("buttonDown", "Assets/blue_button05.png");
        this.load.image("buttonHover", "Assets/blue_button02.png");

        // Circular Button
        this.load.image("circButton", "Assets/hudButton.png");

        // Icons
        this.load.image("barnIcon", "Assets/barnIcon.png");
        this.load.image("shovelIcon", "Assets/shovelIcon.png");
        this.load.image("cropsIcon", "Assets/cropsIcon.png");
        this.load.image("fenceIcon", "Assets/fenceIcon.png");

        // Build window
        this.load.image("buildWindow", "Assets/build_window.png");
        this.load.image("dirt2", "Assets/dirt2.png");
        this.load.image("seeds", "Assets/seeds.png");
        this.load.spritesheet("plantButtons", "Assets/tilesets/plants.png", {frameWidth:32, frameHeight:64});

        //Plant Icons
        Carrot.loadImage(this);
        Potato.loadImage(this);
        Tomato.loadImage(this);
    }

    create() {

        // Get reference to the Farm scene
        this.Farm = this.scene.get("Farm");

        // Main farm button
        let mainCircButton = this.add.image(0, 0, "circButton");
        let barnIcon = this.add.image(0, 0, "barnIcon").setScale(0.04).setTint(0xddddff);
        let farmButton = this.add.container(40, this.cameras.main.height - 36, [mainCircButton, barnIcon]);

        // Plow dirt button
        let shovelCircButton = this.add.image(0, 0, "circButton").setInteractive({ useHandCursor: true });;
        let shovelIcon = this.add.image(0, 0, "shovelIcon").setScale(0.04).setTint(0xddddff);
        let shovelButton = this.add.container(90, this.cameras.main.height - 30, [shovelCircButton, shovelIcon]);
        shovelButton.setScale(0.75);

        // Plant crops button
        let cropsCircButton = this.add.image(0, 0, "circButton").setInteractive({ useHandCursor: true });
        let cropsIcon = this.add.image(0, 0, "cropsIcon").setScale(0.05).setTint(0xddddff);
        let cropsButton = this.add.container(78, this.cameras.main.height - 70, [cropsCircButton, cropsIcon]);
        cropsButton.setScale(0.75);

        // Build button
        let fenceCircButton = this.add.image(0, 0, "circButton").setInteractive({ useHandCursor: true });
        let fenceIcon = this.add.image(0, 0, "fenceIcon").setScale(0.06).setTint(0xddddff);
        let fenceButton = this.add.container(38, this.cameras.main.height - 86, [fenceCircButton, fenceIcon]);
        fenceButton.setScale(0.75);

        // Activating plowing dirt
        shovelCircButton.on("pointerup", () => {
            if (!placeActive) {
                createMarker(this.Farm, "dirt2");
                placeActive = Dirt;
                this.Farm.placeActive = true;
            }
            else {
                placeActive = null;
                this.Farm.placeActive = false;
            }
        }, this);

        // Activating planting crops
        cropsCircButton.on("pointerup", () => {
            if (!placeActive) {
                this.toggleBuildWindow();
            }
            else {
                placeActive = null;
                this.Farm.placeActive = false;
            }
        }, this);


        // Build window
        // =================================
        let buildWindow = this.add.image(0, 0, "buildWindow");
        let buildObjects = []

        // Add buttons to plant window
        //buildObjects.push(this.add.image(0, 20, "buttonUp").setInteractive({ useHandCursor: true }));
        let self = this;
        buildObjects.push( Potato.getImage(self, 32, 0).setInteractive({ useHandCursor: true }));
        buildObjects.push( Carrot.getImage(self, 0, 0).setInteractive({ useHandCursor: true }));
        buildObjects.push( Tomato.getImage(self, -32, 0).setInteractive({ useHandCursor: true }));

        this.buildContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height - 200, [buildWindow, ...buildObjects]).setScale(3).setDepth(2);
        this.buildContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, buildWindow.width, buildWindow.height), Phaser.Geom.Rectangle.Contains);
        this.buildContainer.visible = false;
        this.input.setDraggable(this.buildContainer);
        this.buildContainer.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        });

        buildObjects.forEach(function (object) {
            object.on("pointerup", function () {
                this.scene.toggleBuildWindow();
                console.log(this);
                createMarker(this.scene.Farm, this.texture, this.frame.name);
                placeActive = classes[this.texture.key];
                // switch (this.texture.key) {
                //     case "Potato":
                //         placeActive = Potato;
                //         break;
                //     case "Tomato":
                //         placeActive = Tomato;
                //         break;
                //     case "Carrot":
                //         placeActive = Carrot;
                //         break;
                // }
                console.log(placeActive);
                this.scene.Farm.placeActive = true;
                // buildBtn.setTint(0xff2222);
            });
        });


        this.scene.sleep("FarmHUD");
    }

    toggleBuildWindow() {
        buildVisible = !buildVisible;
        if (buildVisible) {
            this.buildContainer.visible = true;
        } else {
            this.buildContainer.visible = false;
        }
    }

    update(time, delta) {
        // controls.update(delta);

        // Placement Variables
        // ========================================
        const pointer = this.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.Farm.cameras.main);
        // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and
        // then tile -> world, we end up with the position of the tile under the pointer
        const pointerTileXY = this.Farm.dirtLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = this.Farm.dirtLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);


        // placeObject
        // ==========================================
        if (placeActive) {

            //check if canPlace
            let canPlace = placeActive.canPlace(this.Farm.grassPlatform, this.Farm.dirtLayer, this.Farm.plantLayer, snappedWorldPoint.x / 32, snappedWorldPoint.y / 32);
            UpdatePlaceMarker(placeMarker, canPlace, snappedWorldPoint.x, snappedWorldPoint.y);


            // if(pointer.isDown){
            //     console.log(dirtLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y));
            // }
            if (pointer.isDown && canPlace) {
                const placed = placeActive.put(this.Farm.map, worldPoint.x, worldPoint.y)
                //const placed = layer.putTileAtWorldXY(object+tilesetOffset, worldPoint.x, worldPoint.y);
                if (placed.type === "crop") {
                    this.Farm.crops.push(placed.data);
                }
            }
        } else {
            clearPlaceMarker(placeMarker);
        }
    }
}

export default FarmHUD;

// placeMarker Stuff
//================================

function createMarker(scene, item, frame) {
    const image = scene.add.sprite(0, 0, item).setOrigin(0).setAlpha(.8).setDisplaySize(32, 32).setFrame(frame);

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