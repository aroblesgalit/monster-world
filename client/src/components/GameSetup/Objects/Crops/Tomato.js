import Crop from "../crops";

class Tomato extends Crop{

  constructor(type,  tile){
    super(type, Tomato, tile);
  }

  // Static Variables
  static Class = Tomato;
  static objName = "Tomato";
  static layer = "plants";
  static tilesetOffset = 85+48;
  static tileIndex = 0;
  static tileHeight = 64;
  static tileWidth = 32;
  static phases = [0, 9, 18, 27];
  static phaseLength = 6000;
  static postHarvestPhase = 1;

  // Object Image Settings
  static imageLoc = "Assets/Objects/objects.png";
  static baseIndex = 0;
}

export default Tomato