import { Scene } from "phaser";

class Inventory extends Scene{
  
  constructor(){
    super({key: "Inventory" });
    this.inventory = {};
  }

  addItem(item, count){
    if(this.inventory[item]){
      this.inventory[item]+=count;
    }
    else {
      this.inventory[item] = count;
    }
  }

  removeItem(item, count){
    if(this.inventory[item]){
      this.inventory[item]-=count;
    }
    else {
      this.inventory[item] = 0;
    }
  }

}

export default Inventory