import Phaser from "phaser";
import { Board, MiniBoard } from "phaser4-rex-plugins/plugins/board-components";
import { InventoryTileView } from "./TileView";
import { TileView } from "@/Tile/View";
import { Tiles } from "@/Tiles/Model";
import { InventoryModel } from "./Model";
import { BoardViewCoordinateCalculator } from "@/board/BoardViewCoordinateCalculator";
import { Tile } from "@/Tile/Model";
import { INVENTORY_DEPTH } from "@/layor";
export class InventoryView extends MiniBoard {
  private item: InventoryTileView;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: MiniBoard.IConfig,
    board: Board<Phaser.GameObjects.GameObject>,
    private readonly tiles: Tiles,
    private readonly inventoryModel: InventoryModel,
    boardViewCoordinateCalculator: BoardViewCoordinateCalculator,
  ) {
    super(scene, x, y, config);
    scene.add.existing(this);

    this.item = new InventoryTileView(
      scene,
      0,
      0,
      (scene) => new TileView(scene, "u"),
      0,
    );

    inventoryModel.addListener("updateAmount", (amount: number) => {
      this.item.updateAmount(amount);
    });
    this.addChess(this.item, 0, 0, 0);
    this.item.setInteractive();
    this.setDepth(INVENTORY_DEPTH);
    this.setScrollFactor(0, 0);
    scene.input.setDraggable(this.item);
    let clone: TileView | undefined = undefined;
    this.item.on("dragstart", () => {
      if (this.inventoryModel.getAmount() === 0) {
        return;
      }
      clone = this.item.createCloneForDrop();
      clone.setDepth(1000);
    });
    this.item.on("drag", (pointer: Phaser.Input.Pointer) => {
      if (clone === undefined) return;
      clone.setX(pointer.worldX);
      clone.setY(pointer.worldY);
    });
    this.item.on("dragend", (pointer: Phaser.Input.Pointer) => {
      if (clone === undefined) return;
      clone.destroy();
      clone = undefined;
      const tileXY = board.worldXYToTileXY(pointer.worldX, pointer.worldY);
      if (boardViewCoordinateCalculator.isOutside(tileXY)) {
        return;
      }
      tiles.setTile(tileXY.x, tileXY.y, new Tile("u"));
      inventoryModel.useTile();
    });
    this.tiles.addListener("destroy", (tile: Tile) =>
      inventoryModel.addTile(1),
    );
  }
}