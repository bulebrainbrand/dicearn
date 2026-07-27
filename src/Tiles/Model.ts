import { Tile } from "@/Tile/Model";
import { times } from "@/utils.ts";
export class Tiles {
  private tiles: (Tile | undefined)[][] = [];
  constructor(
    private minX: number,
    private maxX: number,
    private minY: number,
    private maxY: number,
  ) {
    this.tiles = Array.from({ length: maxX - minX + 1 }, () =>
      Array(maxY - minY).fill(undefined),
    );
  }
  setTile(x: number, y: number, cell: Tile) {
    this.assetsValidPosition(x, y);
    this.removeTile(x, y);

    const [ix, iy] = this.convertPositionToIndex(x, y);
    this.tiles[ix][iy] = cell;
  }
  removeTile(x: number, y: number) {
    this.assetsValidPosition(x, y);
    const [ix, iy] = this.convertPositionToIndex(x, y);
    this.tiles[ix][iy] = undefined;
  }
  getTile(x: number, y: number): Tile | undefined {
    this.assetsValidPosition(x, y);
    const [ix, iy] = this.convertPositionToIndex(x, y);
    return this.tiles[ix][iy];
  }
  forEach(fn: (tile: Tile | undefined, x: number, y: number) => void) {
    for (const [x, arr] of this.tiles.entries()) {
      for (const [y, tile] of arr.entries()) {
        fn(tile, x, y);
      }
    }
  }
  updateBoardSize({
    maxX,
    maxY,
    minX,
    minY,
  }: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  }) {
    // update minX
    const minXDiff = this.minX - minX;
    if (minXDiff > 0) {
      times(
        () => this.tiles.unshift(Array(this.maxY - this.minY).fill(undefined)),
        minXDiff,
      );
    }
    if (minXDiff < 0) {
      times(() => this.tiles.shift(), Math.abs(minXDiff));
    }
    // update maxX
    const maxXDiff = maxX - this.maxX;
    if (maxXDiff > 0) {
      times(
        () => this.tiles.push(Array(this.maxY - this.minY).fill(undefined)),
        maxXDiff,
      );
    }
    if (maxXDiff < 0) {
      times(() => this.tiles.pop(), Math.abs(minXDiff));
    }
    // update minY
    const minYDiff = this.minY - minY;
    if (minYDiff > 0) {
      this.tiles.forEach((value) =>
        times(() => value.unshift(undefined), minYDiff),
      );
    }
    if (minYDiff < 0) {
      this.tiles.forEach((value) =>
        times(() => value.shift(), Math.abs(minYDiff)),
      );
    }
    // update maxY
    const maxYDiff = maxY - this.maxY;
    if (maxYDiff > 0) {
      this.tiles.forEach((value) =>
        times(() => value.push(undefined), maxYDiff),
      );
    }
    if (maxYDiff < 0) {
      this.tiles.forEach((value) =>
        times(() => value.pop(), Math.abs(maxYDiff)),
      );
    }
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
  private assetsValidPosition(x: number, y: number): asserts x is number {
    if (x < this.minX || this.maxX < x)
      throw new RangeError(
        `expect ${this.minX}-${this.maxX} x coordinate but actual ${x}`,
      );
    if (y < this.minY || this.maxY < y)
      throw new RangeError(
        `expect ${this.minY}-${this.maxY} y coordinate but actual ${y}`,
      );
  }
  getBoardSize() {
    return {
      minX: this.minX,
      minY: this.minY,
      maxX: this.maxX,
      maxY: this.maxY,
    };
  }
  private convertPositionToIndex(x: number, y: number): [number, number] {
    return [x - this.minX, y - this.minY];
  }
  getFlatArray(): (Tile | undefined)[] {
    return this.tiles.flat(1);
  }
}
