import Phaser from "phaser";
import { ACTUAL_CELL_SIZE_PX } from "@/constants.ts";
import { Direction } from "@/Direction.ts";
import { TileView } from "../types";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { MarkIconDrawer } from "./MarkTileIconDrawer";

export class MarkTileView
  extends Phaser.GameObjects.Container
  implements TileView
{
  private graphics: Phaser.GameObjects.Graphics;
  readonly name: string = "mark";
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    private readonly directionTileDrawer: DirectionTileDrawer,
    private readonly getaIconDrawer: MarkIconDrawer,
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
    this.getaIconDrawer.draw(g);
  }
  changeDirection(dir: Direction): void {
    this.drawTile(dir);
  }
}