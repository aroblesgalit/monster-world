import Inventory from "../Inventory";

class farmObject{

  static layer;
  static tilesetOffset;
  static tileIndex;
  static tileHeight = 32;
  static tileWidth = 32;
  //static crop = [0,0,this.tileHeight,this.tileWidth];

  // Object Image Settings
  static imageHeight = 32;
  static imageWidth = 32;
  static inventory = new Inventory();

  // static HUDdata = this.game.get("HeadsUpDisplay").data;
  // static inv = farmObject.HUDdata.get('inventory');


  constructor(type){
    this.type = type;
  }

  // Check if Object can be placed
  // static methods allow us to call the Crop method, before creating a new Crop.
  static canPlace(grassPlatform, dirtLayer, plantLayer, x, y){
    const grassTile = grassPlatform.getTileAt(x, y);
    const groundTile = dirtLayer.getTileAt(x, y);

    if(grassTile && groundTile && grassTile.index===26 && groundTile.properties["Contiguous"])
      {return true;}
    return false;
  }

  static put(map, x, y){
    let mapLayer = map.getLayer(this.layer).tilemapLayer;
    y-=(this.tileHeight-32);
    let placed =  mapLayer.putTileAtWorldXY(this.tileIndex+this.tilesetOffset, x, y);
    placed.properties = (placed.tileset.tileProperties[this.tileIndex]);
    placed.setSize(this.tileWidth, this.tileHeight, 32, 32)
  }

  // remove the item tile from the tilemap
  remove(cropsArray){
    this.tile.tilemap.removeTile(this.tile);
    this.tile = null;
  }

 // Load image, then immmidiatly callback createImage, place it on screen, and return the image to the file.
  static loadImage(scene){
    scene.load.spritesheet(this.objName, this.imageLoc, {frameWidth:this.imageWidth, frameHeight:this.imageHeight})
  }

  static getImage(scene, x, y){
    let image = scene.add.sprite(x , y, this.objName)
    image.setFrame(this.baseIndex);
    // crop of data if needed
    //image.setSize(30, 30, true);
    image.setOrigin(0);
    // image.body.setOffset(-32,0);
    //image.setDisplayOrigin( 16, 50)
    return image;
  }

  static getInventory(){
    return this.inventory;
  }
}


export default farmObject