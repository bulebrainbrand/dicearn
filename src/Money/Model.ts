import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
export type MoneyModelEvent = { updateMoney: { money: number; diff: number } };
export class MoneyModel extends EventEmitter {
  private money: number;
  constructor(defaultMoney: number) {
    super();
    this.money = defaultMoney;
  }
  public applyMoney(amount: number) {
    if (this.money + amount < 0)
      throw new TypeError(`can't make money negative`);
    this.money += amount;
    this.emit("updateMoney", {
      money: this.money,
      diff: amount,
    } satisfies MoneyModelEvent["updateMoney"]);
  }
  public getMoney(): number {
    return this.money;
  }
}