import Phaser from "phaser";
import { ACTUAL_CELL_SIZE_PX } from "@/constants.ts";
import { Direction } from "@/Direction.ts";
import { TileView } from "../types";
import { DirectionTileDrawer } from "../DirectionTileDrawer";

export class NormalTileView
  extends Phaser.GameObjects.Container
  implements TileView
{
  private graphics: Phaser.GameObjects.Graphics;
  readonly name: string = "normal";
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    private readonly directionTileDrawer: DirectionTileDrawer,
  ) {
    super(scene, 0, 0);
    scene.add.existing(this);
    const graphics = scene.add.graphics();
    this.graphics = graphics;
    this.add(graphics);
    this.drawTile(dir);
    this.setSize(ACTUAL_CELL_SIZE_PX, ACTUAL_CELL_SIZE_PX);
  }
  private drawTile(dir: Direction): void {
    const g = this.graphics;
    g.clear();
    this.directionTileDrawer.draw(g, dir);
  }
  changeDirection(dir: Direction): void {
    this.drawTile(dir);
  }
}