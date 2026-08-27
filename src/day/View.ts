import { INK_COLOR } from "@/colors";
import { FONT_FAMILY } from "@/constants";
import Phaser from "phaser";

export class DayView extends Phaser.GameObjects.Container {
  private child: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene, x: number, y: number, day: number = 0) {
    super(scene, x, y);
    const sprite = scene.add.text(0, 0, `day${day + 1}`, {
      color: INK_COLOR,
      fontSize: "64px",
      fontFamily: FONT_FAMILY,
    });
    sprite.setOrigin(1, 0);
    this.add(sprite);
    this.child = sprite;
    scene.add.existing(this);
  }
  updateDay(day: number) {
    this.child.text = `day${day + 1}`;
  }
}