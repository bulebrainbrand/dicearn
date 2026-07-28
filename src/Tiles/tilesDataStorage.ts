import { times } from "@/utils";

export class TilesDataStorage<T> {
  private tiles: (T | undefined)[][];
  constructor(
    private minX: number,
    private maxX: number,
    private minY: number,
    private maxY: number,
    private onRemoveCallback: (tile: T | undefined) => void,
  ) {
    this.tiles = Array.from({ length: maxX - minX + 1 }, () =>
      Array(maxY - minY).fill(undefined),
    );
  }
  getTile(x: number, y: number): T | undefined {
    this.assetsValidPosition(x, y);
    const [ix, iy] = this.convertPositionToIndex(x, y);
    return this.tiles[ix][iy];
  }
  setTile(x: number, y: number, data: T): void {
    this.assetsValidPosition(x, y);
    this.removeTile(x, y);

    const [ix, iy] = this.convertPositionToIndex(x, y);
    this.tiles[ix][iy] = data;
  }
  removeTile(x: number, y: number): void {
    this.assetsValidPosition(x, y);
    const [ix, iy] = this.convertPositionToIndex(x, y);
    this.onRemoveCallback(this.tiles[ix][iy]);
    this.tiles[ix][iy] = undefined;
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
  getBoardSize(): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } {
    return {
      minX: this.minX,
      minY: this.minY,
      maxX: this.maxX,
      maxY: this.maxY,
    };
  }
  forEach(fn: (data: T | undefined, x: number, y: number) => void): void {
    for (const [x, arr] of this.tiles.entries()) {
      for (const [y, tile] of arr.entries()) {
        fn(tile, x, y);
      }
    }
  }
  private assetsValidPosition(x: number, y: number): void {
    if (x < this.minX || this.maxX < x)
      throw new RangeError(
        `expect ${this.minX}-${this.maxX} x coordinate but actual ${x}`,
      );
    if (y < this.minY || this.maxY < y)
      throw new RangeError(
        `expect ${this.minY}-${this.maxY} y coordinate but actual ${y}`,
      );
    if (isNaN(x) || isNaN(y))
      throw new TypeError(`caon't use NaN (x:${x},y:${y})`);
  }
  private convertPositionToIndex(x: number, y: number): [number, number] {
    return [x - this.minX, y - this.minY];
  }
}
