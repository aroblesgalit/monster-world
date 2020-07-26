import Crop from "../crops";

class Potato extends Crop{

  constructor(type,  tile){
    super(type, Potato, tile);
  }

  // Static Variables
  static Class = Potato;
  static plantName = "Potato";
  static layer = "plants";
  static tilesetOffset = 85+48;
  static tileIndex = 0;
  static tileHeight = 64;
  static tileWidth = 32;
  static phases = [1, 10, 19, 28];
  static phaseLength = 3000;

  static imageKey = "potato";
  static imageLoc = "Assets/tilesets/plants.png";
  static baseIndex = 46;
}

export default Potato