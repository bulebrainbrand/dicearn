import { BufferTileFactory } from "./BufferTIle/Factory";
import { BufferTileModel } from "./BufferTIle/Model";
import { DizzyTileFactory } from "./DizzyTile/Factory";
import { DizzyTileModel } from "./DizzyTile/Model";
import { GetaTileFactory } from "./GetaTile/Factory";
import { GetaTileModel } from "./GetaTile/Model";
import { LackTileFactory } from "./LackTile/Factory";
import { LackTileModel } from "./LackTile/Model";
import { MarkTileFactory } from "./MarkTile/Factory";
import { MarkTileModel } from "./MarkTile/Model";
import { NormalTileFactory } from "./NormalTile/Factory";
import { NormalTileModel } from "./NormalTile/Model";
import { RandomTileFactory } from "./RandomTile/Factory";
import { RandomTileModel } from "./RandomTile/Model";
import { StopTileFactory } from "./StopTile/Factory";
import { StopTileModel } from "./StopTile/Model";
import { TileFactory, TileModel, TileView } from "./types";

export const TILE_DIFINITION = {
  normal: {
    factory: new NormalTileFactory(),
    modelConstructor: NormalTileModel,
  },
  buffer: {
    factory: new BufferTileFactory(),
    modelConstructor: BufferTileModel,
  },
  geta: { factory: new GetaTileFactory(), modelConstructor: GetaTileModel },
  mark: { factory: new MarkTileFactory(), modelConstructor: MarkTileModel },
  random: {
    factory: new RandomTileFactory(),
    modelConstructor: RandomTileModel,
  },
  stop: { factory: new StopTileFactory(), modelConstructor: StopTileModel },
  dizzy: { factory: new DizzyTileFactory(), modelConstructor: DizzyTileModel },
  lack: { factory: new LackTileFactory(), modelConstructor: LackTileModel },
} as const satisfies Record<
  string,
  {
    factory: TileFactory<TileModel, TileView>;
    modelConstructor: { new (...data: any[]): TileModel };
  }
>;

export const TILE_NAME_SET = new Set(Object.keys(TILE_DIFINITION));

export type TileModelUnion = InstanceType<
  (typeof TILE_DIFINITION)[keyof typeof TILE_DIFINITION]["modelConstructor"]
>;

export type TileNameUnion = keyof typeof TILE_DIFINITION;