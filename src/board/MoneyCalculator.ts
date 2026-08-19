import { Tiles } from "@/Tiles/Model";
import { Position } from "./BoardViewCoordinateCalculator";
import { RouteKind } from "./types";
import { TileModelUnion } from "@/Tile/TileDifinition";

export type MoveRoute = { x: number; y: number; kind: RouteKind }[];

export class MoneyCalculator {
  constructor(private readonly tiles: Tiles) {}
  calcMoneyByFullRoute(start: Position, route: MoveRoute): number {
    let current = start;
    let sum = 0;
    for (const r of route) {
      sum += this.calcMoneyBySnapshotRoute(current, r, r.kind);
      current = r;
    }
    return sum;
  }
  calcMoneyBySnapshotRoute(
    start: Position,
    end: Position,
    kind: RouteKind,
  ): number {
    const bufferTileCount = this.countTile(
      end,
      (tile) => tile.name === "buffer",
    );
    const endTile = this.tiles.getTile(end.x, end.y);

    const moneyAmount = endTile ? endTile.onStandMoney(kind) : 0;
    if (moneyAmount < 0) {
      throw new TypeError(`can't earn negative money`);
    }
    if (Number.isNaN(moneyAmount)) {
      throw new TypeError(`can't earn NaN money`);
    }
    return moneyAmount * 2 ** bufferTileCount;
  }
  private countTile(
    pos: Position,
    checker: (tileModel: TileModelUnion) => boolean,
  ) {
    return this.tiles
      .getAdjacentTile(pos.x, pos.y)
      .filter((tile) => tile !== undefined)
      .map(checker)
      .reduce((amount, bool) => amount + (bool ? 1 : 0), 0);
  }
}