import Crop from "../crops";

class Carrot extends Crop{

  constructor(type,  tile){
    super(type, Carrot, tile);
  }

  // Static Variables
  static Class = Carrot;
  static objName = "Carrot";
  static layer = "plants";
  static tilesetOffset = 85+48;
  static tileIndex = 0;
  static tileHeight = 64;
  static tileWidth = 32;
  static phases = [2, 11, 20, 29];
  static phaseLength = 1000;

  static imageLoc = "Assets/tilesets/plants.png";
  static baseIndex = 47;
}

export default Carrot