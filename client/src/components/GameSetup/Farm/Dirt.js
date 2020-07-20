import helpers from "./helpers";
import Object from "./Object";

class Dirt extends Object{
  static layer = "dirt";
  static tilesetOffset = 85;
  static tileIndex = 12

  constructor(type){
    this.type = type;
  }

  // Check if Object can be placed
  // static methods allow us to call the Crop method, before creating a new Crop.
  static canPlace(grassPlatform, dirtLayer, x, y){
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
  }
}

export default Dirt