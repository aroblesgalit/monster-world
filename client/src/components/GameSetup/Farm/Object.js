
class Object{

  static layer;
  static tilesetOffset;
  static tileIndex;
  static tileHeight = 32;
  static tileWidth = 32;


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
}

export default Object