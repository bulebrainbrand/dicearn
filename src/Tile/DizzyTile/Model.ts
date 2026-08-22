import { RouteKind } from "@/board/types";
import { AbstrastMovableTile } from "../AbstractTile/Model";

export class DizzyTileModel extends AbstrastMovableTile {
  readonly name = "dizzy";
  onStandMoney(kind: RouteKind): number {
    switch (kind) {
      case "move":
        return 3;
      case "reset":
        return 0;
      case "warp":
        return 3;
      case "stop":
        return 3;
      default: {
        kind satisfies never;
        break;
      }
    }
    kind satisfies never;
    // i know kind is `never`. just for shut up complier
    // oxlint-disable-next-line typescript/restrict-template-expressions
    throw new TypeError(`unexpected Routekind:${kind}`);
  }
  getDescription(): string {
    return "ランダムな方向に進む";
  }
}