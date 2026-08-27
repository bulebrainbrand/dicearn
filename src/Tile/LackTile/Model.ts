import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class LackTileModel extends AbstrastMovableRotatableTile {
  readonly name = "lack";
  onStandMoney(kind: RouteKind): number {
    switch (kind) {
      case "move":
        return Math.floor(Math.random() * 11);
      case "reset":
        return 0;
      case "warp":
        return Math.floor(Math.random() * 11);
      case "stop":
        return Math.floor(Math.random() * 11);
      default: {
        kind satisfies never;
        break;
      }
    }
    kind satisfies never;
    // oxlint-disable-next-line typescript/restrict-template-expressions
    throw new TypeError(`unexpected Routekind:${kind}`);
  }
  getDescription(): string {
    return "1~10コインの間でランダムにもらえる";
  }
}