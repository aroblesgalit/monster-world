import Crop from "../crops";

class Potato extends Crop{

  constructor(type,  tile){
    super(type, Potato, tile);
  }

  // Static Variables
  static Class = Potato;
  static objName = "Potato";
  static layer = "plants";
  static tilesetOffset = 85+48;
  static tileIndex = 0;
  static tileHeight = 64;
  static tileWidth = 32;
  static phases = [1, 10, 19, 28];
  static phaseLength = 3000;
  static postHarvestPhase = 0;

  // Object Image Settings
  static imageLoc = "Assets/Objects/objects.png";
  static baseIndex = 1;
}

export default Potato