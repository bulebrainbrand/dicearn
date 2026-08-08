import { NormalTileView } from "./NormalTile/View";
import { TileView } from "./types";

export class TileViewTypeChecker {
  isNormalTileView(tileView: TileView): tileView is NormalTileView {
    return tileView.name === "normal";
  }
}