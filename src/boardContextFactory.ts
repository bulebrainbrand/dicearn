import {
  BoardViewCoordinateCalculator,
  Position,
} from "./board/BoardViewCoordinateCalculator";
import { Board } from "./board/Model";
import { RouteExecutor } from "./board/RouteExecutor";
import { RouteSearcher } from "./board/RouteSearcher";
import { MoneyCalculator } from "./board/MoneyCalculator";
import { BoardView } from "./board/View";
import { CursorModel } from "./cursor/Model";
import { CursorView } from "./cursor/View";
import { TileTypeChecker } from "./Tile/TileTypeChecker";
import { TileViewFactoryFactory } from "./Tile/TileViewFactoryFactory";
import { TileViewFactory } from "./Tile/types";
import { Tiles } from "./Tiles/Model";
import { TilesView } from "./Tiles/View";
import { BoardSize, BoardSizeValues } from "./types";

export class BoardContextFactory {
  static create(
    scene: Phaser.Scene,
    initialBoardSize: BoardSizeValues,
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
    moneyCalculator: MoneyCalculator;
    routeSearcher: RouteSearcher;
    routeExecutor: RouteExecutor;
    boardSize: BoardSize;
  } {
    const boardSize = new BoardSize(
      initialBoardSize.minX,
      initialBoardSize.minY,
      initialBoardSize.maxX,
      initialBoardSize.maxY,
    );
    const boardViewCoordinateCalculator = new BoardViewCoordinateCalculator(
      boardSize,
    );
    if (boardViewCoordinateCalculator.isOutside(defaultCursorPosition))
      throw new TypeError(`cursor position is invalid`);
    const tiles = new Tiles(boardSize);
    const cursorModel = new CursorModel(
      defaultCursorPosition.x,
      defaultCursorPosition.y,
      boardSize,
    );
    const tileTypeChecker = new TileTypeChecker();
    const routeSearcher = new RouteSearcher(
      tiles,
      boardSize,
      tileTypeChecker,
      defaultCursorPosition,
    );
    const routeExecutor = new RouteExecutor(cursorModel);
    const boardModel = new Board(tiles, cursorModel, boardSize, routeSearcher);
    const tileViewFactoryFactory = new TileViewFactoryFactory(
      scene,
      tileTypeChecker,
    );
    const tileViewFactory = tileViewFactoryFactory.create();
    const boardView = new BoardView(scene, {}, boardSize);
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
    const moneyCalculator = new MoneyCalculator(tiles);
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
      moneyCalculator,
      routeSearcher,
      routeExecutor,
      boardSize,
    };
  }
}