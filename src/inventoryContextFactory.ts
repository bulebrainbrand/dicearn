import { Board, QuadGrid } from "phaser4-rex-plugins/plugins/board-components";
import { CELL_SIZE_PX } from "./constants";
import { InventoryTileViewFactory } from "./inventory/InventoryTileViewFactory";
import { InventoryModel } from "./inventory/Model";
import { InventoryView } from "./inventory/View";
import { TilePickUp } from "./inventory/TilePickUp";
import { Tiles } from "./Tiles/Model";
import { BoardViewCoordinateCalculator } from "./board/BoardViewCoordinateCalculator";
import { TileTypeChecker } from "./Tile/TileTypeChecker";

export class InventoryContextFactory {
  static create(
    scene: Phaser.Scene,
    board: Board,
    tiles: Tiles,
    boardViewCoordinateCalculator: BoardViewCoordinateCalculator,
    tileTypeChecker: TileTypeChecker,
    gameContainer: Phaser.GameObjects.Container,
  ): {
    inventoryModel: InventoryModel;
    inventoryView: InventoryView;
    inventoryTileViewFactory: InventoryTileViewFactory;
    tilePickUp: TilePickUp;
  } {
    const inventoryModel = new InventoryModel();
    const inventoryTileViewFactory = new InventoryTileViewFactory(scene);
    const inventoryView = new InventoryView(
      scene,
      CELL_SIZE_PX * 6,
      CELL_SIZE_PX / 2,
      {
        grid: new QuadGrid({
          x: 0, // グリッド原点のワールドX座標
          y: 0,
          cellWidth: CELL_SIZE_PX,
          cellHeight: CELL_SIZE_PX,
          type: "orthogonal",
        }),
        draggable: false,
      },
      board,
      tiles,
      inventoryModel,
      inventoryTileViewFactory,
      boardViewCoordinateCalculator,
      gameContainer,
    );
    const tilePickUp = new TilePickUp(inventoryModel, tiles, tileTypeChecker);
    return {
      inventoryView,
      inventoryTileViewFactory,
      inventoryModel,
      tilePickUp,
    };
  }
}