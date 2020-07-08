import Phaser from 'phaser';

// const formatValue = (value) => `Value: ${value}`;

export default class ShopMenu extends Phaser.GameObjects.Text
{
 constructor(scene, x, y, value, style)
 {
   super(scene, x, y, style);

   this.value = value;
 } 

 setValue(value)
 {
   this.value = value;
   this.updateValueText();
 }

 updateValueText()
 {
  //  this.setText(formatValue(this.value));
 }
}