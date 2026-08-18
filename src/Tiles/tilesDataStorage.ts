import { times } from "@/utils";
import { BoardSize, BoardSizeValues } from "@/types";
export class TilesDataStorage<T> {
  private tiles: (T | undefined)[][];
  constructor(
    private readonly boardSize: BoardSize,
    private onRemoveCallback: (tile: T | undefined) => void = () => {},
    private onSetCallback: (
      x: number,
      y: number,
      tile: T | undefined,
    ) => void = () => {},
  ) {
    this.tiles = Array.from(
      { length: boardSize.maxX - boardSize.minX + 1 },
      () => Array(boardSize.maxY - boardSize.minY + 1).fill(undefined),
    );
    boardSize.on("change", (previous: BoardSizeValues) =>
      this.updateBoardSize(previous),
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
    this.onSetCallback(x, y, data);
  }
  removeTile(x: number, y: number): void {
    this.assetsValidPosition(x, y);
    const [ix, iy] = this.convertPositionToIndex(x, y);
    this.onRemoveCallback(this.tiles[ix][iy]);
    this.tiles[ix][iy] = undefined;
  }
  swap(x1: number, y1: number, x2: number, y2: number) {
    this.assetsValidPosition(x1, y1);
    this.assetsValidPosition(x2, y2);
    const [ix1, iy1] = this.convertPositionToIndex(x1, y1);
    const [ix2, iy2] = this.convertPositionToIndex(x2, y2);
    const first = this.tiles[ix1][iy1];
    const second = this.tiles[ix2][iy2];
    this.tiles[ix1][iy1] = second;
    this.tiles[ix2][iy2] = first;
    this.onSetCallback(x1, y1, second);
    this.onSetCallback(x2, y2, first);
    return { first, second };
  }
  private updateBoardSize({
    maxX: previousMaxX,
    maxY: previousMaxY,
    minX: previousMinX,
    minY: previousMinY,
  }: BoardSizeValues) {
    const { minX, minY, maxX, maxY } = this.boardSize;
    // update minX
    const minXDiff = previousMinX - minX;
    if (minXDiff > 0) {
      times(
        () =>
          this.tiles.unshift(
            Array(previousMaxY - previousMinY + 1).fill(undefined),
          ),
        minXDiff,
      );
    }
    if (minXDiff < 0) {
      times(
        () => this.tiles.shift()?.forEach(this.onRemoveCallback),
        Math.abs(minXDiff),
      );
    }
    // update maxX
    const maxXDiff = maxX - previousMaxX;
    if (maxXDiff > 0) {
      times(
        () =>
          this.tiles.push(
            Array(previousMaxY - previousMinY + 1).fill(undefined),
          ),
        maxXDiff,
      );
    }
    if (maxXDiff < 0) {
      times(
        () => this.tiles.pop()?.forEach(this.onRemoveCallback),
        Math.abs(maxXDiff),
      );
    }
    // update minY
    const minYDiff = previousMinY - minY;
    if (minYDiff > 0) {
      this.tiles.forEach((value) =>
        times(() => value.unshift(undefined), minYDiff),
      );
    }
    if (minYDiff < 0) {
      this.tiles.forEach((value) =>
        times(() => this.onRemoveCallback(value.shift()), Math.abs(minYDiff)),
      );
    }
    // update maxY
    const maxYDiff = maxY - previousMaxY;
    if (maxYDiff > 0) {
      this.tiles.forEach((value) =>
        times(() => value.push(undefined), maxYDiff),
      );
    }
    if (maxYDiff < 0) {
      this.tiles.forEach((value) =>
        times(() => this.onRemoveCallback(value.pop()), Math.abs(maxYDiff)),
      );
    }
  }
  forEach(fn: (data: T | undefined, x: number, y: number) => void): void {
    for (const [x, arr] of this.tiles.entries()) {
      for (const [y, tile] of arr.entries()) {
        fn(tile, ...this.convertIndexToPosition(x, y));
      }
    }
  }
  find(fn: (data: T | undefined, x: number, y: number) => boolean) {
    for (const [x, arr] of this.tiles.entries()) {
      for (const [y, tile] of arr.entries()) {
        const [px, py] = this.convertIndexToPosition(x, y);
        if (fn(tile, px, py)) {
          return { data: tile, x: px, y: py };
        }
      }
    }
  }
  some(fn: (data: T | undefined, x: number, y: number) => boolean): boolean {
    for (const [x, arr] of this.tiles.entries()) {
      for (const [y, tile] of arr.entries()) {
        if (fn(tile, ...this.convertIndexToPosition(x, y))) {
          return true;
        }
      }
    }
    return false;
  }
  getAdjacent(x: number, y: number): (T | undefined)[] {
    const pos: [number, number][] = [
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x, y - 1],
    ];
    return pos
      .filter(([x, y]) => this.isValidPosition(x, y))
      .map(([x, y]) => this.getTile(x, y));
  }
  private isValidPosition(x: number, y: number): boolean {
    if (x < this.boardSize.minX || this.boardSize.maxX < x) return false;
    if (y < this.boardSize.minY || this.boardSize.maxY < y) return false;
    if (isNaN(x) || isNaN(y)) return false;
    return true;
  }
  private assetsValidPosition(x: number, y: number): void {
    if (x < this.boardSize.minX || this.boardSize.maxX < x)
      throw new RangeError(
        `expect ${this.boardSize.minX}-${this.boardSize.maxX} x coordinate but actual ${x}`,
      );
    if (y < this.boardSize.minY || this.boardSize.maxY < y)
      throw new RangeError(
        `expect ${this.boardSize.minY}-${this.boardSize.maxY} y coordinate but actual ${y}`,
      );
    if (isNaN(x) || isNaN(y))
      throw new TypeError(`caon't use NaN (x:${x},y:${y})`);
  }
  private convertPositionToIndex(x: number, y: number): [number, number] {
    return [x - this.boardSize.minX, y - this.boardSize.minY];
  }
  private convertIndexToPosition(x: number, y: number): [number, number] {
    return [x + this.boardSize.minX, y + this.boardSize.minY];
  }
}