import { RouteKind } from "@/board/types";
import { AbstrastMovableRotatableTile } from "../AbstractTile/Model";

export class StoneTileModel extends AbstrastMovableRotatableTile {
  readonly name = "stone";
  private count: number = 0;
  onStandMoney(_kind: RouteKind): number {
    this.count++;
    if (this.count === 3) {
      this.count = 0;
      this.emit("count", 0);
      return 25;
    }
    this.emit("count", this.count);
    return 0;
  }
  getDescription(): string {
    return "3回踏むごとに25コイン";
  }
}