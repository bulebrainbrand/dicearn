import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
export type MoneyModelEvent = { updateMoney: { money: number; diff: number } };
export class MoneyModel extends EventEmitter {
  private money: number;
  constructor(defaultMoney: number) {
    super();
    if (!Number.isFinite(defaultMoney) || defaultMoney < 0)
      throw new TypeError(`defaultMoney must be finite and non-negative`);
    this.money = defaultMoney;
  }
  public applyMoney(amount: number) {
    if (!Number.isFinite(amount))
      throw new TypeError(`amount must be finite`);
    const nextMoney = this.money + amount;
    if (!Number.isFinite(nextMoney) || nextMoney < 0)
      throw new TypeError(`can't make money negative`);
    this.money = nextMoney;
    this.emit("updateMoney", {
      money: this.money,
      diff: amount,
    } satisfies MoneyModelEvent["updateMoney"]);
  }
  public getMoney(): number {
    return this.money;
  }
}