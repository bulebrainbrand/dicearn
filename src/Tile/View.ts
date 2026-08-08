import Phaser from "phaser";
import { CELL_SIZE_PX } from "@/constants.ts";
import { Direction } from "@/Direction.ts";
import { CELL_COLOR } from "@/Tile/constants";

export class TileView extends Phaser.GameObjects.Container {
  private sprite: Phaser.GameObjects.Rectangle;
  constructor(scene: Phaser.Scene, dir: Direction) {
    super(scene, 0, 0);
    scene.add.existing(this);
    const sprite = scene.add.rectangle(
      0,
      0,
      CELL_SIZE_PX,
      CELL_SIZE_PX,
      CELL_COLOR[dir],
    );
    this.sprite = sprite;
    this.add(sprite);
    this.setSize(sprite.width, sprite.height);
  }
  changeDirection(dir: Direction): void {
    this.sprite.setFillStyle(CELL_COLOR[dir]);
  }
}