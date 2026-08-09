import {
  BoardViewCoordinateCalculator,
  Position,
} from "./board/BoardViewCoordinateCalculator";
import { Board } from "./board/Model";
import { BoardView } from "./board/View";
import { CursorModel } from "./cursor/Model";
import { CursorView } from "./cursor/View";
import { TileTypeChecker } from "./Tile/TileTypeChecker";
import { TileViewFactoryFactory } from "./Tile/TileViewFactoryFactory";
import { TileViewFactory } from "./Tile/types";
import { Tiles } from "./Tiles/Model";
import { TilesView } from "./Tiles/View";
import { BoardSize } from "./types";

export class BoardContextFactory {
  static create(
    scene: Phaser.Scene,
    { maxX, maxY, minX, minY }: BoardSize,
    defaultCursorPosition: Position,
  ): {
    boardModel: Board;
    boardView: BoardView;
    tiles: Tiles;
    tilesView: TilesView;
    cursorModel: CursorModel;
    cursor: CursorView;
    coordinateCalculator: BoardViewCoordinateCalculator;
    tileTypeChecker: TileTypeChecker;
    tileViewFactory: TileViewFactory;
  } {
    const boardViewCoordinateCalculator = new BoardViewCoordinateCalculator(
      minX,
      maxX,
      minY,
      maxY,
    );
    if (boardViewCoordinateCalculator.isOutside(defaultCursorPosition))
      throw new TypeError(`cursor position is invalid`);
    const tiles = new Tiles(minX, maxX, minY, maxY);
    const cursorModel = new CursorModel(
      defaultCursorPosition.x,
      defaultCursorPosition.y,
      minX,
      maxX,
      minY,
      maxY,
    );
    const tileTypeChecker = new TileTypeChecker();
    const boardModel = new Board(
      tiles,
      cursorModel,
      minX,
      maxX,
      minY,
      maxY,
      tileTypeChecker,
    );
    const tileViewFactoryFactory = new TileViewFactoryFactory(
      scene,
      tileTypeChecker,
    );
    const tileViewFactory = tileViewFactoryFactory.create();
    const boardView = new BoardView(scene, {}, boardModel);
    const tilesView = new TilesView(
      scene,
      boardView,
      tiles,
      boardViewCoordinateCalculator,
      tileViewFactory,
      tileTypeChecker,
    );
    const cursorView = new CursorView(
      scene,
      boardView,
      scene.rexBoard,
      defaultCursorPosition.x,
      defaultCursorPosition.y,
      boardViewCoordinateCalculator,
    );
    return {
      boardModel,
      boardView,
      tiles,
      tilesView,
      tileTypeChecker,
      tileViewFactory,
      coordinateCalculator: boardViewCoordinateCalculator,
      cursor: cursorView,
      cursorModel: cursorModel,
    };
  }
}