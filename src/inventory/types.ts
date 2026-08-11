import { TileModel } from "@/Tile/types";
import { InventoryItemName } from "./Model";

export interface InventoryTileView extends Phaser.GameObjects.Container {
  updateAmount(amount: number): void;
  createClone(): Phaser.GameObjects.Container;
  createTileModelForTiles(): TileModel;
}
export interface InventoryTileViewFactory {
  create(name: InventoryItemName): InventoryTileView;
}