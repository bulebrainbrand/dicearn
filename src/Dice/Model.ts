import type { DiceResultCalculator } from "@/DiceResultCalculator";
import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";

export class DiceModel extends EventEmitter {
  private _canRoll: boolean = true;
  constructor(private readonly diceResultCalculator: DiceResultCalculator) {
    super();
  }
  disable() {
    if (this._canRoll === false) return;
    this._canRoll = false;
    this.emit("disableRoll");
  }
  enable() {
    if (this._canRoll === true) return;
    this._canRoll = true;
    this.emit("enableRoll");
  }
  roll() {
    if (this._canRoll === false) throw new TypeError(`can't roll dice now!`);
    const result = this.diceResultCalculator.roll();
    this.emit("roll", result);
  }
  canRoll() {
    return this._canRoll;
  }
}