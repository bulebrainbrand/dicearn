import { RouteKind } from "@/board/types";
import { AbstrastMovableTile } from "../AbstractTile/Model";

export class RandomTileModel extends AbstrastMovableTile {
  readonly name = "random";
  onStandMoney(kind: RouteKind): number {
    switch (kind) {
      case "move":
        return 2;
      case "reset":
        return 0;
      case "warp":
        return 2;
      case "stop":
        return 2;
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
}