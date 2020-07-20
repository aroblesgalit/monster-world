import Phaser from "phaser";
let controls;
let buildVisible;
let buildContainer;

class FarmHUD extends Phaser.Scene {
    constructor(game) {
        super({ key: "FarmHUD" });

        // var Farm = this.scene.scenes.get("Farm");
        var Farm;

        var game = game;
    }

    preload() {
        this.load.image("buttonUp", "Assets/blue_button04.png");
        this.load.image("buttonDown", "Assets/blue_button05.png");
        this.load.image("buttonHover", "Assets/blue_button02.png");
    }

    create() {

        // Get reference to the Farm scene
        this.Farm = this.scene.get("Farm");

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
        this.add.container(100, 100, [buildBtn, buildBtnText]);

        this.scene.sleep("FarmHUD");
    }

    toggleBuildWindow() {
        buildVisible = !buildVisible;

        var buildContainer = this.Farm.buildContainer;
        // console.log(buildContainer);

        if (buildVisible) {
            buildContainer.visible = true;
        } else {
            buildContainer.visible = false;
        }
    }

    update(time, delta) {
        // controls.update(delta);
    }
}

export default FarmHUD;