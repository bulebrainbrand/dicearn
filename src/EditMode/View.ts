import Phaser from "phaser";
import { EditMode } from "./Model";

export class EditModeButton extends Phaser.GameObjects.Container {
  private graphics: Phaser.GameObjects.Graphics;
  constructor(scene: Phaser.Scene, x: number, y: number, model: EditMode) {
    super(scene, x, y);
    scene.add.existing(this);
    const graphics = scene.add.graphics();
    graphics.fillStyle(0xffffcc, 1);
    const icon = scene.add.image(0, 0, "edit_button_icon");
    icon.setOrigin(0.5, 0.5);
    this.graphics = graphics;
    this.setSize(128, 128);
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
    this.add(graphics);
    this.add(icon);
    if (model.getEditMode() === true) {
      this.enable();
    } else {
      this.disable();
    }
  }
  disable() {
    this.graphics.clear();
    this.graphics.fillStyle(0xffffcc);
    this.graphics.fillRoundedRect(-64, -64, 128, 128, 16);
  }
  enable() {
    this.graphics.clear();
    this.graphics.fillStyle(0xccffff);
    this.graphics.fillRoundedRect(-64, -64, 128, 128, 16);
  }
}