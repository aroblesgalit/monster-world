import Phaser from "phaser";
let buildVisible;
let buildContainer;
let placeActive = false;
let placeMarker;
let groundLayer;
let grassPlatform;
let canPlace = false;

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
        grassPlatform = grassMap.createStaticLayer("grass", tileset);

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
                if(!placeActive){
                    this.toggleBuildWindow();
                }
                else{
                    buildBtn.clearTint();
                    placeActive=!placeActive
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
            buildBtn.setTint(0xff2222);

        });

        // put the scene to sleep untill it is used
        this.scene.sleep('Farm');
    }

    createMarker(item) {
        const image = this.add.sprite(0,0,item).setOrigin(0).setAlpha(.8).setDisplaySize(32,32);

        const outline = this.add.graphics();
        outline.lineStyle(2, 0x000000, 1);
        outline.strokeRect(0, 0, 32, 32);

        placeMarker = this.add.container(0,0,[outline, image])
    }

    clearPlaceMarker() {
        if (placeMarker) {
            placeMarker.destroy();
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

        // placeObject
        // ==========================================
        if (placeActive) {

            placeMarker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
            if (!canPlace){
                placeMarker.list[1].setTint(0xff0000);
                placeMarker.list[0].lineStyle(2, 0xff0000, 1);
                placeMarker.list[0].strokeRect(0, 0, 32, 32)}
            else{
                placeMarker.list[1].clearTint();
                placeMarker.list[0].lineStyle(2, 0x00FF00, 1);
                placeMarker.list[0].strokeRect(0, 0, 32, 32)}

            //check if canPlace
            const grassTile = grassPlatform.getTileAt(snappedWorldPoint.x/32, snappedWorldPoint.y/32);
            const groundTile = groundLayer.getTileAt(snappedWorldPoint.x/32, snappedWorldPoint.y/32);
            if(grassTile && groundTile && grassTile.index==26 && groundTile.index==1)
                {canPlace = true;}
            else{canPlace=false;}

            // dirtMarker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
            if (pointer.isDown && canPlace) {
                const placed = groundLayer.putTileAtWorldXY(10, worldPoint.x, worldPoint.y);
                // weird that this next part isn't done automatically;
                placed.properties = (placed.tileset.tileProperties[10]);

                checkContig(placed);

                // check nearby tiles


                //this.plantTurnips(plantMarker.x + 20, plantMarker.y + 20);
            }
        } else {
            this.clearPlaceMarker();
        }

        function checkContig(tile, justThis = false){
            console.log(tile)
            if(true || tile.properties["Contiguous"]){
                const up = groundLayer.getTileAt(tile.x, tile.y-1).properties["Contiguous"];
                const down = groundLayer.getTileAt(tile.x, tile.y+1).properties["Contiguous"];
                const left = groundLayer.getTileAt(tile.x-1, tile.y).properties["Contiguous"];
                const right = groundLayer.getTileAt(tile.x+1, tile.y).properties["Contiguous"];

                const ul = groundLayer.getTileAt(tile.x-1, tile.y-1).properties["Contiguous"];
                const ur = groundLayer.getTileAt(tile.x+1, tile.y-1).properties["Contiguous"];
                const dl = groundLayer.getTileAt(tile.x-1, tile.y+1).properties["Contiguous"];
                const dr = groundLayer.getTileAt(tile.x+1, tile.y+1).properties["Contiguous"];

                console.log(groundLayer.getTileAt(tile.x, tile.y-1));
                console.log(`tile at ${tile.x},${tile.y-1} is${up?"":" not"} contiguous`)
                console.log(`tile at ${tile.x},${tile.y+1} is${down?"":" not"} contiguous`)
                console.log(`tile at ${tile.x-1},${tile.y} is${left?"":" not"} contiguous`)
                console.log(`tile at ${tile.x+1},${tile.y} is${right?"":" not"} contiguous`)

                // change tileset to connect them
                //===============================
                console.log(tile.x, tile.y);
                // 4 connections
                if (up && down && left && right){
                    
                    // All
                    if(ul && ur && dl && dr){groundLayer.putTileAt(29, tile.x, tile.y)}

                    // 3
                    else if(ul && ur && dl && !dr){groundLayer.putTileAt(11, tile.x, tile.y)}
                    else if(ul && ur && !dl && dr){groundLayer.putTileAt(12, tile.x, tile.y)}
                    else if(ul && !ur && dl && dr){groundLayer.putTileAt(17, tile.x, tile.y)}
                    else if(!ul && ur && dl && dr){groundLayer.putTileAt(18, tile.x, tile.y)}

                    //2
                    else if(ul && ur && !dl && !dr){groundLayer.putTileAt(74, tile.x, tile.y)}
                    else if(ul && !ur && dl && !dr){groundLayer.putTileAt(67, tile.x, tile.y)}
                    else if(ul && !ur && !dl && dr){groundLayer.putTileAt(76, tile.x, tile.y)}
                    else if(!ul && ur && !dl && dr){groundLayer.putTileAt(68, tile.x, tile.y)}
                    else if(!ul && ur && dl && !dr){groundLayer.putTileAt(75, tile.x, tile.y)}
                    else if(!ul && !ur && dl && dr){groundLayer.putTileAt(73, tile.x, tile.y)}

                    //1
                    else if(ul && !ur && !dl && !dr){groundLayer.putTileAt(84, tile.x, tile.y)}
                    else if(!ul && ur && !dl && !dr){groundLayer.putTileAt(83, tile.x, tile.y)}
                    else if(!ul && !ur && dl && !dr){groundLayer.putTileAt(78, tile.x, tile.y)}
                    else if(!ul && !ur && !dl && dr){groundLayer.putTileAt(77, tile.x, tile.y)}

                    // none
                    else if(!ul && !ur && !dl && !dr){groundLayer.putTileAt(53, tile.x, tile.y)}
                }

                // 3 connections
                if (up && down && left && !right){
                    if(!ul && !dl){ groundLayer.putTileAt(60, tile.x, tile.y)}
                    else if(!ul && dl){ groundLayer.putTileAt(64, tile.x, tile.y)}
                    else if(ul && !dl){ groundLayer.putTileAt(70, tile.x, tile.y)}
                    else{groundLayer.putTileAt(30, tile.x, tile.y)}
                }
                if (up && down && !left && right){
                    if(!ur && !dr){ groundLayer.putTileAt(58, tile.x, tile.y)}
                    else if(!ur && dr){ groundLayer.putTileAt(63, tile.x, tile.y)}
                    else if(ur && !dr){ groundLayer.putTileAt(69, tile.x, tile.y)}
                    else{groundLayer.putTileAt(28, tile.x, tile.y)}
                }
                if (up && !down && left && right){
                    if(!ul && !ur){ groundLayer.putTileAt(45, tile.x, tile.y)}
                    else if(!ul && ur){ groundLayer.putTileAt(71, tile.x, tile.y)}
                    else if(ul && !ur){ groundLayer.putTileAt(72, tile.x, tile.y)}
                    else{groundLayer.putTileAt(35, tile.x, tile.y)}
                }
                if (!up && down && left && right){
                    if(!dr && !dl){ groundLayer.putTileAt(39, tile.x, tile.y)}
                    else if(!dr && dl){ groundLayer.putTileAt(66, tile.x, tile.y)}
                    else if(dr && !dl){ groundLayer.putTileAt(65, tile.x, tile.y)}
                    else{groundLayer.putTileAt(23, tile.x, tile.y)}
                }

                // 2 connections
                if (up && down && !left && !right){groundLayer.putTileAt(48, tile.x, tile.y)}
                if (!up && !down && left && right){groundLayer.putTileAt(46, tile.x, tile.y)}

                if (up && !down && left && !right){
                    if(!ul){groundLayer.putTileAt(62, tile.x, tile.y)}
                    else {groundLayer.putTileAt(36, tile.x, tile.y)}
                }
                if (up && !down && !left && right){
                    if(!ur){groundLayer.putTileAt(61, tile.x, tile.y)}
                    else {groundLayer.putTileAt(34, tile.x, tile.y)}
                }
                if (!up && down && left && !right){
                    if(!dl){groundLayer.putTileAt(56, tile.x, tile.y)}
                    else {groundLayer.putTileAt(24, tile.x, tile.y)}
                }

                if (!up && down && !left && right){
                    if(!dr){groundLayer.putTileAt(55, tile.x, tile.y)}
                    else {groundLayer.putTileAt(22, tile.x, tile.y)}
                }
                

                // 1 connections
                if (up && !down && !left && !right){groundLayer.putTileAt(59, tile.x, tile.y)}
                if (!up && down && !left && !right){groundLayer.putTileAt(47, tile.x, tile.y)}
                if (!up && !down && left && !right){groundLayer.putTileAt(54, tile.x, tile.y)}
                if (!up && !down && !left && right){groundLayer.putTileAt(52, tile.x, tile.y)}

                // change connected too
                if (!justThis){
                    if (up){checkContig(groundLayer.getTileAt(tile.x, tile.y-1), true)};
                    if (down){checkContig(groundLayer.getTileAt(tile.x, tile.y+1), true);};
                    if (left){checkContig(groundLayer.getTileAt(tile.x-1, tile.y), true);};
                    if (right){checkContig(groundLayer.getTileAt(tile.x+1, tile.y), true);};  
                    if (ul){checkContig(groundLayer.getTileAt(tile.x-1, tile.y-1), true);};  
                    if (ur){checkContig(groundLayer.getTileAt(tile.x+1, tile.y-1), true);};  
                    if (dl){checkContig(groundLayer.getTileAt(tile.x-1, tile.y+1), true);};  
                    if (dr){checkContig(groundLayer.getTileAt(tile.x+1, tile.y+1), true);};  
                }
                
            }

        }
    }
}

export default Farm;