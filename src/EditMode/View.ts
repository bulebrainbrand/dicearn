import Phaser from "phaser";
import { EditMode } from "./Model";

export class EditModeButton extends Phaser.GameObjects.Container {
  private button: Phaser.GameObjects.Rectangle;
  constructor(scene: Phaser.Scene, x: number, y: number, model: EditMode) {
    super(scene, x, y);
    scene.add.existing(this);
    const button = scene.add.rectangle(0, 0, 256, 128, 0xffffcc);
    this.button = button;
    this.setSize(button.width, button.height);
    this.setInteractive();
    this.on("pointerdown", () => {
      if (model.getEditMode() === false) {
        model.enable();
      } else {
        model.disable();
      }
    });
    model.on("disable", () => {
      this.disable();
    });
    model.on("enable", () => {
      this.enable();
    });
    this.add(button);
  }
  disable() {
    this.button.fillColor = 0xffffcc;
  }
  enable() {
    this.button.fillColor = 0xccffff;
  }
}