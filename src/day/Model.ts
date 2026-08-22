import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";

export class DayModel extends EventEmitter {
  private day: number = 0;
  constructor() {
    super();
  }
  nextDay() {
    this.day += 1;
    this.emit("nextDay", this.day);
  }
  getDay() {
    return this.day;
  }
}