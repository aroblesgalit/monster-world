import Object from "./Object";

class Crop extends Object{

  static layer = "plants";
  static tilesetOffset = 1;
  static tileIndex = 48;

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
}

export default Crop