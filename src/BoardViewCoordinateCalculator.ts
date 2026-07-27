import { Direction, DIRECTION_OFFSET } from "./Direction.ts";

export type Position = { x: number; y: number };
type Offset = [number, number];
export type Route = { x: number; y: number; type: "set" | "move" };
const set = (pos: Position): Route => ({ ...pos, type: "set" });
const move = (pos: Position): Route => ({ ...pos, type: "move" });
export class BoardViewCoordinateCalculator {
  constructor(
    private minX: number,
    private maxX: number,
    private minY: number,
    private maxY: number,
  ) {}
  applyOffsetAllowedOutsidePos(pos: Position, offset: Offset): Position {
    return { x: pos.x + offset[0], y: pos.y + offset[1] };
  }
  isOutside(pos: Position): boolean {
    return (
      pos.x < this.minX ||
      this.maxX < pos.x ||
      pos.y < this.minY ||
      this.maxY < pos.y
    );
  }
  covertPosToInside(pos: Position): Position {
    const x =
      pos.x < this.minX ? this.maxX : this.maxX < pos.x ? this.minX : pos.x;
    const y =
      pos.y < this.minY ? this.maxY : this.maxY < pos.y ? this.minY : pos.y;
    return { x, y };
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
        set({ x: pos.x, y: this.maxY + 1 }),
        move({ x: pos.x, y: this.maxY }),
      ];
    }
    if (dir === "d") {
      // [0,1]
      return [
        move(this.applyOffsetAllowedOutsidePos(pos, offset)),
        set({ x: pos.x, y: this.minY - 1 }),
        move({ x: pos.x, y: this.minY }),
      ];
    }
    if (dir === "l") {
      // [-1,0]
      return [
        move(this.applyOffsetAllowedOutsidePos(pos, offset)),
        set({ x: this.maxX + 1, y: pos.y }),
        move({ x: this.maxX, y: pos.y }),
      ];
    }
    if (dir === "r") {
      // [-1,0]
      return [
        move(this.applyOffsetAllowedOutsidePos(pos, offset)),
        set({ x: this.minX - 1, y: pos.y }),
        move({ x: this.minX, y: pos.y }),
      ];
    }
    dir satisfies never;
    return [];
  }
  updateGridSize({
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
