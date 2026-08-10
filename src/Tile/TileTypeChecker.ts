import { TILE_NAME_SET, TileModelUnion } from "./TileDifinition";
import {
  DirectionTileModel,
  MovaleTileModel,
  RotatableTileModel,
  TileModel,
} from "./types";

export class TileTypeChecker {
  getName<T extends TileModelUnion>(tile: T): T["name"] {
    const name = tile.name;
    if (TILE_NAME_SET.has(name)) return name;
    throw new TypeError(`unexpected tile name: "${name}"`, { cause: tile });
  }
  assertRegisteredTile(tile: TileModel): asserts tile is TileModelUnion {
    if (TILE_NAME_SET.has(tile.name)) return;
    throw new TypeError(`unexpected tile: "${tile.name}"`);
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