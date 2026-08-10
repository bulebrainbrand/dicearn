import { BufferTileFactory } from "./BufferTIle/Factory";
import { BufferTileModel } from "./BufferTIle/Model";
import { NormalTileFactory } from "./NormalTile/Factory";
import { NormalTileModel } from "./NormalTile/Model";
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