import { Direction } from "@/Direction";
import { AbstractDirectionTileView } from "../AbstractTile/View";
import { DirectionTileDrawer } from "../DirectionTileDrawer";

export class NormalTileView extends AbstractDirectionTileView {
  readonly name = "normal";
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    directionTileDrawer: DirectionTileDrawer,
  ) {
    super(scene, directionTileDrawer);
    this.drawTile(dir);
  }
}