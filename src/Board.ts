import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";
import { Tiles } from "./Tiles.ts";
import { Cursor } from "./CursorModel.ts";
import { DIRECTION_OFFSET } from "./Direction.ts";
import { Tile } from "./Tile.ts";
type Position = [number, number];
export class Board extends EventEmitter {
  tiles: Tiles;
  cursor: Cursor;

  constructor(
    tiles: Tiles,
    cursor: Cursor,
    private minX: number,
    private maxX: number,
    private minY: number,
    private maxY: number,
  ) {
    super();
    this.tiles = tiles;
    this.cursor = cursor;
  }
  *moveCursor(
    times: number,
    onOneMoveCallback?: (x: number, y: number, tile: Tile) => void,
    onFinishCallback?: () => void,
  ): Generator<[number, number, Tile], void, unknown> {
    for (let i = 0; i < times; i++) {
      let [x, y] = this.cursor.getPosition();
      const tile = this.tiles.getTile(x, y);
      if (tile === undefined) {
        this.cursor.warp(0, 0);
        yield [0, 0, this.tiles.getTile(0, 0)!];
      } else {
        const [newX, newY] = this.covertPosToInside(
          this.applyOffset([x, y], DIRECTION_OFFSET[tile.getDirection()]),
        );
        const nextTile = this.tiles.getTile(newX, newY);
        if (nextTile === undefined) {
          this.cursor.warp(0, 0);
          yield [0, 0, this.tiles.getTile(0, 0)!];
        } else {
          this.cursor.move(newX, newY);
          onOneMoveCallback?.(newX, newY, nextTile);
          yield [newX, newY, nextTile];
        }
      }
    }
    onFinishCallback?.();
  }
  private applyOffset(pos: Position, offset?: [number, number]): Position {
    if (!offset) return [0, 0];
    return [pos[0] + offset[0], pos[1] + offset[1]];
  }
  private covertPosToInside(pos: Position): Position {
    const x =
      pos[0] < this.minX ? this.maxX : this.maxX < pos[0] ? this.minX : pos[0];
    const y =
      pos[1] < this.minY ? this.maxY : this.maxY < pos[1] ? this.minY : pos[1];
    return [x, y];
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
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.tiles.updateBoardSize({ minX, minY, maxX, maxY });
    this.cursor.updateBoardSize({ minX, minY, maxX, maxY });
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
