import { InventoryItemName } from "./Model";
import { TileModelUnion } from "@/Tile/TileDifinition";

export interface InventoryTileView extends Phaser.GameObjects.Container {
  updateAmount(amount: number): void;
  createClone(): Phaser.GameObjects.Container;
  createTileModelForTiles(): TileModelUnion;
}
export interface InventoryTileViewFactory {
  create(name: InventoryItemName): InventoryTileView;
}