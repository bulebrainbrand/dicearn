import { TileModel } from "@/Tile/types";
import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { TilesDataStorage } from "./tilesDataStorage";
import { BoardSize } from "@/types";
export type TilesModelSetEvent = { x: number; y: number; newTile: TileModel };
export type TilesModelRemoveEvent = { x: number; y: number };
export type TilesModelSwapEvent = {
  first: { x: number; y: number; data: TileModel | undefined };
  second: { x: number; y: number; data: TileModel | undefined };
};
export class Tiles extends EventEmitter {
  private tiles: TilesDataStorage<TileModel>;
  constructor(private readonly boardSize: BoardSize) {
    super();
    this.tiles = new TilesDataStorage(boardSize, (tile) => {
      if (tile) this.emit("destroy", tile);
    });
  }
  setTile(x: number, y: number, tile: TileModel) {
    this.tiles.setTile(x, y, tile);
    this.emit("set", { x, y, newTile: tile } satisfies TilesModelSetEvent);
  }
  removeTile(x: number, y: number) {
    this.tiles.removeTile(x, y);
    this.emit("remove", { x, y } satisfies TilesModelRemoveEvent);
  }
  getTile(x: number, y: number): TileModel | undefined {
    return this.tiles.getTile(x, y);
  }
  swapTile(x1: number, y1: number, x2: number, y2: number): void {
    const result = this.tiles.swap(x1, y1, x2, y2);
    this.emit("swap", {
      first: { x: x2, y: y2, data: result.first },
      second: { x: x1, y: y1, data: result.second },
    } satisfies TilesModelSwapEvent);
  }
  forEach(fn: (tile: TileModel | undefined, x: number, y: number) => void) {
    this.tiles.forEach(fn);
  }
  getBoardSize(): BoardSize {
    return this.boardSize;
  }
  getAdjacentTile(x: number, y: number) {
    return this.tiles.getAdjacent(x, y);
  }
  find(fn: (data: TileModel | undefined, x: number, y: number) => boolean) {
    return this.tiles.find(fn);
  }
  some(fn: (data: TileModel | undefined, x: number, y: number) => boolean) {
    return this.tiles.some(fn);
  }
}