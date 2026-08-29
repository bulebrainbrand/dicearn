import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { TilesDataStorage } from "./tilesDataStorage";
import { BoardSize } from "@/types";
import { TileModelUnion } from "@/Tile/TileDifinition";
import { TileTypeChecker } from "@/Tile/TileTypeChecker";
export type TilesModelSetEvent = {
  x: number;
  y: number;
  newTile: TileModelUnion;
};
export type TilesModelRemoveEvent = { x: number; y: number };
export type TilesModelSwapEvent = {
  first: { x: number; y: number; data: TileModelUnion | undefined };
  second: { x: number; y: number; data: TileModelUnion | undefined };
};
export class Tiles extends EventEmitter {
  private tiles: TilesDataStorage<TileModelUnion>;
  private movable: boolean;
  constructor(
    private readonly boardSize: BoardSize,
    private readonly tileTypeChecker: TileTypeChecker,
  ) {
    super();
    this.tiles = new TilesDataStorage(boardSize, (tile) => {
      if (tile) this.emit("destroy", tile);
    });
    this.movable = false;
  }
  setTile(x: number, y: number, tile: TileModelUnion, force: boolean): boolean {
    const oldTile = this.tiles.getTile(x, y);
    if (
      force === false &&
      ((oldTile !== undefined &&
        (this.tileTypeChecker.isMovable(oldTile) === false ||
          oldTile.getMovable() === false)) ||
        this.movable === false)
    ) {
      return false;
    }
    if (
      oldTile &&
      this.tileTypeChecker.isRotatable(oldTile) &&
      this.tileTypeChecker.isRotatable(tile)
    ) {
      tile.changeDirection(oldTile.getDirection());
    }
    this.tiles.setTile(x, y, tile);
    this.emit("set", { x, y, newTile: tile } satisfies TilesModelSetEvent);
    return true;
  }
  removeTile(x: number, y: number): boolean {
    const oldTile = this.tiles.getTile(x, y);
    if (
      (oldTile !== undefined &&
        (this.tileTypeChecker.isMovable(oldTile) === false ||
          oldTile.getMovable() === false)) ||
      this.movable === false
    ) {
      return false;
    }
    this.tiles.removeTile(x, y);
    this.emit("remove", { x, y } satisfies TilesModelRemoveEvent);
    return true;
  }
  getTile(x: number, y: number): TileModelUnion | undefined {
    return this.tiles.getTile(x, y);
  }
  swapTile(x1: number, y1: number, x2: number, y2: number): boolean {
    if (this.movable === false) return false;
    const oldTile1 = this.tiles.getTile(x1, y1);
    if (
      oldTile1 !== undefined &&
      (this.tileTypeChecker.isMovable(oldTile1) === false ||
        oldTile1.getMovable() === false)
    ) {
      return false;
    }
    const oldTile2 = this.tiles.getTile(x2, y2);
    if (
      oldTile2 !== undefined &&
      (this.tileTypeChecker.isMovable(oldTile2) === false ||
        oldTile2.getMovable() === false)
    ) {
      return false;
    }
    const result = this.tiles.swap(x1, y1, x2, y2);
    this.emit("swap", {
      first: { x: x2, y: y2, data: result.first },
      second: { x: x1, y: y1, data: result.second },
    } satisfies TilesModelSwapEvent);
    return true;
  }
  forEach(
    fn: (tile: TileModelUnion | undefined, x: number, y: number) => void,
  ) {
    this.tiles.forEach(fn);
  }
  getBoardSize(): BoardSize {
    return this.boardSize;
  }
  getAdjacentTile(x: number, y: number) {
    return this.tiles.getAdjacent(x, y);
  }
  find(
    fn: (data: TileModelUnion | undefined, x: number, y: number) => boolean,
  ) {
    return this.tiles.find(fn);
  }
  some(
    fn: (data: TileModelUnion | undefined, x: number, y: number) => boolean,
  ) {
    return this.tiles.some(fn);
  }
  setMovable(value: boolean) {
    if (this.movable === value) return;
    this.movable = value;
    this.emit("movable", value);
  }
  getMovable() {
    return this.movable;
  }
}