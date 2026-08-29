import { RouteKind } from "@/board/types";
import { AbstrastMovableTile } from "../AbstractTile/Model";

export class DizzyTileModel extends AbstrastMovableTile {
  readonly name = "dizzy";
  onStandMoney(_kind: RouteKind): number {
    return 7;
  }
  getDescription(): string {
    return "ランダムな方向に進む";
  }
}