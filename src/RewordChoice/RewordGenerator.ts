import { Rewords } from "./Model";
import { InventoryModel } from "@/inventory/Model";
import { BoardSize } from "@/types";

export class RewordGenerator {
  constructor(
    private readonly inventoryModel: InventoryModel,
    private readonly boardSize: BoardSize,
  ) {}
  generate(): Rewords {
    const rewords = [
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
        name: "geta  tile",
        desc: "get 1 buffer tile. it will plus one to each dice result",
        callback: () => {
          this.inventoryModel.addTile("geta", 1);
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
    const select = rewords
      .keys()
      .toArray()
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .sort((a, b) => a - b);
    return [rewords[select[0]], rewords[select[1]], rewords[select[2]]];
  }
}