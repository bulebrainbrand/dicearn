import { Direction } from "@/Direction";
import { AbstructDirectionTileView } from "../AbstructTile/View";
import { DirectionTileDrawer } from "../DirectionTileDrawer";

export class NormalTileView extends AbstructDirectionTileView {
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