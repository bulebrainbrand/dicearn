import { Rewords } from "./Model";
import { InventoryModel } from "@/inventory/Model";
import { BoardSize } from "@/types";

export class RewordGenerator {
  constructor(
    private readonly inventoryModel: InventoryModel,
    private readonly boardSize: BoardSize,
  ) {}
  generate(): Rewords {
    return [
      {
        name: "normal tile",
        desc: "get 1 normal tile",
        callback: () => {
          this.inventoryModel.addTile("normal", 1);
        },
      },
      {
        name: "buffer tile",
        desc: "get 1 buffer tile",
        callback: () => {
          this.inventoryModel.addTile("buffer", 1);
        },
      },
      {
        name: "upgrade board",
        desc: "board size +1",
        callback: () => {
          this.boardSize.expand(1);
        },
      },
    ];
  }
}