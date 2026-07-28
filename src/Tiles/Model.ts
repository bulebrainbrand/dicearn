import { Tile } from "@/Tile/Model";
import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { TilesDataStorage } from "./tilesDataStorage";
type TilesModelSetEvent = { x: number; y: number; newTile: Tile };
type TilesModelRemoveEvent = { x: number; y: number };
type TilesModelBoardSizeUpdateEvent = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
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
