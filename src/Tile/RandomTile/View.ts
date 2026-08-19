import Phaser from "phaser";
import { RandomIconDrawer } from "./RandomTileIconDrawer";
import { AbstractTileView } from "../AbstractTile/View";
import { TileDrawer } from "../TileDrawer";

export class RandomTileView extends AbstractTileView {
  readonly name = "random";
  constructor(
    scene: Phaser.Scene,
    tileDrawer: TileDrawer,
    private readonly getaIconDrawer: RandomIconDrawer,
  ) {
    super(scene, tileDrawer);
    this.drawTile();
  }
  protected drawTile(): void {
    super.drawTile();
    const g = this.graphics;
    this.getaIconDrawer.draw(g);
  }
}