import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { DAY_NEEDS_MANEY } from "./constants";

export class DayModel extends EventEmitter {
  private day: number = 0;
  constructor() {
    super();
  }
  nextDay() {
    this.day += 1;
    this.emit("nextDay", this.day);
    if (DAY_NEEDS_MANEY[this.day]) {
      this.emit("checkMoney", DAY_NEEDS_MANEY[this.day]);
    }
  }
  getDay() {
    return this.day;
  }
}
