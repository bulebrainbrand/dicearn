import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class NormalTileModel extends AbstrastMovableRotatableTile {
  readonly name = "normal";
  onStandMoney(kind: RouteKind): number {
    switch (kind) {
      case "move":
        return 1;
      case "reset":
        return 0;
      case "warp":
        return 1;
      case "stop":
        return 1;
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
    return "乗った時に+1コイン";
  }
}