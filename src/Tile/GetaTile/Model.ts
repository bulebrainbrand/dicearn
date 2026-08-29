import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class GetaTileModel extends AbstrastMovableRotatableTile {
  readonly name = "geta";
  onStandMoney(_kind: RouteKind): number {
    return 1;
  }
  getDescription(): string {
    return "出目を+1する。重複しない";
  }
}