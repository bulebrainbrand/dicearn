import Phaser from "phaser";
import { Direction } from "@/Direction.ts";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { AbstractDirectionTileView } from "../AbstractTile/View";

export class StoneTileView extends AbstractDirectionTileView {
  readonly name: string = "stone";
  private image: Phaser.GameObjects.Image;
  constructor(
    scene: Phaser.Scene,
    dir: Direction,
    directionTileDrawer: DirectionTileDrawer,
  ) {
    super(scene, directionTileDrawer);
    this.image = this.scene.add.image(0, 0, "stone_tile_0_icon");
    this.add(this.image);
    this.drawTile(dir);
  }
  changeCount(count: 0 | 1 | 2) {
    this.image.destroy();
    this.image = this.scene.add.image(0, 0, `stone_tile_${count}_icon`);
    this.add(this.image);
  }
  protected drawTile(dir: Direction): void {
    super.drawTile(dir);
  }
}