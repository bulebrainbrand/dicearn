import { NormalTileModel } from "./NormalTile/Model";
import { TileName } from "./TileName";
import {
  DirectionTileModel,
  MovaleTileModel,
  RotatableTileModel,
  TileModel,
} from "./types";

export class TileTypeChecker {
  isNormalTile(tile: TileModel): tile is NormalTileModel {
    return tile.name === "normal";
  }
  getName(tile: TileModel): TileName {
    const name = tile.name;
    return name;
  }
  isMovable(tileModel: TileModel): tileModel is MovaleTileModel {
    return "getMovable" in tileModel;
  }
  isDirectionTile(tileModel: TileModel): tileModel is DirectionTileModel {
    return "getDirection" in tileModel;
  }
  isRotatable(tileModel: TileModel): tileModel is RotatableTileModel {
    return "changeDirection" in tileModel;
  }
}