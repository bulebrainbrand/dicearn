import Phaser from "phaser";
import { TileFactory, TileModel, TileView } from "@/Tile/types";
import { InventoryTileView } from "./types";
import { NormalTileView } from "@/Tile/NormalTile/View";

export class NormalInventoryTileView
  extends Phaser.GameObjects.Container
  implements InventoryTileView
{
  tileView: TileView;
  private text: Phaser.GameObjects.Text;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private tileViewFactory: TileFactory<TileModel, NormalTileView>,
    amount: number,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const tileView = tileViewFactory.view(scene);
    this.add(tileView);
    this.tileView = tileView;
    this.text = scene.add.text(0, 0, String(amount), {
      color: "#000000",
      fontSize: 128,
    });
    this.add(this.text);
    this.setSize(tileView.width, tileView.height);
  }
  createTileModelForTiles(): TileModel {
    return this.tileViewFactory.model();
  }
  updateAmount(amount: number) {
    this.text.text = String(amount);
    if (amount === 0) {
      this.tileView.setAlpha(0.5);
    } else {
      this.tileView.setAlpha(1);
    }
  }
  createClone() {
    const tile = this.tileViewFactory.view(this.scene);
    this.scene.add.existing(tile);
    return tile;
  }
}