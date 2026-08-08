import { TileView } from "@/Tile/View";
import Phaser from "phaser";

export class InventoryTileView extends Phaser.GameObjects.Container {
  tileView: TileView;
  private text: Phaser.GameObjects.Text;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private tileViewFactory: (scene: Phaser.Scene) => TileView,
    amount: number,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const tileView = tileViewFactory(scene);
    this.add(tileView);
    this.tileView = tileView;
    this.text = scene.add.text(0, 0, String(amount), {
      color: "#000000",
      fontSize: 128,
    });

    this.add(this.text);
    this.setSize(tileView.width, tileView.height);
  }
  updateAmount(amount: number) {
    this.text.text = String(amount);
    if (amount === 0) {
      this.tileView.setAlpha(0.5);
    } else {
      this.tileView.setAlpha(1);
    }
  }
  createCloneForDrop() {
    const tile = this.tileViewFactory(this.scene);
    this.scene.add.existing(tile);
    return tile;
  }
}