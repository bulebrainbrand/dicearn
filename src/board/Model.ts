import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";
import { Tiles } from "@/Tiles/Model.ts";
import { CursorModel } from "@/cursor/Model";
import { BoardSize } from "@/types";
import { RouteSearcher } from "./RouteSearcher";

export class Board extends EventEmitter {
  tiles: Tiles;
  cursor: CursorModel;

  constructor(
    tiles: Tiles,
    cursor: CursorModel,
    private minX: number,
    private maxX: number,
    private minY: number,
    private maxY: number,
    private readonly routeSearcher: RouteSearcher,
  ) {
    super();
    this.tiles = tiles;
    this.cursor = cursor;
  }

  updateBoardSize({ maxX, maxY, minX, minY }: BoardSize) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.tiles.updateBoardSize({ minX, minY, maxX, maxY });
    this.cursor.updateBoardSize({ minX, minY, maxX, maxY });
    this.routeSearcher.updateBoardSize({ minX, minY, maxX, maxY });
    this.emit("updateBoardSize", { minX, minY, maxX, maxY });
  }

  getBoardSize() {
    return {
      minX: this.minX,
      minY: this.minY,
      maxX: this.maxX,
      maxY: this.maxY,
    };
  }
}
