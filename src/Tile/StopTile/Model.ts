import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class StopTileModel extends AbstrastMovableRotatableTile {
  readonly name = "stop";
  onStandMoney(kind: RouteKind): number {
    switch (kind) {
      case "move":
        return 0;
      case "reset":
        return 0;
      case "warp":
        return 0;
      case "stop":
        return 15;
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
    return "このタイルに乗るとその日の移動を終わる";
  }
}