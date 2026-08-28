import { Direction, DIRECTION_OFFSET, DIRECTION_TAPLE } from "@/Direction.ts";
import { TileTypeChecker } from "@/Tile/TileTypeChecker";
import { Tiles } from "@/Tiles/Model.ts";
import { BoardSize } from "@/types";
import { Position } from "./BoardViewCoordinateCalculator";
import { RouteKind } from "./types";

export type RouteTransition = { kind: RouteKind; destination: Position };

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
      const destination = this.getNextWithDir(position, offset);
      if (destination === null)
        return { kind: "reset", destination: resetPosition };
      const nextTile = this.tiles.getTile(destination.x, destination.y);
      if (nextTile === undefined) {
        return { kind: "reset", destination: resetPosition };
      }
      if (nextTile.name === "stop") {
        return { kind: "stop", destination };
      }
      return { kind: "move", destination };
    }
    if (this.tileTypeChecker.isDirectionTile(tile) === false) {
      return { kind: "reset", destination: resetPosition };
    }
    const destination = this.getNextWithDir(position, tile.getDirection());
    if (destination === null)
      return { kind: "reset", destination: resetPosition };
    const nextTile = this.tiles.getTile(destination.x, destination.y);
    if (nextTile === undefined) {
      return { kind: "reset", destination: resetPosition };
    }
    if (nextTile.name === "stop") {
      return { kind: "stop", destination };
    }
    return { kind: "move", destination };
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
  private getNextWithDir({ x, y }: Position, dir: Direction): Position | null {
    const offset = DIRECTION_OFFSET[dir];
    const destination = this.covertPosToInside({
      x: x + offset[0],
      y: y + offset[1],
    });
    return destination;
  }
}