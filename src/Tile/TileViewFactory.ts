import { TILE_DIFINITION, TileModelUnion } from "./TileDifinition";
import { TileTypeChecker } from "./TileTypeChecker";
import {
  TileViewFactory as ITileViewFactory,
  TileFactory,
  TileModel,
  TileView,
} from "./types";
export class TileViewFactory implements ITileViewFactory {
  constructor(
    private readonly scene: Phaser.Scene,
    private readonly tileTypeChecker: TileTypeChecker,
  ) {}
  create(tile: TileModel): TileView {
    this.tileTypeChecker.assertRegisteredTile(tile);
    const factory = this.readTileDifinitionFactory(tile);
    return factory.withModel(this.scene, tile);
  }
  private readTileDifinitionFactory<M extends TileModelUnion>(
    tile: M,
  ): TileFactory<M, TileView> {
    // @ts-expect-error どうやっても無理
    return TILE_DIFINITION[tile.name].factory;
  }
}