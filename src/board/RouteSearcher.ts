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
    private readonly boardSize: BoardSize,
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
}