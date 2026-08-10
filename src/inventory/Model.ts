import { TileNameUnion } from "@/Tile/TileDifinition";
import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
export type InventoryItemName = TileNameUnion;
export type InventoryModelEvent = {
  newItem: { name: InventoryItemName; index: number; amount: number };
  updateAmount: { name: InventoryItemName; amount: number };
};
type InventoryData = Partial<
  Record<InventoryItemName, { amount: number; index: number }>
>;
export class InventoryModel extends EventEmitter {
  private tileAmounts: InventoryData;
  private index: number = 0;
  constructor() {
    super();
    this.tileAmounts = {};
  }
  addTile(name: InventoryItemName, amount: number) {
    if (this.tileAmounts[name] === undefined) {
      this.tileAmounts[name] = { amount, index: this.index++ };
      this.emit("newItem", {
        name,
        index: this.tileAmounts[name].index,
        amount,
      } satisfies InventoryModelEvent["newItem"]);
      return;
    }
    this.tileAmounts[name].amount += amount;
    this.emit("updateAmount", {
      name,
      amount: this.tileAmounts[name].amount,
    } satisfies InventoryModelEvent["updateAmount"]);
  }
  useTile(name: InventoryItemName) {
    if (this.tileAmounts[name] === undefined)
      throw new TypeError(`unexpected inventory name "${name}"`);
    if (this.tileAmounts[name].amount === 0)
      throw new TypeError(`can't use tile when tile amount is 0`);
    this.tileAmounts[name].amount--;
    this.emit("updateAmount", {
      name,
      amount: this.tileAmounts[name].amount,
    } satisfies InventoryModelEvent["updateAmount"]);
  }
  getAmount(name: InventoryItemName): number {
    if (this.tileAmounts[name] === undefined) return 0;
    return this.tileAmounts[name].amount;
  }
  getIndex(name: InventoryItemName): number {
    if (this.tileAmounts[name] === undefined) return 0;
    return this.tileAmounts[name].index;
  }
  getAmounts(): Readonly<InventoryData> {
    return this.tileAmounts;
  }
}