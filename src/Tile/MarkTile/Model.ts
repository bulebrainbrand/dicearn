import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class MarkTileModel extends AbstrastMovableRotatableTile {
  readonly name = "mark";
  onStandMoney(kind: RouteKind): number {
    switch (kind) {
      case "move":
        return 0;
      case "reset":
        return 0;
      case "warp":
        return 10;
      default: {
        kind satisfies never;
        break;
      }
    }
    kind satisfies never;
    // oxlint-disable-next-line typescript/restrict-template-expressions
    throw new TypeError(`unexpected Routekind:${kind}`);
  }
}