import { RouteKind } from "@/board/types";
import { AbstrastRotatableTile } from "../AbstractTile/Model";

export class HomeTileModel extends AbstrastRotatableTile {
  readonly name = "home";
  onStandMoney(_kind: RouteKind): number {
    return 2;
  }
  getDescription(): string {
    return "拠点。動かせない。";
  }
}