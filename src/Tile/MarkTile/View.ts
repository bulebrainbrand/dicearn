import Phaser from "phaser";
import { Direction } from "@/Direction.ts";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { MarkIconDrawer } from "./MarkTileIconDrawer";
import { AbstructDirectionTileView } from "../AbstructTile/View";

export class MarkTileView extends AbstructDirectionTileView {
  readonly name: string = "mark";
  private readonly getaIconDrawer: MarkIconDrawer;
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    directionTileDrawer: DirectionTileDrawer,
    getaIconDrawer: MarkIconDrawer,
  ) {
    super(scene, directionTileDrawer);
    this.getaIconDrawer = getaIconDrawer;
    this.drawTile(dir);
  }
  protected drawTile(dir: Direction): void {
    super.drawTile(dir);
    this.getaIconDrawer.draw(this.graphics);
  }
}