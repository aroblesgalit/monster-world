import farmObject from "./Object";

class Crop extends farmObject{

  constructor(type, Class, tile){
    super(type);
    this.Class = Class;
    this.tile = tile;
    this.plantTime = Date.now();
    this.phase = 0;
    this.nextPhase = this.plantTime+this.Class.phaseLength;
    this.harvestable = false;
  }

  static baseHarvest = 1;
  static additionalHarvest = 0;

 // static methods allow us to call the Crop method, before creating a new Crop.

  // Check if Object can be placed
  static canPlace(grassPlatform, dirtLayer, plantLayer, x, y){
    const grassTile = grassPlatform.getTileAt(x, y);
    const groundTile = dirtLayer.getTileAt(x, y);
    const plantTile = plantLayer.getTileAt(x, y);
    //console.log(grassTile, groundTile, plantTile);
    const doHave = this.inventory.getCount(this.Class) > 0;
    if(grassTile && groundTile && !plantTile && grassTile.index===26 && groundTile.properties["Contiguous"] && doHave)
      {return true;}
    return false;
  }


  // place the plant sprite on the tilemap, and return an instance of whichever plant it is
  static put(map, x, y){
    let mapLayer = map.getLayer(this.layer).tilemapLayer;
    y-=(this.tileHeight-32);
    let placed =  mapLayer.putTileAtWorldXY(this.tileIndex+this.tilesetOffset, x, y);
    placed.properties = (placed.tileset.tileProperties[this.tileIndex]);
    placed.setSize(this.tileWidth, this.tileHeight, 32, 32)

    // remove seed from inventory
    this.inventory.removeItem(this.Class, 1)

    // send back new instance of a Crop to be stored
    return {type:"crop", data: new this.Class(this.Class.plantName, placed)};
  }

  // The ability to harvest plants
  harvest(cropsArray){
    if(!this.harvestable){ return false}

    this.harvestable = false;
    this.nextPhase = Date.now()+this.Class.phaseLength;
    let harvestCount = this.Class.baseHarvest + Math.floor(Math.random()*(1+this.Class.additionalHarvest));
    console.log(harvestCount);
    Crop.inventory.addItem(this.Class, harvestCount);
    console.log(`Harvested ${this.Class.objName}`)
    console.log(Crop.inventory.inventory);
    this.phase=this.Class.postHarvestPhase;

    // remove plant if it doesnt keep growing
    if(this.phase >0){
      console.log("replanting");
      this.tile.index = this.Class.tilesetOffset+this.Class.phases[this.phase];
    }
    else{
      this.remove(cropsArray);
    }

    return harvestCount;
  }

  
  // check a placed crop, to see if it is at its next 
  update(time, delta){
    // end immediatly if the plant is fully grown
    if (this.harvestable || this.phase < 0) {return};


    //console.log(time, this.tile.tilemap.scene.game.getTime())
    if (Date.now()>this.nextPhase && this.phase+1 < this.Class.phases.length){
      this.phase+=1;
      this.tile.index = this.Class.tilesetOffset+this.Class.phases[this.phase];
      this.nextPhase += this.Class.phaseLength;
    }
    else if(this.phase+1 == this.Class.phases.length){
      this.harvestable = true;
    }
  }

}

export default Crop