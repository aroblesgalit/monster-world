import Phaser from "phaser";

class BuildWindow extends Phaser.Scene {
    constructor(game) {
        super({ key: "BuildWindow" });
        var game = game;
    }

    preload() {
        this.load.image("buildWindow", "Assets/build_window.png");
        this.load.image("dirt2", "Assets/dirt2.png");
        this.load.image("seeds", "Assets/seeds.png");
    }

    create() {
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
    }
}

export default BuildWindow;