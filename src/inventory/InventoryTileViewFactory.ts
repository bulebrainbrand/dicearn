import { TODO } from "untodo";
import {
  InventoryTileViewFactory as IInventoryViewFactory,
  InventoryTileView,
} from "./types";
export class InventoryTileViewFactory implements IInventoryViewFactory {
  create(name: string): InventoryTileView {
    TODO({ reason: "作るのを後回しにしたい" });
  }
}