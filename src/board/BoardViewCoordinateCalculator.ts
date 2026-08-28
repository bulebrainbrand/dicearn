import { Direction, DIRECTION_OFFSET } from "@/Direction.ts";
import { BoardSize } from "@/types";

export type Position = { x: number; y: number };
type Offset = [number, number];
export type Route = { x: number; y: number; type: "set" | "move" };
const set = (pos: Position): Route => ({ ...pos, type: "set" });
const move = (pos: Position): Route => ({ ...pos, type: "move" });
export class BoardViewCoordinateCalculator {
  constructor(private readonly boardSize: BoardSize) {}
  applyOffsetAllowedOutsidePos(pos: Position, offset: Offset): Position {
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
  getMoveRoute(pos: Position, dir: Direction): Route[] {
    console.log("getMoveRoute", { pos, dir });
    const offset = DIRECTION_OFFSET[dir];
    if (!this.isOutside(this.applyOffsetAllowedOutsidePos(pos, offset)))
      return [move(this.applyOffsetAllowedOutsidePos(pos, offset))];
    if (dir === "u") {
      // [0,-1]
      return [
        move(this.applyOffsetAllowedOutsidePos(pos, offset)),
        set({ x: pos.x, y: this.boardSize.maxY + 1 }),
        move({ x: pos.x, y: this.boardSize.maxY }),
      ];
    }
    if (dir === "d") {
      // [0,1]
      return [
        move(this.applyOffsetAllowedOutsidePos(pos, offset)),
        set({ x: pos.x, y: this.boardSize.minY - 1 }),
        move({ x: pos.x, y: this.boardSize.minY }),
      ];
    }
    if (dir === "l") {
      // [-1,0]
      return [
        move(this.applyOffsetAllowedOutsidePos(pos, offset)),
        set({ x: this.boardSize.maxX + 1, y: pos.y }),
        move({ x: this.boardSize.maxX, y: pos.y }),
      ];
    }
    if (dir === "r") {
      // [-1,0]
      return [
        move(this.applyOffsetAllowedOutsidePos(pos, offset)),
        set({ x: this.boardSize.minX - 1, y: pos.y }),
        move({ x: this.boardSize.minX, y: pos.y }),
      ];
    }
    dir satisfies never;
    return [];
  }
  twoPosToRoute(pos1: Position, pos2: Position): Route[] {
    if (pos1.x === pos2.x && pos1.y === pos2.y) return [];

    if (this.isWarp(pos1, pos2)) {
      if (pos1.x !== pos2.x && pos1.y !== pos2.y) {
        return [set(pos2)];
      }
      const dir: Direction =
        pos1.x === pos2.x
          ? pos1.y < pos2.y
            ? "u"
            : "d"
          : pos1.x < pos2.x
            ? "l"
            : "r";
      return this.getMoveRoute(pos1, dir);
    }
    return [move(pos2)];
  }
  isWarp(pos1: Position, pos2: Position): boolean {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) >= 2;
  }
}