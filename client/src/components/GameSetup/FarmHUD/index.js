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
    }
}

export default FarmHUD;