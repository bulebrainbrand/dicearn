import Phaser from "phaser";
import { TileFactory, TileView } from "@/Tile/types";
import { InventoryTileView as IInventoryTileView } from "./types";
import { TileModelUnion } from "@/Tile/TileDifinition";

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
    this.text = scene.add.text(0, 0, String(amount), {
      color: "#000000",
      fontSize: 128,
    });
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
  getGameObjectsForCameraIgnore(): Phaser.GameObjects.GameObject[] {
    return [this, ...this.collectDescendants(this)];
  }
  private collectDescendants(
    container: Phaser.GameObjects.Container,
  ): Phaser.GameObjects.GameObject[] {
    return container.list.flatMap((child) =>
      child instanceof Phaser.GameObjects.Container
        ? [child, ...this.collectDescendants(child)]
        : [child],
    );
  }
}