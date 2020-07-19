import Phaser from "phaser";
let controls;
let buildVisible;
let buildContainer;
let plantActive = false;
let plantMarker;

class FarmHUD extends Phaser.Scene {
    constructor(game) {
        super({ key: "FarmHUD" });

        var game = game;
    }

    preload() {
        this.status = "closed";
        // this.load.image("grass", "Assets/grass.png");
        // this.load.spritesheet("crop", "Assets/Crop_Spritesheet.png", {
        //     frameWidth: 16,
        //     frameHeight: 16
        // });

        // this.load.image("dirt", "Assets/tilledDirt.png");
        this.load.image("buttonUp", "Assets/blue_button04.png");
        this.load.image("buttonDown", "Assets/blue_button05.png");
        this.load.image("buttonHover", "Assets/blue_button02.png");

        // this.load.image("buildWindow", "Assets/build_window.png");
        // this.load.image("dirt2", "Assets/dirt2.png");
    }

    create() {

        // // Crop
        // let config = {
        //     key: "cropAnimation",
        //     frames: this.anims.generateFrameNumbers("crop", {
        //         start: 5, end: 0
        //     }),
        //     frameRate: 0.1,
        //     repeat: -1
        // };

        // this.anims.create(config);

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
                this.triggerWindow(BuildWindow); // Need to create BuildWindow scene
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


        // // Build window
        // let buildWindow = this.add.image(0, 0, "buildWindow");
        // let dirt2 = this.add.image(0, 20, "dirt2").setInteractive({ useHandCursor: true });

        // buildContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height - 200, [buildWindow, dirt2]).setScale(3).setDepth(2);

        // buildContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, buildWindow.width, buildWindow.height), Phaser.Geom.Rectangle.Contains);

        // buildContainer.visible = false;

        // this.input.setDraggable(buildContainer);

        // buildContainer.on('drag', function (pointer, dragX, dragY) {
        //     this.x = dragX;
        //     this.y = dragY;
        // });

        // dirt2.on("pointerup", function () {
        //     this.toggleBuildWindow();
        //     this.createPlantMarker();
        //     plantActive = true;
        // }, this);

        this.scene.sleep("FarmHUD");
    }

    // createPlantMarker() {
    //     plantMarker = this.add.graphics();
    //     plantMarker.lineStyle(2, 0x000000, 1);
    //     plantMarker.strokeRect(0, 0, 120, 120);
    // }

    // clearPlantMarker() {
    //     if (plantMarker) {
    //         plantMarker.clear();
    //     }
    // }

    // toggleBuildWindow() {
    //     buildVisible = !buildVisible;
    //     if (buildVisible) {
    //         buildContainer.visible = true;
    //     } else {
    //         buildContainer.visible = false;
    //     }
    // }

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
        controls.update(delta);
        // console.log(this.game.input); --- this.game.input.keyboard.onKeyDown(event)
        // if (plantActive) {
        //     plantMarker.x = this.input.activePointer.worldX;
        //     plantMarker.y = this.input.activePointer.worldY;
        //     if (this.game.input.activePointer.isDown) {
        //         plantActive = false;
        //         this.plantTurnips(plantMarker.x + 20, plantMarker.y + 20);
        //     }
        // } else {
        //     this.clearPlantMarker();
        // }
    }

    triggerWindow(window) {
        if (this.status === "closed") {
          this.status = "open";
          if (!this.game.scene.isActive()) {
            this.game.scene.start(window);
          } else {
            this.game.scene.wake(window);
          }
          //this.game.scene.sleep();
        } else {
          this.status = "closed";
          this.game.scene.sleep(window);
          //this.game.scene.sendToBack();
        }
      }

}

export default FarmHUD;