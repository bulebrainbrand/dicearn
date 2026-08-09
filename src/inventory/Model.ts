import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { FIXME } from "untodo";
type InventoryData = Record<string, { amount: number; index: number }>;
export class InventoryModel extends EventEmitter {
  private tileAmounts: InventoryData;
  private index: number = 0;
  constructor() {
    super();
    this.tileAmounts = {};
  }
  addTile(name: string, amount: number) {
    if (this.has(name) === false) {
      this.tileAmounts[name] = { amount, index: this.index++ };
      this.emit(
        "newItem",
        name,
        this.tileAmounts[name].index,
        this.tileAmounts[name].amount,
      );
      return;
    }
    this.tileAmounts[name].amount += amount;
    this.emit("updateAmount", name, this.tileAmounts[name].amount);
    FIXME({ reason: "新規追加処理がない" });
  }
  useTile(name: string) {
    if (this.tileAmounts[name] === undefined)
      throw new TypeError(`unexpected inventory name "${name}"`);
    if (this.tileAmounts[name].amount === 0)
      throw new TypeError(`can't use tile when tile amount is 0`);
    this.tileAmounts[name].amount--;
    this.emit("updateAmount", name, this.tileAmounts[name].amount);
    FIXME({ reason: "nameが存在しない場合にエラーだがなんとかしたい" });
  }
  getAmount(name: string): number {
    if (this.tileAmounts[name] === undefined)
      throw new TypeError(`unexpected inventory name "${name}"`);
    return this.tileAmounts[name].amount;
  }
  getIndex(name: string): number {
    if (this.tileAmounts[name] === undefined)
      throw new TypeError(`unexpected inventory name "${name}"`);
    return this.tileAmounts[name].index;
  }
  has(name: string) {
    return Boolean(this.tileAmounts[name]);
  }
  getAmounts(): Readonly<InventoryData> {
    return this.tileAmounts;
  }
}