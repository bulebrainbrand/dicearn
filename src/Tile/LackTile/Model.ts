import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class LackTileModel extends AbstrastMovableRotatableTile {
  readonly name = "lack";
  onStandMoney(kind: RouteKind): number {
    const random = () => Math.floor(Math.random() * 10) + 1;
    switch (kind) {
      case "move":
        return random();
      case "reset":
        return 0;
      case "warp":
        return random();
      case "stop":
        return random();
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