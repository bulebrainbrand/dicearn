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
    private readonly boardSize: BoardSize,
    private readonly routeSearcher: RouteSearcher,
  ) {
    super();
    this.tiles = tiles;
    this.cursor = cursor;
  }

  getBoardSize(): BoardSize {
    return this.boardSize;
  }
}