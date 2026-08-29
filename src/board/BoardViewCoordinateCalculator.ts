import { Direction, DIRECTION_OFFSET } from "@/Direction.ts";
import { BoardSize } from "@/types";

export type Position = { x: number; y: number };
type Offset = [number, number];
export type Route = { x: number; y: number; type: "set" | "move" };
const set = (pos: Position): Route => ({ ...pos, type: "set" });
const move = (pos: Position): Route => ({ ...pos, type: "move" });
export class BoardViewCoordinateCalculator {
  constructor(private readonly boardSize: BoardSize) {}
  applyOffsetAllowedOutsidePos(
    pos: Readonly<Position>,
    offset: Readonly<Offset>,
  ): Position {
    return { x: pos.x + offset[0], y: pos.y + offset[1] };
  }
  isOutside(pos: Position): boolean {
    return (
      pos.x < this.boardSize.minX ||
      this.boardSize.maxX < pos.x ||
      pos.y < this.boardSize.minY ||
      this.boardSize.maxY < pos.y
    );
  }
  getMoveRoute(pos1: Position, pos2: Position, dir: Direction): Route[] {
    const offset = DIRECTION_OFFSET[dir];
    let route: Route[] = [];

    if (
      this.isSamePosition(this.applyOffsetAllowedOutsidePos(pos1, offset), pos2)
    )
      return [move(pos2)];
    // pos1 to next
    route.push(move(this.applyOffsetAllowedOutsidePos(pos1, offset)));
    // warp pos2 bakword
    route.push(
      set(this.applyOffsetAllowedOutsidePos(pos2, this.invertOffset(offset))),
    );
    // move to pos2
    route.push(move(pos2));

    return route;
  }
  twoPosToRoute(pos1: Position, pos2: Position, dir: Direction): Route[] {
    if (pos1.x !== pos2.x && pos1.y !== pos2.y) {
      return [set(pos2)];
    }
    return this.getMoveRoute(pos1, pos2, dir);
  }
  isWarp(pos1: Position, pos2: Position): boolean {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) >= 2;
  }
  private isSamePosition(pos1: Position, pos2: Position) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }
  private invertOffset(offset: Readonly<Offset>): Offset {
    return [offset[0] * -1, offset[1] * -1];
  }
}