import { Direction, DIRECTION_OFFSET, DIRECTION_TAPLE } from "@/Direction.ts";
import { TileTypeChecker } from "@/Tile/TileTypeChecker";
import { Tiles } from "@/Tiles/Model.ts";
import { BoardSize } from "@/types";
import { Position } from "./BoardViewCoordinateCalculator";
import { RouteKind } from "./types";

export type RouteTransition =
  | { kind: "move"; destination: Position; isUsedOutside: boolean }
  | { kind: Exclude<RouteKind, "move">; destination: Position };

export class RouteSearcher {
  constructor(
    private readonly tiles: Tiles,
    private readonly boardSize: BoardSize,
    private readonly tileTypeChecker: TileTypeChecker,
  ) {}

  search(position: Position): RouteTransition {
    const homeTile = this.tiles.find((tile) => tile?.name === "home");
    if (homeTile === undefined) throw new TypeError(`there are no homeTile`);
    const resetPosition = { x: homeTile.x, y: homeTile.y };
    const tile = this.tiles.getTile(position.x, position.y);
    if (tile === undefined) {
      return { kind: "reset", destination: resetPosition };
    }
    if (tile.name === "random") {
      return { kind: "warp", destination: this.getRandomPosition() };
    }
    if (tile.name === "dizzy") {
      const offset =
        DIRECTION_TAPLE[Math.floor(Math.random() * DIRECTION_TAPLE.length)];
      const nextPos = this.getNextWithDir(position, offset);
      if (nextPos === null)
        return { kind: "reset", destination: resetPosition };
      const { destination, isUsedOutside } = nextPos;
      const nextTile = this.tiles.getTile(destination.x, destination.y);
      if (nextTile === undefined) {
        return { kind: "reset", destination: resetPosition };
      }
      if (nextTile.name === "stop") {
        return { kind: "stop", destination };
      }
      return { kind: "move", destination, isUsedOutside };
    }
    if (this.tileTypeChecker.isDirectionTile(tile) === false) {
      return { kind: "reset", destination: resetPosition };
    }
    const nextPos = this.getNextWithDir(position, tile.getDirection());
    if (nextPos === null) return { kind: "reset", destination: resetPosition };
    const { destination, isUsedOutside } = nextPos;
    const nextTile = this.tiles.getTile(destination.x, destination.y);
    if (nextTile === undefined) {
      return { kind: "reset", destination: resetPosition };
    }
    if (nextTile.name === "stop") {
      return { kind: "stop", destination };
    }
    return { kind: "move", destination, isUsedOutside };
  }

  private covertPosToInside(pos: Position): Position {
    return {
      x:
        pos.x < this.boardSize.minX
          ? this.boardSize.maxX
          : this.boardSize.maxX < pos.x
            ? this.boardSize.minX
            : pos.x,
      y:
        pos.y < this.boardSize.minY
          ? this.boardSize.maxY
          : this.boardSize.maxY < pos.y
            ? this.boardSize.minY
            : pos.y,
    };
  }
  private getRandomPosition(): Position {
    const { maxX, maxY, minX, minY } = this.boardSize;
    while (true) {
      const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      if (this.tiles.getTile(x, y) !== undefined) return { x, y };
    }
  }
  private getNextWithDir(
    { x, y }: Readonly<Position>,
    dir: Direction,
  ): { destination: Position; isUsedOutside: boolean } | null {
    const offset = DIRECTION_OFFSET[dir];
    let beforePos: Position = { x, y };
    let currentPos: Position = this.covertPosToInside({
      x: x + offset[0],
      y: y + offset[1],
    });
    while (beforePos.x !== currentPos.x || beforePos.y !== currentPos.y) {
      if (this.tiles.getTile(currentPos.x, currentPos.y) !== undefined) {
        return {
          destination: currentPos,
          isUsedOutside: this.isUsedOutside({ x, y }, currentPos, offset),
        };
      }
      beforePos = currentPos;
      currentPos = this.covertPosToInside({
        x: currentPos.x + offset[0],
        y: currentPos.y + offset[1],
      });
    }
    return null;
  }
  private isUsedOutside(
    start: Readonly<Position>,
    end: Readonly<Position>,
    offset: Readonly<[number, number]>,
  ) {
    const isXUsed = offset[0] > 0 ? start.x < end.x : end.x < start.x;
    const isYUsed = offset[1] > 0 ? start.y < end.y : end.y < start.y;
    return isXUsed || isYUsed;
  }
}