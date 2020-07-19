
class Crop{

  static layer = "plants";
  static tilesetOffset = 1;
  static object = 48;

  constructor(type){
    this.type = type;
    this.plantTime = Date.now();
  }

  // Check if Object can be placed
  // static methods allow us to call the Crop method, before creating a new Crop.
  static canPlace(grassPlatform, dirtLayer, x, y){
    const grassTile = grassPlatform.getTileAt(x, y);
    const groundTile = dirtLayer.getTileAt(x, y);

    if(grassTile && groundTile && grassTile.index===26 && groundTile.properties["Contiguous"])
      {return true;}
    return false;
  }

  static put(map, x, y){
    let mapLayer = map.getLayer(this.layer).tilemapLayer;
    let placed =  mapLayer.putTileAtWorldXY(this.object+this.tilesetOffset, x, y);
    // weird that this next part isn't done automatically;
    placed.properties = (placed.tileset.tileProperties[this.object]);
  }
}

export default Crop