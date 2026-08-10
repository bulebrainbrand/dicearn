import { Tiles } from "@/Tiles/Model";
import { Position } from "./BoardViewCoordinateCalculator";

export type MoveRoute = { x: number; y: number }[];

export class MoneyCalculator {
  constructor(private readonly tiles: Tiles) {}
  calcMoneyByFullRoute(start: Position, route: MoveRoute): number {
    let current = start;
    let sum = 0;
    for (const r of route) {
      sum += this.calcMoneyBySnapshotRoute(current, r);
      current = r;
    }
    return sum;
  }
  calcMoneyBySnapshotRoute(start: Position, end: Position): number {
    return 1;
  }
}