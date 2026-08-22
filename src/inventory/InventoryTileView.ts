import Phaser from "phaser";
import { TileFactory, TileView } from "@/Tile/types";
import { InventoryTileView as IInventoryTileView } from "./types";
import { TileModelUnion } from "@/Tile/TileDifinition";
import { INK_COLOR } from "@/colors";
import { FONT_FAMILY } from "@/constants";

export class InventoryTileView
  extends Phaser.GameObjects.Container
  implements IInventoryTileView
{
  tileView: TileView;
  private text: Phaser.GameObjects.Text;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private tileViewFactory: TileFactory<TileModelUnion, TileView>,
    amount: number,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const tileView = tileViewFactory.view(scene);
    // なんかinteractiveじゃなくしたらInventoryViewのdrag(InventoryTileViewのdragイベントが発動する)がきく。恐らく、tileViewがContainerより上にあるせいで、こいつがinputを吸ってる
    tileView.disableInteractive();
    this.add(tileView);
    this.tileView = tileView;
    this.text = scene.add
      .text(60, 80, String(amount), {
        color: INK_COLOR,
        fontSize: "64px",
        fontFamily: FONT_FAMILY,
      })
      .setOrigin(1, 1);
    this.add(this.text);
    this.setSize(tileView.width, tileView.height);
  }
  createTileModelForTiles(): TileModelUnion {
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