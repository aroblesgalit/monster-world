import Phaser from "phaser";

class Farm extends Phaser.Scene {
    constructor() {
        super({ key: "Farm" });
    }

    preload() {
        this.load.image("farm", "Assets/farm.png");
    }
}

export default Farm;