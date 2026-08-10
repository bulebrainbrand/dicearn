import { Tiles } from "@/Tiles/Model";
import { InventoryModel } from "./Model";
import { TileTypeChecker } from "@/Tile/TileTypeChecker";
import { TileModelUnion } from "@/Tile/TileDifinition";

export class TilePickUp {
  constructor(
    inventoryModel: InventoryModel,
    tiles: Tiles,
    tileTypeChecker: TileTypeChecker,
  ) {
    tiles.addListener("destroy", (tile: TileModelUnion) => {
      const name = tileTypeChecker.getName(tile);
      inventoryModel.addTile(name, 1);
    });
  }
}