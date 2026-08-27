import Phaser from "phaser";
import { Direction } from "@/Direction.ts";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { AbstractDirectionTileView } from "../AbstractTile/View";

export class LackTileView extends AbstractDirectionTileView {
  readonly name: string = "lack";
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    directionTileDrawer: DirectionTileDrawer,
  ) {
    super(scene, directionTileDrawer);
    this.add(this.scene.add.image(0, 0, "lack_tile_icon"));
    this.drawTile(dir);
  }
  protected drawTile(dir: Direction): void {
    super.drawTile(dir);
  }
}