import { TILE_DIFINITION, TileNameUnion } from "@/Tile/TileDifinition";
import { InventoryTileView } from "./InventoryTileView";
import Phaser from "phaser";

export class InventoryTileViewFactory {
  constructor(private readonly scene: Phaser.Scene) {}
  create(name: TileNameUnion, amount: number = 0) {
    return new InventoryTileView(
      this.scene,
      0,
      0,
      TILE_DIFINITION[name].factory,
      amount,
    );
  }
}