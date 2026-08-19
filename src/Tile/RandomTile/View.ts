import Phaser from "phaser";
import { AbstractTileView } from "../AbstractTile/View";
import { TileDrawer } from "../TileDrawer";

export class RandomTileView extends AbstractTileView {
  readonly name = "random";
  constructor(scene: Phaser.Scene, tileDrawer: TileDrawer) {
    super(scene, tileDrawer);
    this.add(this.scene.add.image(0, 0, "random_tile_icon"));
    this.drawTile();
  }
  protected drawTile(): void {
    super.drawTile();
  }
}