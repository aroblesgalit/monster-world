import Phaser from "phaser";
import Crops from "../Farm/crops.js";
import Dirt from "../Farm/Dirt.js";

let controls;
let buildVisible;
let buildContainer;
let placeActive = false;
let placeMarker;


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

        // Build window
        this.load.image("buildWindow", "Assets/build_window.png");
        this.load.image("dirt2", "Assets/dirt2.png");
        this.load.image("seeds", "Assets/seeds.png");
    }

    create() {

        // Get reference to the Farm scene
        this.Farm = this.scene.get("Farm");
        console.log("this.Farm...", this.Farm);


        // Build Button
        let buildBtn = this.add.image(0, 0, "buttonUp")
            .setScale(0.8)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                buildBtn.setTexture("buttonDown")
                    .setPosition(0, 1);
                buildBtnText.setPosition(buildBtn.x - 20, buildBtn.y - 10);
            })
            .on("pointerup", () => {
                if (!placeActive) {
                    this.toggleBuildWindow();
                }
                else {
                    buildBtn.clearTint();
                    placeActive = null;
                    this.Farm.placeActive = false;
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
                console.log("logging this.scene: ", this.scene)
                createMarker(this.scene.Farm, this.texture);
                placeActive = this.texture.key;
                this.scene.Farm.placeActive = true;
                buildBtn.setTint(0xff2222);
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
            let canPlace = className.canPlace(this.Farm.grassPlatform, this.Farm.dirtLayer, this.Farm.plantLayer, snappedWorldPoint.x / 32, snappedWorldPoint.y / 32);
            UpdatePlaceMarker(placeMarker, canPlace, snappedWorldPoint.x, snappedWorldPoint.y);


            // if(pointer.isDown){
            //     console.log(dirtLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y));
            // }
            if (pointer.isDown && canPlace) {
                const placed = className.put(this.Farm.map, worldPoint.x, worldPoint.y)
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