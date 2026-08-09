import Phaser from "phaser";
import { Board, MiniBoard } from "phaser4-rex-plugins/plugins/board-components";
import { TileView } from "@/Tile/types";
import { Tiles } from "@/Tiles/Model";
import { InventoryModel } from "./Model";
import { BoardViewCoordinateCalculator } from "@/board/BoardViewCoordinateCalculator";
import { INVENTORY_DEPTH } from "@/layor";
import { InventoryTileView, InventoryTileViewFactory } from "./types";

export class InventoryView extends MiniBoard {
  private items: Record<string, InventoryTileView>;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: MiniBoard.IConfig,
    private readonly board: Board<Phaser.GameObjects.GameObject>,
    private readonly tiles: Tiles,
    private readonly inventoryModel: InventoryModel,
    private readonly inventoryTileViewFactory: InventoryTileViewFactory,
    private readonly boardViewCoordinateCalculator: BoardViewCoordinateCalculator,
  ) {
    super(scene, x, y, config);
    scene.add.existing(this);

    this.items = {};

    inventoryModel.addListener(
      "updateAmount",
      (name: string, amount: number) => {
        this.items[name].updateAmount(amount);
      },
    );
    inventoryModel.addListener(
      "newItem",
      (name: string, index: number, amount: number) => {
        this.createItem(name, amount, index);
      },
    );
    this.setDepth(INVENTORY_DEPTH);
    this.setScrollFactor(0, 0);
  }
  private makeInventoryTileViewPlacable(name: string, item: InventoryTileView) {
    item.setDepth(INVENTORY_DEPTH);
    item.setInteractive({ draggable: true });
    let clone: TileView | undefined = undefined;
    item.on("dragstart", () => {
      if (this.inventoryModel.getAmount(name) === 0) {
        return;
      }
      clone = item.createClone();
      clone.setDepth(1000);
    });
    item.on("drag", (pointer: Phaser.Input.Pointer) => {
      if (clone === undefined) return;
      clone.setX(pointer.worldX);
      clone.setY(pointer.worldY);
    });
    item.on("dragend", (pointer: Phaser.Input.Pointer) => {
      if (clone === undefined) return;
      clone.destroy();
      clone = undefined;
      const tileXY = this.board.worldXYToTileXY(pointer.worldX, pointer.worldY);
      if (this.boardViewCoordinateCalculator.isOutside(tileXY)) {
        return;
      }
      if (this.inventoryModel.getAmount(name) === 0) {
        return;
      }
      this.inventoryModel.useTile(name);
      this.tiles.setTile(tileXY.x, tileXY.y, item.createTileModelForTiles());
    });
  }
  private createItem(name: string, amount: number, index: number) {
    if (this.items[name] !== undefined) return;
    const inventoryTileView = this.inventoryTileViewFactory.create(name);
    this.addChess(inventoryTileView, index, 0, 0);
    this.makeInventoryTileViewPlacable(name, inventoryTileView);
    inventoryTileView.updateAmount(amount);
    this.items[name] = inventoryTileView;
  }
}