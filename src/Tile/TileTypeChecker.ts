import { NormalTileModel } from "./NormalTile/Model";
import { TileModel } from "./types";

export class TileTypeChecker {
  isNormalTile(tile: TileModel): tile is NormalTileModel {
    return tile.name === "normal";
  }
  getName(tile: TileModel): string {
    return tile.name;
  }
}