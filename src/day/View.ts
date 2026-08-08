import Phaser from "phaser";

export class DayView extends Phaser.GameObjects.Container {
  private child: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene, x: number, y: number, day: number = 0) {
    super(scene, x, y);
    const sprite = scene.add.text(0, 0, String(day), {
      color: "#000000",
      fontSize: "256px",
    });
    sprite.setOrigin(0.5, 0.5);
    this.setScrollFactor(0, 0);
    this.add(sprite);
    this.child = sprite;
    scene.add.existing(this);
  }
  updateDay(day: number) {
    this.child.text = `${day}`;
  }
}