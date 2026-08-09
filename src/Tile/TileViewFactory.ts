import { NormalTileFactory } from "./NormalTile/Factory";
import { TileTypeChecker } from "./TileTypeChecker";
import {
  TileViewFactory as ITileViewFactory,
  TileModel,
  TileView,
} from "./types";
export class TileViewFactory implements ITileViewFactory {
  constructor(
    private readonly scene: Phaser.Scene,
    private readonly tileTypeChecker: TileTypeChecker,
    private readonly normalTileFactory: NormalTileFactory,
  ) {}
  create(tile: TileModel): TileView {
    if (this.tileTypeChecker.isNormalTile(tile)) {
      return this.normalTileFactory.withModel(this.scene, tile);
    }
    throw new TypeError(`unexpected tile`);
  }
}