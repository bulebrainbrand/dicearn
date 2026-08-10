import { DIRECTION_OFFSET } from "@/Direction.ts";
import { TileTypeChecker } from "@/Tile/TileTypeChecker";
import { Tiles } from "@/Tiles/Model.ts";
import { BoardSize } from "@/types";
import { Position } from "./BoardViewCoordinateCalculator";

export type RouteTransition =
  | { kind: "move"; destination: Position }
  | { kind: "reset"; destination: Position };

export class RouteSearcher {
  constructor(
    private readonly tiles: Tiles,
    private minX: number,
    private maxX: number,
    private minY: number,
    private maxY: number,
    private readonly tileTypeChecker: TileTypeChecker,
    private readonly resetPosition: Position,
  ) {}

  search(position: Position): RouteTransition {
    const tile = this.tiles.getTile(position.x, position.y);
    if (tile === undefined || !this.tileTypeChecker.isDirectionTile(tile)) {
      return { kind: "reset", destination: this.resetPosition };
    }
    const offset = DIRECTION_OFFSET[tile.getDirection()];
    const destination = this.covertPosToInside({
      x: position.x + offset[0],
      y: position.y + offset[1],
    });
    if (this.tiles.getTile(destination.x, destination.y) === undefined) {
      return { kind: "reset", destination: this.resetPosition };
    }
    return { kind: "move", destination };
  }

  updateBoardSize({ maxX, maxY, minX, minY }: BoardSize) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  private covertPosToInside(pos: Position): Position {
    return {
      x: pos.x < this.minX ? this.maxX : this.maxX < pos.x ? this.minX : pos.x,
      y: pos.y < this.minY ? this.maxY : this.maxY < pos.y ? this.minY : pos.y,
    };
  }
}
