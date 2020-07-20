import Object from "./Object";

class Crop extends Object{

  static layer = "plants";
  static tilesetOffset = 85+48;
  static tileIndex = 0;
  static tileHeight = 64;
  static tileWidth = 32;
  static phases = [0, 9, 18, 27];

  constructor(type, tile){
    super();
    this.type = type;
    this.tile = tile;
    this.plantTime = Date.now();
    this.phase = 0;
    this.nextPhase = this.plantTime+3000;
    this.phases = [0, 9, 18, 27];
    this.harvestable = false;
  }

  // Check if Object can be placed
  // static methods allow us to call the Crop method, before creating a new Crop.
  static canPlace(grassPlatform, dirtLayer, plantLayer, x, y){
    const grassTile = grassPlatform.getTileAt(x, y);
    const groundTile = dirtLayer.getTileAt(x, y);
    const plantTile = plantLayer.getTileAt(x, y);
    //console.log(grassTile, groundTile, plantTile);

    if(grassTile && groundTile && !plantTile && grassTile.index===26 && groundTile.properties["Contiguous"])
      {return true;}
    return false;
  }

  static put(map, x, y){
    let mapLayer = map.getLayer(this.layer).tilemapLayer;
    y-=(this.tileHeight-32);
    let placed =  mapLayer.putTileAtWorldXY(this.tileIndex+this.tilesetOffset, x, y);
    placed.properties = (placed.tileset.tileProperties[this.tileIndex]);
    placed.setSize(this.tileWidth, this.tileHeight, 32, 32)
    console.log(placed);

    // send back new instance of a Crop to be stored
    return {type:"crop", data: new Crop('tomato', placed)};
  }

  update(time, delta){
    if (Date.now()>this.nextPhase && this.phase+1 < this.phases.length){
      this.phase+=1;
      this.tile.index = 85+48+this.phases[this.phase];
      this.nextPhase += 3000;
    }
    else if(this.phase+1 == this.phases.length){
      this.harvestable = true;
    }
  }

}

export default Crop