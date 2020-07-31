import { Scene } from "phaser";

class Inventory extends Scene{
  
  constructor(){
    super({key: "Inventory" });
    this.inventory = [];
  }

  addItem(item, count){
    let invItem = this.inventory.find(el => el.name == item.objName);

    // add new item if it is not already in the inventory;
    if(!invItem){
      this.inventory.push(this.makeItem(item, count));
      invItem = this.inventory.find(el => el.name == item.objName);
    }
    invItem.count+=count;
  }

  removeItem(item, count){
    let invItem = this.inventory.find(el => el.name == item.objName);
    if(!invItem){ return }
    this.inventory[item.objName].count = 0;
  }

  makeItem(item){
    return {name:item.objName, Class: item, count:0};
  }

}

export default Inventory