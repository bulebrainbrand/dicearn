import Phaser from "phaser";
import { Board, MiniBoard } from "phaser4-rex-plugins/plugins/board-components";
import { TileView } from "@/Tile/types";
import { Tiles } from "@/Tiles/Model";
import {
  InventoryItemName,
  InventoryModel,
  InventoryModelEvent,
} from "./Model";
import { BoardViewCoordinateCalculator } from "@/board/BoardViewCoordinateCalculator";
import { DRAGGING_DEPTH_RANGE, INVENTORY_DEPTH_RANGE } from "@/layer";
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
    private readonly gameContainer: Phaser.GameObjects.Container,
  ) {
    super(scene, x, y, config);
    scene.add.existing(this);

    this.items = {};

    inventoryModel.addListener(
      "updateAmount",
      ({ name, amount }: InventoryModelEvent["updateAmount"]) => {
        this.items[name].updateAmount(amount);
      },
    );
    inventoryModel.addListener(
      "newItem",
      ({ name, amount, index }: InventoryModelEvent["newItem"]) => {
        this.createItem(name, amount, index);
      },
    );
    this.setScrollFactor(0, 0);
    this.setDepth(INVENTORY_DEPTH_RANGE.getDepth(0));
  }
  private makeInventoryTileViewPlacable(
    name: InventoryItemName,
    item: InventoryTileView,
  ) {
    console.log(item);
    item.setDepth(INVENTORY_DEPTH_RANGE.getDepth(1));
    item.setInteractive({ draggable: true });
    let clone: TileView | undefined = undefined;
    item.on("dragstart", () => {
      if (this.inventoryModel.getAmount(name) === 0) {
        return;
      }
      clone = item.createClone();
      clone.setDepth(DRAGGING_DEPTH_RANGE.getDepth(0));
      this.gameContainer.add(clone);
    });
    item.on("drag", (pointer: Phaser.Input.Pointer) => {
      if (clone === undefined) return;
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const { x, y } = pointer.positionToCamera(
        this.scene.cameras.main,
      ) as Phaser.Math.Vector2;
      clone.setX(x);
      clone.setY(y);
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
  private createItem(name: InventoryItemName, amount: number, index: number) {
    if (this.items[name] !== undefined) return;
    const inventoryTileView = this.inventoryTileViewFactory.create(name);
    this.addChess(inventoryTileView, index, 0, 0);
    this.makeInventoryTileViewPlacable(name, inventoryTileView);
    inventoryTileView.updateAmount(amount);
    this.items[name] = inventoryTileView;
  }
}