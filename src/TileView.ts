import Phaser from "phaser";
import { CELL_SIZE_PX } from "./constants.ts";
import { Direction } from "./Direction.ts";
const CELL_COLOR = {
  d: 0xff0000,
  u: 0x00ff00,
  r: 0x0000ff,
  l: 0x00ffff,
} as const satisfies Record<Direction, number>;

export class TileView extends Phaser.GameObjects.Container {
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
    sprite.setOrigin(0, 0);
    this.add(sprite);
    this.setSize(sprite.width, sprite.height);
  }
}
