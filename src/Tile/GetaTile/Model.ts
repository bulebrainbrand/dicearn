import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class GetaTileModel extends AbstrastMovableRotatableTile {
  readonly name = "geta";
  onStandMoney(_kind: RouteKind): number {
    return 0;
  }
}