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
    const title = scene.add.text(0, 0, name);
    this.add(title);
    const descText = scene.add.text(0, 0, desc);
    this.add(descText);
  }
}