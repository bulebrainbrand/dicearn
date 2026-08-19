import Phaser from "phaser";
import { Direction } from "@/Direction.ts";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { GetaIconDrawer } from "./GetaTileIconDrawer";
import { AbstractDirectionTileView } from "../AbstractTile/View";

export class GetaTileView extends AbstractDirectionTileView {
  readonly name = "geta";
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    directionTileDrawer: DirectionTileDrawer,
    private readonly getaIconDrawer: GetaIconDrawer,
  ) {
    super(scene, directionTileDrawer);
    this.drawTile(dir);
  }
  protected drawTile(dir: Direction): void {
    super.drawTile(dir);
    const g = this.graphics;
    this.getaIconDrawer.draw(g);
  }
}