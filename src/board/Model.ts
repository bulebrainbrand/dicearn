import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";
import { Tiles } from "@/Tiles/Model.ts";
import { CursorModel } from "@/cursor/Model";
import { BoardSize } from "@/types";
import { RouteSearcher, RouteTransition } from "./RouteSearcher";
import { RouteExecutor } from "./RouteExecutor";
import { Position } from "./BoardViewCoordinateCalculator";

export class Board extends EventEmitter {
  tiles: Tiles;
  cursor: CursorModel;

  constructor(
    tiles: Tiles,
    cursor: CursorModel,
    private readonly boardSize: BoardSize,
    private readonly routeSearcher: RouteSearcher,
    private readonly routeExecutor: RouteExecutor,
  ) {
    super();
    this.tiles = tiles;
    this.cursor = cursor;
  }

  getBoardSize(): BoardSize {
    return this.boardSize;
  }
  *moveCursor(
    times: number,
  ): Generator<
    Readonly<{ transition: RouteTransition; beforePosition: Position }>,
    void,
    unknown
  > {
    for (let i = 0; i < times; i++) {
      const beforePosition = this.cursor.getPosition();
      const transition = this.routeSearcher.search(beforePosition);
      this.routeExecutor.execute(transition);
      yield { transition, beforePosition };
    }
  }
}