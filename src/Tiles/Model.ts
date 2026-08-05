import { Tile } from "@/Tile/Model";
import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { TilesDataStorage } from "./tilesDataStorage";
export type TilesModelSetEvent = { x: number; y: number; newTile: Tile };
export type TilesModelRemoveEvent = { x: number; y: number };
export type TilesModelBoardSizeUpdateEvent = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};
export type TilesModelSwapEvent = {
  first: {
    x: number;
    y: number;
    data: Tile | undefined;
  };
  second: {
    x: number;
    y: number;
    data: Tile | undefined;
  };
};
export class Tiles extends EventEmitter {
  private tiles: TilesDataStorage<Tile>;
  constructor(minX: number, maxX: number, minY: number, maxY: number) {
    super();
    this.tiles = new TilesDataStorage(minX, maxX, minY, maxY, () => {});
  }
  setTile(x: number, y: number, tile: Tile) {
    this.tiles.setTile(x, y, tile);
    this.emit("set", { x, y, newTile: tile } satisfies TilesModelSetEvent);
  }
  removeTile(x: number, y: number) {
    this.tiles.removeTile(x, y);
    this.emit("remove", { x, y } satisfies TilesModelRemoveEvent);
  }
  getTile(x: number, y: number): Tile | undefined {
    return this.tiles.getTile(x, y);
  }
  swapTile(x1: number, y1: number, x2: number, y2: number): void {
    const result = this.tiles.swap(x1, y1, x2, y2);
    this.emit("swap", {
      first: { x: x2, y: y2, data: result.first },
      second: { x: x1, y: y1, data: result.second },
    } satisfies TilesModelSwapEvent);
  }
  forEach(fn: (tile: Tile | undefined, x: number, y: number) => void) {
    this.tiles.forEach(fn);
  }
  updateBoardSize(obj: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  }) {
    this.tiles.updateBoardSize(obj);
    this.emit("updateBoardSize", obj satisfies TilesModelBoardSizeUpdateEvent);
  }
  getBoardSize() {
    return this.tiles.getBoardSize();
  }
}
