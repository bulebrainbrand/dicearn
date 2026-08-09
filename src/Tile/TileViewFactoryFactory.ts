import { NormalTileFactory } from "./NormalTile/Factory";
import { TileTypeChecker } from "./TileTypeChecker";
import { TileViewFactory } from "./TileViewFactory";

export class TileViewFactoryFactory {
  constructor(
    private readonly scene: Phaser.Scene,
    private readonly tileTypeChecker: TileTypeChecker,
  ) {}
  create() {
    return new TileViewFactory(
      this.scene,
      this.tileTypeChecker,
      new NormalTileFactory(),
    );
  }
}