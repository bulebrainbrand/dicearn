import { ACTUAL_CELL_SIZE_PX } from "@/constants";
import { BoardSizeValues } from "@/types";
import Phaser from "phaser";

export class BoardBorder extends Phaser.GameObjects.Container {
  private g: Phaser.GameObjects.Graphics;
  constructor(
    scene: Phaser.Scene,
    private readonly color: number,
    x?: number,
    y?: number,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.cameras.getCamera("UI")?.ignore(this);
    this.g = scene.add.graphics();
    this.add(this.g);
  }
  updateSize({ minX, minY, maxX, maxY }: BoardSizeValues) {
    const g = this.g;
    g.clear();
    const left = minX * ACTUAL_CELL_SIZE_PX - ACTUAL_CELL_SIZE_PX / 2;
    const top = minY * ACTUAL_CELL_SIZE_PX - ACTUAL_CELL_SIZE_PX / 2;
    const right = maxX * ACTUAL_CELL_SIZE_PX + ACTUAL_CELL_SIZE_PX / 2;
    const bottom = maxY * ACTUAL_CELL_SIZE_PX + ACTUAL_CELL_SIZE_PX / 2;
    g.lineStyle(8, this.color);
    g.moveTo(left, top);
    g.lineTo(left, bottom);
    g.lineTo(right, bottom);
    g.lineTo(right, top);
    g.lineTo(left, top);
    g.lineTo(left, bottom);
    g.stroke();
  }
}