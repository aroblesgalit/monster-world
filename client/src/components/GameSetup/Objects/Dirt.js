import helpers from "./helpers";
import farmObject from "./Object";

class Dirt extends farmObject{
  static layer = "dirt";
  static tilesetOffset = 85;
  static tileIndex = 12

  static imageKey = "dirt";
  static imageLoc = "Assets/dirt2.png";
  static baseIndex = 0;

  constructor(type){
    super(type);
  }

  // Check if Object can be placed
  // static methods allow us to call the Crop method, before creating a new Crop.
  static canPlace(grassPlatform, dirtLayer, plantLayer, x, y){
    const grassTile = grassPlatform.getTileAt(x, y);
    const groundTile = dirtLayer.getTileAt(x, y);

    if(grassTile && groundTile && grassTile.index===26 && groundTile.index===this.tilesetOffset)
      {return true;}
    return false;
  }

  static put(map, x, y){
    let mapLayer = map.getLayer(this.layer).tilemapLayer;
    let placed =  mapLayer.putTileAtWorldXY(this.tileIndex+this.tilesetOffset, x, y);
    // weird that this next part isn't done automatically;
    placed.properties = (placed.tileset.tileProperties[this.tileIndex]);

    helpers.checkContig(placed, mapLayer, this.tilesetOffset);
    return {type:"dirt", data: ""};
  }
}

export default Dirt