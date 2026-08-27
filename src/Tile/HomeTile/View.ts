import Phaser from "phaser";
import { Direction } from "@/Direction.ts";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { AbstractDirectionTileView } from "../AbstractTile/View";

export class HomeTileView extends AbstractDirectionTileView {
  readonly name: string = "home";
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    directionTileDrawer: DirectionTileDrawer,
  ) {
    super(scene, directionTileDrawer);
    this.drawTile(dir);
  }
}