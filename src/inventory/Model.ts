import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";

export class InventoryModel extends EventEmitter {
  private tileAmount: number;
  constructor() {
    super();
    this.tileAmount = 0;
  }
  addTile(amount: number) {
    this.tileAmount += amount;
    this.emit("updateAmount", this.tileAmount);
  }
  useTile() {
    this.tileAmount--;
    this.emit("updateAmount", this.tileAmount);
  }
  getAmount() {
    return this.tileAmount;
  }
}