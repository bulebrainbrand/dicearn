import Phaser from "phaser";
import { Direction } from "@/Direction.ts";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { StopIconDrawer } from "./StopTileIconDrawer";
import { AbstractDirectionTileView } from "../AbstractTile/View";

export class StopTileView extends AbstractDirectionTileView {
  readonly name: string = "stop";
  private readonly stopIconDrawer: StopIconDrawer;
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    directionTileDrawer: DirectionTileDrawer,
    stopIconDrawer: StopIconDrawer,
  ) {
    super(scene, directionTileDrawer);
    this.stopIconDrawer = stopIconDrawer;
    this.drawTile(dir);
  }
  protected drawTile(dir: Direction): void {
    super.drawTile(dir);
    this.stopIconDrawer.draw(this.graphics);
  }
}