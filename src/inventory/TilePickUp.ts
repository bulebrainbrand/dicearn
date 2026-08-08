import { Tiles } from "@/Tiles/Model";
import { InventoryModel } from "./Model";
import { TileModel } from "@/Tile/types";
import { TileTypeChecker } from "@/Tile/TileTypeChecker";

export class TilePickUp {
  constructor(
    inventoryModel: InventoryModel,
    tiles: Tiles,
    tileTypeChecker: TileTypeChecker,
  ) {
    tiles.addListener("destroy", (tile: TileModel) => {
      const name = tileTypeChecker.getName(tile);
      inventoryModel.addTile(name, 1);
    });
  }
}