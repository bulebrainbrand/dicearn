import { INK_COLOR } from "@/colors";
import Phaser from "phaser";

export class RewordView extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    desc: string,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const title = scene.add.text(0, 0, name, {
      fontSize: 256,
      color: INK_COLOR,
    });
    this.add(title);
    const descText = scene.add.text(0, 0, desc, {
      fontSize: 128,
      color: INK_COLOR,
    });
    this.add(descText);
    this.setSize(100, 300);
  }
}