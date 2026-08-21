import Phaser from "phaser";
import { AbstractTileView } from "../AbstractTile/View";
import { TileDrawer } from "../TileDrawer";

export class DizzyTileView extends AbstractTileView {
  readonly name = "dizzy";
  constructor(scene: Phaser.Scene, tileDrawer: TileDrawer) {
    super(scene, tileDrawer);
    this.add(this.scene.add.image(0, 0, "dizzy_tile_icon"));
    this.drawTile();
  }
  protected drawTile(): void {
    super.drawTile();
  }
}