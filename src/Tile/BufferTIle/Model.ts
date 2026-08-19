import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class BufferTileModel extends AbstrastMovableRotatableTile {
  readonly name = "buffer";
  onStandMoney(_kind: RouteKind): number {
    return 0;
  }
}