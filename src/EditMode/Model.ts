import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";

export class EditMode extends EventEmitter {
  private isEditMode: boolean = false;
  constructor() {
    super();
  }
  enable() {
    if (this.isEditMode === true) return;
    this.isEditMode = true;
    this.emit("enable");
  }
  disable() {
    if (this.isEditMode === false) return;
    this.isEditMode = false;
    this.emit("disable");
  }
  getEditMode() {
    return this.isEditMode;
  }
}