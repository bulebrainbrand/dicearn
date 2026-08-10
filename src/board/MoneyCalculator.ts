import { Tiles } from "@/Tiles/Model";
import { Position } from "./BoardViewCoordinateCalculator";
import { TileModel } from "@/Tile/types";

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
    const bufferTileCount = this.countTile(
      end,
      (tile) => tile.name === "buffer",
    );
    const isEndNormal = this.tiles.getTile(end.x, end.y)?.name === "normal";
    return (isEndNormal ? 1 : 0) * 2 ** bufferTileCount;
  }
  private countTile(pos: Position, checker: (tileModel: TileModel) => boolean) {
    return this.tiles
      .getAdjacentTile(pos.x, pos.y)
      .filter((tile) => tile !== undefined)
      .map(checker)
      .reduce((amount, bool) => amount + (bool ? 1 : 0), 0);
  }
}